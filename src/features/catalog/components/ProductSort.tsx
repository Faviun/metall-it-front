import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

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
        className="select"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1.5em 1.5em',
        }}
      >
        <option value="price" className="hover:bg-light-border dark:hover:bg-dark-border rounded-md border-light-border dark:border-dark-border flex items-center gap-2 p-2 cursor-pointer w-full">Цене</option>
        <option value="name" className="hover:bg-light-border dark:hover:bg-dark-border rounded-md border-light-border dark:border-dark-border flex items-center gap-2 p-2 cursor-pointer w-full">Названию</option>
        <option value="stock" className="hover:bg-light-border dark:hover:bg-dark-border rounded-md border-light-border dark:border-dark-border flex items-center gap-2 p-2 cursor-pointer w-full">Наличию</option>
      </select>
    </div>
  );
};

export default ProductSort;
