import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import type { LoginData } from "../types/auth";
import $api from "../../../api/axios";
import { useTheme } from "../../../context/ThemeContext";
import { colors } from "../../../constants/themeColors";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const { theme } = useTheme();
  const currentThemeColors = colors[theme];
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginMessage('');
    setIsLoginLoading(true);

    // Валидация (можно добавить базовую валидацию, как в RegisterForm)
    if (!formData.email || !formData.password) {
        setLoginMessage('Пожалуйста, введите email и пароль.');
        setIsLoginLoading(false);
        return;
    }

    try {
      const result = await $api.post("/posts", {
          email: formData.email,
          password: formData.password,
          userId: 1
      });

      setIsLoginLoading(false);
      console.log("JSONPlaceholder Login Test Result:", result.data);

      if (result.status === 201) {
        setLoginMessage(`Вход успешно имитирован (тест с JSONPlaceholder)! Получены данные: ${JSON.stringify(result.data)}`);
        setFormData({ email: '', password: '' });

        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setLoginMessage('Неизвестный ответ от JSONPlaceholder.');
      }

    } catch (error: any) {
      setIsLoginLoading(false);
      console.error("Login Test Error:", error);
      if (error.response) {
        setLoginMessage(`Ошибка входа (тест): ${error.response.status} - ${error.response.data?.message || 'Неизвестная ошибка.'}`);
      } else if (error.request) {
        setLoginMessage('Сетевая ошибка: Сервер не отвечает.');
      } else {
        setLoginMessage('Произошла непредвиденная ошибка.');
      }
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoginMessage('');
  //   setIsLoginLoading(true);
  
  //   if (!formData.email || !formData.password) {
  //       setLoginMessage('Пожалуйста, введите email и пароль.');
  //       setIsLoginLoading(false);
  //       return;
  //   }
  
  //   try {
  //     const result = await $api.post("/auth/login", {
  //         email: formData.email,
  //         password: formData.password,
  //     });
  
  //     setIsLoginLoading(false);
  //     console.log("Real Backend Login Result:", result.data);
  
  //     if (result.status === 200) {
  //       const { token, refreshToken } = result.data;
  
  //       localStorage.setItem('authToken', token);
  //       localStorage.setItem('refreshToken', refreshToken);
  
  //       setLoginMessage('Вход выполнен успешно!');
  
  //       setTimeout(() => {
  //         navigate('/profile');
  //       }, 1500);
  //     } else {
  //       setLoginMessage('Неизвестный ответ от сервера.');
  //     }
  
  //   } catch (error: any) {
  //     setIsLoginLoading(false);
  //     console.error("Login Error:", error);
  
  //     if (error.response) {
  //       const { status, data } = error.response;
  //       if (status === 401) {
  //         setLoginMessage(data.message || 'Неверный email или пароль.');
  //       } else if (status === 400) {
  //           setLoginMessage(data.message || 'Ошибка запроса. Проверьте введенные данные.');
  //       }
  //       else {
  //         setLoginMessage(data.message || `Ошибка входа: ${status} - Неизвестная ошибка сервера.`);
  //       }
  //     } else if (error.request) {
  //       setLoginMessage('Сетевая ошибка: Сервер не отвечает или отсутствует интернет-соединение.');
  //     } else {
  //       setLoginMessage('Произошла непредвиденная ошибка.');
  //     }
  //   }
  // };

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-sm mx-auto mt-10 space-y-6 p-6 rounded-lg shadow-lg border transition-colors duration-300
        ${currentThemeColors.secondaryBackground}
        ${currentThemeColors.bordersDividers}`}
    >
      <Typography
        variant="h4"
        as="h4"
        className={`text-center mb-6 ${currentThemeColors.primaryText}`}
        {...commonPlaceholderProps}
      >
        Вход
      </Typography>
      <div>
        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${currentThemeColors.primaryText} focus:border-${theme === 'light' ? '[#D4AF37]' : '[#FFD700]'}`}
          labelProps={{ className: `${currentThemeColors.secondaryText}` }}
          containerProps={{ className: "min-w-0" }}
          {...commonPlaceholderProps}
          crossOrigin={undefined}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`${currentThemeColors.primaryText} focus:border-${theme === 'light' ? '[#D4AF37]' : '[#FFD700]'}`}
          labelProps={{ className: `${currentThemeColors.secondaryText}` }}
          containerProps={{ className: "min-w-0" }}
          {...commonPlaceholderProps}
          crossOrigin={undefined}
        />
      </div>
      {loginMessage && (
        <Typography
          color={loginMessage.includes('успешно') ? 'green' : 'red'}
          className="mb-4 text-center"
          role="alert"
          {...commonPlaceholderProps}
        >
          {loginMessage}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        disabled={isLoginLoading}
        className={`mt-4 ${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
        {...commonPlaceholderProps}
      >
        {isLoginLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}