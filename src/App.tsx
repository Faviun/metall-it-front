import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Header from "./features/auth/components/Header";
import HomePage from "./features/home/HomePage";
import Footer from "./features/home/Footer";
import CatalogPage from "./features/catalog/CatalogPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const navigate = useNavigate(); 

  const handleCheckoutSuccess = () => {
    navigate('/orders'); 
    alert("Заказ успешно оформлен! Вы будете перенаправлены на страницу заказов.");
  };

  return (
    <CartProvider onCheckoutSuccess={handleCheckoutSuccess}>
      <div className="min-h-screen flex flex-col">
        <Header onSearchChange={() => true} searchValue={""} />
          <div className="flex items-center space-x-4">
            <Link to="/catalog" className="text-white hover:underline">Каталог</Link>
            <Link to="/cart" className="text-white hover:underline">Корзина</Link>
            <Link to="/orders" className="text-white hover:underline">Мои Заказы</Link>
            <Link to="/login" className="text-white hover:underline">Войти</Link>
            <Link to="/register" className="text-white hover:underline">Регистрация</Link>
          </div>
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
