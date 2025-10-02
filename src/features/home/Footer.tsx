import { useTheme } from "../../context/ThemeContext";
import { footerColors } from "../../constants/themeColors";

const Footer = () => {
  const { theme } = useTheme();
  const currentFooterColors = footerColors[theme];

  return (
      <footer className={`mt-12 w-full ${currentFooterColors.background} ${currentFooterColors.text} py-6 transition-colors duration-300`}>

      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1
            className={`text-2xl font-bold ${currentFooterColors.logoText}`}
          >
            Металл<span className={currentFooterColors.accentText}>Маркет</span>
          </h1>
          <p className="text-sm opacity-80">
            Ваш надежный поставщик металлопроката
          </p>
        </div>

        <nav className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
          <a
            href="/about"
            className={`${currentFooterColors.text} ${currentFooterColors.linkHover} transition-colors`}
          >
            О нас
          </a>
          <a
            href="/contact"
            className={`${currentFooterColors.text} ${currentFooterColors.linkHover} transition-colors`}
          >
            Контакты
          </a>
          <a
            href="/privacy"
            className={`${currentFooterColors.text} ${currentFooterColors.linkHover} transition-colors`}
          >
            Политика конфиденциальности
          </a>
        </nav>
      </div>

      <div
        className={`mt-4 pt-4 text-center text-sm border-t ${currentFooterColors.divider}`}
      >
        <p>
          &copy; {new Date().getFullYear()}{" "}
          МеталлМаркет. Все права защищены.
        </p>
      </div>
    </footer>
  );
};

export default Footer;