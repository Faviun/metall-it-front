import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { headerColors } from "@/constants/themeColors";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

function Header({ onSearchChange, searchValue }: HeaderProps) {
  // const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const { theme } = useTheme();
  
  const [isSuppliersMenuOpen, setSuppliersMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSuppliersOpen, setMobileSuppliersOpen] = useState(false); // Для мобильного меню
  
  const colors = headerColors[theme];
  const suppliersMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suppliersMenuRef.current && !suppliersMenuRef.current.contains(event.target as Node)) {
        setSuppliersMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suppliers = [
    { key: 'mc', name: 'Металлсервис' },
    { key: 'metallotorg', name: 'Металлоторг' },
    { key: 'ktzholding', name: 'КТЗ Холдинг' },
    { key: 'dipos', name: 'Дипос' },
  ];

  return (
    <header className={`${colors.background} backdrop-blur-md shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50 transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between gap-x-4">
        <Link to="/" className={`${colors.logoText} text-2xl font-bold whitespace-nowrap`}>
          Металл<span className={colors.accentText}>Маркет</span>
        </Link>

        {/* --- НАВИГАЦИЯ ДЛЯ ДЕСКТОПА --- */}
        <div className={`hidden md:flex items-center gap-x-4 flex-grow justify-center ${colors.text}`}>
          <Link to="/catalog" className={`${colors.text} ${colors.linkHover} transition-colors`}>Каталог</Link>
          
          
          
          {/* --- Поиск --- */}
          <div className="relative flex-grow max-w-md">
            <input type="text" placeholder="Поиск по названию..." value={searchValue} onChange={onSearchChange} className={`w-full h-10 px-3 pr-10 rounded-md border ${colors.border} ${colors.text} bg-transparent focus:outline-none focus:ring-2 focus:ring-accent`} />
          </div>

          <div className="relative" ref={suppliersMenuRef}>
            <button
              onClick={() => setSuppliersMenuOpen(!isSuppliersMenuOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg ${colors.border} ${colors.text} bg-accent hover:bg-accent-hover hover:text-black text-black font-bold transition-colors text-sm`}
            >
              Поставщики <i className={`fas fa-chevron-down text-xs transition-transform ${isSuppliersMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isSuppliersMenuOpen && (
              <div className={`absolute top-full mt-2 w-52 rounded-lg shadow-lg p-2 ${colors.background} border ${colors.border} z-20`}>
                <ul>
                  {suppliers.map(sup => (
                    <li key={sup.key}>
                      <Link
                        to={`/suppliers/${sup.key}`}
                        onClick={() => setSuppliersMenuOpen(false)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-black font-medium ${colors.text}`}
                      >
                        {sup.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Link to="/orders" className={`${colors.text} ${colors.linkHover} transition-colors`}>Заказы</Link>
          
          <Link to="/cart" className="relative">
            <span className={`${colors.text} ${colors.linkHover} transition-colors`}>Корзина</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        {/* --- Правая часть --- */}
        <div className="flex items-center gap-x-3">
          <div className="hidden md:flex items-center gap-x-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className={`${colors.text} ${colors.linkHover}`}>Профиль</Link>
                <button onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }} className={`${colors.text} ${colors.linkHover}`}>Выйти</button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${colors.text} ${colors.linkHover}`}>Вход</Link>
                <Link to="/register" className={`${colors.text} ${colors.linkHover}`}>Регистрация</Link>
              </>
            )}
            <ThemeToggle />
          </div>
          
          {/* --- МОБИЛЬНОЕ МЕНЮ --- */}
          <div className="md:hidden" ref={mobileMenuRef}>
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className={`${colors.text} p-2`}>
              <i className="fas fa-bars text-xl"></i>
            </button>
            {isMobileMenuOpen && (
                <div className={`absolute top-full right-4 mt-2 w-56 p-2 rounded-md shadow-lg ${colors.background} border ${colors.border} z-20`}>
                    <ul>
                      <li><Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Каталог</Link></li>
                      
                      {/* --- Поставщики в мобильном меню --- */}
                      <li>
<button onClick={() => setMobileSuppliersOpen(!isMobileSuppliersOpen)} className={`w-full text-left flex justify-between items-center px-3 py-2 rounded-md bg-accent hover:bg-accent-hover text-black font-bold ${colors.text}`}>                          Поставщики
                          <i className={`fas fa-chevron-down text-xs transition-transform ${isMobileSuppliersOpen ? 'rotate-180' : ''}`}></i>
                        </button>
                        {isMobileSuppliersOpen && (
                          <ul className="pl-4">
                            {suppliers.map(sup => (
                              <li key={sup.key}>
                                <Link to={`/suppliers/${sup.key}`} onClick={() => setMobileMenuOpen(false)} className={`block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>
                                  {sup.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Заказы</Link></li>
                      <li><Link to="/cart" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Корзина</Link></li>
                      <hr className={`my-2 ${colors.border}`} />
                      {isAuthenticated ? (
                          <>
                              <li><Link to="/profile" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Профиль</Link></li>
                              <li><button onClick={() => { localStorage.removeItem("access_token");
          navigate("/login");; setMobileMenuOpen(false); }} className={`w-full text-left block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Выйти</button></li>
                          </>
                      ) : (
                          <>
                              <li><Link to="/login" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Вход</Link></li>
                              <li><Link to="/register" onClick={() => setMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md hover:bg-light-border dark:hover:bg-dark-border ${colors.text}`}>Регистрация</Link></li>
                          </>
                      )}
                      <hr className={`my-2 ${colors.border}`} />
                      <div className="mt-2 flex justify-center"><ThemeToggle /></div>
                    </ul>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;