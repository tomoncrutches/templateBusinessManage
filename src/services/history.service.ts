import { ErrorMessages } from '@/types/response.types';
import { History } from '@/types/history.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'history',
      tags: ['sales', 'clients', 'products', 'production', 'material'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as History[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
