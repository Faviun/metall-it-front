import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Typography, Button, Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";
import { useTheme } from "../../../context/ThemeContext";
import { headerColors } from "../../../constants/themeColors";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

function Header({ onSearchChange, searchValue }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentHeaderColors = headerColors[theme];

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  return (
    <header className={`${currentHeaderColors.background} shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50 transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        {/* Логотип */}
        <Link to="/">
          <Typography
            variant="h5"
            className={`${currentHeaderColors.logoText} whitespace-nowrap`}
            {...commonPlaceholderProps}
          >
            МеталлМаркет
          </Typography>
        </Link>

        {/* Центр: Каталог, Поиск, Заказы, Корзина (для десктопа) */}
        <div className="hidden md:flex items-center gap-x-4 flex-grow justify-center">
          <Link to="/catalog">
            <Button
              variant="outlined"
              size="sm"
              className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
              {...commonPlaceholderProps}
            >
              Каталог
            </Button>
          </Link>

          {/* Поиск */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchValue}
              onChange={onSearchChange}
              className={`w-full h-10 px-3 pr-10 rounded-md ${currentHeaderColors.inputBg} ${currentHeaderColors.inputText} ${currentHeaderColors.inputBorder} ${currentHeaderColors.inputPlaceholder} focus:outline-none focus:ring-2 focus:ring-[#FFD700]`}
            />
            {searchValue && (
              <button
                onClick={() =>
                  onSearchChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${currentHeaderColors.inputPlaceholder} hover:${currentHeaderColors.inputText} focus:outline-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <Link to="/orders">
            <Button
              variant="outlined"
              size="sm"
              className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
              {...commonPlaceholderProps}
            >
              Заказы
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              variant="outlined"
              size="sm"
              className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} flex items-center gap-1 relative !overflow-visible transition-colors duration-300`}
              {...commonPlaceholderProps}
            >
              Корзина
              {items.length > 0 && (
                <span className={`${currentHeaderColors.cartBadgeBg} ${currentHeaderColors.cartBadgeText} rounded-full w-5 h-5 flex items-center justify-center text-xs absolute -top-2 -right-2 z-10`}>
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Правая часть: Авторизация/Профиль + Переключатель тем (для десктопа) + Кебаб-меню (для мобильных) */}
        <div className="flex items-center gap-x-2">
          <div className="hidden md:flex items-center gap-x-2">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button
                    variant="outlined"
                    size="sm"
                    className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
                    {...commonPlaceholderProps}
                  >
                    Профиль
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={logout}
                  className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
                  {...commonPlaceholderProps}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outlined"
                    size="sm"
                    className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
                    {...commonPlaceholderProps}
                  >
                    Вход
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="outlined"
                    size="sm"
                    className={`h-10 ${currentHeaderColors.buttonBorder} ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
                    {...commonPlaceholderProps}
                  >
                    Регистрация
                  </Button>
                </Link>
              </>
            )}

            <div className={`flex items-center ml-4 border rounded-full overflow-hidden transition-colors duration-300 ${currentHeaderColors.buttonBorder}`}>
              <Button
                size="sm"
                variant="text"
                className={`px-3 py-1 text-sm rounded-l-full transition-all duration-300
                  ${theme === 'light' ? currentHeaderColors.toggleActiveBg + ' ' + currentHeaderColors.toggleActiveText : currentHeaderColors.toggleInactiveBg + ' ' + currentHeaderColors.toggleInactiveText}`}
                onClick={() => setTheme('light')}
                {...commonPlaceholderProps}
              >
                Светлая
              </Button>
              <Button
                size="sm"
                variant="text"
                className={`px-3 py-1 text-sm rounded-r-full transition-all duration-300
                  ${theme === 'dark' ? currentHeaderColors.toggleActiveBg + ' ' + currentHeaderColors.toggleActiveText : currentHeaderColors.toggleInactiveBg + ' ' + currentHeaderColors.toggleInactiveText}`}
                onClick={() => setTheme('dark')}
                {...commonPlaceholderProps}
              >
                Тёмная
              </Button>
            </div>
          </div>

          {/* Мобильное кебаб-меню */}
          <div className="md:hidden">
            <Menu open={isMenuOpen} handler={setIsMenuOpen} allowHover={false}>
              <MenuHandler>
                <Button
                  variant="text"
                  size="sm"
                  className={`h-10 ${currentHeaderColors.buttonText} ${currentHeaderColors.buttonHoverBg} ${currentHeaderColors.buttonHoverText} transition-colors duration-300`}
                  {...commonPlaceholderProps}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </MenuHandler>
              <MenuList
                className={`${currentHeaderColors.background} ${currentHeaderColors.inputText} border border-[#FFD700] rounded-md shadow-lg p-2`}
                {...commonPlaceholderProps}
              >
                <Link to="/catalog">
                  <MenuItem
                    className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                    {...commonPlaceholderProps}
                  >
                    Каталог
                  </MenuItem>
                </Link>
                <Link to="/orders">
                  <MenuItem
                    className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                    {...commonPlaceholderProps}
                  >
                    Заказы
                  </MenuItem>
                </Link>
                <Link to="/cart">
                  <MenuItem
                    className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} flex items-center gap-1 border-b border-[#FFD700]`}
                    {...commonPlaceholderProps}
                  >
                    Корзина
                    {items.length > 0 && (
                      <span className={`${currentHeaderColors.cartBadgeBg} ${currentHeaderColors.cartBadgeText} rounded-full w-5 h-5 flex items-center justify-center text-xs`}>
                        {items.length}
                      </span>
                    )}
                  </MenuItem>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <MenuItem
                        className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                        {...commonPlaceholderProps}
                      >
                        Профиль
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={logout}
                      className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                      {...commonPlaceholderProps}
                    >
                      Выйти
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <MenuItem
                        className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                        {...commonPlaceholderProps}
                      >
                        Вход
                      </MenuItem>
                    </Link>
                    <Link to="/register">
                      <MenuItem
                        className={`mb-2 ${currentHeaderColors.buttonText} hover:${currentHeaderColors.buttonHoverBg} hover:${currentHeaderColors.buttonHoverText} border-b border-[#FFD700]`}
                        {...commonPlaceholderProps}
                      >
                        Регистрация
                      </MenuItem>
                    </Link>
                  </>
                )}
                <div className={`flex items-center border rounded-full overflow-hidden transition-colors duration-300 ${currentHeaderColors.buttonBorder} mt-2`}>
                  <Button
                    size="sm"
                    variant="text"
                    className={`px-3 py-1 text-sm rounded-l-full transition-all duration-300
                      ${theme === 'light' ? currentHeaderColors.toggleActiveBg + ' ' + currentHeaderColors.toggleActiveText : currentHeaderColors.toggleInactiveBg + ' ' + currentHeaderColors.toggleInactiveText}`}
                    onClick={() => setTheme('light')}
                    {...commonPlaceholderProps}
                  >
                    Светлая
                  </Button>
                  <Button
                    size="sm"
                    variant="text"
                    className={`px-3 py-1 text-sm rounded-r-full transition-all duration-300
                      ${theme === 'dark' ? currentHeaderColors.toggleActiveBg + ' ' + currentHeaderColors.toggleActiveText : currentHeaderColors.toggleInactiveBg + ' ' + currentHeaderColors.toggleInactiveText}`}
                    onClick={() => setTheme('dark')}
                    {...commonPlaceholderProps}
                  >
                    Тёмная
                  </Button>
                </div>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;