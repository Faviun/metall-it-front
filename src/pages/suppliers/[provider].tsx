import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import $api from '@/api/axios';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';
import type { ApiProduct, ApiResponse } from '@/features/auth/types';
import AddToCartModal from '@/features/catalog/components/AddToCartModal';

const SupplierPage = () => {
const { provider } = useParams<{ provider: string }>();
const [products, setProducts] = useState<ApiProduct[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  
const [appliedFilters, setAppliedFilters] = useState({
  categories: [] as string[],
  sizes: [] as string[],
  marks: [] as string[],
  lengths: [] as string[],
  locations: [] as string[],
});
const [tempFilters, setTempFilters] = useState(appliedFilters);
const [openFilter, setOpenFilter] = useState<string | null>(null);
const [isFiltersVisible, setIsFiltersVisible] = useState(false);

const navigate = useNavigate();
const { theme } = useTheme();
const c = colors[theme];
const menuRef = useRef<HTMLDivElement>(null);

  // ... (useEffect для загрузки данных и закрытия меню) ...
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
        setTempFilters(appliedFilters);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, appliedFilters]);

  useEffect(() => {
    if (!provider) return;
    setLoading(true);
    setError(null);
    $api.get<ApiResponse>(`/parser-${provider}/data`)
      .then(response => {
        setProducts(response.data.filterProducts);
      })
      .catch(err => {
        console.error(`Ошибка при загрузке каталога '${provider}':`, err);
        setError("Не удалось загрузить данные поставщика. Попробуйте позже.");
      })
      .finally(() => setLoading(false));
  }, [provider]);

  const availableCategories = useMemo(() => [...new Set(products.map(p => p.category))].sort(), [products]);
  const availableSizes = useMemo(() => [...new Set(products.map(p => p.size).filter(Boolean) as string[])].sort((a, b) => parseFloat(a) - parseFloat(b)), [products]);
  const availableMarks = useMemo(() => [...new Set(products.map(p => p.mark).filter(Boolean) as string[])].sort(), [products]);
  const availableLengths = useMemo(() => [...new Set(products.map(p => p.length).filter(Boolean) as string[])].sort((a, b) => parseFloat(a) - parseFloat(b)), [products]);
  const availableLocations = useMemo(() => [...new Set(products.map(p => p.location).filter(Boolean) as string[])].sort(), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const { categories, sizes, marks, lengths, locations } = appliedFilters;
      const categoryMatch = categories.length === 0 || categories.includes(p.category);
      const sizeMatch = sizes.length === 0 || (p.size && sizes.includes(p.size));
      const markMatch = marks.length === 0 || (p.mark && marks.includes(p.mark));
      const lengthMatch = lengths.length === 0 || (p.length && lengths.includes(p.length));
      const locationMatch = locations.length === 0 || (p.location && locations.includes(p.location));
      return categoryMatch && sizeMatch && markMatch && lengthMatch && locationMatch;
    });
  }, [products, appliedFilters]);

  // --- ЛОГИКА ДЛЯ ФИЛЬТРОВ ---
  const handleTempFilterChange = (filterType: keyof typeof tempFilters, value: string) => {
    setTempFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const handleSelectAll = (filterType: keyof typeof tempFilters, options: string[]) => {
    setTempFilters(prev => {
        const currentValues = prev[filterType];
        // Если выбраны все, то снимаем выбор. Иначе - выбираем все.
        const allSelected = currentValues.length === options.length;
        return { ...prev, [filterType]: allSelected ? [] : options };
    });
  };

  const handleApplyFilter = (filterType: keyof typeof tempFilters) => {
    setAppliedFilters(prev => ({ ...prev, [filterType]: tempFilters[filterType] }));
    setOpenFilter(null);
  };
  
  const toggleFilter = (filterName: string) => {
    if (openFilter === filterName) {
      setOpenFilter(null);
      setTempFilters(appliedFilters);
    } else {
      setTempFilters(appliedFilters);
      setOpenFilter(filterName);
    }
  };

  const handleRemoveFilter = (filterType: keyof typeof appliedFilters, value: string) => {
    setAppliedFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].filter(v => v !== value)
    }));
  };

  const handleResetAllFilters = () => {
    const emptyFilters = { categories: [], sizes: [], marks: [], lengths: [], locations: [] };
    setAppliedFilters(emptyFilters);
    setTempFilters(emptyFilters);
  };

  const hasActiveFilters = Object.values(appliedFilters).some(arr => arr.length > 0);
  // --- КОНЕЦ ЛОГИКИ ---

  const renderFilterMenu = (
    title: string,
    filterKey: keyof typeof tempFilters,
    options: string[]
  ) => (
    <div className="relative" ref={openFilter === filterKey ? menuRef : null}>
      <button onClick={() => toggleFilter(filterKey)} className={`bg-transparent flex items-center gap-1 font-bold ${c.primaryText} hover:text-accent`}>
        {title} <i className="fas fa-chevron-down text-xs"></i>
      </button>
      {openFilter === filterKey && (
        <div className={`absolute top-full mt-2 w-56 p-2 rounded-md shadow-lg ${c.secondaryBackground} border ${c.bordersDividers} z-20`}>
          <ul className="max-h-60 overflow-y-auto">
            {/* --- "ВЫБРАТЬ ВСЕ" --- */}
            <li className={`hover:bg-light-border dark:hover:bg-dark-border rounded-md  ${c.bordersDividers}`}>
                <label className="flex items-center gap-2 p-2 cursor-pointer w-full">
                    <input type="checkbox"
                        checked={tempFilters[filterKey].length === options.length}
                        onChange={() => handleSelectAll(filterKey, options)}
                        className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-0 focus:ring-offset-0"
                    />
                    Все
                </label>
            </li>
            {options.map(option => (
              <li key={option} className={`hover:bg-light-border dark:hover:bg-dark-border rounded-md`}>
                <label className="flex items-center gap-2 p-2 cursor-pointer w-full">
                  <input type="checkbox"
                    checked={tempFilters[filterKey].includes(option)}
                    onChange={() => handleTempFilterChange(filterKey, option)}
                    className="h-5 w-5 rounded border-gray-300 text-accent focus:ring-0 focus:ring-offset-0"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={() => handleApplyFilter(filterKey)} className="w-full mt-2 bg-accent hover:bg-accent-hover text-black font-bold py-1 px-4 rounded text-sm">
            OK
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`container mx-auto p-4 ${c.primaryText}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-3xl font-bold border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Каталог поставщика: <span className="font-bold uppercase text-accent">{provider}</span>
        </h2>
        <a 
          href={`${import.meta.env.VITE_API_URL}/parser-${provider}/download`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover hover:text-black text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        >
          <i className="fas fa-download"></i> Скачать каталог
        </a>
      </div>
      
      {/* --- БЛОК ОТОБРАЖЕНИЯ ФИЛЬТРОВ --- */}
      {hasActiveFilters && (
        <div className={`mb-4 p-4 rounded-lg border ${c.bordersDividers}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">Применены фильтры:</span>
              <button 
                onClick={() => setIsFiltersVisible(!isFiltersVisible)} 
                className={`p-1 rounded-full hover:bg-gray-500/10 ${c.secondaryText}`}
              >
                {/* Иконка меняется в зависимости от состояния */}
                <i className={`fas ${isFiltersVisible ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
              </button>
            </div>
            <button onClick={handleResetAllFilters} className={`text-sm ${c.secondaryText} hover:text-red-500`}>
              Сбросить все
            </button>
          </div>
          
          {isFiltersVisible && (
            <ul className="list-disc list-inside space-y-2 mt-2">
              {Object.entries(appliedFilters)
                .filter(([_key, values]) => values.length > 0)
                .map(([key, values]) => {
                  
                  const filterTitles: { [key: string]: string } = {
                      categories: "Продукция",
                      sizes: "Размер",
                      marks: "Марка",
                      lengths: "Длина",
                      locations: "Регион",
                  };

                  return (
                    <li key={key}>
                      <span className="font-semibold">{filterTitles[key]}: </span>
                      {values.map(value => (
                          <div key={value} className={`${c.secondaryBackground} inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm ml-2 mb-1 `}>                          <span>{value}</span>
                          <button onClick={() => handleRemoveFilter(key as keyof typeof appliedFilters, value)} className={`p-0 w-6 h-6 flex items-center justify-center text-lg leading-none ${c.secondaryText} hover:text-red-500 hover:bg-red-500/10`}>&times;</button>
                        </div>
                      ))}
                    </li>
                  )
                })}
            </ul>
          )}
        </div>
      )}
      
      {!loading && !error && (
        <div className={`${c.secondaryBackground} ${c.bordersDividers} border rounded-lg`}>
          <table className="w-full text-left text-sm">
            <thead className={`border-b ${c.bordersDividers}`}>
              <tr className="font-bold">
                <th className="p-4">{renderFilterMenu("Продукция", "categories", availableCategories)}</th>
                <th className="p-4">{renderFilterMenu("Размер", "sizes", availableSizes)}</th>
                <th className="p-4">{renderFilterMenu("Марка", "marks", availableMarks)}</th>
                <th className="p-4">{renderFilterMenu("Длина", "lengths", availableLengths)}</th>
                <th className="p-4">{renderFilterMenu("Регион", "locations", availableLocations)}</th>
                <th className="p-4">Цена, руб от 1 до 5т</th>
                <th className="p-4">Цена, руб от 5 до 10т</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id} 
                  className={`border-b ${c.bordersDividers} hover:bg-light-border dark:hover:bg-dark-border cursor-pointer`}
                  onClick={() => navigate(`/products/${product.provider}/${product.id}`)}
                >
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.size}</td>
                  <td className="p-4">{product.mark}</td>
                  <td className="p-4">{product.length}</td>
                  <td className="p-4">{product.location}</td>
                  <td className="p-4 font-medium">{product.price1 ?? '—'}</td>
                  <td className="p-4 font-medium">{product.price2 ?? '—'}</td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-accent text-black p-2 rounded hover:bg-accent-hover font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedProduct && <AddToCartModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default SupplierPage;