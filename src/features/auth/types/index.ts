export interface MetalProduct {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    diameter: string;
    length: string;
    grade: string;
    category: string;
    colorType: "черный" | "цветной";
  }