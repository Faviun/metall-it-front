import React from "react";

type SortOption = "price" | "name" | "stock";

interface ProductSortProps {
  sortBy: SortOption;
  onChange: (value: SortOption) => void;
}

const ProductSort: React.FC<ProductSortProps> = ({ sortBy, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">Сортировать по:</label>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="border rounded px-2 py-1"
      >
        <option value="price">Цене</option>
        <option value="name">Названию</option>
        <option value="stock">Наличию</option>
      </select>
    </div>
  );
};

export default ProductSort;
