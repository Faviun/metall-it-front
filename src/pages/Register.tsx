import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

// Определяем тип для ошибок формы, чтобы подсвечивать конкретные поля
type FormErrors = {
    email?: string;
    password?: string;
    confirmPassword?: string;
};

function RegisterPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { theme } = useTheme();
    const currentThemeColors = colors[theme];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Сбрасываем ошибку для поля, которое пользователь начал редактировать
        if (formErrors[e.target.name as keyof FormErrors]) {
            setFormErrors({ ...formErrors, [e.target.name]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback({ text: '', type: '' });
        setFormErrors({});
        setIsLoading(true);

        // --- Блок валидации ---
        const errors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            errors.email = 'Введите корректный email.';
        }
        if (form.password.length < 6) {
            errors.password = 'Пароль должен содержать минимум 6 символов.';
        }
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsLoading(false);
            return;
        }

        try {
            const payload = { email: form.email, password: form.password };
            const res = await fetch(`${import.meta.env.VITE_API_URL}auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Ошибка регистрации");
            }
            
            localStorage.setItem("access_token", data.access_token);
            setFeedback({ text: `Добро пожаловать, ${data.user.email}!`, type: 'success' });

            setTimeout(() => navigate("/profile"), 1000);

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
        // Используем ваши классы для контейнера формы
        <div className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg border 
            ${currentThemeColors.secondaryBackground} 
            ${currentThemeColors.bordersDividers}`}
        >
            <h2 className={`text-center text-3xl font-bold mb-6 ${currentThemeColors.primaryText}`}>
                Регистрация
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Поле Email */}
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
                        // Условно применяем класс для ошибки
                        className={formErrors.email ? 'error-input' : 'standard-input'}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                {/* Поле Пароль */}
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
                        className={formErrors.password ? 'error-input' : 'standard-input'}
                    />
                    {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                </div>

                {/* Поле Повторите пароль */}
                <div>
                    <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>
                        Повторите пароль
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className={formErrors.confirmPassword ? 'error-input' : 'standard-input'}
                    />
                    {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
                </div>
                
                {/* Блок для сообщений об успехе или ошибках сервера */}
                {feedback.text && (
                    <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>
                        {feedback.text}
                    </div>
                )}

                {/* Кнопка отправки */}
                <button
                    type="submit"
                    disabled={isLoading}
                    // Условно применяем класс для неактивной кнопки
                    className={isLoading ? 'inactive-button' : 'primary-button'}
                >
                    {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>

                <p className={`text-center text-sm ${currentThemeColors.secondaryText}`}>
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="font-medium text-accent hover:underline">
                        Войти
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterPage;