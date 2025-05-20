import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

function Header({ onSearchChange, searchValue }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="bg-white shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        {/* Логотип */}
        <Link to="/">
          <Typography variant="h5" className="text-blue-700 whitespace-nowrap">
            МеталлМаркет
          </Typography>
        </Link>

        {/* Центр: Каталог, Поиск, Заказы, Корзина */}
        <div className="flex items-center gap-x-4 flex-grow justify-center">
          {/* Кнопка "Каталог" */}
          <Link to="/catalog">
            <Button
              variant="outlined"
              size="sm"
              className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
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
              className="w-full h-10 px-3 pr-10 rounded-md bg-gray-100 text-black border border-gray-300 focus:outline-none"
            />
            {searchValue && (
              <button
                onClick={() =>
                  onSearchChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

          {/* Кнопка "Заказы" */}
          <Link to="/orders">
            <Button
              variant="outlined"
              size="sm"
              className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
            >
              Заказы
            </Button>
          </Link>

          {/* Кнопка "Корзина" */}
          <Link to="/cart">
            <Button
              variant="outlined"
              size="sm"
              className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200 flex items-center gap-1 relative"
            >
              Корзина
              {items.length > 0 && (
                <span className="bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>

        </div>

        {/* Авторизация / Профиль */}
        <div className="flex items-center gap-x-2">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button
                  variant="text"
                  size="sm"
                  className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
                >
                  Профиль
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="sm"
                onClick={logout}
                className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
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
                  className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
                >
                  Вход
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outlined"
                  size="sm"
                  className="h-10 border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200"
                >
                  Регистрация
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>


  );
}

export default Header;