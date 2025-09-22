// import { Typography, Button, Input, Textarea, Card } from "@material-tailwind/react";
// import { useTheme } from "@/context/ThemeContext";
// import { colors } from "@/constants/themeColors";

// export default function HomePage() {
//   const { theme } = useTheme() as { theme: 'light' | 'dark' };

//   const currentThemeColors = colors[theme];

//   const commonPlaceholderProps = {
//     placeholder: undefined,
//     onResize: undefined,
//     onResizeCapture: undefined,
//     onPointerEnterCapture: undefined,
//     onPointerLeaveCapture: undefined,
//   };

//   return (
//     <div className={`${currentThemeColors.primaryBackground} min-h-screen p-8 transition-colors duration-300`}>
//       <div className="max-w-6xl mx-auto">
//         <Typography
//           as="h1"
//           variant="h2"
//           className={`text-center mb-8 ${currentThemeColors.primaryText}`}
//           {...commonPlaceholderProps}
//         >
//           Добро пожаловать в маркетплейс металлопроката
//         </Typography>

//         <Typography
//           as="p"
//           variant="lead"
//           className={`text-center mb-12 ${currentThemeColors.secondaryText}`}
//           {...commonPlaceholderProps}
//         >
//           Здесь вы можете найти широкий ассортимент чёрного и цветного металла по
//           выгодным ценам. Откройте для себя лучшие предложения от проверенных поставщиков.
//         </Typography>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//           {Array.from({ length: 3 }).map((_, index) => (
//             <Card
//               key={index}
//               className={`${currentThemeColors.secondaryBackground} ${currentThemeColors.bordersDividers} border p-6 shadow-lg`}
//               {...commonPlaceholderProps}
//             >
//               <Typography
//                 as="h3"
//                 variant="h4"
//                 className={`mb-4 ${currentThemeColors.primaryText}`}
//                 {...commonPlaceholderProps}
//               >
//                 Название товара {index + 1}
//               </Typography>
//               <Typography
//                 as="p"
//                 variant="paragraph"
//                 className={`mb-4 ${currentThemeColors.secondaryText}`}
//                 {...commonPlaceholderProps}
//               >
//                 Краткое описание товара, его характеристики и преимущества.
//                 Демонстрация `secondaryText`.
//               </Typography>
//               <div className="flex justify-between items-center mt-4">
//                 <Typography
//                   as="p"
//                   variant="h5"
//                   className={`${currentThemeColors.primaryAccent.includes('text-black') ? 'text-black' : 'text-white'} font-bold`}
//                   style={{ color: theme === 'light' ? '#B36700' : '#FFD700' }}
//                   {...commonPlaceholderProps}
//                 >
//                   999.99 ₽
//                 </Typography>
//                 <Button
//                   className={`${currentThemeColors.primaryAccent}`}
//                   size="md"
//                   {...commonPlaceholderProps}
//                 >
//                   В корзину
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>

//         <div className={`p-8 rounded-lg shadow-xl mb-12 ${currentThemeColors.secondaryBackground} ${currentThemeColors.bordersDividers} border`}>
//           <Typography
//             as="h3"
//             variant="h4"
//             className={`mb-6 ${currentThemeColors.primaryText}`}
//             {...commonPlaceholderProps}
//           >
//             Форма для запроса
//           </Typography>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <Input
//               crossOrigin={undefined} label="Ваше имя"
//               className={`${currentThemeColors.primaryText} focus:border-${theme === 'light' ? '[#D4AF37]' : '[#FFD700]'}`}
//               labelProps={{ className: `${currentThemeColors.secondaryText}` }}
//               containerProps={{ className: "min-w-0" }}
//               {...commonPlaceholderProps}            />
//             <Input
//               crossOrigin={undefined} label="Email"
//               className={`${currentThemeColors.primaryText} focus:border-${theme === 'light' ? '[#D4AF37]' : '[#FFD700]'}`}
//               labelProps={{ className: `${currentThemeColors.secondaryText}` }}
//               containerProps={{ className: "min-w-0" }}
//               {...commonPlaceholderProps}            />
//           </div>

//           <Textarea
//             label="Сообщение"
//             className={`${currentThemeColors.primaryText} focus:border-${theme === 'light' ? '[#D4AF37]' : '[#FFD700]'}`}
//             labelProps={{ className: `${currentThemeColors.secondaryText}` }}
//             {...commonPlaceholderProps}
//           />

//           <div className="flex justify-end gap-4 mt-6">
//             <Button
//               className={`${currentThemeColors.errorDanger}`}
//               {...commonPlaceholderProps}
//             >
//               Отмена
//             </Button>
//             <Button
//               className={`${currentThemeColors.primaryAccent}`}
//               {...commonPlaceholderProps}
//             >
//               Отправить запрос
//             </Button>
//           </div>
//         </div>

//         <div className={`p-8 rounded-lg shadow-xl ${currentThemeColors.secondaryBackground} ${currentThemeColors.bordersDividers} border`}>
//           <Typography
//             as="h3"
//             variant="h4"
//             className={`mb-6 ${currentThemeColors.primaryText}`}
//             {...commonPlaceholderProps}
//           >
//             Примеры кнопок
//           </Typography>
//           <div className="flex flex-wrap gap-4">
//             <Button className={`${currentThemeColors.primaryAccent}`} {...commonPlaceholderProps}>
//               Основное действие
//             </Button>
//             <Button className={`${currentThemeColors.secondaryAccent}`} {...commonPlaceholderProps}>
//               Второстепенное действие
//             </Button>
//             <Button className={`${currentThemeColors.success}`} {...commonPlaceholderProps}>
//               Успешное действие
//             </Button>
//             <Button className={`${currentThemeColors.errorDanger}`} {...commonPlaceholderProps}>
//               Опасное действие
//             </Button>

//             <Button
//               variant="outlined"
//               className={`${currentThemeColors.outlinedButtonBorder}`}
//               {...commonPlaceholderProps}
//             >
//               Контурная кнопка
//             </Button>
//             <Button disabled className={`${currentThemeColors.secondaryBackground} ${currentThemeColors.secondaryText} opacity-50 cursor-not-allowed`} {...commonPlaceholderProps}>
//               Неактивная кнопка
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }