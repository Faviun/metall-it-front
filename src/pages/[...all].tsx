import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 text-center
        ${currentThemeColors.primaryBackground} ${currentThemeColors.primaryText}
        transition-colors duration-300`}
    >
      <Typography variant="h1" className="mb-4 text-8xl font-bold" {...commonPlaceholderProps}>
        404
      </Typography>
      <Typography variant="h3" className="mb-6 text-2xl md:text-3xl" {...commonPlaceholderProps}>
        Страница не найдена
      </Typography>
      <Typography variant="paragraph" className="mb-8 max-w-lg" {...commonPlaceholderProps}>
        Извините, но страница, которую вы ищете, не существует. Возможно, она была удалена, изменена или вы ввели неверный адрес.
      </Typography>
      <Link to="/">
        <Button
          className={`${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
          {...commonPlaceholderProps}
        >
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;