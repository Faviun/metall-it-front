import { useState, useEffect } from 'react';
import apiFetch from '@/utils/api';

// Тип для объекта сотрудника, который мы будем получать с бэкенда
interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: {
        name: string;
        description: string;
    };
}

// Временные данные, пока бэкенд в разработке
const MOCK_EMPLOYEES: Employee[] = [
    { id: 1, firstName: 'Иван', lastName: 'Админов', email: 'admin@example.com', role: { name: 'ADMIN', description: 'Администратор' } },
    { id: 2, firstName: 'Елена', lastName: 'Менеджерова', email: 'manager@example.com', role: { name: 'SALES_MANAGER', description: 'Менеджер по продажам' } },
];

// ... (словарь EMPLOYEE_ROLES_MAP остается без изменений)
const EMPLOYEE_ROLES_MAP: { [key: string]: string } = {
    'MANAGER': 'Менеджер',
    'LOGIST': 'Логист',
    'ACCOUNTANT': 'Бухгалтер',
    'SUPPLY_MANAGER': 'Снабженеец',
};
const EMPLOYEE_ROLE_KEYS = Object.keys(EMPLOYEE_ROLES_MAP);


function EmployeeManagement() {
    // Состояние для формы
    const [form, setForm] = useState({ email: '', firstName: '', lastName: '', role: 'MANAGER' });
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    
    // ✨ Новые состояния
    const [isFormVisible, setIsFormVisible] = useState(false); // Видимость формы
    const [employees, setEmployees] = useState<Employee[]>([]); // Список сотрудников
    const [isListLoading, setIsListLoading] = useState(true); // Загрузка списка

    // Загрузка списка сотрудников при монтировании компонента
    useEffect(() => {
        const fetchEmployees = async () => {
            setIsListLoading(true);
            try {
                // Когда бэкенд будет готов, эта строка заработает
                // const data = await apiFetch(`${import.meta.env.VITE_API_URL}admin/users`);
                // setEmployees(data);

                // А пока используем заглушку с задержкой
                setTimeout(() => {
                    setEmployees(MOCK_EMPLOYEES);
                    setIsListLoading(false);
                }, 1000);

            } catch (err) {
                // Обработка ошибки загрузки списка
                setIsListLoading(false);
            }
        };

        fetchEmployees();
    }, []);
    
    // ... (функции handleChange и handleSubmit остаются без изменений)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormLoading(true);
        setFeedback({ text: '', type: '' });
        try {
            const response = await apiFetch(`${import.meta.env.VITE_API_URL}admin/users`, {
                method: 'POST',
                body: JSON.stringify(form),
            });
            setFeedback({ text: `✅ ${response.message}`, type: 'success' });
            setForm({ email: '', firstName: '', lastName: '', role: 'MANAGER' });
            setIsFormVisible(false); // Скрываем форму после успеха
            // Тут нужно будет обновить список сотрудников
        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ text: `❌ ${err.message}`, type: 'error' });
            }
        } finally {
            setIsFormLoading(false);
        }
    };


    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="h3-header">Управление сотрудниками</h3>
                {/* ✨ Кнопка для переключения видимости формы */}
                <button onClick={() => setIsFormVisible(!isFormVisible)} className="primary-button w-auto">
                    {isFormVisible ? 'Скрыть форму' : 'Добавить сотрудника'}
                </button>
            </div>
            
            {/* ✨ Форма добавления теперь показывается по условию */}
            {isFormVisible && (
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                    <h4 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Добавить нового сотрудника</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* ... код формы без изменений ... */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Имя</label>
                            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="standard-input" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Фамилия</label>
                            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="standard-input" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required className="standard-input" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Роль</label>
                        <select name="role" value={form.role} onChange={handleChange} className="select w-full">
                            {EMPLOYEE_ROLE_KEYS.map(roleKey => (
                                <option key={roleKey} value={roleKey}>
                                    {EMPLOYEE_ROLES_MAP[roleKey]} 
                                </option>
                            ))}
                        </select>
                    </div>

                    {feedback.text && (
                        <div className={feedback.type === 'error' ? 'alert-error' : 'alert-success'}>
                            {feedback.text}
                        </div>
                    )}

                    <button type="submit" disabled={isFormLoading} className={isFormLoading ? 'inactive-button' : 'primary-button'}>
                        {isFormLoading ? 'Отправка...' : 'Отправить приглашение'}
                    </button>
                    </form>
                </div>
            )}
            
            {/* ✨ Новый блок для отображения списка сотрудников */}
            <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                <h4 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Список сотрудников</h4>
                {isListLoading ? (
                    <p className="text-gray-500 dark:text-gray-400">Загрузка списка...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-light-border dark:border-dark-border">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Имя</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Роль</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id} className="border-b border-light-border dark:border-dark-border last:border-b-0">
                                        <td className="p-2">{emp.id}</td>
                                        <td className="p-2">{emp.firstName} {emp.lastName}</td>
                                        <td className="p-2">{emp.email}</td>
                                        <td className="p-2">{emp.role.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmployeeManagement;