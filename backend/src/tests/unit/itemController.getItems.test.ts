import { Request, Response } from 'express';
import axios from 'axios';
import { getItems } from '../../controllers/itemsController';
import { formatItems } from '../../controllers/itemsController';

jest.mock('axios');
jest.mock('../../controllers/itemsController', () => ({
    ...jest.requireActual('../../controllers/itemsController'),
    formatItems: jest.fn(),
}));

const mockRequest = (queryParams: any) => {
    return {
        query: queryParams,
        params: queryParams,
    } as unknown as Request;
};
const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    return res;
};
describe('getItems', () => {
    const mockedFormatItems = formatItems as jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('debería devolver los datos formateados correctamente', async () => {
        const req = mockRequest({ q: 'laptop' });
        const res = mockResponse();
        const apiResponse = {
            results: [
                { id: 'MLA12345', title: 'Laptop 1', currency_id: 'ARS', price: 1500.50, thumbnail: 'http://example.com/image1.jpg', condition: 'new', shipping: { free_shipping: true }, category_id: 'MLA82085' },
                { id: 'MLA67890', title: 'Laptop 2', currency_id: 'ARS', price: 1200.75, thumbnail: 'http://example.com/image2.jpg', condition: 'used', shipping: { free_shipping: false }, category_id: 'MLA82085' },
            ],
        };
        const formattedItems = {
            author: { name: "Jeremias Tadeo", lastname: "Tika" },
            categories: [],
            items: [
                { id: 'MLA12345', title: 'Laptop 1', price: { currency: 'ARS', amount: 1500, decimals: 50 }, picture: 'http://example.com/image1.jpg', condition: 'new', free_shipping: true },
                { id: 'MLA67890', title: 'Laptop 2', price: { currency: 'ARS', amount: 1200, decimals: 75 }, picture: 'http://example.com/image2.jpg', condition: 'used', free_shipping: false },
            ],
        }
        mockedFormatItems.mockResolvedValue(formattedItems);
        (axios.get as jest.Mock).mockResolvedValue({ data: apiResponse });
        await getItems(req, res);
        expect(axios.get).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLA/search?q=laptop');
        expect(res.json).toHaveBeenCalledWith(formattedItems);
    });
    it('debería devolver un error si la API de Mercado Libre falla', async () => {
        const req = mockRequest({ q: 'test' });
        const res = mockResponse();

        (axios.get as jest.Mock).mockRejectedValue(new Error('API error'));

        await getItems(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al consultar la API de Mercado Libre' });
    });
});