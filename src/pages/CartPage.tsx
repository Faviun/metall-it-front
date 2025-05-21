import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Button, Checkbox } from "@material-tailwind/react";
import type { CartItem } from "../context/CartContext";

const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectSupplierForItem,
  } = useCart();

  const [quantityInputs, setQuantityInputs] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const initialInputs: { [key: number]: string } = {};
    items.forEach((item) => {
      initialInputs[item.id] = item.quantity
        .toFixed(4)
        .replace(/\.?0+$/, "")
        .replace(/\./g, ",");
    });
    setQuantityInputs(initialInputs);
  }, [items]);

  const handleQuantityInputChange = (
    productId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;
    value = value.replace(/,/g, ".");

    if (value === "" || value === "." || value.endsWith(".")) {
      setQuantityInputs((prev) => ({ ...prev, [productId]: value }));
      return;
    }

    const isValid = /^\d*\.?\d{0,4}$/.test(value);

    if (isValid) {
      setQuantityInputs((prev) => ({ ...prev, [productId]: value }));
    }
  };

  const handleQuantityInputBlur = (productId: number) => {
    const rawValue = quantityInputs[productId];
    let finalValue = parseFloat(rawValue.replace(/,/g, "."));
    if (isNaN(finalValue) || finalValue <= 0) {
      finalValue = 0.0001;
    }
    finalValue = parseFloat(finalValue.toFixed(4));
    updateQuantity(productId, finalValue);
    setQuantityInputs((prev) => ({
      ...prev,
      [productId]: finalValue.toString().replace(/\./g, ","),
    }));
  };

  const handleIncrement = (productId: number) => {
    let currentQuantity = parseFloat(
      (quantityInputs[productId] || "0").replace(/,/g, ".")
    );
    if (isNaN(currentQuantity)) {
      currentQuantity = 0;
    }
    const newQuantity = parseFloat((currentQuantity + 1).toFixed(4));
    updateQuantity(productId, newQuantity);
    setQuantityInputs((prev) => ({
      ...prev,
      [productId]: newQuantity.toString().replace(/\./g, ","),
    }));
  };

  const handleDecrement = (productId: number) => {
    let currentQuantity = parseFloat(
      (quantityInputs[productId] || "0").replace(/,/g, ".")
    );
    if (isNaN(currentQuantity)) {
      currentQuantity = 0;
    }
    const newQuantity = parseFloat((currentQuantity - 1).toFixed(4));
    if (newQuantity >= 0.0001) {
      updateQuantity(productId, newQuantity);
      setQuantityInputs((prev) => ({
        ...prev,
        [productId]: newQuantity.toString().replace(/\./g, ","),
      }));
    } else {
      updateQuantity(productId, 0.0001);
      setQuantityInputs((prev) => ({ ...prev, [productId]: "0,0001" }));
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const handleSupplierSelection = (itemId: number, supplierName: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item && item.selectedSupplierName === supplierName) {
      selectSupplierForItem(itemId, undefined);
    } else {
      selectSupplierForItem(itemId, supplierName);
    }
  };

  const calculateItemTotal = (item: CartItem) => {
    const selectedSupplier = (item.availableSuppliers || []).find(
      (s) => s.name === item.selectedSupplierName
    );
    if (selectedSupplier) {
      return selectedSupplier.price * item.quantity;
    }
    return 0; // Если поставщик не выбран, сумма 0
  };

  const uniqueSuppliers = Array.from(
    new Set(
      items.flatMap((item) =>
        (item.availableSuppliers || []).map((s) => s.name)
      )
    )
  );

  const calculateSupplierTotal = (supplierName: string) => {
    return items.reduce((total, item) => {
      const supplier = (item.availableSuppliers || []).find(
        (s) => s.name === supplierName
      );
      // Учитываем только тех поставщиков, которые выбраны для товара
      if (supplier && item.selectedSupplierName === supplierName) {
        return total + supplier.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const grandTotal = items.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );

  // Проверяем, можно ли оформить заказ (все товары должны иметь выбранного поставщика)
  const canProceedToCheckout = items.every(
    (item) =>
      item.selectedSupplierName !== undefined &&
      item.selectedSupplierName !== null
  );

  const commonBtnClasses = `
    h-full w-10 p-0 flex items-center justify-center 
    bg-transparent text-black rounded-none shadow-none 
    focus:outline-none focus:ring-0 focus:border-transparent 
    active:border-transparent active:ring-0 active:outline-none
    hover:border-transparent
  `;
  const hoverBtnClasses = "hover:bg-gray-200";

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
        <h2 className="text-2xl font-semibold mb-4">Корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы увидеть их здесь.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
      <h2 className="text-2xl font-semibold mb-4">Корзина</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-gray-100">
              <th className="py-2 px-4 border-b">Наименование товара</th>
              <th className="py-2 px-4 border-b">Количество</th>
              {uniqueSuppliers.map((supplierName) => (
                <th key={supplierName} className="py-2 px-4 border-b">
                  Цена {supplierName}
                </th>
              ))}
              <th className="py-2 px-4 border-b">Итого</th>
              <th className="py-2 px-4 border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">
                  {/* Группировка кнопок и инпута количества */}
                  <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-100 items-center h-10 w-32 mx-auto">
                    {" "}
                    {/* mx-auto для центрирования */}
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => handleDecrement(item.id)}
                      className={`${commonBtnClasses} ${hoverBtnClasses}`}
                      placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      -
                    </Button>
                    <input
                      type="text"
                      value={quantityInputs[item.id] || ""}
                      onChange={(e) => handleQuantityInputChange(item.id, e)}
                      onBlur={() => handleQuantityInputBlur(item.id)}
                      className="w-full px-1 py-2 text-center bg-transparent text-black h-full focus:outline-none"
                    />
                    <Button
                      size="sm"
                      variant="text"
                      onClick={() => handleIncrement(item.id)}
                      className={`${commonBtnClasses} ${hoverBtnClasses}`}
                      placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      +
                    </Button>
                  </div>
                </td>
                {uniqueSuppliers.map((supplierName) => {
                  const supplier = (item.availableSuppliers || []).find(
                    (s) => s.name === supplierName
                  );
                  return (
                    <td
                      key={`${item.id}-${supplierName}`}
                      className="py-2 px-4 border-b text-center"
                    >
                      {supplier ? (
                        <div className="flex items-center justify-center gap-2">
                          <Checkbox
                            checked={item.selectedSupplierName === supplierName}
                            onChange={() =>
                              handleSupplierSelection(item.id, supplierName)
                            }
                            ripple={false}
                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                            onResize={undefined}
                            onResizeCapture={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                            crossOrigin={undefined}
                          />
                          <span>{supplier.price}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
                <td className="py-2 px-4 border-b text-center">
                  {calculateItemTotal(item).toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
                  <Button
                    size="sm"
                    className="bg-pink-300"
                    onClick={() => handleRemoveFromCart(item.id)}
                    placeholder={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-blue-gray-100">
              <td className="py-2 px-4 font-semibold">Итоговая сумма:</td>
              <td className="py-2 px-4"></td>
              {uniqueSuppliers.map((supplierName) => (
                <td
                  key={`total-for-${supplierName}`}
                  className="py-2 px-4 font-semibold text-center"
                >
                  {calculateSupplierTotal(supplierName).toFixed(2)}
                </td>
              ))}
              <td className="py-2 px-4 font-semibold text-center">
                {grandTotal.toFixed(2)}
              </td>
              <td className="py-2 px-4">
                <Button
                  size="sm"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
                  onClick={clearCart}
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Очистить корзину
                </Button>
              </td>
            </tr>
            <tr>
              <td
                colSpan={2 + uniqueSuppliers.length}
                className="py-4 px-4 text-right"
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white whitespace-nowrap"
                  disabled={!canProceedToCheckout}
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Оформить заказ
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CartPage;

// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { Button } from '@material-tailwind/react';
// import type { CartItem } from '../context/CartContext';

// const CartPage = () => {
//   const { items, removeFromCart, updateQuantity, clearCart } = useCart();

//   const handleRemoveFromCart = (productId: number) => {
//     removeFromCart(productId);
//   };

//   const handleQuantityChange = (productId: number, quantity: number) => {
//     if (quantity > 0) {
//       updateQuantity(productId, quantity);
//     }
//   };

//   const calculateItemTotal = (item: CartItem) => {
//     // Используем цену первого доступного поставщика для общей цены товара
//     if (item.availableSuppliers && item.availableSuppliers.length > 0) {
//       return item.availableSuppliers[0].price * item.quantity;
//     }
//     return 0;
//   };

//   // Получаем уникальные имена поставщиков из всех товаров в корзине
//   const uniqueSuppliers = Array.from(
//     new Set(
//       items.flatMap((item) => (item.availableSuppliers || []).map((s) => s.name))
//     )
//   );

//   // Вычисляем итоговую сумму для каждого поставщика
//   const calculateSupplierTotal = (supplierName: string) => {
//     return items.reduce((total, item) => {
//       const supplier = (item.availableSuppliers || []).find((s) => s.name === supplierName);
//       if (supplier) {
//         return total + supplier.price * item.quantity;
//       }
//       return total;
//     }, 0);
//   };

//   // Вычисляем общую итоговую сумму по всем товарам (используя calculateItemTotal)
//   const grandTotal = items.reduce((total, item) => total + calculateItemTotal(item), 0);

//   if (items.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
//         <h2 className="text-2xl font-semibold mb-4">Корзина пуста</h2>
//         <p>Добавьте товары в корзину, чтобы увидеть их здесь.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
//       <h2 className="text-2xl font-semibold mb-4">Корзина</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-300">
//           <thead>
//             <tr className="bg-blue-gray-100">
//               <th className="py-2 px-4 border-b">Наименование товара</th>
//               <th className="py-2 px-4 border-b">Количество</th>
//               {uniqueSuppliers.map((supplierName) => (
//                 <th key={supplierName} className="py-2 px-4 border-b">
//                   Цена {supplierName}
//                 </th>
//               ))}
//               <th className="py-2 px-4 border-b">Итого</th>
//               <th className="py-2 px-4 border-b">Действия</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item) => (
//               <tr key={item.id}>
//                 <td className="py-2 px-4 border-b">{item.name}</td>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
//                     className="w-20 border rounded p-1 text-center"
//                   />
//                 </td>
//                 {uniqueSuppliers.map((supplierName) => {
//                   const supplier = (item.availableSuppliers || []).find((s) => s.name === supplierName);
//                   return (
//                     <td key={`${item.id}-${supplierName}`} className="py-2 px-4 border-b text-center">
//                       {supplier ? `${supplier.price}` : '-'}
//                     </td>
//                   );
//                 })}
//                 <td className="py-2 px-4 border-b text-center">{calculateItemTotal(item)}</td>
//                 <td className="py-2 px-4 border-b">
//                   <Button size="sm" className="bg-pink-300" onClick={() => handleRemoveFromCart(item.id)}>
//                     Удалить
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr className="bg-blue-gray-100">
//               <td className="py-2 px-4 font-semibold">Итоговая сумма:</td>
//               <td className="py-2 px-4"></td> {/* Пустая ячейка под "Количество" */}
//               {uniqueSuppliers.map((supplierName) => (
//                 <td key={`total-for-${supplierName}`} className="py-2 px-4 font-semibold text-center">
//                   {calculateSupplierTotal(supplierName)}
//                 </td>
//               ))}
//               <td className="py-2 px-4 font-semibold text-center">
//                 {grandTotal}
//               </td>
//               <td className="py-2 px-4">
//                 <Button size="sm" className="bg-indigo-300" onClick={clearCart}>
//                   Очистить корзину
//                 </Button>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CartPage;
