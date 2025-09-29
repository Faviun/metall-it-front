import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';

const StyleGuidePage = () => {
  const { theme } = useTheme();
  const c = colors[theme]; // Короткий псевдоним для удобства

  return (
    <div className={`font-sans ${c.primaryBackground} ${c.primaryText}`}>
      <main className="container mx-auto p-4">
        {/* --- Секция Кнопки --- */}
        <section className="mb-8">
          <h2 className={`text-3xl font-bold mb-4 border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Кнопки (Buttons)</h2>
          <div className={`${c.secondaryBackground} ${c.bordersDividers} border p-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 items-center`}>
            <button className="primary-button">Основная</button>
            <button className="secondary-button">Второстепенная</button>
            <button className="dark-button">Темная</button>
            <button className="light-button">Светлая</button>
            <button className="inactive-button">Неактивная</button>
            <button className="round-button">Круглая</button>
            <button className="download-button"><i className="fas fa-download"></i> Скачать</button>
            <button className="add-button"><i className="fas fa-plus"></i></button>
          </div>
        </section>
        
        {/* --- Секция Элементы форм --- */}
        <section className="mb-8">
          <h2 className={`text-3xl font-bold mb-4 border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Элементы форм (Form Elements)</h2>
          <div className={`${c.secondaryBackground} ${c.bordersDividers} border p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6`}>
            <div>
              <h3 className="text-xl font-medium mb-3">Поля ввода (Inputs)</h3>
              <div className="flex flex-col gap-4">
                <input className="standard-input" type="text" placeholder="Стандартное поле" />
                <input className="successful-input" type="text" placeholder="Успешный ввод" />
                <input className="error-input" type="text" placeholder="Ошибка ввода" />
                <div className="relative">
                  <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                  <input className="standard-input pl-10" type="text" placeholder="Поле с иконкой" />
                </div>
              </div>
            </div>
            <div>
                <div>
                  <h3 className="text-xl font-medium mb-3">Чекбоксы и радиокнопки</h3>
                  <div className="flex flex-col gap-4">
                      <label className="flex items-center">
                          <input type="checkbox" className="checkbox" />
                          <span className="ml-2">Чекбокс 1</span>
                      </label>
                      <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="checkbox" />
                          <span className="ml-2">Выбранный чекбокс</span>
                      </label>
                      <label className="flex items-center">
                          <input type="radio" name="radio-group" className="radio" />
                          <span className="ml-2">Радиокнопка 1</span>
                      </label>
                      <label className="flex items-center">
                          <input type="radio" name="radio-group" defaultChecked className="radio" />
                          <span className="ml-2">Выбранная радиокнопка</span>
                      </label>
                  </div>
              </div>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-3">Выпадающий список (Select)</h3>
                <select className={`w-full p-2 rounded ${theme === 'light' ? 'bg-light-bg' : 'bg-dark-bg'} border ${c.bordersDividers} focus:ring-2 focus:ring-accent focus:border-transparent`}>
                    <option>Арматура</option><option>Балка</option><option>Лист стальной</option><option>Труба профильная</option>
                </select>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-3">Область текста (Textarea)</h3>
                <textarea className="textarea" rows={4} placeholder="Введите ваш комментарий..."></textarea>
            </div>
            <div>
                <h3 className="text-xl font-medium mb-3">Ползунок (Range Slider)</h3>
                <input type="range" className="w-full h-2 bg-gray-300 dark:bg-dark-border rounded-lg appearance-none cursor-pointer accent-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Переключатель (Toggle)</h3>
              <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-14 h-8 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                  <span className="ms-3 text-sm font-medium">Включить уведомления</span>
              </label>
            </div>
          </div>
        </section>

        {/* --- Секция Таблица --- */}
        <section className="mb-8">
            <h2 className={`text-3xl font-bold mb-4 border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Таблица (Table)</h2>
            <div className={`${c.secondaryBackground} ${c.bordersDividers} border rounded-lg overflow-hidden`}>
                <table className="w-full text-left">
                    <thead className={`border-b ${c.bordersDividers}`}><tr className="font-bold"><th className="p-4">Наименование</th><th className="p-4">Марка стали</th><th className="p-4">Размер, мм</th><th className="p-4">Цена за тонну, ₽</th><th className="p-4">Действие</th></tr></thead>
                    <tbody>
                      <tr className={`border-b ${c.bordersDividers} hover:bg-light-border dark:hover:bg-dark-border`}>
                          <td className="p-4">Арматура A500C</td>
                          <td className="p-4">Ст3пс</td>
                          <td className="p-4">12</td>
                          <td className="p-4 font-medium">65 000</td>
                          <td className="p-4">
                              <button className="bg-accent text-black px-3 py-1 rounded hover:bg-accent-hover font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">В корзину</button>
                          </td>
                      </tr>
                      <tr className={`border-b ${c.bordersDividers} hover:bg-light-border dark:hover:bg-dark-border`}>
                          <td className="p-4">Балка двутавровая</td>
                          <td className="p-4">С255</td>
                          <td className="p-4">20Б1</td>
                          <td className="p-4 font-medium">82 500</td>
                          <td className="p-4">
                              <button className="bg-accent text-black px-3 py-1 rounded hover:bg-accent-hover font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">В корзину</button>
                          </td>
                      </tr>
                      <tr className="hover:bg-light-border dark:hover:bg-dark-border">
                          <td className="p-4">Лист г/к</td>
                          <td className="p-4">Ст3сп</td>
                          <td className="p-4">4x1500x6000</td>
                          <td className="p-4 font-medium">71 300</td>
                          <td className="p-4">
                              <button className="bg-accent text-black px-3 py-1 rounded hover:bg-accent-hover font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">В корзину</button>
                          </td>
                      </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section className="mb-8">
            <h2 className={`text-3xl font-bold mb-4 border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Списки (Lists)</h2>
            <div className={`${c.secondaryBackground} ${c.bordersDividers} border p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6`}>
                <div>
                    <h3 className="text-xl font-medium mb-3">Маркированный список</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Швеллер</li>
                        <li>Уголок</li>
                        <li>Квадрат стальной
                            <ul className="list-disc list-inside pl-6 mt-2 space-y-1">
                                <li>Калиброванный</li>
                                <li>Горячекатаный</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-medium mb-3">Нумерованный список</h3>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Выберите товар</li>
                        <li>Добавьте в корзину</li>
                        <li>Оформите заказ</li>
                        <li>Ожидайте доставку</li>
                    </ol>
                </div>
            </div>
        </section>

        {/* --- Секция Разное --- */}
        <section>
          <h2 className={`text-3xl font-bold mb-4 border-l-4 border-accent pl-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Разное</h2>
          <div className={`${c.secondaryBackground} ${c.bordersDividers} border p-6 rounded-lg flex flex-col gap-4`}>
              <h3 className="text-xl font-medium mb-3">Уведомления (Alerts)</h3>
              
              {/* Информация */}
              <div 
                className="alert-information" 
                role="alert">
                  <p className="font-bold">Информация</p>
                  <p>Информационное сообщение в стиле "Мегаполис".</p>
              </div>

              {/* Успех */}
              <div 
                className="alert-success" 
                role="alert">
                  <p className="font-bold">Успех</p>
                  <p>Ваша заявка успешно отправлена!</p>
              </div>

              {/* Ошибка */}
              <div 
                className="alert-error" 
                role="alert">
                  <p className="font-bold">Ошибка</p>
                  <p>Не удалось загрузить данные. Попробуйте позже.</p>
              </div>

              <h3 className="text-xl font-medium mt-6 mb-3">Индикатор загрузки (Spinner)</h3>
              <div className="flex items-center gap-4">
                  <div className="spinner"></div>
                  <span>Загрузка данных...</span>
              </div>
              </div>
          </section>


      </main>
    </div>
  );
};

export default StyleGuidePage;