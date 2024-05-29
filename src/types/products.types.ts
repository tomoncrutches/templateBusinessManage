export interface ProductType {
  id: string;
  name?: string;
  price: number;
}

export interface ProductForSale {
  id?: string;
  price: number;
  quantity: number;
}

export interface Recipe {
  material_id: string;
  quantity: number;
}

export interface Product {
  id?: string;
  name: string;
  stock?: number;
  image?: string;
  image_file?: FileList;
  type_id?: string;
  type?: ProductType;
  materialRecipe?: Recipe[];
}

export interface Production {
  id?: string;
  date: Date;
  hours: number;
  personal_quantity: number;
  recipes_quantity?: number;
  ProductionDetail?: ProductionDetail[];

  products?: { id: string; quantity: number }[];
}

export interface ProductionDetail {
  id: string;
  production_id: string;
  product_id: string;
  quantity: number;
}

export interface IProductSale {
  id: string;
  quantity: number;
  recipe_quantity?: number;
}
