import { Client } from '@/types/clients.types';
import { ErrorMessages } from '@/types/response.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'clients',
      tags: ['clients'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Client[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const create = async (payload: Client, token: string) => {
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'clients',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Client;
  } catch (error) {
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const update = async (payload: Client, token: string) => {
  try {
    const result = await toAPI({
      method: 'PUT',
      route: `clients?id=${payload.id}`,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Client;
  } catch (error) {
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const deleteOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'DELETE',
      route: `clients?id=${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Client;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
