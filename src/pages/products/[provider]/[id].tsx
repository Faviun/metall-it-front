import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import $api from '@/api/axios';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';
import type { ApiProduct, ApiResponse } from '@/features/auth/types';
import AddToCartModal from '@/features/catalog/components/AddToCartModal';

const ProductDetailPage = () => {
  const { provider, id } = useParams<{ provider: string; id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();
  const c = colors[theme];

  useEffect(() => {
    if (!id || !provider) return;

    setLoading(true);
    $api.get<ApiResponse>(`/parser-${provider}/data`)
      .then(response => {
        const foundProduct = response.data.filterProducts.find(p => p.id === parseInt(id));
        setProduct(foundProduct || null);
      })
      .catch(err => console.error("Ошибка при загрузке данных о товаре:", err))
      .finally(() => setLoading(false));

  }, [id, provider]);

  if (loading) return <div className="p-8">Загрузка данных о товаре...</div>;
  if (!product) return <div className="p-8">Товар не найден.</div>;

  return (
    <>
    <div className={`container mx-auto p-4 pt-24 ${c.primaryText}`}>
      <div className={`${c.secondaryBackground} ${c.bordersDividers} border p-8 rounded-lg`}>

        <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-4">{product.parserName || product.name}</h1>
            <Link to={`/suppliers/${provider}`} className={`text-sm ${c.secondaryText} hover:text-accent`}>
              &larr; Назад к каталогу
            </Link>
          </div>

        <img src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={product.name} className="w-full max-w-md mx-auto mb-8 rounded-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Характеристики:</h3>
            <ul className="space-y-2">
                <li><strong>Наличие:</strong> <span className={product.available ? 'text-green-500' : 'text-red-500'}>{product.available ? 'В наличии' : 'Нет в наличии'}</span></li>
                <li><strong>Категория:</strong> {product.category}</li>
                <li><strong>ГОСТ:</strong> {product.gost || 'Не указан'}</li>
                <li><strong>Длина:</strong> {product.length || 'Не указана'}</li>
                <li><strong>Размер:</strong> {product.size || 'Не указан'}</li>
                <li><strong>Марка:</strong> {product.mark || 'Не указана'}</li>
                <li><strong>Ширина:</strong> {product.width || 'Не указана'}</li>
                <li><strong>Вес:</strong> {product.weight || 'Не указан'}</li>
                <li><strong>Регион:</strong> {product.location}</li>
                <li><strong>Поставщик:</strong> <span className="uppercase">{product.provider}</span></li>
                <li><strong>Обновлено:</strong> {new Date(product.updatedAt).toLocaleDateString('ru-RU')}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Цены:</h3>
            <ul className="space-y-2">
                <li><strong>Цена (от 1 до 5т):</strong> {product.price1 ? `${product.price1} ₽` : '—'}</li>
                <li><strong>Цена (от 5 до 10т):</strong> {product.price2 ? `${product.price2} ₽` : '—'}</li>
            </ul>
            <h3 className="font-bold text-lg mt-4 mb-2">Описание:</h3>
            <p className={`${c.secondaryText}`}>{product.description}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-accent hover:bg-accent-hover text-black font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                В корзину
              </button>
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Перейти на сайт поставщика
              </a>
          </div>
        </div>
      </div>
      {/* --- И УСЛОВНЫЙ РЕНДЕР МОДАЛЬНОГО ОКНА --- */}
      {isModalOpen && (
        <AddToCartModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductDetailPage;