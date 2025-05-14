import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../../../context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Typography variant="h5" className="text-blue-700">
            МеталлМаркет
          </Typography>
        </Link>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="text" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
                  Профиль
                </Button>
              </Link>
              <Button variant="outlined" size="sm" onClick={logout} className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
              <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
              Вход
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
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
