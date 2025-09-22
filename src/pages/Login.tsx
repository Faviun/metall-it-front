import { Button, Input, Typography } from "@material-tailwind/react";
import  { useState } from "react";
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

function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { theme } = useTheme();
  const currentThemeColors = colors[theme];

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    if (!form.email || !form.password) {
        setMessage('Пожалуйста, введите email и пароль.');
        setIsLoginLoading(false);
        return;
    }

    try {
      const res = await fetch("http://185.23.34.85:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка авторизации");

      setIsLoginLoading(false);

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
        as="h4"
        className={`text-center mb-6 ${currentThemeColors.primaryText}`}
        {...commonPlaceholderProps}
      >
        Вход
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" /> */}
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`${currentThemeColors.primaryText}`}
          labelProps={{ className: `${currentThemeColors.secondaryText}` }}
          containerProps={{ className: "min-w-0" }}
          {...commonPlaceholderProps}
          crossOrigin={undefined}
        />
        {/* <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Пароль" /> */}
        <Input
          type="password"
          label="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={`${currentThemeColors.primaryText}`}
          labelProps={{ className: `${currentThemeColors.secondaryText}` }}
          containerProps={{ className: "min-w-0" }}
          {...commonPlaceholderProps}
          crossOrigin={undefined}
        />
        {message && (
        <Typography
          color='red'
          className="text-center"
          role="alert"
          {...commonPlaceholderProps}
        >
          {message}
        </Typography>
      )}
        <Button
        type="submit"
        fullWidth
        disabled={isLoginLoading}
        className={`${currentThemeColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
        {...commonPlaceholderProps}
      >
        {isLoginLoading ? 'Вход...' : 'Войти'}
      </Button>
      </form>
      {/* {message && <p>{message}</p>} */}

      <div className="mt-4 text-center">
        <Typography
          variant="small"
          className={`${currentThemeColors.secondaryText}`}
          {...commonPlaceholderProps}
        >
          Нет аккаунта?{" "}
          <Link
            to="/register"
            className={`${currentThemeColors.primaryAccent.includes('text-black') ? 'text-black' : 'text-white'} hover:underline`}
            style={{ color: theme === 'light' ? '#B36700' : '#FFD700' }}
          >
            Регистрация
          </Link>
        </Typography>
      </div>

    </div>
  );
}

export default LoginForm;