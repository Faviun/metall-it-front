import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import { colors } from "../../../constants/themeColors";

type SortOption = "price" | "name" | "stock";

interface ProductSortProps {
  sortBy: SortOption;
  onChange: (value: SortOption) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onChange }) => {
  const { theme } = useTheme();
  const currentColors = colors[theme];

  return (
    <div className="flex items-center space-x-2">
      <label className={`text-sm font-medium ${currentColors.primaryText}`}>Сортировать по:</label>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className={`border rounded px-2 py-1
          ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
      >
        <option value="price">Цене</option>
        <option value="name">Названию</option>
        <option value="stock">Наличию</option>
      </select>
    </div>
  );
};

export default ProductSort;

// import React from "react";

// type SortOption = "price" | "name" | "stock";

// interface ProductSortProps {
//   sortBy: SortOption;
//   onChange: (value: SortOption) => void;
// }

// const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onChange }) => {
//   return (
//     <div className="flex items-center space-x-2">
//       <label className="text-sm font-medium">Сортировать по:</label>
//       <select
//         value={sortBy}
//         onChange={(e) => onChange(e.target.value as SortOption)}
//         className="border rounded px-2 py-1"
//       >
//         <option value="price">Цене</option>
//         <option value="name">Названию</option>
//         <option value="stock">Наличию</option>
//       </select>
//     </div>
//   );
// };

// export default ProductSort;
