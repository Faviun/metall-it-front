import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  diameter?: string;
  length?: string;
  gost?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white text-black">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">Цена: {product.price} ₽</p>
      <p className="text-sm text-gray-600">
        Наличие: {product.inStock ? "В наличии" : "Нет в наличии"}
      </p>
      {product.diameter && <p className="text-sm">Диаметр: {product.diameter}</p>}
      {product.length && <p className="text-sm">Длина: {product.length}</p>}
      {product.gost && <p className="text-sm">ГОСТ: {product.gost}</p>}
      {product.category && <p className="text-sm">Категория: {product.category}</p>}
    </div>
  );
};

export default ProductCard;
