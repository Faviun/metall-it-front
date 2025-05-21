import React, { useState } from "react";
import ProductList from "./copmonents/ProductList";
import type { MetalProduct } from "../auth/types/index";
import Header from "../auth/components/Header";

const productsData: MetalProduct[] = [
  {
    id: 1,
    name: "Арматура ф10 А500С",
    price: 57000,
    inStock: true,
    diameter: "12 мм",
    length: "11.7 м",
    grade: "ГОСТ 5781-82",
    category: "Арматура",
    colorType: "черный",
    imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg",
    suppliers: [{ name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }],
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
    colorType: "черный",
    imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg",
    suppliers: [{ name: "Поставщик 3", price: 62000 }],
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
    colorType: "черный",
    imageUrl: "https://ustinovka46.ru/images/virtuemart/product/21e43265-2ca6-4c36-9936-30130c6535b5.jpg",
    suppliers: [{ name: "Поставщик 2", price: 49500 }, { name: "Поставщик 3", price: 49000 }],
  },
  { id: 4, name: "Арматура ф11 А500С", price: 57000, inStock: true, diameter: "12 мм", length: "11.7 м", grade: "ГОСТ 5781-82", category: "Арматура", colorType: "черный", imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg", suppliers: [{ name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }], },
  { id: 5, name: "Труба 50x50x3", price: 62000, inStock: false, diameter: "40x40 мм", length: "6 м", grade: "ГОСТ 30245-2003", category: "Труба профильная", colorType: "черный", imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg", suppliers: [{ name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }], },
  { id: 6, name: "Круг 30 мм", price: 49000, inStock: true, diameter: "20 мм", length: "6 м", grade: "ГОСТ 2590-2006", category: "Круг", colorType: "черный", imageUrl: "", suppliers: [{ name: "Поставщик 1", price: 60000 }, { name: "Поставщик 2", price: 60500 }], },
  { id: 7, name: "Арматура ф12 А500С", price: 57000, inStock: true, diameter: "12 мм", length: "11.7 м", grade: "ГОСТ 5781-82", category: "Арматура", colorType: "черный", imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg", suppliers: [{ name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }], },
  { id: 8, name: "Труба 60x50x3", price: 62000, inStock: false, diameter: "40x40 мм", length: "6 м", grade: "ГОСТ 30245-2003", category: "Труба профильная", colorType: "черный", imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg", suppliers: [{ name: "Поставщик 3", price: 62000 }], },
  { id: 9, name: "Круг 40 мм", price: 49000, inStock: true, diameter: "20 мм", length: "6 м", grade: "ГОСТ 2590-2006", category: "Круг", colorType: "черный", imageUrl: "", suppliers: [], },
  { id: 10, name: "Арматура ф12 А500С", price: 57000, inStock: true, diameter: "12 мм", length: "11.7 м", grade: "ГОСТ 5781-82", category: "Арматура", colorType: "черный", imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg", suppliers: [{ name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }], },
  { id: 11, name: "Труба 40x40x3", price: 62000, inStock: false, diameter: "40x40 мм", length: "6 м", grade: "ГОСТ 30245-2003", category: "Труба профильная", colorType: "черный", imageUrl: "https://evromet.md/xb/vv/uploads/2015/08/3-e1439969588667.jpg", suppliers: [{ name: "Поставщик 3", price: 62000 }], },
  { id: 12, name: "Круг 20 мм", price: 49000, inStock: true, diameter: "20 мм", length: "6 м", grade: "ГОСТ 2590-2006", category: "Круг", colorType: "черный", imageUrl: "", suppliers: [], },
];


interface Filters {
  category: string[];
  diameter: string[];
  length: string[];
  grade: string[];
  colorType: ("черный" | "цветной")[];
}

// Получаем уникальные значения для фильтров из данных о товарах
const uniqueCategories = [...new Set(productsData.map((p) => p.category))];
const uniqueDiameters = [...new Set(productsData.map((p) => p.diameter))];
const uniqueLengths = [...new Set(productsData.map((p) => p.length))];
const uniqueGrades = [...new Set(productsData.map((p) => p.grade))];
const uniqueColorTypes = [...new Set(productsData.map((p) => p.colorType))];

const CatalogPage = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: [],
    diameter: [],
    length: [],
    grade: [],
    colorType: [],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const currentValues = prevFilters[name as keyof Filters];
      if (checked) {
        return { ...prevFilters, [name]: [...currentValues, value] };
      } else {
        return { ...prevFilters, [name]: currentValues.filter((v) => v !== value) };
      }
    });
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilters = Object.entries(filters).every(([key, values]) => {
      if (values.length === 0) {
        return true;
      }
      return values.some((value: any) => (product as any)[key] === value);
    });
    return matchesSearch && matchesFilters;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white">
      <Header onSearchChange={handleSearchChange} searchValue={search} />
      <h1 className="text-3xl font-bold mb-6 text-blue-gray-600 mt-16">Каталог товаров</h1>

      <div className="flex">
      {/* Фильтры слева */}
         <div className="w-1/4 pr-8">
           <h2 className="text-xl font-semibold mb-4 text-blue-gray-600">Фильтры</h2>

           <div className="mb-4">
             <h3 className="font-semibold mb-2 text-blue-gray-400">Категория</h3>
             {uniqueCategories.map((category) => (
               <div key={category} className="flex items-center mb-1">
                 <input
                   type="checkbox"
                   name="category"
                   value={category}
                   checked={filters.category.includes(category)}
                   onChange={handleCheckboxChange}
                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                 />
                 <label className="text-blue-gray-300">{category}</label>
               </div>
             ))}
           </div>

           <div className="mb-4">
             <h3 className="font-semibold mb-2 text-blue-gray-400">Диаметр</h3>
             {uniqueDiameters.map((diameter) => (
               <div key={diameter} className="flex items-center mb-1">
                 <input
                   type="checkbox"
                   name="diameter"
                   value={diameter}
                  checked={filters.diameter.includes(diameter)}
                   onChange={handleCheckboxChange}
                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                 />
                 <label className="text-blue-gray-300">{diameter}</label>
               </div>
             ))}
           </div>

           <div className="mb-4">
             <h3 className="font-semibold mb-2 text-blue-gray-400">Длина</h3>
             {uniqueLengths.map((length) => (
               <div key={length} className="flex items-center mb-1">
                 <input
                   type="checkbox"
                   name="length"
                   value={length}
                   checked={filters.length.includes(length)}
                   onChange={handleCheckboxChange}
                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                 />
                 <label className="text-blue-gray-300">{length}</label>
               </div>
             ))}
           </div>

           <div className="mb-4">
             <h3 className="font-semibold mb-2 text-blue-gray-400">Марка</h3>
             {uniqueGrades.map((grade) => (
              <div key={grade} className="flex items-center mb-1">
                 <input
                   type="checkbox"
                   name="grade"
                   value={grade}
                   checked={filters.grade.includes(grade)}
                   onChange={handleCheckboxChange}
                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                 />
                 <label className="text-blue-gray-300">{grade}</label>
               </div>
             ))}
           </div>

           <div>
             <h3 className="font-semibold mb-2 text-blue-gray-400">Сплав</h3>
             {uniqueColorTypes.map((colorType) => (
               <div key={colorType} className="flex items-center mb-1">
                 <input
                   type="checkbox"
                   name="colorType"
                   value={colorType}
                   checked={filters.colorType.includes(colorType)}
                   onChange={handleCheckboxChange}
                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                 />
                 <label className="text-blue-gray-300">{colorType === "черный" ? "Чёрный" : "Цветной"}</label>
               </div>
             ))}
           </div>
         </div>
          

        {/* Список товаров справа */}
        <div className="w-3/4">
          <ProductList products={filteredProducts as any} /> {/* Приводим тип */}
        </div>
      </div>
    </div>
  );
};  

export default CatalogPage;


//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8 text-white">
//       {/* Передаем search и handleSearchChange в Header */}
//       <Header onSearchChange={handleSearchChange} searchValue={search} />
//       <h1 className="text-3xl font-bold mb-6 text-blue-gray-600 mt-16">Каталог товаров</h1>

//       <div className="flex">
        // {/* Фильтры слева */}
        // <div className="w-1/4 pr-8">
        //   <h2 className="text-xl font-semibold mb-4 text-blue-gray-600">Фильтры</h2>

        //   <div className="mb-4">
        //     <h3 className="font-semibold mb-2 text-blue-gray-400">Категория</h3>
        //     {uniqueCategories.map((category) => (
        //       <div key={category} className="flex items-center mb-1">
        //         <input
        //           type="checkbox"
        //           name="category"
        //           value={category}
        //           checked={filters.category.includes(category)}
        //           onChange={handleCheckboxChange}
        //           className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
        //         />
        //         <label className="text-blue-gray-300">{category}</label>
        //       </div>
        //     ))}
        //   </div>

//           <div className="mb-4">
//             <h3 className="font-semibold mb-2 text-blue-gray-400">Диаметр</h3>
//             {uniqueDiameters.map((diameter) => (
//               <div key={diameter} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   name="diameter"
//                   value={diameter}
//                   checked={filters.diameter.includes(diameter)}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label className="text-blue-gray-300">{diameter}</label>
//               </div>
//             ))}
//           </div>

//           <div className="mb-4">
//             <h3 className="font-semibold mb-2 text-blue-gray-400">Длина</h3>
//             {uniqueLengths.map((length) => (
//               <div key={length} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   name="length"
//                   value={length}
//                   checked={filters.length.includes(length)}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label className="text-blue-gray-300">{length}</label>
//               </div>
//             ))}
//           </div>

//           <div className="mb-4">
//             <h3 className="font-semibold mb-2 text-blue-gray-400">Марка</h3>
//             {uniqueGrades.map((grade) => (
//               <div key={grade} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   name="grade"
//                   value={grade}
//                   checked={filters.grade.includes(grade)}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label className="text-blue-gray-300">{grade}</label>
//               </div>
//             ))}
//           </div>

//           <div>
//             <h3 className="font-semibold mb-2 text-blue-gray-400">Сплав</h3>
//             {uniqueColorTypes.map((colorType) => (
//               <div key={colorType} className="flex items-center mb-1">
//                 <input
//                   type="checkbox"
//                   name="colorType"
//                   value={colorType}
//                   checked={filters.colorType.includes(colorType)}
//                   onChange={handleCheckboxChange}
//                   className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label className="text-blue-gray-300">{colorType === "черный" ? "Чёрный" : "Цветной"}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Список товаров справа */}
//         <div className="w-3/4">
//           <ProductList products={filteredProducts} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CatalogPage;


// import React, { useState } from "react";
// import ProductList from "./copmonents/ProductList";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   inStock: boolean;
//   diameter: string;
//   length: string;
//   grade: string;
//   category: string;
//   colorType: "черный" | "цветной";
// }

// // Пример товаров
// const productsData: Product[] = [
//   {
//       id: 1,
//       name: "Арматура ф12 А500С",
//       price: 57000,
//       inStock: true,
//       diameter: "12 мм",
//       length: "11.7 м",
//       grade: "ГОСТ 5781-82",
//       category: "Арматура",
//       colorType: "черный"
//   },
//   {
//       id: 2,
//       name: "Труба 40x40x3",
//       price: 62000,
//       inStock: false,
//       diameter: "40x40 мм",
//       length: "6 м",
//       grade: "ГОСТ 30245-2003",
//       category: "Труба профильная",
//       colorType: "черный"
//   },
//   {
//       id: 3,
//       name: "Круг 20 мм",
//       price: 49000,
//       inStock: true,
//       diameter: "20 мм",
//       length: "6 м",
//       grade: "ГОСТ 2590-2006",
//       category: "Круг",
//       colorType: "черный"
//   },
//   {
//       id: 4,
//       name: "Арматура ф12 А500С",
//       price: 57000,
//       inStock: true,
//       diameter: "12 мм",
//       length: "11.7 м",
//       grade: "ГОСТ 5781-82",
//       category: "Арматура",
//       colorType: "черный"
//   },
// {
//     id: 5,
//     name: "Труба 40x40x3",
//     price: 62000,
//     inStock: false,
//     diameter: "40x40 мм",
//     length: "6 м",
//     grade: "ГОСТ 30245-2003",
//     category: "Труба профильная",
//     colorType: "черный"
// },
// {
//     id: 6,
//     name: "Круг 20 мм",
//     price: 49000,
//     inStock: true,
//     diameter: "20 мм",
//     length: "6 м",
//     grade: "ГОСТ 2590-2006",
//     category: "Круг",
//     colorType: "черный"
// },
// {
//     id: 7,
//     name: "Арматура ф12 А500С",
//     price: 57000,
//     inStock: true,
//     diameter: "12 мм",
//     length: "11.7 м",
//     grade: "ГОСТ 5781-82",
//     category: "Арматура",
//     colorType: "черный"
// },
//   {
//       id: 8,
//       name: "Труба 40x40x3",
//       price: 62000,
//       inStock: false,
//       diameter: "40x40 мм",
//       length: "6 м",
//       grade: "ГОСТ 30245-2003",
//       category: "Труба профильная",
//       colorType: "черный"
//   },
//   {
//       id: 9,
//       name: "Круг 20 мм",
//       price: 49000,
//       inStock: true,
//       diameter: "20 мм",
//       length: "6 м",
//       grade: "ГОСТ 2590-2006",
//       category: "Круг",
//       colorType: "черный"
//   },
//   {
//       id: 10,
//       name: "Арматура ф12 А500С",
//       price: 57000,
//       inStock: true,
//       diameter: "12 мм",
//       length: "11.7 м",
//       grade: "ГОСТ 5781-82",
//       category: "Арматура",
//       colorType: "черный"
//   },
// {
//     id: 11,
//     name: "Труба 40x40x3",
//     price: 62000,
//     inStock: false,
//     diameter: "40x40 мм",
//     length: "6 м",
//     grade: "ГОСТ 30245-2003",
//     category: "Труба профильная",
//     colorType: "черный"
// },
// {
//     id: 12,
//     name: "Круг 20 мм",
//     price: 49000,
//     inStock: true,
//     diameter: "20 мм",
//     length: "6 м",
//     grade: "ГОСТ 2590-2006",
//     category: "Круг",
//     colorType: "черный"
// },
// ];

// const CatalogPage = () => {
//     const [search, setSearch] = useState("");
//     const [filters, setFilters] = useState({
//       category: "",
//       diameter: "",
//       length: "",
//       grade: "",
//       colorType: "",
//     });
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       setFilters({ ...filters, [e.target.name]: e.target.value });
//     };
  
//     const filteredProducts = productsData.filter((product) => {
//       const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
//       const matchesFilters = Object.entries(filters).every(([key, value]) => {
//         return value === "" || (product as any)[key] === value;
//       });
//       return matchesSearch && matchesFilters;
//     });
  
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-white">
//         <h1 className="text-3xl font-bold mb-6 text-blue-gray-800">Каталог товаров</h1>
  
//         {/* Поиск и фильтры */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//           <input
//             type="text"
//             placeholder="Поиск по названию..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-2 rounded bg-gray-100 text-black"
//           />
  
//           <select name="category" onChange={handleChange} value={filters.category} className="p-2 rounded bg-gray-100 text-black">
//             <option value="">Категория</option>
//             <option value="Арматура">Арматура</option>
//             <option value="Круг">Круг</option>
//             <option value="Трубы">Труба профильная</option>
//             <option value="Уголок">Уголок</option>
//           </select>
  
//           <select name="diameter" onChange={handleChange} value={filters.diameter} className="p-2 rounded bg-gray-100 text-black">
//             <option value="">Диаметр</option>
//             <option value="12">12</option>
//             <option value="40">40</option>
//             <option value="-">-</option>
//           </select>
  
//           <select name="length" onChange={handleChange} value={filters.length} className="p-2 rounded bg-gray-100 text-black">
//             <option value="">Длина</option>
//             <option value="2">11,7 м</option>
//             <option value="6">6 м</option>
//           </select>
  
//           <select name="grade" onChange={handleChange} value={filters.grade} className="p-2 rounded bg-gray-100 text-black">
//             <option value="">Марка</option>
//             <option value="ГОСТ 5781-82">ГОСТ 5781-82</option>
//             <option value="ГОСТ 30245-2003">ГОСТ 30245-2003</option>
//             <option value="ГОСТ 1173-2006">ГОСТ 1173-2006</option>
//           </select>
  
//           <select name="colorType" onChange={handleChange} value={filters.colorType} className="p-2 rounded bg-gray-100 text-black">
//             <option value="">Сплав</option>
//             <option value="черный">Чёрный</option>
//             <option value="цветной">Цветной</option>
//           </select>
//         </div>
  
//         {/* Список товаров */}
//         <ProductList products={filteredProducts} />
//       </div>
//     );
//   };
  
//   export default CatalogPage;