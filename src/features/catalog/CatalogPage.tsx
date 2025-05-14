import React, { useState } from "react";
import ProductList from "./copmonents/ProductList";

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  diameter: string;
  length: string;
  grade: string;
  category: string;
  colorType: "черный" | "цветной";
}

// Пример товаров
const productsData: Product[] = [
  {
      id: 1,
      name: "Арматура ф12 А500С",
      price: 57000,
      inStock: true,
      diameter: "12 мм",
      length: "11.7 м",
      grade: "ГОСТ 5781-82",
      category: "Арматура",
      colorType: "черный"
  },
  {
      id: 2,
      name: "Труба 40x40x3",
      price: 62000,
      inStock: false,
      diameter: "40x40 мм",
      length: "6 м",
      grade: "ГОСТ 30245-2003",
      category: "Труба профильная",
      colorType: "черный"
  },
  {
      id: 3,
      name: "Круг 20 мм",
      price: 49000,
      inStock: true,
      diameter: "20 мм",
      length: "6 м",
      grade: "ГОСТ 2590-2006",
      category: "Круг",
      colorType: "черный"
  },
  {
      id: 4,
      name: "Арматура ф12 А500С",
      price: 57000,
      inStock: true,
      diameter: "12 мм",
      length: "11.7 м",
      grade: "ГОСТ 5781-82",
      category: "Арматура",
      colorType: "черный"
  },
{
    id: 5,
    name: "Труба 40x40x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный"
},
{
    id: 6,
    name: "Круг 20 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный"
},
{
    id: 7,
    name: "Арматура ф12 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный"
},
  {
      id: 8,
      name: "Труба 40x40x3",
      price: 62000,
      inStock: false,
      diameter: "40x40 мм",
      length: "6 м",
      grade: "ГОСТ 30245-2003",
      category: "Труба профильная",
      colorType: "черный"
  },
  {
      id: 9,
      name: "Круг 20 мм",
      price: 49000,
      inStock: true,
      diameter: "20 мм",
      length: "6 м",
      grade: "ГОСТ 2590-2006",
      category: "Круг",
      colorType: "черный"
  },
  {
      id: 10,
      name: "Арматура ф12 А500С",
      price: 57000,
      inStock: true,
      diameter: "12 мм",
      length: "11.7 м",
      grade: "ГОСТ 5781-82",
      category: "Арматура",
      colorType: "черный"
  },
{
    id: 11,
    name: "Труба 40x40x3",
    price: 62000,
    inStock: false,
    diameter: "40x40 мм",
    length: "6 м",
    grade: "ГОСТ 30245-2003",
    category: "Труба профильная",
    colorType: "черный"
},
{
    id: 12,
    name: "Круг 20 мм",
    price: 49000,
    inStock: true,
    diameter: "20 мм",
    length: "6 м",
    grade: "ГОСТ 2590-2006",
    category: "Круг",
    colorType: "черный"
},
];

const CatalogPage = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
      category: "",
      diameter: "",
      length: "",
      grade: "",
      colorType: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    };
  
    const filteredProducts = productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        return value === "" || (product as any)[key] === value;
      });
      return matchesSearch && matchesFilters;
    });
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-blue-gray-800">Каталог товаров</h1>
  
        {/* Поиск и фильтры */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded bg-gray-100 text-black"
          />
  
          <select name="category" onChange={handleChange} value={filters.category} className="p-2 rounded bg-gray-100 text-black">
            <option value="">Категория</option>
            <option value="Арматура">Арматура</option>
            <option value="Круг">Круг</option>
            <option value="Трубы">Труба профильная</option>
            <option value="Уголок">Уголок</option>
          </select>
  
          <select name="diameter" onChange={handleChange} value={filters.diameter} className="p-2 rounded bg-gray-100 text-black">
            <option value="">Диаметр</option>
            <option value="12">12</option>
            <option value="40">40</option>
            <option value="-">-</option>
          </select>
  
          <select name="length" onChange={handleChange} value={filters.length} className="p-2 rounded bg-gray-100 text-black">
            <option value="">Длина</option>
            <option value="2">11,7 м</option>
            <option value="6">6 м</option>
          </select>
  
          <select name="grade" onChange={handleChange} value={filters.grade} className="p-2 rounded bg-gray-100 text-black">
            <option value="">Марка</option>
            <option value="ГОСТ 5781-82">ГОСТ 5781-82</option>
            <option value="ГОСТ 30245-2003">ГОСТ 30245-2003</option>
            <option value="ГОСТ 1173-2006">ГОСТ 1173-2006</option>
          </select>
  
          <select name="colorType" onChange={handleChange} value={filters.colorType} className="p-2 rounded bg-gray-100 text-black">
            <option value="">Сплав</option>
            <option value="черный">Чёрный</option>
            <option value="цветной">Цветной</option>
          </select>
        </div>
  
        {/* Список товаров */}
        <ProductList products={filteredProducts} />
      </div>
    );
  };
  
  export default CatalogPage;