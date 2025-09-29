import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '@/features/home/CategoryCard';
import ProductCard from '@/features/catalog/components/ProductCard';
import TestimonialCard from '@/features/home/TestimonialCard';
import type { Product } from '@/features/auth/types'; // Используем актуальный тип Product
import MetalCalculator from '@/features/home/MetalCalculator';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';


// Убедимся, что данные соответствуют типу Product
const featuredProducts: Product[] = [
    { id: 1, name: "Арматура ф10 А500С", price: 57000, inStock: true, diameter: "12 мм", length: "11.7 м", grade: "ГОСТ 5781-82", category: "Арматура", colorType: "черный", imageUrl: "https://soling-n.ru/UserFiles/Image/img3_10149.jpg", suppliers: [ { name: "Поставщик 1", price: 57000 }, { name: "Поставщик 2", price: 57500 }, ], quantity: 0, },
    { id: 3, name: "Круг 20 мм", price: 49000, inStock: true, diameter: "20 мм", length: "6 м", grade: "ГОСТ 2590-2006", category: "Круг", colorType: "черный", imageUrl: "https://ustinovka46.ru/images/virtuemart/product/21e43265-2ca6-4c36-9936-30130c6535b5.jpg", suppliers: [ { name: "Поставщик 2", price: 49500 }, { name: "Поставщик 3", price: 49000 }, ], quantity: 0, },
];

const AdvantageCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => {
    const { theme } = useTheme();
    const c = colors[theme];
    
    return (
      <div className={`${c.secondaryBackground} ${c.bordersDividers} border rounded-lg p-6 text-center h-full`}>
        <div className="text-accent text-4xl mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`${c.secondaryText}`}>{text}</p>
      </div>
    );
};

const SuppliersCarousel = () => {
    const { theme } = useTheme();
    const c = colors[theme];

type InversionMode = 'dark-only' | 'light-only' | 'none';

const inversionClasses: Record<InversionMode, string> = {
  'dark-only': 'dark:invert',
  'light-only': 'invert dark:invert-0',
  'none': '',
};

interface Supplier {
  name: string;
  logoUrl: string;
  inversion: InversionMode;
}

const suppliers: Supplier[] = [
  { name: "Металлсервис", logoUrl: "https://mc.ru/img/logo.svg", inversion: 'dark-only' },
  { name: "Металлоторг", logoUrl: "https://www.metallotorg.ru/images/logo.png", inversion: 'none'},
  { name: "КТЗ Холдинг", logoUrl: "https://home.ktzholding.com/local/templates/.default//img/ktz.png", inversion: 'none' },
  { name: "ДИПОС", logoUrl: "https://dipos.ru/favicon.svg", inversion: 'none'},
  { name: "НТПЗ", logoUrl: "https://ntpz.ru/local/templates/b2eng_new/img/header/logo.svg", inversion: 'dark-only' },
  { name: "Евраз", logoUrl: "https://evraz.market/docs/5.0/assets/img/evraz/logo.svg", inversion: 'dark-only' },
  { name: "Демидов", logoUrl: "https://demidovsteel.ru/local/templates/demidov/img/logo.svg", inversion: 'light-only' },
  { name: "Брокинвест", logoUrl: "https://www.brokinvest.ru/_next/static/media/Preloader_1.cf437bdb.svg", inversion: 'none' },
];


    // Дублируем массив для создания эффекта бесконечной прокрутки
    const duplicatedSuppliers = [...suppliers, ...suppliers];

    return (
        <section>
            <style>
                {`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-${suppliers.length * 16}rem); }
                    }
                    .animate-scroll {
                        animation: scroll 40s linear infinite;
                    }
                `}
            </style>
            <h2 className="text-3xl font-bold text-center mb-8">Наши поставщики</h2>
            <div className="mx-auto max-w-5xl">
                <p className={`text-center ${c.secondaryText} mb-12`}>
                    Мы сотрудничаем с ведущими производителями и дистрибьюторами металлопроката, чтобы предложить вам лучшие условия и гарантированное качество.
                </p>
                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-scroll">
                        {duplicatedSuppliers.map((supplier, index) => (
                            <div key={index} className="border border-x-accent flex-shrink-0 w-60 flex flex-col items-center justify-center mx-1">
                                <div className="h-20 flex items-center justify-center">
                                    <img 
                                        src={supplier.logoUrl} 
                                        alt={`Логотип ${supplier.name}`} 
                                        className={`max-h-12 transition-all duration-300 
                                            ${inversionClasses[supplier.inversion] || ''}`} 
                                    />
                                </div>
                                <p className={`mt-2 text-sm font-medium ${c.primaryText}`}>{supplier.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* Градиент для плавного исчезновения */}
                    <div className={`absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[${theme === 'light' ? '#F8FAFC' : '#1A2A40'}] to-transparent`}></div>
                    <div className={`absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[${theme === 'light' ? '#F8FAFC' : '#1A2A40'}] to-transparent`}></div>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
    const { theme } = useTheme();
    const c = colors[theme];

    return (
        <div className={`pt-24 ${c.primaryBackground} ${c.primaryText}`}>
            <div className="container mx-auto px-4 py-8 space-y-20">
            
            {/* 1. Главный экран (Hero Section) */}
            <section className={`text-center ${c.secondaryBackground} ${c.bordersDividers} border rounded-lg p-8 md:p-16`}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Надежный поставщик металлопроката</h1>
                <p className={`text-lg md:text-xl ${c.secondaryText} mb-8 max-w-3xl mx-auto`}>
                    Широкий ассортимент качественной металлопродукции от проверенных поставщиков для строительства и промышленности.
                </p>
                <Link to="/catalog">
                    {/* Кнопка "Перейти в каталог" */}
                    <button className="bg-accent hover:bg-accent-hover text-black font-bold text-lg py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                        Перейти в каталог
                    </button>
                </Link>
            </section>

            {/* 2. Блок "Основные категории" */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Основные категории</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <CategoryCard name="Арматура" link="/catalog" icon={<i className="fas fa-bars-staggered"></i>} />
                    <CategoryCard name="Трубы" link="/catalog" icon={<i className="fas fa-circle"></i>} />
                    <CategoryCard name="Листовой прокат" link="/catalog" icon={<i className="fas fa-clone"></i>} />
                    <CategoryCard name="Сортовой прокат" link="/catalog" icon={<i className="fas fa-cube"></i>} />
                </div>
            </section>

            {/* 3. Блок преимуществ */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Почему выбирают нас</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <AdvantageCard icon={<i className="fas fa-layer-group"></i>} title="Широкий ассортимент" text="Тысячи позиций сортового, листового и трубного проката на одном сайте." />
                    <AdvantageCard icon={<i className="fas fa-handshake"></i>} title="Надежные поставщики" text="Мы работаем только с проверенными производителями и поставщиками." />
                    <AdvantageCard icon={<i className="fas fa-truck-fast"></i>} title="Быстрая доставка" text="Организуем логистику и доставим ваш заказ в кратчайшие сроки." />
                </div>
            </section>

            {/* 4. Блок "Популярные товары" */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Популярные товары</h2>
                <div className="space-y-4">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 5. Калькулятор металла */}
            <section>
                <MetalCalculator />
            </section>

            {/* 6. Наши поставщики */}
            <SuppliersCarousel />

            {/* 7. Отзывы клиентов */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-8">Нам доверяют</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard text="Отличный выбор и лучшие цены на рынке. Всегда находим здесь то, что нужно для наших объектов." author="Алексей Иванов" company="ООО 'СтройМастер'" />
                    <TestimonialCard text="Очень удобный сервис. Заказ оформляется в несколько кликов, а доставка не заставляет себя ждать. Рекомендую!" author="Сергей Петров" company="ИП 'МеталлКонструкции'" />
                    <TestimonialCard text="Надежный партнер, на которого всегда можно положиться. Качество металла на высоте, все по ГОСТу." author="Елена Сидорова" company="ЗАО 'ПромСнаб'" />
                </div>
            </section>

            {/* 8. Призыв к действию для поставщиков */}
            <section className={`text-center ${c.secondaryBackground} ${c.bordersDividers} border rounded-lg p-8`}>
                <h2 className="text-3xl font-bold mb-2">Вы поставщик металлопроката?</h2>
                <p className={`text-lg ${c.secondaryText} mb-6`}>Начните продавать на нашей площадке и получите доступ к тысячам новых клиентов.</p>
                <Link to="/register">
                    {/* Кнопка "Стать партнером" */}
                    <button className="bg-transparent hover:bg-accent text-accent font-semibold hover:text-black text-lg py-3 px-6 border-2 border-accent hover:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                        Стать партнером
                    </button>
                </Link>
            </section>
            
            </div>
        </div>
    );
}