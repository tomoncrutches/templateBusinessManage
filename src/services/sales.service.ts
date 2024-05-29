import { Sale, SaleForCreate, SaleToCreate } from '@/types/sales.types';

import { ErrorMessages } from '@/types/response.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'sales',
      tags: ['sales'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Sale[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getLastWeek = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'sales/lastweek',
      tags: ['sales'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Sale[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `sales/detail?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Sale;
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const create = async (payload: SaleForCreate, token: string) => {
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'sales',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as SaleToCreate[];
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const deleteOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      route: 'sales',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Sale;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const changePaid = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      route: 'sales/paid',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Sale;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const changeDelivered = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      route: 'sales/delivered',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Sale;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
