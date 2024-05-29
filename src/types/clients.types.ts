export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: Adress;
  attention?: string;
}

export interface Adress {
  id?: string;
  address?: string;
  lat: string | number;
  lon: string | number;
}
