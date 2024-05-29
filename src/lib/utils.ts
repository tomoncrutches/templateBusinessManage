import { API_URL } from '@/config/api';
import { Material } from '@/types/material.types';
import { ErrorResponse } from '@/types/response.types';
import { Sale, SaleDetail, SaleToCreate } from '@/types/sales.types';
import { Transaction } from '@/types/transaction.types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TFetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const toAPI = async ({
  route,
  method,
  body,
  headers,
  tags,
}: {
  route: string;
  method: TFetchMethod;
  body?: RequestInit['body'];
  headers?: {
    'Content-Type'?: 'application/json';
    Authorization?: `Bearer ${string}`;
  };
  tags?: string[];
}) => {
  /**
   * Fetch dinamico para mantener un codigo limpio y no repetitivo.
   * Si se le pasa el atributo 'cache' como verdadero guarda en cache los datos y
   * los revalida cada 45 segundos. (actualmente no está en funcionionamiento)
   */
  const res = await fetch(`${API_URL}/${route}`, {
    method,
    body: body ?? undefined,
    headers: headers ?? undefined,
    next: {
      tags: tags ?? undefined,
    },
  });

  return (await res.json()) as
    | Material
    | Material[]
    | Sale
    | Sale[]
    | SaleDetail
    | SaleToCreate
    | Transaction[]
    | { access_token: string }
    | { isValid: boolean }
    | ErrorResponse;
};

export const generateWeekdays = () => {
  return [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
};

export const generateHours = () => {
  const hours: string[] = [];
  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      hours.push(formattedHour);
    }
  }
  return hours;
};

export const someIsNull = (someValue: object) => {
  return Object.values(someValue).some((value) => value === null);
};
