import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    // ✨ Используем единое состояние для всех сообщений
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const { theme } = useTheme();
    const currentThemeColors = colors[theme];

    // ✨ Добавляем строгую типизацию
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback({ text: '', type: '' });
        setIsLoading(true); // ✨ Устанавливаем состояние загрузки

        if (!form.email || !form.password) {
            setFeedback({ text: 'Пожалуйста, введите email и пароль.', type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            // ✨ Используем apiFetch вместо стандартного fetch
            // Обратите внимание, что здесь токен не нужен, поэтому мы делаем "публичный" запрос
            const res = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Ошибка авторизации: неверный email или пароль.");
            }

            localStorage.setItem("access_token", data.access_token);
            setFeedback({ text: "✅ Успешный вход! Перенаправляем...", type: 'success' });

            setTimeout(() => {
                navigate("/profile");
            }, 1000);

        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ text: `❌ ${err.message}`, type: 'error' });
            } else {
                setFeedback({ text: '❌ Произошла неизвестная ошибка', type: 'error' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg border 
            ${currentThemeColors.secondaryBackground} 
            ${currentThemeColors.bordersDividers}`}
        >
            <h2 className={`text-center text-3xl font-bold mb-6 ${currentThemeColors.primaryText}`}>
                Вход в аккаунт
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="standard-input" // ✨ Используем ваш класс для инпута
                    />
                </div>
                <div>
                    <label htmlFor="password" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>
                        Пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="standard-input" // ✨ Используем ваш класс для инпута
                    />
                </div>
                
                {feedback.text && (
                    <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>
                        {feedback.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={isLoading ? 'inactive-button' : 'primary-button'} // ✨ Используем ваши классы для кнопки
                >
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>

                <p className={`text-center text-sm ${currentThemeColors.secondaryText}`}>
                    Нет аккаунта?{' '}
                    <Link to="/register" className="font-medium text-accent hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;