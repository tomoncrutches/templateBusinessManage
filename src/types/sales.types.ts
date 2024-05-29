import { Product, ProductForSale } from './products.types';

import { Client } from './clients.types';

export interface SaleToCreate {
  id?: string;
  date: Date;
  paid: boolean;
  delivered: boolean;
  number?: number;
  total: number;
  client_id: string;
}

export interface Sale extends Omit<SaleToCreate, 'client_id'> {
  client?: Client;
  saleDetail: SaleDetail[];
}

export interface SaleDetail {
  id: string;
  quantity: number;
  product: Product;
}

export interface SaleForCreate {
  id?: string;
  data: {
    date: Date;
    total: number;
    client_id: string;
  };
  items: ProductForSale[];
}
