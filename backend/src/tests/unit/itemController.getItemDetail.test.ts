import { Request, Response } from 'express';
import axios from 'axios';
import { getItemDetail } from '../../controllers/itemsController';

jest.mock('axios');

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

describe('getItemDetail', () => {
    it('should render product detail page with formatted item and categories', async () => {
        const req = mockRequest({ params: { id: 'MLA123456' } });
        const res = mockResponse();
        // Simulamos las respuestas de las peticiones a la API
        const mockItemResponse = {
            id: 'MLA123456',
            title: 'Item Test',
            currency_id: 'ARS',
            price: 100.0,
            pictures: [{ secure_url: 'https://example.com/image.jpg' }],
            condition: 'new',
            shipping: { free_shipping: true },
            sold_quantity: 5,
            category_id: 'MLA1234'
        };
        const mockDescriptionResponse = {
            plain_text: 'This is a test item description.'
        };
        const mockCategoryResponse = {
            path_from_root: [
                { name: 'Category 1' },
                { name: 'Category 2' },
            ]
        };
        // Simulamos las llamadas a axios.get
        (axios.get as jest.Mock)
            .mockResolvedValueOnce({ data: mockItemResponse })
            .mockResolvedValueOnce({ data: mockDescriptionResponse })
            .mockResolvedValueOnce({ data: mockCategoryResponse });
        // Llamamos a la función
        await getItemDetail(req as Request, res as Response);
        // Verificamos que se haya llamado a axios.get las veces correctas
        expect(axios.get).toHaveBeenCalledTimes(3);
        // Verificamos que se haya renderizado la vista correcta
        expect(res.render).toHaveBeenCalledWith('productDetail', {
            breadcrumbCategories: ['Category 1', 'Category 2'],
            breadcrumbProduct: 'Item Test',
            product: {
                id: 'MLA123456',
                title: 'Item Test',
                price: {
                    currency: 'ARS',
                    amount: 100,
                    decimals: 0
                },
                picture: 'https://example.com/image.jpg',
                condition: 'new',
                free_shipping: true,
                sold_quantity: 5,
                description: 'This is a test item description.'
            }
        });
    });

    it('should return error response when API call fails', async () => {
        const req = mockRequest({ params: { id: 'MLA123456' } });
        const res = mockResponse();
        // Simulamos un error en la llamada a la API
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API error'));
        // Llamamos a la función
        await getItemDetail(req as Request, res as Response);
        // Verificamos que se haya devuelto el error 500
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al consultar la API de Mercado Libre' });
    });
});