import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

const ProductFilters = () => {
  const [filters, setFilters] = useState({
    category: "",
    diameter: "",
    length: "",
    gost: "",
    type: "",
  });

  const { theme } = useTheme();
  const currentColors = colors[theme];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`shadow rounded p-4 space-y-4
      ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
    >
      <h2 className={`text-xl font-semibold mb-2 ${currentColors.primaryText}`}>
        Фильтры
      </h2>

      <div>
        <label className={`block text-sm font-medium mb-1 ${currentColors.primaryText}`}>
          Категория
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-1
            ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
        >
          <option value="">Все</option>
          <option value="арматура">Арматура</option>
          <option value="труба">Труба</option>
          <option value="профиль">Профиль</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${currentColors.primaryText}`}>
          Диаметр
        </label>
        <select
          name="diameter"
          value={filters.diameter}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-1
            ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
        >
          <option value="">Любой</option>
          <option value="10">ф10</option>
          <option value="12">ф12</option>
          <option value="14">ф14</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${currentColors.primaryText}`}>
          Длина
        </label>
        <select
          name="length"
          value={filters.length}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-1
            ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
        >
          <option value="">Любая</option>
          <option value="6">6 м</option>
          <option value="11.7">11.7 м</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${currentColors.primaryText}`}>
          ГОСТ
        </label>
        <select
          name="gost"
          value={filters.gost}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-1
            ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
        >
          <option value="">Любой</option>
          <option value="5781-82">ГОСТ 5781-82</option>
          <option value="52544-06">ГОСТ 52544-06</option>
        </select>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${currentColors.primaryText}`}>
          Тип металла
        </label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={`w-full border rounded px-2 py-1
            ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`}
        >
          <option value="">Все</option>
          <option value="черный">Чёрный</option>
          <option value="цветной">Цветной</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;