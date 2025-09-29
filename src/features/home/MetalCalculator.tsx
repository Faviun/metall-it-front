import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';

// Типы для нашего калькулятора
type ProductType = 'round' | 'pipe';

const MetalCalculator: React.FC = () => {
  const { theme } = useTheme();
  const c = colors[theme];

  const [productType, setProductType] = useState<ProductType>('round');
  const [dimensions, setDimensions] = useState({
    diameter: '12',
    length: '1',
    width: '40',
    height: '40',
    thickness: '2',
  });
  const [weight, setWeight] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'productType') {
      setProductType(value as ProductType);
    } else {
      setDimensions(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    const DENSITY_STEEL = 7850;

    const calcWeight = () => {
      const lengthM = parseFloat(dimensions.length) || 0;

      if (productType === 'round') {
        const diameterM = parseFloat(dimensions.diameter) / 1000 || 0;
        if (!diameterM || !lengthM) return null;

        const radiusM = diameterM / 2;
        const volumeM3 = Math.PI * Math.pow(radiusM, 2) * lengthM;
        return volumeM3 * DENSITY_STEEL;
      }
      
      if (productType === 'pipe') {
        const widthM = parseFloat(dimensions.width) / 1000 || 0;
        const heightM = parseFloat(dimensions.height) / 1000 || 0;
        const thicknessM = parseFloat(dimensions.thickness) / 1000 || 0;
        if (!widthM || !heightM || !thicknessM || !lengthM) return null;

        const outerArea = widthM * heightM;
        const innerArea = (widthM - 2 * thicknessM) * (heightM - 2 * thicknessM);
        const volumeM3 = (outerArea - innerArea) * lengthM;
        return volumeM3 * DENSITY_STEEL;
      }

      return null;
    };

    const newWeight = calcWeight();
    setWeight(newWeight);

  }, [productType, dimensions]);

  // Общие стили для полей ввода и select из StyleGuidePage
  const formElementClassName = `w-full p-2 rounded ${theme === 'light' ? 'bg-light-bg' : 'bg-dark-bg'} border ${c.bordersDividers} placeholder:text-gray-500 focus:ring-2 focus:ring-accent focus:border-transparent`;

  // Компонент для поля ввода с label, чтобы не дублировать код
  const LabeledInput = ({ name, label, value, unit }: { name: string, label: string, value: string, unit: string }) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <div className="relative">
            <input 
                type="number"
                name={name}
                value={value}
                onChange={handleInputChange}
                className={formElementClassName}
            />
            <span className={`absolute inset-y-0 right-3 flex items-center text-sm ${c.secondaryText}`}>{unit}</span>
        </div>
    </div>
  );

  return (
    <div className={`${c.secondaryBackground} ${c.bordersDividers} border rounded-lg p-8`}>
      <h3 className="text-2xl font-bold mb-6 text-center">Калькулятор веса металла</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Левая часть: Поля для ввода */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Тип изделия</label>
            <select
              name="productType"
              value={productType}
              onChange={handleInputChange}
              className={formElementClassName}
            >
              <option value="round">Круг / Арматура</option>
              <option value="pipe">Труба профильная</option>
            </select>
          </div>

          {productType === 'round' && (
            <>
              <LabeledInput name="diameter" label="Диаметр" value={dimensions.diameter} unit="мм" />
              <LabeledInput name="length" label="Длина" value={dimensions.length} unit="м" />
            </>
          )}

          {productType === 'pipe' && (
            <>
              <LabeledInput name="width" label="Ширина (A)" value={dimensions.width} unit="мм" />
              <LabeledInput name="height" label="Высота (B)" value={dimensions.height} unit="мм" />
              <LabeledInput name="thickness" label="Толщина стенки (S)" value={dimensions.thickness} unit="мм" />
              <LabeledInput name="length" label="Длина" value={dimensions.length} unit="м" />
            </>
          )}
        </div>

        {/* Правая часть: Результат */}
        <div className={`rounded-lg p-6 text-center h-full flex flex-col justify-center ${theme === 'light' ? 'bg-light-bg' : 'bg-dark-bg'}`}>
            <p className={`text-lg ${c.secondaryText}`}>Примерный вес:</p>
            <p className="text-4xl font-bold text-accent my-2">
                {weight !== null ? weight.toFixed(2) : '...'} кг
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Расчет для стали плотностью 7850 кг/м³</p>
        </div>
      </div>
    </div>
  );
};

export default MetalCalculator;


// import React, { useState, useEffect } from 'react';
// import { Select, Option, Input } from "@material-tailwind/react";

// // Типы для нашего калькулятора
// type ProductType = 'round' | 'pipe';

// const MetalCalculator: React.FC = () => {
//   const [productType, setProductType] = useState<ProductType>('round');
//   const [dimensions, setDimensions] = useState({
//     // Для круглого проката
//     diameter: '12', // мм
//     length: '1',    // м
//     // Для профильной трубы
//     width: '40',    // мм
//     height: '40',   // мм
//     thickness: '2', // мм
//   });
//   const [weight, setWeight] = useState<number | null>(null);

//   // Обработчик изменений в полях ввода
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setDimensions(prev => ({ ...prev, [name]: value }));
//   };

//   // Основная логика расчета
//   useEffect(() => {
//     // Плотность стали (в кг/м^3). Это наше основное допущение.
//     const DENSITY_STEEL = 7850; 

//     const calcWeight = () => {
//       // Переводим все размеры в метры для расчета
//       const lengthM = parseFloat(dimensions.length)  0;

//       if (productType === 'round') {
//         const diameterM = parseFloat(dimensions.diameter) / 1000  0;
//         if (!diameterM  !lengthM) return null;

//         const radiusM = diameterM / 2;
//         const volumeM3 = Math.PI * Math.pow(radiusM, 2) * lengthM;
//         return volumeM3 * DENSITY_STEEL;
//       }
      
//       if (productType === 'pipe') {
//         const widthM = parseFloat(dimensions.width) / 1000  0;
//         const heightM = parseFloat(dimensions.height) / 1000  0;
//         const thicknessM = parseFloat(dimensions.thickness) / 1000  0;
//         if (!widthM  !heightM  !thicknessM || !lengthM) return null;

//         // Объем = (Площадь внешнего прямоугольника - Площадь внутреннего) * Длина
//         const outerArea = widthM * heightM;
//         const innerArea = (widthM - 2 * thicknessM) * (heightM - 2 * thicknessM);
//         const volumeM3 = (outerArea - innerArea) * lengthM;
//         return volumeM3 * DENSITY_STEEL;
//       }

//       return null;
//     };

//     const newWeight = calcWeight();
//     setWeight(newWeight);

//   }, [productType, dimensions]);

//   // Стили для полей ввода, чтобы не дублировать
//   const inputClassName = "!border-light-border dark:!border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text focus:!border-accent";
//   const labelClassName = "peer-focus:before:!border-accent peer-focus:after:!border-accent dark:text-gray-300";

//   return (
//     <div className="card-bg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-8">
//       <h3 className="text-2xl font-bold mb-6 text-center">Калькулятор веса металла</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//         {/* Левая часть: Поля для ввода */}
//         <div className="space-y-4">
//           <Select 
//             value={productType}
//             onChange={(val) => setProductType(val as ProductType)}
//             label="Тип изделия"
//             className="text-light-text dark:text-dark-text"
//             labelProps={{ className: "dark:text-gray-300" }}
//             menuProps={{ className: "bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text" }}
//             placeholder={undefined}
//           >
//             <Option value="round">Круг / Арматура</Option>
//             <Option value="pipe">Труба профильная</Option>
//           </Select>

//           {productType === 'round' && (
//             <>
//               <Input type="number" name="diameter" value={dimensions.diameter} onChange={handleInputChange} label="Диаметр, мм" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//               <Input type="number" name="length" value={dimensions.length} onChange={handleInputChange} label="Длина, м" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//             </>
//           )}

// Татьяна Ларина, [24.09.2025 9:45]
// {productType === 'pipe' && (
//             <>
//               <Input type="number" name="width" value={dimensions.width} onChange={handleInputChange} label="Ширина (A), мм" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//               <Input type="number" name="height" value={dimensions.height} onChange={handleInputChange} label="Высота (B), мм" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//               <Input type="number" name="thickness" value={dimensions.thickness} onChange={handleInputChange} label="Толщина стенки (S), мм" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//               <Input type="number" name="length" value={dimensions.length} onChange={handleInputChange} label="Длина, м" crossOrigin={undefined} className={inputClassName} labelProps={{className: labelClassName}} />
//             </>
//           )}
//         </div>

//         {/* Правая часть: Результат */}
//         <div className="bg-light-bg dark:bg-dark-bg rounded-lg p-6 text-center h-full flex flex-col justify-center">
//             <p className="text-lg text-gray-600 dark:text-gray-400">Примерный вес:</p>
//             <p className="text-4xl font-bold text-accent my-2">
//                 {weight !== null ? weight.toFixed(2) : '...'} кг
//             </p>
//             <p className="text-xs text-gray-400 dark:text-gray-500">Расчет для стали плотностью 7850 кг/м³</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MetalCalculator;