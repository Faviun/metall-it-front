import { Link } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "../../../context/AuthContext";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

function Header({ onSearchChange, searchValue }: HeaderProps) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center">
        {/* Логотип */}
        <Link to="/" className="mr-4">
          <Typography variant="h5" className="text-blue-700">
            МеталлМаркет
          </Typography>
        </Link>

        {/* Кнопка "Каталог" */}
        <Link to="/catalog" className="mr-4">
          <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
            Каталог
          </Button>
        </Link>

        {/* Поиск */}
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchValue}
            onChange={onSearchChange}
            className="p-2 pr-8 rounded bg-gray-100 text-black w-full"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Кнопки "Заказы" и "Корзина" */}
        <div className="flex items-center gap-4">
          <Link to="/orders">
            <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
              Заказы
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
              Корзина
            </Button>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="ml-4">
                <Button variant="text" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
                  Профиль
                </Button>
              </Link>
              <Button variant="outlined" size="sm" onClick={logout} className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200 ml-2">
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="ml-4">
                <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
                  Вход
                </Button>
              </Link>
              <Link to="/register" className="ml-2">
                <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-700 hover:bg-blue-gray-200">
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


// import { Link } from "react-router-dom";
// import { Typography, Button } from "@material-tailwind/react";
// import { useAuth } from "../../../context/AuthContext";

// function Header() {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <header className="bg-white shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/">
//           <Typography variant="h5" className="text-blue-700">
//             МеталлМаркет
//           </Typography>
//         </Link>
//         <div className="flex gap-4">
//           {isAuthenticated ? (
//             <>
//               <Link to="/profile">
//                 <Button variant="text" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
//                   Профиль
//                 </Button>
//               </Link>
//               <Button variant="outlined" size="sm" onClick={logout} className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
//                 Выйти
//               </Button>
//             </>
//           ) : (
//             <>
//               <Link to="/login">
//               <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
//               Вход
//                 </Button>
//               </Link>
//               <Link to="/register">
//                 <Button variant="outlined" size="sm" className="border-blue-gray-300 text-blue-gray-300 hover:bg-blue-gray-700">
//                   Регистрация
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
