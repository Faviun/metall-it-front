import { useCart } from "@/context/CartContext";
import type { Order, OrderItem } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";
import React from "react";

const OrdersPage = () => {
  const { orders } = useCart();
  const { theme } = useTheme();
  const currentColors = colors[theme];

  if (orders.length === 0) {
    return (
      <div className={`max-w-5xl mx-auto p-4 mt-16 ${currentColors.primaryText}`}>
        <h2 className="text-xl font-semibold mb-3">Список заказов пуст</h2>
        <p className="text-sm">Оформите заказ в корзине, чтобы увидеть его здесь.</p>
      </div>
    );
  }

  return (
    <div className={`w-full px-4 md:px-6 lg:px-8 mt-16 ${currentColors.primaryText}`}>
      <h2 className="text-xl font-semibold mb-5">Мои заказы</h2>
      {orders.map((order: Order) => {
        const groupedItems = order.items.reduce((acc, item) => {
          if (!acc[item.supplierName]) {
            acc[item.supplierName] = [];
          }
          acc[item.supplierName].push(item);
          return acc;
        }, {} as Record<string, OrderItem[]>);

        return (
          <div key={order.id} className={`mb-6 p-4 border rounded-lg shadow-md ${currentColors.secondaryBackground} ${currentColors.bordersDividers} max-w-4xl mx-auto`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`text-lg font-semibold ${currentColors.primaryText}`}>Заказ № {order.id.split('-')[1]}</h3>
              <span className={`text-sm ${currentColors.secondaryText}`}>Дата: {order.date}</span>
            </div>
            <div className="overflow-x-auto">
              <table className={`min-w-full border rounded-lg overflow-hidden text-sm ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
                <thead className={`${currentColors.primaryBackground} ${currentColors.primaryText}`}>
                  <tr>
                    <th className="py-2 px-1 text-left">Наименование</th>
                    <th className="py-2 px-1 text-center">Кол-во</th>
                    <th className="py-2 px-1 text-left">Поставщик</th>
                    <th className="py-2 px-1 text-right">Цена</th>
                    <th className="py-2 px-1 text-right">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedItems).map(([supplierName, items]) => {
                    const supplierTotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
                    return (
                      <React.Fragment key={supplierName}>
                        {items.map((item: OrderItem) => (
                          <tr key={item.productId} className={`border-b ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
                            <td className="py-1 px-1 truncate">{item.productName}</td>
                            <td className="py-1 px-1 text-center whitespace-nowrap">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
                            <td className="py-1 px-1 truncate">{item.supplierName}</td>
                            <td className="py-1 px-1 text-right whitespace-nowrap">{item.supplierPrice.toFixed(2)}</td>
                            <td className="py-1 px-1 text-right whitespace-nowrap">{item.itemTotal.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className={`${currentColors.primaryBackground} font-semibold`}>
                          <td colSpan={4} className="py-2 px-1 text-right">Сумма по поставщику {supplierName}:</td>
                          <td className="py-2 px-1 text-right">{supplierTotal.toFixed(2)}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
                <tfoot className={`${currentColors.primaryAccent} font-bold`}>
                  <tr>
                    <td colSpan={4} className="py-1 px-1 text-right">Общая сумма заказа:</td>
                    <td className="py-1 px-1 text-right">{order.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;