import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// Типизация для пропсов компонента
interface AdminMenuProps {
  activeView: string;
  setActiveView: Dispatch<SetStateAction<string>>;
}

// Определяем типы для элементов меню
type MenuItemType = {
  id: string;
  label: string;
  subItems?: SubMenuItemType[];
};
type SubMenuItemType = {
  id: string;
  label: string;
};

// Данные для пунктов меню
const menuItems: MenuItemType[] = [
    { id: 'parsers', label: 'Парсеры' },
    {
        id: 'directories', label: 'Справочники', subItems: [
            { id: 'employees', label: 'Сотрудники' },
            { id: 'nomenclature', label: 'Номенклатура' },
            { id: 'cities', label: 'Города' },
            { id: 'legalEntities', label: 'Юр. лица' },
            { id: 'departments', label: 'Отделы' },
            { id: 'units', label: 'Единицы измерения' },
            { id: 'suppliers', label: 'Поставщики' },
            { id: 'users', label: 'Пользователи' },
        ]
    },
];


export default function AdminMenu({ activeView, setActiveView }: AdminMenuProps) {
  // Состояние для отслеживания открытых списков
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    directories: true // 'directories' открыт по умолчанию
  });

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Внутренний компонент для одного пункта меню
  const MenuItemButton = ({ item, isSubItem = false }: { item: SubMenuItemType, isSubItem?: boolean }) => {
    const isActive = activeView === item.id;
    const baseClasses = `w-full text-left p-2 rounded-md transition-colors duration-200 text-lg ${isSubItem ? 'pl-8' : 'pl-4'}`;
    const activeClasses = 'bg-accent text-black font-semibold';
    const inactiveClasses = 'hover:bg-gray-200';

    return (
        <button
            onClick={() => setActiveView(item.id)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {item.label}
        </button>
    );
  };

  return (
    <nav className="w-[300px] flex-shrink-0 bg-white rounded-lg shadow-md p-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.id}>
            {/* 💡 Проверяем наличие subItems. Это и есть исправление. */}
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex justify-between items-center text-left p-2 pl-4 rounded-md hover:bg-gray-200 font-bold text-lg"
                >
                  <span>{item.label}</span>
                  <svg className={`w-5 h-5 transition-transform ${openMenus[item.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMenus[item.id] && (
                  <ul className="mt-2 space-y-1">
                    {item.subItems.map(subItem => (
                      <li key={subItem.id}>
                        <MenuItemButton item={subItem} isSubItem={true} />
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <MenuItemButton item={item} />
            )}
          </li>
        ))}
    </ul>
    </nav>
  );
}