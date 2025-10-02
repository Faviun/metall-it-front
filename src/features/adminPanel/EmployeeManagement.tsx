import { useState, useEffect, useCallback } from 'react';
import apiFetch from '@/utils/api';
import { Link } from 'react-router-dom'; 
import ConfirmationModal from '@/components/common/ConfirmationModal';
import { useRoles } from '@/context/RolesContext';

interface EmployeeManagementProps {
    mode: 'employees' | 'customers';
}

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: {
        name: string;
        description: string;
    };
    // role: string;
}

function EmployeeManagement({ mode }: EmployeeManagementProps) {
    const [form, setForm] = useState({ email: '', firstName: '', lastName: '', role: '' });
    const [isFormLoading, setIsFormLoading] = useState(false);
    const [feedback, setFeedback] = useState({ text: '', type: '' });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [allUsers, setAllUsers] = useState<Employee[]>([]);
    const [isListLoading, setIsListLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<Employee | null>(null);
    const { roles, getRoleDescription, isLoading: areRolesLoading } = useRoles();

    const fetchUsers = useCallback(async () => {
        setIsListLoading(true);
        try {
            const data = await apiFetch(`${import.meta.env.VITE_API_URL}users`);
            setAllUsers(data);
        } catch (err) {
            console.error("Ошибка при загрузке списка пользователей:", err);
        } finally {
            setIsListLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (!areRolesLoading && roles.length > 0) {
            // Устанавливаем первую роль из списка (кроме USER) как роль по умолчанию
            const defaultRole = roles.find(r => r.name !== 'USER');
            if (defaultRole) {
                setForm(prev => ({ ...prev, role: defaultRole.name }));
            }
        }
    }, [roles, areRolesLoading]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsFormLoading(true);
        setFeedback({ text: '', type: '' });
        try {
            const payload = {
                email: form.email,
                firstname: form.firstName,
                lastname: form.lastName,
                role: form.role
            };
            await apiFetch(`${import.meta.env.VITE_API_URL}auth/invite`, {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            setFeedback({ text: `✅ Приглашение успешно отправлено!`, type: 'success' });
            const defaultRole = roles.find(r => r.name !== 'USER');
            setForm({ email: '', firstName: '', lastName: '', role: defaultRole ? defaultRole.name : '' });
            setIsFormVisible(false);
            setTimeout(() => fetchUsers(), 1000);
        } catch (err) {
            if (err instanceof Error) {
                setFeedback({ text: `❌ ${err.message}`, type: 'error' });
            }
        } finally {
            setIsFormLoading(false);
        }
    };

    const handleOpenDeleteModal = (user: Employee) => {
        setUserToDelete(user);
        setIsModalOpen(true);
    };
    

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        try {
            await apiFetch(`${import.meta.env.VITE_API_URL}users/${userToDelete.id}`, {
                method: 'DELETE',
            });
            setAllUsers(prev => prev.filter(emp => emp.id !== userToDelete.id));
        } catch (err) {
            console.error("Ошибка при удалении пользователя:", err);
        } finally {
            setIsModalOpen(false);
            setUserToDelete(null);
        }
    };

    const employeeRolesForSelect = roles.filter(role => role.name !== 'USER');


    const filteredUsers = allUsers.filter(user => {
        if (mode === 'employees') {
            return user.role?.name !== 'USER'; // Показываем всех, КРОМЕ 'USER'
        } else { // mode === 'customers'
            return user.role?.name === 'USER'; // Показываем ТОЛЬКО 'USER'
        }
    });

    const title = mode === 'employees' ? 'Управление сотрудниками' : 'Управление пользователями';
    const listTitle = mode === 'employees' ? 'Список сотрудников' : 'Список пользователей';

    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="h3-header">{title}</h3>
                {mode === 'employees' && (
                    <button onClick={() => setIsFormVisible(!isFormVisible)} className="primary-button w-auto">
                        {isFormVisible ? 'Скрыть форму' : 'Добавить сотрудника'}
                    </button>
                )}
            </div>
            
            {isFormVisible && mode === 'employees' && (
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                    <h4 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Добавить нового сотрудника</h4>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <select name="role" value={form.role} onChange={handleChange} disabled={areRolesLoading} className="select w-full">
                            {areRolesLoading ? (
                                <option>Загрузка ролей...</option>
                            ) : (
                                employeeRolesForSelect.map(role => (
                                    <option key={role.name} value={role.name}>
                                        {role.description}
                                    </option>
                                ))
                            )}
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
            
            <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
                <h4 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">{listTitle}</h4>
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
                                    <th className="p-2 text-right">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(emp => (
                                    <tr key={emp.id} className="border-b border-light-border dark:border-dark-border last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="p-2">{emp.id}</td>
                                        <td className="p-2">{emp.firstName} {emp.lastName}</td>
                                        <td className="p-2">{emp.email}</td>
                                        <td className="p-2">{getRoleDescription(emp.role.name)}</td>
                                        <td className="p-2 text-right">
                                            <div className="flex justify-end gap-4">
                                                <Link to={`/admin-panel/users/${emp.id}`} className="primary-button w-auto text-center">
                                                    Редактировать
                                                </Link>
                                                <button onClick={() => handleOpenDeleteModal(emp)} className="secondary-button">
                                                    Удалить
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Подтверждение удаления"
                message={`Вы уверены, что хотите удалить пользователя ${userToDelete?.firstName} ${userToDelete?.lastName}? Это действие необратимо.`}
                onConfirm={handleConfirmDelete}
                onClose={() => setIsModalOpen(false)}
                confirmText="Да, удалить"
            />
        </div>
        
    );
}

export default EmployeeManagement;