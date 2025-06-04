import { Link } from "react-router-dom";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { colors } from "../../../constants/themeColors";
import $api from '../../../api/axios';

interface RegisterSuccessResponse {
  message?: string;
  id?: number;
}

interface RegisterErrorResponse {
  message: string;
}

function RegisterForm() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  const themeStyles = {
    light: { border: 'focus:border-[#D4AF37]' },
    dark: { border: 'focus:border-[#FFD700]' },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Введите корректный email.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов.');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await $api.post<RegisterSuccessResponse>('/users', {
        title: formData.email,
        body: formData.password,
        userId: 1,
      });

      setIsLoading(false);
      if (response.status === 201) {
        setSuccess(`Регистрация прошла успешно (тест с JSONPlaceholder)! ID нового поста: ${response.data.id}`);
        setFormData({ email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
        }, 2000);
      } else {
        setError('Неизвестная ошибка регистрации (тест с JSONPlaceholder).');
      }
    // try {
    //   const response = await $api.post<RegisterSuccessResponse>('/auth/register', {
    //     email: formData.email,
    //     password: formData.password,
    //   });
    
    //   setIsLoading(false);
    //   if (response.status === 201) {
    //     setSuccess(response.data.message || 'Регистрация прошла успешно! Теперь вы можете войти.');
    //     setFormData({ email: '', password: '', confirmPassword: '' });
    //     setTimeout(() => {
    //       navigate('/login');
    //     }, 2000);
    //   } else {
    //     setError('Неизвестная ошибка регистрации.');
    //   }
  
    } catch (err: unknown) {
      setIsLoading(false);
      // Если происходит ошибка сети или другая ошибка Axios
      if ((err as any).isAxiosError && (err as any).response) {
        const errorData = (err as any).response.data as RegisterErrorResponse;
        setError(errorData.message || 'Ошибка регистрации (тест с JSONPlaceholder): неизвестная ошибка сервера.');
      } else {
        setError('Произошла непредвиденная ошибка (тест с JSONPlaceholder).');
      }
    }
  };

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto space-y-4">
      <Typography
        variant="h4"
        className={`text-center mb-6 ${currentThemeColors.primaryText}`}
        {...commonPlaceholderProps}
      >
        Регистрация
      </Typography>
      <Input
        crossOrigin={undefined} label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        className={`${currentThemeColors.primaryText} ${themeStyles[theme].border}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      />
      <Input
        crossOrigin={undefined} type="password"
        label="Пароль"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className={`${currentThemeColors.primaryText} ${themeStyles[theme].border}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      />
      <Input
        crossOrigin={undefined} type="password"
        label="Повторите пароль"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className={`${currentThemeColors.primaryText} ${themeStyles[theme].border}`}
        labelProps={{ className: `${currentThemeColors.secondaryText}` }}
        containerProps={{ className: "min-w-0" }}
        {...commonPlaceholderProps}      />
      {error && (
        <Typography
          color="red"
          className="mb-4 text-center"
          role="alert"
          {...commonPlaceholderProps}
        >
          {error}
        </Typography>
      )}
      {success && (
        <Typography
          color="green"
          className="mb-4 text-center"
          role="alert"
          {...commonPlaceholderProps}
        >
          {success}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        className={`mt-4 ${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
        {...commonPlaceholderProps}
      >
        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
      <div className="mt-4 text-center">
        <Typography
          variant="small"
          className={`${currentThemeColors.secondaryText}`}
          {...commonPlaceholderProps}
        >
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            className={`${currentThemeColors.primaryAccent.includes('text-black') ? 'text-black' : 'text-white'} hover:underline`}
            style={{ color: theme === 'light' ? '#B36700' : '#FFD700' }}
          >
            Войти
          </Link>
        </Typography>
      </div>
    </form>
  );
}

export default RegisterForm;