import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";
import { useCart } from "../../../context/CartContext";
import type { Product } from "../../auth/types";
import { useTheme } from "../../../context/ThemeContext"; // Импорт useTheme
import { colors } from "../../../constants/themeColors"; // Импорт colors

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantityInput, setQuantityInput] = useState<string>("1");

  const { theme } = useTheme(); // Получаем текущую тему
  const currentColors = colors[theme]; // Получаем цвета для текущей темы

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/,/g, ".");

    if (value === "" || value === "." || value.endsWith(".")) {
      setQuantityInput(value);
      return;
    }

    const isValid = /^\d*\.?\d{0,4}$/.test(value);

    if (isValid) {
      setQuantityInput(value);
    }
  };

  const handleIncrement = () => {
    let currentQuantity = parseFloat(quantityInput.replace(/,/g, "."));
    if (isNaN(currentQuantity)) {
      currentQuantity = 0;
    }
    const newQuantity = parseFloat((currentQuantity + 1).toFixed(4));
    setQuantityInput(newQuantity.toString().replace(/\./g, ","));
  };

  const handleDecrement = () => {
    let currentQuantity = parseFloat(quantityInput.replace(/,/g, "."));
    if (isNaN(currentQuantity)) {
      currentQuantity = 1;
    }
    const newQuantity = parseFloat((currentQuantity - 1).toFixed(4));
    if (newQuantity >= 0.0001) {
      setQuantityInput(newQuantity.toString().replace(/\./g, ","));
    } else {
      setQuantityInput("1");
    }
  };

  const handleAddToCart = () => {
    const parsedQuantity = parseFloat(quantityInput.replace(/,/g, "."));
    const quantityToAdd =
      !isNaN(parsedQuantity) && parsedQuantity > 0
        ? parseFloat(parsedQuantity.toFixed(4))
        : 1;

    addToCart({
      id: product.id,
      name: product.name,
      quantity: quantityToAdd,
      availableSuppliers: product.suppliers,
      selectedSupplierName:
        product.suppliers && product.suppliers.length > 0
          ? product.suppliers[0].name
          : undefined,
    });
    setQuantityInput("1");
  };

  // commonPlaceholderProps не нужны, так как мы используем обычные HTML-элементы
  // А для Material-Tailwind Button - будем передавать явно placeholder={undefined} и т.д.

  // Обновленные классы для кнопок, использующие ваши динамические цвета
  const commonBtnClasses: ButtonProps["className"] = `
    h-full w-10 p-0 flex items-center justify-center
    bg-transparent rounded-none shadow-none
    focus:outline-none focus:ring-0 focus:border-transparent
    active:border-transparent active:ring-0 active:outline-none
    hover:border-transparent
    ${currentColors.primaryText} // Используем primaryText для цвета текста/иконок кнопок +/-
  `;
  // const hoverBtnClasses: ButtonProps["className"] = `hover:bg-opacity-10`; // Используем прозрачность для эффекта наведения
  const hoverBtnClasses: ButtonProps["className"] = `hover:opacity-10 ${currentColors.primaryAccent}`;

  return (
    <div className={`border rounded-lg shadow-md p-4 flex flex-col md:flex-row mb-4
      ${currentColors.secondaryBackground} ${currentColors.bordersDividers} ${currentColors.primaryText}`} // Фон, граница и основной текст карточки
    >
      <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
        <img
          src={product.imageUrl || "https://via.placeholder.com/200x150?text=No+Image"} // Добавлено fallback изображение
          alt={product.name}
          className="w-full h-auto rounded-md"
        />
      </div>

      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <h2 className={`text-lg font-bold mb-2 ${currentColors.primaryText}`}>
          {product.name}
        </h2>
        {product.diameter && (
          <p className={`text-sm mb-1 ${currentColors.secondaryText}`}>
            <span className={`${currentColors.primaryText}`}>Диаметр:</span> {product.diameter}
          </p>
        )}
        {product.length && (
          <p className={`text-sm mb-1 ${currentColors.secondaryText}`}>
            <span className={`${currentColors.primaryText}`}>Длина:</span> {product.length}
          </p>
        )}
        {product.grade && (
          <p className={`text-sm mb-1 ${currentColors.secondaryText}`}>
            <span className={`${currentColors.primaryText}`}>ГОСТ:</span> {product.grade}
          </p>
        )}
        {product.category && (
          <p className={`text-sm mb-1 ${currentColors.secondaryText}`}>
            <span className={`${currentColors.primaryText}`}>Категория:</span> {product.category}
          </p>
        )}
        {product.colorType && (
          <p className={`text-sm mb-1 ${currentColors.secondaryText}`}>
            <span className={`${currentColors.primaryText}`}>Сплав:</span>{" "}
            {product.colorType === "черный" ? "Чёрный" : "Цветной"}
          </p>
        )}
        <p className={`text-sm ${currentColors.secondaryText}`}>
          <span className={`${currentColors.primaryText}`}>Наличие:</span>{" "}
          <span className={product.inStock ? "text-green-500" : "text-red-500"}>
            {product.inStock ? "В наличии" : "Нет в наличии"}
          </span>
        </p>
      </div>

      <div className="w-full md:w-1/4 flex flex-col justify-between">
        <div>
          <h3 className={`text-md font-semibold mb-2 ${currentColors.primaryText}`}>
            Предложения:
          </h3>
          {product.suppliers && product.suppliers.length > 0 ? (
            <ul>
              {product.suppliers.map((supplier) => (
                <li key={supplier.name} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${currentColors.secondaryText}`}>
                      {supplier.name}:
                    </span>
                    <span className={`text-sm font-semibold ${currentColors.primaryText}`}>
                      {supplier.price} ₽
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={`text-sm ${currentColors.secondaryText}`}>Нет предложений</div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className={`flex rounded-md overflow-hidden bg-gray-100 items-center h-10
            ${currentColors.bordersDividers} ${currentColors.secondaryBackground} border`} // Добавлен border здесь
          >
            <Button
              size="sm"
              variant="text"
              onClick={handleDecrement}
              className={`${commonBtnClasses} ${hoverBtnClasses} text-lg`}
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
              value={quantityInput}
              onChange={handleQuantityChange}
              onBlur={() => {
                let finalValue = parseFloat(quantityInput.replace(/,/g, "."));
                if (isNaN(finalValue) || finalValue <= 0) {
                  finalValue = 1;
                }
                setQuantityInput(
                  finalValue
                    .toFixed(4)
                    .replace(/\.?0+$/, "")
                    .replace(/\./g, ",")
                );
              }}
              className={`w-14 px-1 py-2 text-center h-full focus:outline-none
                ${currentColors.secondaryBackground} ${currentColors.primaryText} `} // Фон и текст инпута
              placeholder="1,0000"
            />
            <Button
              size="sm"
              variant="text"
              onClick={handleIncrement}
              className={`${commonBtnClasses} ${hoverBtnClasses} text-lg`}
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              +
            </Button>
          </div>
          <Button
            size="sm"
            // Для кнопки "В корзину" используем primaryAccent, который содержит bg- и text- классы.
            // Поэтому color prop оставляем пустым или ставим на любой дефолтный,
            // а все стили применяем через className.
            color={undefined}
            className={`h-10 shadow-md flex-grow whitespace-nowrap
              ${currentColors.primaryAccent}`} // Используем primaryAccent
            onClick={handleAddToCart}
            disabled={!product.inStock}
            placeholder={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            В корзину
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


// import React, { useState } from "react";
// import { Button } from "@material-tailwind/react";
// import type { ButtonProps } from "@material-tailwind/react";
// import { useCart } from "../../../context/CartContext";
// import type { Product } from "../../auth/types";

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart } = useCart();
//   const [quantityInput, setQuantityInput] = useState<string>("1");

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value;
//     value = value.replace(/,/g, ".");

//     if (value === "" || value === "." || value.endsWith(".")) {
//       setQuantityInput(value);
//       return;
//     }

//     const isValid = /^\d*\.?\d{0,4}$/.test(value);

//     if (isValid) {
//       setQuantityInput(value);
//     }
//   };

//   const handleIncrement = () => {
//     let currentQuantity = parseFloat(quantityInput.replace(/,/g, "."));
//     if (isNaN(currentQuantity)) {
//       currentQuantity = 0;
//     }
//     const newQuantity = parseFloat((currentQuantity + 1).toFixed(4));
//     setQuantityInput(newQuantity.toString().replace(/\./g, ","));
//   };

//   const handleDecrement = () => {
//     let currentQuantity = parseFloat(quantityInput.replace(/,/g, "."));
//     if (isNaN(currentQuantity)) {
//       currentQuantity = 1;
//     }
//     const newQuantity = parseFloat((currentQuantity - 1).toFixed(4));
//     if (newQuantity >= 0.0001) {
//       setQuantityInput(newQuantity.toString().replace(/\./g, ","));
//     } else {
//       setQuantityInput("1");
//     }
//   };

//   const handleAddToCart = () => {
//     const parsedQuantity = parseFloat(quantityInput.replace(/,/g, "."));
//     const quantityToAdd =
//       !isNaN(parsedQuantity) && parsedQuantity > 0
//         ? parseFloat(parsedQuantity.toFixed(4))
//         : 1;

//     addToCart({
//       id: product.id,
//       name: product.name,
//       quantity: quantityToAdd,
//       // Маппируем product.suppliers в availableSuppliers
//       availableSuppliers: product.suppliers,
//       // Устанавливаем первого поставщика как выбранного по умолчанию, если он есть
//       selectedSupplierName:
//         product.suppliers && product.suppliers.length > 0
//           ? product.suppliers[0].name
//           : undefined,
//     });
//     setQuantityInput("1");
//   };

//   const commonBtnClasses: ButtonProps["className"] = `
//     h-full w-10 p-0 flex items-center justify-center 
//     bg-transparent text-black rounded-none shadow-none 
//     focus:outline-none focus:ring-0 focus:border-transparent 
//     active:border-transparent active:ring-0 active:outline-none
//     hover:border-transparent
//   `;
//   const hoverBtnClasses: ButtonProps["className"] = "hover:bg-gray-200";

//   return (
//     <div className="border rounded-lg shadow-md p-4 bg-white text-black flex flex-col md:flex-row mb-4">
//       <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="w-full h-auto rounded-md"
//         />
//       </div>

//       <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
//         <h2 className="text-lg font-bold mb-2">{product.name}</h2>
//         {product.diameter && (
//           <p className="text-sm text-gray-600 mb-1">
//             Диаметр: {product.diameter}
//           </p>
//         )}
//         {product.length && (
//           <p className="text-sm text-gray-600 mb-1">Длина: {product.length}</p>
//         )}
//         {product.grade && (
//           <p className="text-sm text-gray-600 mb-1">ГОСТ: {product.grade}</p>
//         )}
//         {product.category && (
//           <p className="text-sm text-gray-600 mb-1">
//             Категория: {product.category}
//           </p>
//         )}
//         {product.colorType && (
//           <p className="text-sm text-gray-600 mb-1">
//             Сплав: {product.colorType === "черный" ? "Чёрный" : "Цветной"}
//           </p>
//         )}
//         <p className="text-sm text-gray-600">
//           Наличие: {product.inStock ? "В наличии" : "Нет в наличии"}
//         </p>
//       </div>

//       <div className="w-full md:w-1/4 flex flex-col justify-between">
//         <div>
//           <h3 className="text-md font-semibold mb-2">Предложения:</h3>
//           {product.suppliers && product.suppliers.length > 0 ? (
//             <ul>
//               {product.suppliers.map((supplier) => (
//                 <li key={supplier.name} className="mb-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-700">
//                       {supplier.name}:
//                     </span>
//                     <span className="text-sm font-semibold">
//                       {supplier.price} ₽
//                     </span>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="text-sm text-gray-700">Нет предложений</div>
//           )}
//         </div>

//         <div className="mt-4 flex items-center gap-2">
//           <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-100 items-center h-10">
//             <Button
//               size="sm"
//               variant="text"
//               onClick={handleDecrement}
//               className={`${commonBtnClasses} ${hoverBtnClasses} text-lg`}
//               placeholder={undefined}
//               onResize={undefined}
//               onResizeCapture={undefined}
//               onPointerEnterCapture={undefined}
//               onPointerLeaveCapture={undefined}
//             >
//               -
//             </Button>
//             <input
//               type="text"
//               value={quantityInput}
//               onChange={handleQuantityChange}
//               onBlur={() => {
//                 let finalValue = parseFloat(quantityInput.replace(/,/g, "."));
//                 if (isNaN(finalValue) || finalValue <= 0) {
//                   finalValue = 1;
//                 }
//                 setQuantityInput(
//                   finalValue
//                     .toFixed(4)
//                     .replace(/\.?0+$/, "")
//                     .replace(/\./g, ",")
//                 );
//               }}
//               className="w-14 px-1 py-2 text-center bg-transparent text-black h-full focus:outline-none"
//               placeholder="1,0000"
//             />
//             <Button
//               size="sm"
//               variant="text"
//               onClick={handleIncrement}
//               className={`${commonBtnClasses} ${hoverBtnClasses} text-lg`}
//               placeholder={undefined}
//               onResize={undefined}
//               onResizeCapture={undefined}
//               onPointerEnterCapture={undefined}
//               onPointerLeaveCapture={undefined}
//             >
//               +
//             </Button>
//           </div>
//           <Button
//             size="sm"
//             className="h-10 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow-md flex-grow whitespace-nowrap"
//             onClick={handleAddToCart}
//             placeholder={undefined}
//             onResize={undefined}
//             onResizeCapture={undefined}
//             onPointerEnterCapture={undefined}
//             onPointerLeaveCapture={undefined}
//           >
//             В корзину
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;