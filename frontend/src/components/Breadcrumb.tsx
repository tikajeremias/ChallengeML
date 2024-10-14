import React from 'react';
import '../styles/breadcrumb.sass'

// Definición de las props que el Breadcrumb espera recibir
interface BreadcrumbProps {
  categories: string[];
  productName?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories, productName }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {categories.map((category, index) => (
          <li key={index} className="breadcrumb-item">
            {category}
          </li>
        ))}
        {productName && (
          <li className="breadcrumb-item active" aria-current="page">
            {productName}
          </li>
        )}
      </ol>
    </nav>
  );
};
export default Breadcrumb