import { ErrorMessages } from '@/types/response.types';
import { Transaction } from '@/types/transaction.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'transaction',
      tags: ['sales', 'products', 'material', 'transactions'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Transaction[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getAllIncome = async (token: string, initialDate?: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `transaction/income?initialDate=${initialDate ?? ''}`,
      tags: ['sales'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Transaction[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getAllExpenses = async (
  token: string,
  fixed?: boolean,
  initialDate?: string,
) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `transaction/expenses?initialDate=${initialDate ?? ''}&type=${fixed ? 'fixed' : ''}`,
      tags: ['products', 'material'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Transaction[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getBalance = async (
  firstDayOfMonthTimestamp: number,
  token: string,
) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `transaction/balance?startTimestamp=${firstDayOfMonthTimestamp}`,
      tags: ['sales', 'products', 'material'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as { balance: number };
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const create = async (payload: Transaction, token: string) => {
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'transaction',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Transaction;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
