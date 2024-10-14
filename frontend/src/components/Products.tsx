import React from 'react';

// Definición de las props que el componente Products espera recibir
interface Product {
    id: string;
    title: string;
    price: { amount: number };
    picture: string;
}

interface ProductsProps {
    products: Product[];
    handleNavigate: (path: string) => void;
}

const Products: React.FC<ProductsProps> = ({ products, handleNavigate }) => {
    return (
        <ul className='list-items'>
            {products.map((product) => (
                <li onClick={() => handleNavigate(`/items/${product.id}`)} className='item' key={product.id}>
                    <img id='Logo' className='items-image' src={product.picture} alt={product.title} />
                    <div className='item-content'>
                        <p className='item-price'>${product.price.amount}</p>
                        <p className='item-title'>{product.title}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Products;