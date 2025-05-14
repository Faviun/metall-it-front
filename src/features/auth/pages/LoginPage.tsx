import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../components/LoginForm";
import $api from "../../../api/axios";

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // login(); // Здесь вместо реального запроса просто активируем сессию
    $api.get("");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg border border-blue-gray-200">
      {/* <h1 className="text-2xl font-bold text-center text-blue-gray-800 mb-6">Вход</h1> */}
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
