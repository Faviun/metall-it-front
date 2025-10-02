import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import "@/App.css";
import Header from "@/features/auth/components/Header";
import Footer from "@/features/home/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";
import ErrorBoundary from "@/components/ErrorBoundary";
import routes from '~react-pages';
import { RolesProvider } from '@/context/RolesContext';


function AppContent() {
  const { theme } = useTheme();
  const currentThemeColors = colors[theme];
  
  const PageComponent = useRoutes(routes);

  return (
    <CartProvider onCheckoutSuccess={() => { }}>
      <div className={`flex flex-col ${currentThemeColors.primaryBackground} transition-colors duration-300`}>
        <Header onSearchChange={() => {}} searchValue={""} />
        <main className="flex-1 pt-20 min-h-screen">
          <ErrorBoundary>
            {PageComponent}
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
        <RolesProvider>
          <AppContent />
        </RolesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;