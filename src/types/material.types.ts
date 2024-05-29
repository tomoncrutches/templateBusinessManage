export interface Material {
  id?: string;
  name: string;
  stock: number;
  type?: string;
  image?: string;
  image_file?: FileList;
  actual_price: number;
}

export interface MaterialForBuy {
  id: string;
  quantity: number;
  price: number;
}

export interface IMateriaType {
  value: string;
  name: string;
}
