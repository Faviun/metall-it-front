// Новый интерфейс для продуктов из API поставщика
export interface ApiProduct {
  id: number;
  provider: string;
  category: string;
  name: string;
  parserName: string | null;
  description: string;
  gost: string;
  length: string;
  price1: number | null;
  price2: number | null;
  available: boolean;
  image: string;
  link: string;
  size: string | null;
  mark: string | null;
  location: string | null;
  weight: string | null;
  width: string | null;
  updatedAt: string;
}

export interface ApiResponse {
  message: string;
  provider: string;
  total: number;
  perPage: number;
  filterProducts: ApiProduct[];
}

// Этот тип мы будем использовать для отображения в карточках
export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  imageUrl?: string;
  suppliers?: Supplier[];
  link?: string;
  diameter?: string;
  length?: string;
  grade?: string;
  colorType?: string;
  quantity: number;
}

export interface Supplier {
  name: string;
  price: number;
}
