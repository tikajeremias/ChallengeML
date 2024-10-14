import axios from 'axios';
import { generateBreadcrumb } from '../../controllers/itemsController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('generateBreadcrumb', () => {
  it('debería generar un breadcrumb basado en el categoryId', async () => {
    // Simular la respuesta de la API de MercadoLibre
    mockedAxios.get.mockResolvedValue({
      data: {
        path_from_root: [
          { name: 'Category 1' },
          { name: 'Category 2' },
        ],
      },
    });
    const result = await generateBreadcrumb('MLA82085');
    expect(result).toEqual(['Category 1', 'Category 2']);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.mercadolibre.com/categories/MLA82085');
  });

  it('debería devolver un array vacío si la API de MercadoLibre falla', async () => {
    // Mockear console.error
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    // Simular un error en la API
    mockedAxios.get.mockRejectedValue(new Error('API error'));
    const result = await generateBreadcrumb('MLA82085');
    expect(result).toEqual([]);
    expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching category data:', expect.any(Error));
    // Restaurar el comportamiento original de console.error
    consoleErrorMock.mockRestore();
  });
});