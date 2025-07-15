export interface MetalProduct {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  diameter: string;
  length: string;
  grade: string;
  category: string;
  imageUrl?: string;
  colorType: "черный" | "цветной";
  suppliers?: { name: string; price: number }[];
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  diameter?: string;
  length?: string;
  grade?: string;
  category?: string;
  colorType?: "черный" | "цветной";
  imageUrl?: string;
  suppliers?: { name: string; price: number }[];
  quantity: number;
  link?: string; // Добавлено для ссылок на страницы товаров
}
