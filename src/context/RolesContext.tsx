import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Role {
    name: string;
    description: string;
}

interface RolesContextType {
    roles: Role[];
    isLoading: boolean;
    getRoleDescription: (name: string) => string;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const RolesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}auth/roles`);
                if (!res.ok) {
                    throw new Error('Сервер ответил ошибкой при запросе ролей');
                }
                const data = await res.json();
                setRoles(data);
            } catch (error) {
                console.error("Не удалось загрузить роли:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoles();
    }, []);

    // Вспомогательная функция для получения русского названия по системному имени
    const getRoleDescription = (name: string): string => {
        const role = roles.find(r => r.name === name);
        return role ? role.description : name;
    };

    const value = { roles, isLoading, getRoleDescription };

    return (
        <RolesContext.Provider value={value}>
            {children}
        </RolesContext.Provider>
    );
};

// Хук для удобного использования контекста
export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) {
        throw new Error('useRoles must be used within a RolesProvider');
    }
    return context;
};