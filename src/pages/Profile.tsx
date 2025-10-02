import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";
import apiFetch from '@/utils/api'

interface UserProfile {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    address: string | null;
    sex: string | null;
    role: {
        name: string;
        description: string;
    };
}

function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [editData, setEditData] = useState<Partial<UserProfile>>({});
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const { theme } = useTheme();
    const currentThemeColors = colors[theme];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data: UserProfile = await apiFetch(`${import.meta.env.VITE_API_URL}users/profile`);
                setUser(data);
                setEditData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setFeedback({ text: err.message, type: 'error' });
                }
                localStorage.removeItem("access_token");
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setFeedback({ text: '', type: '' });
        try {
            const updatedUser: UserProfile = await apiFetch(`${import.meta.env.VITE_API_URL}users/profile`, {
                method: "PUT",
                body: JSON.stringify(editData),
            });
            setUser(updatedUser);
            setEditData(updatedUser);
            setFeedback({ text: '✅ Профиль успешно обновлён!', type: 'success' });
        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ text: `❌ ${err.message}`, type: 'error' });
            }
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    if (!user) {
        return (
            <div className="text-center mt-20">
                <p className={`${currentThemeColors.primaryText}`}>Загрузка профиля...</p>
                {feedback.text && <p className="alert-error mt-4">{feedback.text}</p>}
            </div>
        );
    }
    
    return (
        <div className={`max-w-md mx-auto mt-10 p-8 rounded-lg shadow-lg border ${currentThemeColors.secondaryBackground} ${currentThemeColors.bordersDividers}`}>
            <h2 className={`text-center text-3xl font-bold mb-6 ${currentThemeColors.primaryText}`}>
                Профиль пользователя
            </h2>
            <div className="space-y-6">
                {/* Email (нередактируемый) */}
                <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>Email</label>
                    <input id="email" type="email" disabled value={user.email} className="standard-input disabled:bg-gray-200 dark:disabled:bg-gray-700" />
                </div>
                
                {/* Редактируемые поля */}
                <div>
                    <label htmlFor="firstName" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>Имя</label>
                    <input id="firstName" name="firstName" type="text" value={editData.firstName || ""} onChange={handleChange} className="standard-input" />
                </div>
                
                <div>
                    <label htmlFor="lastName" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>Фамилия</label>
                    <input id="lastName" name="lastName" type="text" value={editData.lastName || ""} onChange={handleChange} className="standard-input" />
                </div>

                <div>
                    <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>Телефон</label>
                    <input id="phone" name="phone" type="text" value={editData.phone || ""} onChange={handleChange} className="standard-input" />
                </div>

                <div>
                    <label htmlFor="address" className={`block text-sm font-medium mb-1 ${currentThemeColors.secondaryText}`}>Адрес</label>
                    <input id="address" name="address" type="text" value={editData.address || ""} onChange={handleChange} className="standard-input" />
                </div>

                {/* Блок для сообщений */}
                {feedback.text && (
                    <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>
                        {feedback.text}
                    </div>
                )}

                {/* Блок с кнопками */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button onClick={handleSave} disabled={isSaving} className={isSaving ? 'inactive-button' : 'primary-button'}>
                        {isSaving ? "Сохранение..." : "Сохранить"}
                    </button>
                    <button onClick={handleLogout} className="secondary-button">
                        Выйти
                    </button>
                </div>

                {/* Кнопка для администратора */}
                {user.role?.name === 'ADMIN' && (
                    <button onClick={() => navigate("/admin-panel")} className="dark-button mt-4">
                        Панель администратора
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;