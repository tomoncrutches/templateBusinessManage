import { ErrorMessages } from '@/types/response.types';
import { Login } from '@/types/user.types';
import { toAPI } from '@/lib/utils';

export const signin = async (userdata: Login) => {
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'auth',
      body: JSON.stringify(userdata),
      headers: { 'Content-Type': 'application/json' },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as { access_token: string };
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
