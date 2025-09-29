import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button, Checkbox } from "@material-tailwind/react";
import type { CartItem } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    selectSupplierForItem,
    placeOrder,
  } = useCart();

  const { theme } = useTheme();
  const currentColors = colors[theme];

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
    return 0;
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

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

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

  const getPriceBackgroundClass = (price: number, allPrices: number[]): string => {
    const uniqueSortedPrices = [...new Set(allPrices)].sort((a, b) => a - b);

    if (uniqueSortedPrices.length === 0) return '';
    if (uniqueSortedPrices.length === 1) return 'bg-gray-200';

    const minPrice = uniqueSortedPrices[0];
    const maxPrice = uniqueSortedPrices[uniqueSortedPrices.length - 1];

    if (minPrice === maxPrice) {
      return 'bg-gray-200';
    }

    const greenBg = 'bg-green-300 bg-opacity-40';
    const yellowBg = 'bg-yellow-300 bg-opacity-40';
    const orangeBg = 'bg-orange-300 bg-opacity-40';
    const redBg = 'bg-red-300 bg-opacity-40';

    if (uniqueSortedPrices.length === 2) {
      if (price === minPrice) return greenBg;
      if (price === maxPrice) return redBg;
    } else if (uniqueSortedPrices.length === 3) {
      if (price === minPrice) return greenBg;
      if (price === uniqueSortedPrices[1]) return yellowBg;
      if (price === maxPrice) return redBg;
    } else {
      const normalizedPrice = (price - minPrice) / (maxPrice - minPrice);

      const colors = [
        greenBg,
        'bg-lime-300 bg-opacity-40',
        yellowBg,
        orangeBg,
        redBg
      ];

      const colorIndex = Math.floor(normalizedPrice * (colors.length - 1));

      return colors[Math.min(colorIndex, colors.length - 1)];
    }

    return '';
  };

  if (items.length === 0) {
    return (
      <div className={`max-w-5xl mx-auto p-6 mt-16 ${currentColors.primaryText}`}>
        <h2 className="text-2xl font-semibold mb-4">Корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы увидеть их здесь.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 mt-16 text-black">
      <h2 className="h2-header">Корзина</h2>
      {/* <h2 className={`text-2xl font-semibold mb-4 ${currentColors.primaryText}`}>Корзина</h2> */}
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-300">
        <table className="w-full text-center">
          <thead className="text-xs uppercase bg-blue-gray-100">
            <tr>
              <th scope="col" className="py-2 px-4 border-b sticky left-0 z-10 bg-blue-gray-100 min-w-[250px]">
                Наименование товара
              </th>
              <th scope="col" className="py-2 px-4 border-b sticky left-[250px] z-10 bg-blue-gray-100 min-w-[150px]">
                Количество
              </th>
              {uniqueSuppliers.map((supplierName) => (
                <th key={supplierName} scope="col" className="py-2 px-4 border-b min-w-[150px]">
                  Цена {supplierName}
                </th>
              ))}
              <th scope="col" className="py-2 px-4 border-b min-w-[100px]">Итого</th>
              <th scope="col" className="py-2 px-4 border-b min-w-[100px]">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const allItemPrices = (item.availableSuppliers || []).map(s => s.price);

              return (
                <tr key={item.id} className="bg-white border-b">
                  <td className="py-2 px-4 border-b sticky left-0 z-10 bg-white">
                    {item.name}
                  </td>
                  <td className="py-2 px-4 border-b sticky left-[250px] z-10 bg-white">
                    <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-100 items-center h-10 w-32 mx-auto">
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
                    const priceBgClass = supplier ? getPriceBackgroundClass(supplier.price, allItemPrices) : '';

                    return (
                      <td
                        key={`${item.id}-${supplierName}`}
                        className={`py-2 px-4 border-b text-center ${priceBgClass}`}
                      >
                        {supplier ? (
                          <div className="flex items-center justify-center gap-2">
                            <span>{supplier.price}</span>
                            <Checkbox
                              checked={item.selectedSupplierName === supplierName}
                              onChange={() =>
                                handleSupplierSelection(item.id, supplierName)
                              }
                              ripple={false}
                              className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                              placeholder={undefined}
                              onResize={undefined}
                              onResizeCapture={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                              crossOrigin={undefined}
                            />
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                  <td className="py-2 px-4 border-b text-center font-bold">
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
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-blue-gray-100 font-bold text-black">
              <td className="py-2 px-4 sticky left-0 z-10 bg-blue-gray-100">Итоговая сумма:</td>
              <td className="py-2 px-4 sticky left-[250px] z-10 bg-blue-gray-100 text-center">
                {/* Новая ячейка для общей суммы по количеству */}
                {totalQuantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}
              </td>
              {uniqueSuppliers.map((supplierName) => (
                <td
                  key={`total-for-${supplierName}`}
                  className="py-2 px-4 text-center"
                >
                  {calculateSupplierTotal(supplierName).toFixed(2)}
                </td>
              ))}
              <td className="py-2 px-4 text-center">
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
                colSpan={3 + uniqueSuppliers.length}
                className="py-4 px-4 text-right"
              >
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white whitespace-nowrap"
                  disabled={!canProceedToCheckout}
                  onClick={placeOrder}
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