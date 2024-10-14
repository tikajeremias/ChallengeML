import { formatItems } from '../../controllers/itemsController';

jest.mock('../../controllers/itemsController', () => ({
  ...jest.requireActual('../../controllers/itemsController'),
  generateBreadcrumb: jest.fn(),
}));

describe('formatItems', () => {
  it('debería formatear los items correctamente y generar el breadcrumb', async () => {
    // Datos simulados
    const data = {
      results: [
        {
          id: 'MLA12345',
          title: 'Laptop 1',
          category_id: 'MLA82085',
          currency_id: 'ARS',
          price: 1500.50,
          thumbnail: 'http://example.com/image1.jpg',
          condition: 'new',
          shipping: {
            free_shipping: true,
          },
        },
        {
          id: 'MLA67890',
          title: 'Laptop 2',
          category_id: 'MLA82085',
          currency_id: 'ARS',
          price: 1200.75,
          thumbnail: 'http://example.com/image2.jpg',
          condition: 'used',
          shipping: {
            free_shipping: false,
          },
        },
      ],
    };

    const expectedFormattedItems = {
      author: {
        name: 'Jeremias Tadeo',
        lastname: 'Tika',
      },
      categories: ['Computación', 'Tablets y Accesorios', 'Tablets'],
      items: [
        {
          id: 'MLA12345',
          title: 'Laptop 1',
          price: {
            currency: 'ARS',
            amount: 1500,
            decimals: 50,
          },
          picture: 'http://example.com/image1.jpg',
          condition: 'new',
          free_shipping: true,
        },
        {
          id: 'MLA67890',
          title: 'Laptop 2',
          price: {
            currency: 'ARS',
            amount: 1200,
            decimals: 75,
          },
          picture: 'http://example.com/image2.jpg',
          condition: 'used',
          free_shipping: false,
        },
      ],
    };

    const result = await formatItems(data);

    // Verificar que la función formatItems devuelva el formato correcto
    expect(result).toEqual(expectedFormattedItems);
  });
});