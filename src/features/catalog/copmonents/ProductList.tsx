import React from "react";
import ProductCard from "./ProductCard";
import type { MetalProduct } from "../../auth/types/index";

interface ProductListProps {
  products: MetalProduct[];
}

// Функция для группировки товаров по категориям
function groupProductsByCategory(products: MetalProduct[]) {
  return products.reduce((acc, product) => {
    const category = product.category || "Без категории";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, MetalProduct[]>);
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const groupedProducts = groupProductsByCategory(products);

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4 text-blue-gray-600">{category}</h2>
          <div className="flex flex-col">
            {productsInCategory.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;




//***************************************************************************** */
// import React from "react";
// import ProductCard from "./ProductCard";
// import type { MetalProduct } from "../../auth/types/index";

// interface ProductListProps {
//   products: MetalProduct[];
// }

// const ProductList: React.FC<ProductListProps> = ({ products }) => {
//   return (
//     <div className="flex flex-col">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product as any} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;



//************************************************************************************************ */
// import React from "react";
// import ProductCard from "./ProductCard";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   inStock: boolean;
//   diameter?: string;
//   length?: string;
//   gost?: string;
//   category?: string;
// }

// interface ProductListProps {
//   products: Product[];
// }

// const ProductList: React.FC<ProductListProps> = ({ products }) => {
//   return (
//     <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;
