import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiFetch from '@/utils/api';

interface Role {
    name: string;
    description: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    sex?: string;
    role: Role;
}

const ROLES_MAP: { [key: string]: string } = {
    'ADMIN': 'Администратор',
    'SALES_MANAGER': 'Менеджер по продажам',
    'LOGIST': 'Логист',
    'SUPPLY_MANAGER': 'Снабженец',
    'USER': 'Пользователь',
};
const ROLE_KEYS = Object.keys(ROLES_MAP);

function UserEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const [user, setUser] = useState<Partial<User>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                // Когда бэкенд будет готов, эта строка заработает
                // const data = await apiFetch(`${import.meta.env.VITE_API_URL}admin/users/${id}`);
                // setUser(data);

                // А пока используем заглушку, имитирующую ответ API
                console.log(`Загрузка данных для пользователя с ID: ${id}`);
                const mockUser: User = {
                    id: Number(id),
                    firstName: 'Елена',
                    lastName: 'Менеджерова',
                    email: 'manager@example.com',
                    phone: '+79112223344',
                    address: 'Санкт-Петербург, Невский пр. 1',
                    sex: 'female',
                    role: { name: 'SALES_MANAGER', description: 'Менеджер по продажам' }
                };
                setTimeout(() => {
                    setUser(mockUser);
                    setIsLoading(false);
                }, 1000);

            } catch (err) {
                setFeedback({ text: 'Не удалось загрузить данные пользователя.', type: 'error' });
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setUser(prev => ({
                ...prev,
                role: { name: value, description: ROLES_MAP[value] }
            }));
        } else {
            setUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback({ text: '', type: '' });

        try {
            const payload = {
                ...user,
                role: user.role?.name
            };
            
            await apiFetch(`${import.meta.env.VITE_API_URL}users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
            setFeedback({ text: '✅ Профиль успешно обновлен!', type: 'success' });
        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ text: `❌ ${err.message}`, type: 'error' });
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center p-10">Загрузка профиля...</div>;
    }

    return (
        <div className="bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-md w-full border border-light-border dark:border-dark-border">
            <h3 className="h3-header">Редактирование пользователя: {user.firstName} {user.lastName}</h3>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                    <input type="email" disabled value={user.email || ''} className="standard-input disabled:bg-gray-200 dark:disabled:bg-gray-700" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Имя</label>
                        <input id="firstName" name="firstName" value={user.firstName || ''} onChange={handleChange} className="standard-input" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Фамилия</label>
                        <input id="lastName" name="lastName" value={user.lastName || ''} onChange={handleChange} className="standard-input" />
                    </div>
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Роль</label>
                    <select id="role" name="role" value={user.role?.name} onChange={handleChange} className="select w-full">
                        {ROLE_KEYS.map(roleKey => (
                            <option key={roleKey} value={roleKey}>
                                {ROLES_MAP[roleKey]}
                            </option>
                        ))}
                    </select>
                </div>
                
                {feedback.text && <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>{feedback.text}</div>}
                
                <div className="flex gap-4 pt-4">
                    <button type="submit" disabled={isSaving} className={isSaving ? 'inactive-button' : 'primary-button'}>
                        {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                    </button>
                    <button type="button" onClick={() => navigate('/admin-panel')} className="secondary-button">
                        Назад к списку
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UserEditPage;