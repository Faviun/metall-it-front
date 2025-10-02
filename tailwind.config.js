const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        // Светлая тема "Дневная стройка"
        'light-bg': '#F4F4F5',
        'light-card': '#FFFFFF',
        'light-text': '#111827',
        'light-border': '#E5E7EB',

        // Темная тема "Ночной город"
        'dark-bg': '#1F2937',
        'dark-card': '#374151',
        'dark-text': '#F9FAFB',
        'dark-border': '#4B5563',

        // Акцентный цвет "Сигнальный желтый"
        'accent': '#FBBF24',
        'accent-hover': '#F59E0B',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
});