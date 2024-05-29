import { ErrorMessages } from '@/types/response.types';
import { Production } from '@/types/products.types';
import { toAPI } from '@/lib/utils';

export const create = async (payload: Production, token: string) => {
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'production',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Production;
  } catch (error) {
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getLastFourWeeks = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `production/latest?id=${id}`,
      tags: ['production'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Production[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
