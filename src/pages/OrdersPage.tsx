import { useCart } from "../context/CartContext"; 
import type { Order, OrderItem } from "../context/CartContext";

const OrdersPage = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
        <h2 className="text-2xl font-semibold mb-4">Список заказов пуст</h2>
        <p>Оформите заказ в корзине, чтобы увидеть его здесь.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 mt-16 text-black">
      <h2 className="text-2xl font-semibold mb-6">Мои заказы</h2>
      {orders.map((order: Order) => (
        <div key={order.id} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Заказ № {order.id.split('-')[1]}</h3>
            <span className="text-gray-600">Дата: {order.date}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-black">
              <thead className="bg-blue-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Наименование</th>
                  <th className="py-2 px-4 border-b text-center">Количество</th>
                  <th className="py-2 px-4 border-b text-left">Поставщик</th>
                  <th className="py-2 px-4 border-b text-right">Цена поставщика</th>
                  <th className="py-2 px-4 border-b text-right">Сумма по позиции</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: OrderItem) => (
                  <tr key={item.productId} className="border-b border-gray-200">
                    <td className="py-2 px-4">{item.productName}</td>
                    <td className="py-2 px-4 text-center">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
                    <td className="py-2 px-4">{item.supplierName}</td>
                    <td className="py-2 px-4 text-right">{item.supplierPrice.toFixed(2)}</td>
                    <td className="py-2 px-4 text-right">{item.itemTotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-gray-100 font-bold">
                  <td colSpan={4} className="py-2 px-4 text-right">Общая сумма заказа:</td>
                  <td className="py-2 px-4 text-right">{order.totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;