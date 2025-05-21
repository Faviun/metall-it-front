import React, { createContext, useState, useContext } from "react";
import type { MetalProduct, Product } from "../features/auth/types/index";

export interface CartItem extends MetalProduct {
  quantity: number;
  availableSuppliers?: { name: string; price: number }[];
  selectedSupplierName?: string;
}

interface CartContextProps {
  items: CartItem[];
  addToCart: (product: MetalProduct | Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  selectSupplierForItem: (
    productId: number,
    supplierName: string | undefined
  ) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    const existingItem = items.find((item) => item.id === product.id);
    const quantityToAdd = (product as any).quantity || 1;
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        {
          ...product,
          quantity: quantityToAdd,
          availableSuppliers: product.suppliers,
          selectedSupplierName: undefined,
        },
      ]);
    }
  };

  const removeFromCart = (productId: number) => {
    setItems(items.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(
      items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const selectSupplierForItem = (
    productId: number,
    supplierName: string | undefined
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, selectedSupplierName: supplierName }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectSupplierForItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// import React, { createContext, useState, useContext } from 'react';
// import type { MetalProduct } from '../features/auth/types/index';

// export interface CartItem extends MetalProduct {
//   quantity: number;
//   availableSuppliers?: { name: string; price: number }[];
// }

// interface CartContextProps {
//   items: CartItem[];
//   addToCart: (product: MetalProduct) => void;
//   removeFromCart: (productId: number) => void;
//   updateQuantity: (productId: number, quantity: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = (product: MetalProduct) => {
//     const existingItem = items.find((item) => item.id === product.id);
//     if (existingItem) {
//       setItems(
//         items.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + ((product as any).quantity || 1) } : item
//         )
//       );
//     } else {
//       setItems([...items, { ...product, quantity: (product as any).quantity || 1, availableSuppliers: product.suppliers }]);
//     }
//   };

//   const removeFromCart = (productId: number) => {
//     setItems(items.filter((item) => item.id !== productId));
//   };

//   const updateQuantity = (productId: number, quantity: number) => {
//     setItems(
//       items.map((item) =>
//         item.id === productId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
