import { useCart } from "../context/CartContext";
import type { Order, OrderItem } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { colors } from "../constants/themeColors";
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
                        {/* Сумма по поставщику после товаров, с желтой заливкой текста */}
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

// import { useCart } from "../context/CartContext";
// import type { Order, OrderItem } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { colors } from "../constants/themeColors";
// import React from "react";

// const OrdersPage = () => {
//   const { orders } = useCart();
//   const { theme } = useTheme();
//   const currentColors = colors[theme];

//   if (orders.length === 0) {
//     return (
//       <div className={`max-w-5xl mx-auto p-4 mt-16 ${currentColors.primaryText}`}>
//         <h2 className="text-xl font-semibold mb-3">Список заказов пуст</h2>
//         <p className="text-sm">Оформите заказ в корзине, чтобы увидеть его здесь.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full px-4 md:px-6 lg:px-8 mt-16 ${currentColors.primaryText}`}>
//       <h2 className="text-xl font-semibold mb-5">Мои заказы</h2>
//       {orders.map((order: Order) => {
//         // Группировка позиций по поставщику
//         const groupedItems = order.items.reduce((acc, item) => {
//           if (!acc[item.supplierName]) {
//             acc[item.supplierName] = [];
//           }
//           acc[item.supplierName].push(item);
//           return acc;
//         }, {} as Record<string, OrderItem[]>);

//         return (
//           <div key={order.id} className={`mb-6 p-4 border rounded-lg shadow-md ${currentColors.secondaryBackground} ${currentColors.bordersDividers} max-w-4xl mx-auto`}>
//             <div className="flex justify-between items-center mb-3">
//               <h3 className={`text-lg font-semibold ${currentColors.primaryText}`}>Заказ № {order.id.split('-')[1]}</h3>
//               <span className={`text-sm ${currentColors.secondaryText}`}>Дата: {order.date}</span>
//             </div>
//             <div className="overflow-x-auto">
//               <table className={`min-w-full border rounded-lg overflow-hidden text-sm ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//                 <thead className={`${currentColors.secondaryBackground} ${currentColors.primaryText}`}>
//                   <tr>
//                     <th className="py-2 px-1 text-left">Наименование</th>
//                     <th className="py-2 px-1 text-center">Кол-во</th>
//                     <th className="py-2 px-1 text-left">Поставщик</th>
//                     <th className="py-2 px-1 text-right">Цена</th>
//                     <th className="py-2 px-1 text-right">Сумма</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.entries(groupedItems).map(([supplierName, items]) => {
//                     const supplierTotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
//                     return (
//                       <React.Fragment key={supplierName}>
//                         <tr className={`${currentColors.groupHeaderBackground} font-semibold`}>
//                           <td colSpan={4} className="py-2 px-1 text-right">Сумма по поставщику {supplierName}:</td>
//                           <td className="py-2 px-1 text-right">{supplierTotal.toFixed(2)}</td>
//                         </tr>
//                         {items.map((item: OrderItem) => (
//                           <tr key={item.productId} className={`border-b ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//                             <td className="py-1 px-1 truncate">{item.productName}</td>
//                             <td className="py-1 px-1 text-center whitespace-nowrap">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
//                             <td className="py-1 px-1 truncate">{item.supplierName}</td>
//                             <td className="py-1 px-1 text-right whitespace-nowrap">{item.supplierPrice.toFixed(2)}</td>
//                             <td className="py-1 px-1 text-right whitespace-nowrap">{item.itemTotal.toFixed(2)}</td>
//                           </tr>
//                         ))}
//                       </React.Fragment>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot className={`${currentColors.primaryAccent} font-bold`}>
//                   <tr>
//                     <td colSpan={4} className="py-1 px-1 text-right">Общая сумма заказа:</td>
//                     <td className="py-1 px-1 text-right">{order.totalAmount.toFixed(2)}</td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default OrdersPage;

//******************************************************************************* */

// import { useCart } from "../context/CartContext";
// import type { Order, OrderItem } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { colors } from "../constants/themeColors";

//   const OrdersPage = () => {
//   const { orders } = useCart();
//   const { theme } = useTheme();
//   const currentColors = colors[theme];

//   if (orders.length === 0) {
//     return (
//       <div className={`max-w-5xl mx-auto p-4 mt-16 ${currentColors.primaryText}`}>
//         <h2 className="text-xl font-semibold mb-3">Список заказов пуст</h2>
//         <p className="text-sm">Оформите заказ в корзине, чтобы увидеть его здесь.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full px-4 md:px-6 lg:px-8 mt-16 ${currentColors.primaryText}`}>
//       <h2 className="text-xl font-semibold mb-5">Мои заказы</h2>
//       {orders.map((order: Order) => (
//         // Ограничиваем ширину контейнера для каждого заказа
//         <div key={order.id} className={`mb-6 p-4 border rounded-lg shadow-md ${currentColors.secondaryBackground} ${currentColors.bordersDividers} max-w-4xl mx-auto`}>
//           <div className="flex justify-between items-center mb-3">
//             <h3 className={`text-lg font-semibold ${currentColors.primaryText}`}>Заказ № {order.id.split('-')[1]}</h3>
//             <span className={`text-sm ${currentColors.secondaryText}`}>Дата: {order.date}</span>
//           </div>
//           <div className="overflow-x-auto">
//             {/* Таблица будет подгоняться по содержимому в рамках ограниченного родителя */}
//             <table className={`min-w-full border rounded-lg overflow-hidden text-sm ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//               <thead className={`${currentColors.secondaryBackground} ${currentColors.primaryText}`}>
//                 <tr>
//                   <th className="py-2 px-1 text-left">Наименование</th>
//                   <th className="py-2 px-1 text-center">Кол-во</th>
//                   <th className="py-2 px-1 text-left">Поставщик</th>
//                   <th className="py-2 px-1 text-right">Цена</th>
//                   <th className="py-2 px-1 text-right">Сумма</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items.map((item: OrderItem) => (
//                   <tr key={item.productId} className={`border-b ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//                     <td className="py-1 px-1 truncate">{item.productName}</td>
//                     <td className="py-1 px-1 text-center whitespace-nowrap">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
//                     <td className="py-1 px-1 truncate">{item.supplierName}</td>
//                     <td className="py-1 px-1 text-right whitespace-nowrap">{item.supplierPrice.toFixed(2)}</td>
//                     <td className="py-1 px-1 text-right whitespace-nowrap">{item.itemTotal.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className={`${currentColors.primaryAccent} font-bold`}>
//                 <tr>
//                   <td colSpan={4} className="py-1 px-1 text-right">Общая сумма:</td>
//                   <td className="py-1 px-1 text-right">{order.totalAmount.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;


//********************************************************************************* */


// import { useCart } from "../context/CartContext";
// import type { Order, OrderItem } from "../context/CartContext";
// import { useTheme } from "../context/ThemeContext";
// import { colors } from "../constants/themeColors";

// const OrdersPage = () => {
//   const { orders } = useCart();
//   const { theme } = useTheme();
//   const currentColors = colors[theme];

//   if (orders.length === 0) {
//     return (
//       <div className={`max-w-5xl mx-auto p-6 mt-16 ${currentColors.primaryText}`}>
//         <h2 className="text-2xl font-semibold mb-4">Список заказов пуст</h2>
//         <p>Оформите заказ в корзине, чтобы увидеть его здесь.</p>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full px-4 md:px-6 lg:px-8 mt-16 ${currentColors.primaryText}`}>
//       <h2 className="text-2xl font-semibold mb-6">Мои заказы</h2>
//       {orders.map((order: Order) => (
//         <div key={order.id} className={`mb-8 p-6 border rounded-lg shadow-md ${currentColors.secondaryBackground} ${currentColors.bordersDividers}`}>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className={`text-xl font-semibold ${currentColors.primaryText}`}>Заказ № {order.id.split('-')[1]}</h3>
//             <span className={`${currentColors.secondaryText}`}>Дата: {order.date}</span>
//           </div>
//           <div className="overflow-x-auto">
//             <table className={`min-w-full border rounded-lg overflow-hidden ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//               <thead className={`${currentColors.headerBackground} ${currentColors.primaryText}`}>
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">Наименование</th>
//                   <th className="py-2 px-4 border-b text-center">Количество</th>
//                   <th className="py-2 px-4 border-b text-left">Поставщик</th>
//                   <th className="py-2 px-4 border-b text-right">Цена поставщика</th>
//                   <th className="py-2 px-4 border-b text-right">Сумма по позиции</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items.map((item: OrderItem) => (
//                   <tr key={item.productId} className={`border-b ${currentColors.bordersDividers} ${currentColors.primaryText}`}>
//                     <td className="py-2 px-4">{item.productName}</td>
//                     <td className="py-2 px-4 text-center">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
//                     <td className="py-2 px-4">{item.supplierName}</td>
//                     <td className="py-2 px-4 text-right">{item.supplierPrice.toFixed(2)}</td>
//                     <td className="py-2 px-4 text-right">{item.itemTotal.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot className={`${currentColors.primaryAccent} font-bold`}>
//                 <tr>
//                   <td colSpan={4} className="py-2 px-4 text-right">Общая сумма заказа:</td>
//                   <td className="py-2 px-4 text-right">{order.totalAmount.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;

//*********************************************************************************** */

// import { useCart } from "../context/CartContext"; 
// import type { Order, OrderItem } from "../context/CartContext";

// const OrdersPage = () => {
//   const { orders } = useCart();

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-5xl mx-auto p-6 mt-16 text-black">
//         <h2 className="text-2xl font-semibold mb-4">Список заказов пуст</h2>
//         <p>Оформите заказ в корзине, чтобы увидеть его здесь.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-4 md:px-6 lg:px-8 mt-16 text-black">
//       <h2 className="text-2xl font-semibold mb-6">Мои заказы</h2>
//       {orders.map((order: Order) => (
//         <div key={order.id} className="mb-8 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Заказ № {order.id.split('-')[1]}</h3>
//             <span className="text-gray-600">Дата: {order.date}</span>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-black">
//               <thead className="bg-blue-gray-50">
//                 <tr>
//                   <th className="py-2 px-4 border-b text-left">Наименование</th>
//                   <th className="py-2 px-4 border-b text-center">Количество</th>
//                   <th className="py-2 px-4 border-b text-left">Поставщик</th>
//                   <th className="py-2 px-4 border-b text-right">Цена поставщика</th>
//                   <th className="py-2 px-4 border-b text-right">Сумма по позиции</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {order.items.map((item: OrderItem) => (
//                   <tr key={item.productId} className="border-b border-gray-200">
//                     <td className="py-2 px-4">{item.productName}</td>
//                     <td className="py-2 px-4 text-center">{item.quantity.toFixed(4).replace(/\.?0+$/, "").replace(/\./g, ",")}</td>
//                     <td className="py-2 px-4">{item.supplierName}</td>
//                     <td className="py-2 px-4 text-right">{item.supplierPrice.toFixed(2)}</td>
//                     <td className="py-2 px-4 text-right">{item.itemTotal.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//               <tfoot>
//                 <tr className="bg-blue-gray-100 font-bold">
//                   <td colSpan={4} className="py-2 px-4 text-right">Общая сумма заказа:</td>
//                   <td className="py-2 px-4 text-right">{order.totalAmount.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;