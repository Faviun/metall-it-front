import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';
import { useCart } from '@/context/CartContext';
import type { ApiProduct } from '@/features/auth/types';

interface AddToCartModalProps {
  product: ApiProduct;
  onClose: () => void;
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ product, onClose }) => {
  const { theme } = useTheme();
  const c = colors[theme];
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1); // Количество в тоннах
  const [sum, setSum] = useState(product.price1 || 0);

  useEffect(() => {
    const newSum = (quantity * (product.price1 || 0));
    setSum(newSum);
  }, [quantity, product.price1]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      quantity: quantity,
      availableSuppliers: [{ name: product.provider.toUpperCase(), price: product.price1 ?? 0 }],
      selectedSupplierName: product.provider.toUpperCase(),
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div 
        className={`${c.secondaryBackground} p-6 rounded-lg shadow-xl w-full max-w-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h2 className={`text-xl font-bold ${c.primaryText}`}>{product.name}</h2>
            <p className={`text-sm ${c.secondaryText}`}>({product.location})</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex-shrink-0 p-1">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Поля ввода */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Количество, т</label>
            <input 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              className={`w-full p-2 rounded ${theme === 'light' ? 'bg-light-bg' : 'bg-dark-bg'} border ${c.bordersDividers} placeholder:text-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Количество, м</label>
            <input type="text" disabled className={`w-full p-2 rounded bg-gray-200 dark:bg-gray-600 border ${c.bordersDividers}`} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Цена, т</label>
            <input type="text" value={product.price1 || '—'} disabled className={`w-full p-2 rounded bg-gray-200 dark:bg-gray-600 border ${c.bordersDividers}`} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Сумма</label>
            <input type="text" value={sum.toFixed(2)} disabled className={`w-full p-2 rounded bg-gray-200 dark:bg-gray-600 border ${c.bordersDividers}`} />
          </div>
        </div>

        <div className="flex justify-end">
            <button 
              onClick={handleAddToCart}
              className="bg-accent hover:bg-accent-hover text-black font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Добавить в корзину
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;