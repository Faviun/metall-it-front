import React from "react";
import ProductCard from "./ProductCard";
import type { MetalProduct } from "../../auth/types/index";
import { useTheme } from "../../../context/ThemeContext";
import { colors } from "../../../constants/themeColors";

interface ProductListProps {
  products: MetalProduct[];
}

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
  const { theme } = useTheme();
  const currentColors = colors[theme];

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
        <div key={category}>
          <h2 className={`text-xl font-semibold mb-4 ${currentColors.primaryText}`}>
            {category}
          </h2>
          <div className="flex flex-col">
            {productsInCategory.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

// import React from "react";
// import ProductCard from "./ProductCard";
// import type { MetalProduct } from "../../auth/types/index";

// interface ProductListProps {
//   products: MetalProduct[];
// }

// // Функция для группировки товаров по категориям
// function groupProductsByCategory(products: MetalProduct[]) {
//   return products.reduce((acc, product) => {
//     const category = product.category || "Без категории";
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(product);
//     return acc;
//   }, {} as Record<string, MetalProduct[]>);
// }

// const ProductList: React.FC<ProductListProps> = ({ products }) => {
//   const groupedProducts = groupProductsByCategory(products);

//   return (
//     <div className="flex flex-col gap-8">
//       {Object.entries(groupedProducts).map(([category, productsInCategory]) => (
//         <div key={category}>
//           <h2 className="text-xl font-semibold mb-4 text-blue-gray-600">
//             {category}
//           </h2>
//           <div className="flex flex-col">
//             {productsInCategory.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;