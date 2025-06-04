import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { colors } from "./constants/themeColors";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";

function AppContent() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  const handleCheckoutSuccess = () => {
    navigate('/orders');
    alert("Заказ успешно оформлен! Вы будете перенаправлены на страницу заказов.");
  };

  return (
    <CartProvider onCheckoutSuccess={handleCheckoutSuccess}>
      <div className={`min-h-screen flex flex-col ${currentThemeColors.primaryBackground} transition-colors duration-300`}>
        <Header onSearchChange={() => true} searchValue={""} />
        <main className="flex-1 pt-20">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;