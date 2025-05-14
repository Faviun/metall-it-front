import React, { useState } from "react";

const ProductFilters = () => {
  const [filters, setFilters] = useState({
    category: "",
    diameter: "",
    length: "",
    gost: "",
    type: "", // цветной / черный
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Фильтры</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Категория</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Все</option>
          <option value="арматура">Арматура</option>
          <option value="труба">Труба</option>
          <option value="профиль">Профиль</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Диаметр</label>
        <select
          name="diameter"
          value={filters.diameter}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Любой</option>
          <option value="10">ф10</option>
          <option value="12">ф12</option>
          <option value="14">ф14</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Длина</label>
        <select
          name="length"
          value={filters.length}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Любая</option>
          <option value="6">6 м</option>
          <option value="11.7">11.7 м</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ГОСТ</label>
        <select
          name="gost"
          value={filters.gost}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Любой</option>
          <option value="5781-82">ГОСТ 5781-82</option>
          <option value="52544-06">ГОСТ 52544-06</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Тип металла</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
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
