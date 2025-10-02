import React, { useState, useMemo } from "react";
import ProductList from "@/features/catalog/components/ProductList";
import type { Product, Supplier } from "@/features/auth/types/index";
import Header from "@/features/auth/components/Header";
import { useTheme } from "@/context/ThemeContext";
import { colors } from "@/constants/themeColors";
import ProductSort from "@/features/catalog/components/ProductSort";

const unifiedProductsData = {
  "requestedDate": "2025-09-24",
  "actualDate": "2025-08-28",
  "totalCount": 32,
  "totalPages": 2,
  "page": 1,
  "limit": 20,
  "items": [
    {
      "unificName": "Арматура А500С 10 ГОСТ 34028-16",
      "size1": 10,
      "size2": null,
      "length": null,
      "width": null,
      "weight": null,
      "mark": "А500С",
      "gost": "ГОСТ 34028-16",
      "trickness": null,
      "variants": [
        {
          "provider": "ktzholding",
          "category": "Арматура",
          "price1": 51700,
          "units1": "Цена FCA, т. ₽",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Дмитров",
          "link": "https://ktzholding.com/category/armatura/936670b4-ee0a-46a2-80b0-a51d890c4703",
          "image": "https://ktzholding.com/media/subcategory_image/арматура_рифленая_4_4.svg",
          "description": "Имя: Арматура 10 Марка: А500С Размер: 10 Вес: 0.0006 Локация: Дмитров Цена 1: 51700 'Цена FCA, т. ₽'"
        },
        {
          "provider": "dipos",
          "category": "Арматура",
          "price1": 49500,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяАрматура А500С  ф10 11700 Цена 1 49500т"
        },
        {
          "provider": "demidov",
          "category": "Арматура",
          "price1": 59500,
          "units1": "Цена за тонну",
          "price2": 37,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/armatura/armatura-a500s-10-871328/",
          "image": null,
          "description": "ИмяАрматура А500С 10 ГОСТ 34028-16 Длина  Цена 1 59500Цена за тонну Цена 2 37Цена за метр"
        }
      ]
    },
    {
      "unificName": "Труба электросварная 180*100*5",
      "size1": 180,
      "size2": 100,
      "length": null,
      "width": null,
      "weight": null,
      "mark": " Ст3сп5",
      "gost": "ГОСТ 30245-03",
      "trickness": 5,
      "variants": [
        {
          "provider": "demidov",
          "category": "Труба",
          "price1": 67700,
          "units1": "Цена за тонну",
          "price2": 1401,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/truby-profilnye/truba-prof-180-100-5-921865/",
          "image": null,
          "description": "ИмяТруба проф 180*100 *5,0 (12м) Т Ст3сп5 ГОСТ 30245-03 (РТЗ) 180x100x5 Ст3сп5 (РТЗ) Длина 12 Цена 1 67700Цена за тонну Цена 2 1401Цена за метр"
        }
      ]
    },
    {
      "unificName": "Труба электросварная 325*7",
      "size1": null,
      "size2": null,
      "length": 325,
      "width": null,
      "weight": null,
      "mark": null,
      "gost": "Ст20",
      "trickness": 7,
      "variants": [
        {
          "provider": "ktzholding",
          "category": "Труба",
          "price1": 68300,
          "units1": "Цена FCA, т. ₽",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Дмитров",
          "link": "https://ktzholding.com/category/truba/2bef3cc4-4f1b-442d-8b1d-f5e855d91f7e",
          "image": "https://ktzholding.com/media/subcategory_image/труба_круглая_4_VUt1o53_ySDmuKS.svg",
          "description": "Имя: Труба электросварная 325x7.0 Марка: Ст20 Размер: 325 Вес: 0 Локация: Дмитров Цена 1: 68300 'Цена FCA, т. ₽'"
        },
        {
          "provider": "ktzholding",
          "category": "Труба",
          "price1": 69500,
          "units1": "Цена FCA, т. ₽",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Дмитров",
          "link": "https://ktzholding.com/category/truba/819a997a-77f4-43e7-be32-c5b3edb1f96d",
          "image": "https://ktzholding.com/media/subcategory_image/труба_круглая_4_VUt1o53_ySDmuKS.svg",
          "description": "Имя: Труба электросварная 325x7.0 Марка: Ст20 Размер: 325 Вес: 0 Локация: Дмитров Цена 1: 69500 'Цена FCA, т. ₽'"
        },
        {
          "provider": "ktzholding",
          "category": "Труба",
          "price1": 66300,
          "units1": "Цена FCA, т. ₽",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Ивантеевка",
          "link": "https://ktzholding.com/category/truba/cdb16718-cdcd-49a4-8cd6-0d9476e5b14d",
          "image": "https://ktzholding.com/media/subcategory_image/труба_круглая_4_VUt1o53_ySDmuKS.svg",
          "description": "Имя: Труба электросварная 325x7.0 Марка: Ст20 Размер: 325 Вес: 0 Локация: Ивантеевка Цена 1: 66300 'Цена FCA, т. ₽'"
        },
        {
          "provider": "brokinvest",
          "category": "Труба",
          "price1": 64650,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Барыбино",
          "link": "https://www.brokinvest.ru/product/truba-elektrosvarnaya-pryamosovnaya-325x7-gost-10704-10705-st20-vmz-tm-nd-11-12m",
          "image": "https://back.brokinvest.ru/api/v1/files/catalog/fe6dccff-5a0c-4359-9ac7-cef8a38e40c4.jpeg",
          "description": "ИмяТруба ЭсвПШ 325х7 ГОСТ 10704; 10705 Ст20 ВМЗ ТМ н/д (11-12м)  Размер  ГОСТ ГОСТ 10704; 10705 Ширина  Длина  Цена 64650руб Склад Барыбино"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 100*100*10 ст3 12000",
      "size1": 100,
      "size2": 100,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 10,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 58800,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 100х100х8.0 ст3сп/пс-5 12000 Цена 1 58800т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 100*100*10 ст3 6000",
      "size1": 100,
      "size2": 100,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 10,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 55000,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 100х100х7.0 ст3сп/пс-5 н/д Цена 1 55000т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 100*100*7 ст3 6000",
      "size1": 100,
      "size2": 100,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 7,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 62690,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 100х100х10.0 ст3сп/пс-5 12000 Цена 1 62690т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 100*100*8 ст3 12000",
      "size1": 100,
      "size2": 100,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 8,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 59990,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 100х100х7.0 ст3сп/пс-5 12000 Цена 1 59990т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 100*110 ст3 12000",
      "size1": 110,
      "size2": 110,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-15",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 65690,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 110х110х8.0 ст3сп/пс-5 12000 Цена 1 65690т"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 71450,
          "units1": "Цена за тонну",
          "price2": 965,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-110-786991/",
          "image": null,
          "description": "ИмяУголок 110 Ст09Г2С-15 Длина 12 Цена 1 71450Цена за тонну Цена 2 965Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 125*125*8 ст3 12000",
      "size1": 125,
      "size2": 125,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-15",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 64960,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 125х125х9.0 ст3сп/пс-5 12000 Цена 1 64960т"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 70950,
          "units1": "Цена за тонну",
          "price2": 1097,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-125-803741/",
          "image": null,
          "description": "ИмяУголок 125 Ст09Г2С-15 Длина 12 Цена 1 70950Цена за тонну Цена 2 1097Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 72450,
          "units1": "Цена за тонну",
          "price2": 1384,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-125-829311/",
          "image": null,
          "description": "ИмяУголок 125 Ст09Г2С-15 Длина 12 Цена 1 72450Цена за тонну Цена 2 1384Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 73450,
          "units1": "Цена за тонну",
          "price2": 1666,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-125-189105/",
          "image": null,
          "description": "ИмяУголок 125 Ст09Г2С-15 Длина 12 Цена 1 73450Цена за тонну Цена 2 1666Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 140*140 ст3 12000",
      "size1": 140,
      "size2": 140,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-15",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 136860,
          "units1": "Цена за тонну",
          "price2": 3490,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-140-422087/",
          "image": null,
          "description": "ИмяУголок 140 Ст09Г2С-15 Длина 12 Цена 1 136860Цена за тонну Цена 2 3490Цена за метр"
        },
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 110900,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 140х140х9.0 стС355-13 11000 Цена 1 110900т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 160*160 ст3 12003",
      "size1": 160,
      "size2": 160,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-15",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 135100,
          "units1": "Цена за тонну",
          "price2": 5204,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-160-911966/",
          "image": null,
          "description": "ИмяУголок 160 Ст09Г2С-15 Длина 12 Цена 1 135100Цена за тонну Цена 2 5204Цена за метр"
        },
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 126100,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 160х160х12.0 ст3сп/пс-5 12000 Цена 1 126100т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 180*180 ст3 12005",
      "size1": 180,
      "size2": 180,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-15",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 139660,
          "units1": "Цена за тонну",
          "price2": 4626,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-180-261906/",
          "image": null,
          "description": "ИмяУголок 180 Ст09Г2С-15 Длина 12 Цена 1 139660Цена за тонну Цена 2 4626Цена за метр"
        },
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 129100,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 180х180х12.0 ст3сп/пс-5 12000 Цена 1 129100т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 180*180ст3 12005",
      "size1": 180,
      "size2": 180,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 130250,
          "units1": "Цена за тонну",
          "price2": 4314,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-180-183284/",
          "image": null,
          "description": "ИмяУголок 180 Ст3 кат,5 Длина 12 Цена 1 130250Цена за тонну Цена 2 4314Цена за метр"
        },
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 129100,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 180х180х11.0 ст3сп/пс-5 12000 Цена 1 129100т"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 200*200 ст3 12006",
      "size1": 200,
      "size2": 200,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 126100,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 200х200х14.0 ст3сп/пс-5 12000 Цена 1 126100т"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 127450,
          "units1": "Цена за тонну",
          "price2": 5455,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-200-72183/",
          "image": null,
          "description": "ИмяУголок 200 Ст3 кат,5 Длина 12 Цена 1 127450Цена за тонну Цена 2 5455Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 200*200 ст3 12007",
      "size1": 200,
      "size2": 200,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "Ст09Г2С-17",
      "gost": "ГОСТ",
      "trickness": null,
      "variants": [
        {
          "provider": "dipos",
          "category": "Уголок",
          "price1": 128000,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "",
          "link": "",
          "image": "",
          "description": "ИмяУголок 200х200х16.0 ст3сп/пс-5 12000 Цена 1 128000т"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 136860,
          "units1": "Цена за тонну",
          "price2": 5858,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok/ugolok-200-543142/",
          "image": null,
          "description": "ИмяУголок 200 Ст09Г2С-15 Длина 12 Цена 1 136860Цена за тонну Цена 2 5858Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 25*25*3 ст3 6000",
      "size1": 25,
      "size2": 25,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 3,
      "variants": [
        {
          "provider": "brokinvest",
          "category": "Уголок",
          "price1": 70500,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Октябрьский",
          "link": "https://www.brokinvest.ru/product/ugolok-25x25x3x6000-gost-8509-st3spps",
          "image": "https://back.brokinvest.ru/api/v1/files/catalog/32a5073b-89df-469d-980f-cf163d16237e.jpeg",
          "description": "ИмяУголок 25х25х3х6000 ГОСТ 8509 Ст3сп/пс  Размер  ГОСТ ГОСТ 8509 Ширина 25 Длина 6000 Цена 70500руб Склад Октябрьский"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 65500,
          "units1": "Цена за тонну",
          "price2": 96,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-25-880578/",
          "image": null,
          "description": "ИмяУголок 25 Ст3 кат,5 Длина  Цена 1 65500Цена за тонну Цена 2 96Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 69650,
          "units1": "Цена за тонну",
          "price2": 102,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-25-750096/",
          "image": null,
          "description": "ИмяУголок 25 Ст3 Длина 6 Цена 1 69650Цена за тонну Цена 2 102Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 69650,
          "units1": "Цена за тонну",
          "price2": 102,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-25-1990/",
          "image": null,
          "description": "ИмяУголок 25 Ст3 кат,5 Длина 6 Цена 1 69650Цена за тонну Цена 2 102Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 32*32*3 ст3 6000",
      "size1": 32,
      "size2": 32,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 3,
      "variants": [
        {
          "provider": "brokinvest",
          "category": "Уголок",
          "price1": 70500,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Октябрьский",
          "link": "https://www.brokinvest.ru/product/ugolok-32x32x3x6000-gost-8509-st3spps",
          "image": "https://back.brokinvest.ru/api/v1/files/catalog/32a5073b-89df-469d-980f-cf163d16237e.jpeg",
          "description": "ИмяУголок 32х32х3х6000 ГОСТ 8509 Ст3сп/пс  Размер  ГОСТ ГОСТ 8509 Ширина 32 Длина 6000 Цена 70500руб Склад Октябрьский"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 69650,
          "units1": "Цена за тонну",
          "price2": 133,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-32-st3-kat-5-1956718762/",
          "image": null,
          "description": "ИмяУголок 32 Ст3 кат,5 Длина 6 Цена 1 69650Цена за тонну Цена 2 133Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 32*32*4 ст3 6000",
      "size1": 32,
      "size2": 32,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 4,
      "variants": [
        {
          "provider": "brokinvest",
          "category": "Уголок",
          "price1": 70500,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Октябрьский",
          "link": "https://www.brokinvest.ru/product/ugolok-32x32x4x6000-gost-8509-st3spps",
          "image": "https://back.brokinvest.ru/api/v1/files/catalog/32a5073b-89df-469d-980f-cf163d16237e.jpeg",
          "description": "ИмяУголок 32х32х4х6000 ГОСТ 8509 Ст3сп/пс  Размер  ГОСТ ГОСТ 8509 Ширина 32 Длина 6000 Цена 70500руб Склад Октябрьский"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 35*35*4 ст3 6000",
      "size1": 35,
      "size2": 35,
      "length": 6000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 4,
      "variants": [
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 69650,
          "units1": "Цена за тонну",
          "price2": 146,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-35-113500/",
          "image": null,
          "description": "ИмяУголок 35 Ст3 кат,5 Длина 6 Цена 1 69650Цена за тонну Цена 2 146Цена за метр"
        }
      ]
    },
    {
      "unificName": "Уголок равнополочный ГОСТ 40*40*4 ст3 12000",
      "size1": 40,
      "size2": 40,
      "length": 12000,
      "width": null,
      "weight": null,
      "mark": "ст3",
      "gost": "ГОСТ",
      "trickness": 4,
      "variants": [
        {
          "provider": "brokinvest",
          "category": "Уголок",
          "price1": 57000,
          "units1": "т",
          "price2": null,
          "units2": "",
          "price3": null,
          "units3": "",
          "price4": null,
          "units4": null,
          "location": "Октябрьский",
          "link": "https://www.brokinvest.ru/product/ugolok-40x40x4x12000-gost-8509-st3spps-otx",
          "image": "https://back.brokinvest.ru/api/v1/files/catalog/32a5073b-89df-469d-980f-cf163d16237e.jpeg",
          "description": "ИмяУголок 40х40х4х12000 ГОСТ 8509 Ст3сп/пс ОТХ  Размер  ГОСТ ГОСТ 8509 Ширина 40 Длина 12000 Цена 57000руб Склад Октябрьский"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 64950,
          "units1": "Цена за тонну",
          "price2": 120,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-40-966942/",
          "image": null,
          "description": "ИмяУголок 40 Ст3 кат,5 Длина 6 Цена 1 64950Цена за тонну Цена 2 120Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 64450,
          "units1": "Цена за тонну",
          "price2": 119,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-40-40185/",
          "image": null,
          "description": "ИмяУголок 40 Ст3 кат,5 Длина 12 Цена 1 64450Цена за тонну Цена 2 119Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 57450,
          "units1": "Цена за тонну",
          "price2": 139,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-40-738391/",
          "image": null,
          "description": "ИмяУголок 40 Ст3 кат,5 Длина 6 Цена 1 57450Цена за тонну Цена 2 139Цена за метр"
        },
        {
          "provider": "demidov",
          "category": "Уголок",
          "price1": 57250,
          "units1": "Цена за тонну",
          "price2": 139,
          "units2": "Цена за метр",
          "price3": null,
          "units3": null,
          "price4": null,
          "units4": null,
          "location": "МОСКВА",
          "link": "https://demidovsteel.ru/catalog/ugolok-st3/ugolok-40-st3-kat-5-1507373224/",
          "image": null,
          "description": "ИмяУголок 40 Ст3 кат,5 Длина 12 Цена 1 57250Цена за тонну Цена 2 139Цена за метр"
        }
      ]
    }
  ]
}

interface ApiVariant {
  provider: string;
  category: string;
  price1: number | null;
  image: string | null;
}

interface ApiItem {
  unificName: string;
  size1: number | null;
  size2: number | null;
  length: number | null;
  mark: string | null;
  gost: string | null;
  variants: ApiVariant[];
}

const mapApiDataToProducts = (apiItems: ApiItem[]): Product[] => {
  return apiItems.map((item, index) => {
    const validPrices = item.variants
      .map(v => v.price1)
      .filter((price): price is number => price !== null && price > 0);
    const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;
    const imageUrl = item.variants.find(v => v.image)?.image || "";
    const suppliers: Supplier[] = item.variants
      .filter(v => v.price1 !== null)
      .map(v => ({
        name: v.provider,
        price: v.price1!,
      }));
    const diameter = item.size2 ? `${item.size1}x${item.size2} мм` : (item.size1 ? `${item.size1} мм` : 'N/A');
    const grade = `${item.mark || ''} ${item.gost || ''}`.trim();
    const category = item.variants[0]?.category || 'Без категории';

    return {
      id: index + 1,
      name: item.unificName,
      price: minPrice,
      inStock: item.variants.length > 0,
      diameter: diameter,
      length: item.length ? `${item.length} м` : 'N/A',
      grade: grade,
      category: category,
      colorType: "черный",
      imageUrl: imageUrl,
      suppliers: suppliers,
      quantity: 0,
    };
  });
};

interface Filters {
  category: string[];
  diameter: string[];
  length: string[];
  grade: string[];
  colorType: ("черный" | "цветной")[];
}

type SortOption = "price" | "name" | "stock";

const CatalogPage = () => {
  const [products] = useState<Product[]>(() => mapApiDataToProducts(unifiedProductsData.items));
  
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({ category: [], diameter: [], length: [], grade: [], colorType: [] });
  const [sortBy, setSortBy] = useState<SortOption>("name");
  
  const { theme } = useTheme();
  const currentColors = colors[theme];

  const filterOptions = useMemo(() => {
    const unique = <T,>(items: T[]) => [...new Set(items)].filter(Boolean);
    return {
      uniqueCategories: unique(products.map((p) => p.category)),
      uniqueDiameters: unique(products.map((p) => p.diameter)),
      uniqueLengths: unique(products.map((p) => p.length)),
      uniqueGrades: unique(products.map((p) => p.grade)),
      uniqueColorTypes: unique(products.map((p) => p.colorType)),
    };
  }, [products]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const currentValues = prevFilters[name as keyof Filters];
      if (checked) {
        return { ...prevFilters, [name]: [...currentValues, value] };
      } else {
        return {
          ...prevFilters,
          [name]: currentValues.filter((v) => v !== value),
        };
      }
    });
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const sortedAndFilteredProducts = useMemo(() => {
    let currentProducts = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      
      const matchesFilters = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        const productValue = (product as any)[key];
        return productValue && values.includes(productValue);
      });

      return matchesSearch && matchesFilters;
    });

    currentProducts.sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "stock") {
        return (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0);
      }
      return 0;
    });

    return currentProducts;
  }, [products, search, filters, sortBy]);

  return (
    <div className={`min-h-screen ${currentColors.primaryBackground} ${currentColors.primaryText}`}>
      <Header onSearchChange={handleSearchChange} searchValue={search} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="h2-header ">
          Каталог товаров
        </h2>

        <div className="flex flex-col md:flex-row">
          <aside className={`w-full md:w-1/4 rounded-md  p-4 shadow-md ${currentColors.secondaryBackground} mb-8 md:mb-0`}>
            <h5 className={`text-xl font-semibold mb-4 ${currentColors.primaryText}`}>
              Фильтры
            </h5>
            <div className="mb-6">
              <ProductSort sortBy={sortBy} onChange={handleSortChange} />
            </div>

            {[
              { title: "Категория", name: "category", options: filterOptions.uniqueCategories },
              { title: "Диаметр", name: "diameter", options: filterOptions.uniqueDiameters },
              { title: "Длина", name: "length", options: filterOptions.uniqueLengths },
              { title: "Марка/ГОСТ", name: "grade", options: filterOptions.uniqueGrades },
              { title: "Сплав", name: "colorType", options: filterOptions.uniqueColorTypes },
            ].map((filterGroup) => (
              filterGroup.options.length > 0 && (
                <div key={filterGroup.name} className="mb-4">
                  <h6 className={`text-lg font-semibold mb-2 ${currentColors.secondaryText}`}>
                    {filterGroup.title}
                  </h6>
                  {filterGroup.options.map((option) => {
  // ✅ Добавляем проверку: если option не существует, ничего не рендерим
  if (!option) return null;

  return (
    <label key={option} className="flex items-center mb-1 cursor-pointer">
      <input
        type="checkbox"
        name={filterGroup.name}
        value={option}
        checked={(filters[filterGroup.name as keyof Filters] as string[]).includes(option)}
        onChange={handleCheckboxChange}
        className={`checkbox`}
      />
      <span className={`ml-2 text-sm ${currentColors.primaryText}`}>
        {option}
      </span>
    </label>
  );
})}
                </div>
              )
            ))}
          </aside>

          <main className="w-full md:w-3/4 md:pl-8">
            <ProductList products={sortedAndFilteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;