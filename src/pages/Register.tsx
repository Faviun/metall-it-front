import { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { colors } from "../constants/themeColors";

  const commonPlaceholderProps = {
    placeholder: undefined,
    onResize: undefined,
    onResizeCapture: undefined,
    onPointerEnterCapture: undefined,
    onPointerLeaveCapture: undefined,
  };

  const themeStyles = {
    light: { border: 'focus:border-[#D4AF37]' },
    dark: { border: 'focus:border-[#FFD700]' },
  };

function RegisterFormTest() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { theme } = useTheme();
    const currentThemeColors = colors[theme];

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    setError('');
    setSuccess('');
    setIsLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Введите корректный email.');
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов.');
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Пароли не совпадают.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://185.23.34.85:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setIsLoading(false);

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Ошибка регистрации");
      }

      const data = await res.json();
      setMessage(`✅ Пользователь создан: ${data.user.email}`);
      localStorage.setItem("access_token", data.access_token);
      setMessage("✅ Успешный вход!");
      navigate("/profile");
      
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className={`max-w-sm mx-auto mt-10 space-y-6 p-6 rounded-lg shadow-lg border transition-colors duration-300
        ${currentThemeColors.secondaryBackground}
        ${currentThemeColors.bordersDividers}`}>
      <Typography
        variant="h4"
        className={`text-center mb-6 ${currentThemeColors.primaryText}`}
        {...commonPlaceholderProps}
      >
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          /> */}
          <Input
            crossOrigin={undefined} label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`${currentThemeColors.primaryText}`}
            labelProps={{ className: `${currentThemeColors.secondaryText}` }}
            containerProps={{ className: "min-w-0" }}
            {...commonPlaceholderProps}      
          />
        {/* <div style={{ marginBottom: 10 }}>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            style={{ width: "100%", padding: 8 }}
          />
        </div> */}
        <Input
        crossOrigin={undefined} type="password"
        label="Пароль"
        name="password"
        value={form.password}
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
        value={form.confirmPassword}
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
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
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
    </div>
  );
}

export default RegisterFormTest;