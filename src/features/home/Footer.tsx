import { useTheme } from "../../context/ThemeContext";
import { footerColors } from "../../constants/themeColors";

const Footer = () => {
  const { theme } = useTheme();

  const currentFooterColors = footerColors[theme];

  return (
    <footer className={`w-full ${currentFooterColors.background} ${currentFooterColors.text} py-6 mt-auto transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h1 className={`text-2xl font-bold ${currentFooterColors.logoText}`}>МеталлМаркет</h1>
          <p className="text-sm">Ваш надежный поставщик металлопроката</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
          <a href="/about" className={`${currentFooterColors.text} ${currentFooterColors.linkHover}`}>
            О нас
          </a>
          <a href="/contact" className={`${currentFooterColors.text} ${currentFooterColors.linkHover}`}>
            Контакты
          </a>
          <a href="/privacy" className={`${currentFooterColors.text} ${currentFooterColors.linkHover}`}>
            Политика конфиденциальности
          </a>
        </div>
      </div>
      <div className={`mt-2 pt-2 text-center text-sm ${currentFooterColors.divider} border-t`}>
        <p>
          &copy; {new Date().getFullYear()} МеталлМаркет. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


// const Footer = () => {
//   return (
//     <footer className="w-full bg-blue-gray-600 text-white py-6 mt-auto">
//       <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
//         <div className="mb-4 sm:mb-0 text-center sm:text-left">
//           <h1 className="text-2xl font-bold">МеталлМаркет</h1>
//           <p className="text-sm">Ваш надежный поставщик металлопроката</p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
//           <a href="/about" className="text-white hover:text-gray-400">
//             О нас
//           </a>
//           <a href="/contact" className="text-white hover:text-gray-400">
//             Контакты
//           </a>
//           <a href="/privacy" className="text-white hover:text-gray-400">
//             Политика конфиденциальности
//           </a>
//         </div>
//       </div>
//       <div className="mt-2 pt-2 text-center text-sm">
//         {/* <div className="border-t border-gray-700 mt-2 pt-2 text-center text-sm"> */}

//         <p>
//           &copy; {new Date().getFullYear()} МеталлМаркет. Все права защищены.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-blue-gray-600 text-white py-6 mt-auto">
//     <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
//         <div className="mb-4 sm:mb-0 text-center sm:text-left">
//         <h1 className="text-2xl font-bold">МеталлМаркет</h1>
//         <p className="text-sm">Ваш надежный поставщик металлопроката</p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
//         <a href="/about" className="text-white hover:text-gray-400">О нас</a>
//         <a href="/contact" className="text-white hover:text-gray-400">Контакты</a>
//         <a href="/privacy" className="text-white hover:text-gray-400">Политика конфиденциальности</a>
//         </div>
//     </div>
//     <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
//         <p>&copy; {new Date().getFullYear()} МеталлМаркет. Все права защищены.</p>
//     </div>
//     </footer>
//   );
// };

// export default Footer;
