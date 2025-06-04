import LoginForm from "../components/LoginForm";
import $api from "../../../api/axios";
import { useTheme } from "../../../context/ThemeContext";
import { colors } from "../../../constants/themeColors";

const LoginPage = () => {
  // const { login } = useAuth();

  const handleLogin = () => {
    // login(); // Здесь вместо реального запроса просто активируем сессию
    $api.get("");
  };

  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  return (
    <div
      className={`max-w-sm mx-auto mt-10 p-6 rounded-lg shadow-lg border transition-colors duration-300
        ${currentThemeColors.secondaryBackground}
        ${currentThemeColors.bordersDividers}`}
    >
      <button
        onClick={handleLogin}
        className="w-full py-2 px-4 rounded bg-blue-gray-600 text-white hover:bg-blue-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-gray-400"
      >
        Симулировать вход
      </button>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
