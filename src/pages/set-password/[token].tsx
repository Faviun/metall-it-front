import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useParams,
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";

function SetPasswordPage() {
    // useParams() извлекает динамическую часть из URL (:token)
    // const { token } = useParams<{ token: string }>();
    const token = "test-token-123"; 
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });

    const { theme } = useTheme();
    const currentThemeColors = colors[theme];

    useEffect(() => {
        if (!token) {
            // Если токена в URL нет, отправляем пользователя на главную
            navigate("/");
        }
    }, [token, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFeedback({ text: '', type: '' });
        setIsLoading(true);

        if (form.password.length < 6) {
            setFeedback({ text: 'Пароль должен содержать минимум 6 символов.', type: 'error' });
            setIsLoading(false);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setFeedback({ text: 'Пароли не совпадают.', type: 'error' });
            setIsLoading(false);
            return;
        }

        // try {
        //     const payload = {
        //         token: token,
        //         password: form.password,
        //     };

        //     const res = await fetch(`${import.meta.env.VITE_API_URL}auth/set-password`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(payload),
        //     });

        //     const data = await res.json();
        //     if (!res.ok) {
        //         throw new Error(data.message || "Ошибка: не удалось установить пароль. Возможно, ссылка устарела.");
        //     }

        //     setFeedback({ text: "✅ Пароль успешно установлен! Сейчас вы будете перенаправлены на страницу входа.", type: 'success' });

        //     setTimeout(() => {
        //         navigate("/login");
        //     }, 2000);

        // } catch (err) {
        //     if (err instanceof Error) {
        //         setFeedback({ text: `❌ ${err.message}`, type: 'error' });
        //     }
        // } finally {
        //     setIsLoading(false);
        // }
    console.log("Симуляция отправки данных:", { token, password: form.password });

    // Симулируем задержку ответа от сервера в 1.5 секунды
    setTimeout(() => {
        // --- Чтобы проверить сценарий УСПЕХА, используйте этот блок ---
        setFeedback({ text: "✅ Пароль успешно установлен! (симуляция)", type: 'success' });
        setTimeout(() => navigate("/login"), 2000);

        /*
        // --- А чтобы проверить сценарий ОШИБКИ, используйте этот ---
        setFeedback({ 
            text: "❌ Ошибка: ссылка устарела или недействительна (симуляция)", 
            type: 'error' 
        });
        */

        setIsLoading(false);
    }, 1500);

    };

    return (
        <div className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg border 
            ${currentThemeColors.secondaryBackground} 
            ${currentThemeColors.bordersDividers}`}
        >
            <h2 className={`text-center text-3xl font-bold mb-6 ${currentThemeColors.primaryText}`}>
                Установка нового пароля
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="password" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>
                        Придумайте пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="standard-input"
                    />
                </div>
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
                        className="standard-input"
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
                    className={isLoading ? 'inactive-button' : 'primary-button'}
                >
                    {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
                </button>
            </form>
        </div>
    );
}

export default SetPasswordPage;