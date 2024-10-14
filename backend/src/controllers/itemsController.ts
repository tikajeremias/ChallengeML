import { Request, Response } from 'express';
import axios from 'axios';

// Autor personalizado
const author = {
    name: 'Jeremias Tadeo',
    lastname: 'Tika',
};

// Formatea los resultados para el formato requerido
export const formatItems = async (data: any) => {
    const items = data.results
    // Contar la frecuencia de cada category_id en los resultados
    const categoryCount: Record<string, number> = {};
    items.forEach((item: { category_id: any; }) => {
        const categoryId = item.category_id;
        categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
    });
    // Encontrar la categoría que más veces aparece
    const mostFrequentCategoryId = Object.keys(categoryCount).reduce((a, b) =>
        categoryCount[a] > categoryCount[b] ? a : b
    );
    // Generar el breadcrumb basado en la categoría más frecuente
    const breadcrumb = await generateBreadcrumb(mostFrequentCategoryId);

    // Formatear los items para la respuesta
    const formattedItems = items.slice(0, 4).map((item: { id: any; title: any; currency_id: any; price: number; thumbnail: any; condition: any; shipping: { free_shipping: any; }; }) => ({
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals: Number((item.price % 1).toFixed(2).substring(2))
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping
    }));
    return { author, categories: breadcrumb, items: formattedItems };
};

// Función para generar el breadcrumb
export const generateBreadcrumb = async (categoryId: string) => {
    try {
        // Hacer la solicitud a la API de MercadoLibre para obtener la categoría
        const response = await axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
        // Extraer el breadcrumb de la respuesta (path_from_root)
        const categories = response.data.path_from_root
        let breadcrumb = []
        if (categories) {
            breadcrumb = categories.map((category: any) => category.name);
        }
        return breadcrumb;
    } catch (error) {
        console.error('Error fetching category data:', error);
        return [];
    }
};
// Consulta la API para la búsqueda de items
export const getItems = async (req: Request, res: Response) => {
    try {
        const query = req.query.q;
        const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const formattedData = await formatItems(response.data);
        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la API de Mercado Libre' });
    }
};
// Consulta los detalles de un item
export const getItemDetail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const itemResponse = await axios.get(`https://api.mercadolibre.com/items/${id}`);
        const descriptionResponse = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        const categoryResponse = await axios.get(`https://api.mercadolibre.com/categories/${itemResponse.data.category_id}`);
        const item = itemResponse.data;
        const description = descriptionResponse.data;
        const categories: string[] = categoryResponse.data.path_from_root.map((category: { name: string; }) => category.name);
        const formattedItem = {
            author,
            item: {
                id: item.id,
                title: item.title,
                price: {
                    currency: item.currency_id,
                    amount: Math.floor(item.price),
                    decimals: Math.round((item.price % 1) * 100)
                },
                picture: item.pictures[0].secure_url,
                condition: item.condition == "new" ? "Nuevo" : "Usado",
                free_shipping: item.shipping.free_shipping,
                sold_quantity: item.sold_quantity,
                description: description.plain_text
            },
            categories
        };

        // Server Side Rendering
        // En lugar de devolver un json, devolver un HTML
        res.render('productDetail', {
            breadcrumbCategories: formattedItem.categories,
            breadcrumbProduct: formattedItem.item.title,
            product: formattedItem.item,
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la API de Mercado Libre' });
    }
};