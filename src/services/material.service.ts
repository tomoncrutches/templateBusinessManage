import { Material, MaterialForBuy } from '@/types/material.types';

import { ErrorMessages } from '@/types/response.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'material',
      tags: ['material'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Material[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const create = async (payload: Material, token: string) => {
  const formData = new FormData();
  formData.append(
    'material',
    JSON.stringify({ ...payload, image: undefined, image_file: undefined }),
  );
  const image_file = payload.image_file?.item(0);

  formData.append('image_file', image_file as File);
  try {
    const result = await toAPI({
      method: 'POST',
      route: 'material',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Material;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const update = async (payload: Material, token: string) => {
  const formData = new FormData();
  formData.append(
    'material',
    JSON.stringify({ ...payload, image_file: undefined }),
  );
  if (payload.image_file) formData.append('image_file', payload.image_file[0]);
  try {
    const result = await toAPI({
      method: 'PUT',
      route: 'material',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Material;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const buy = async (payload: MaterialForBuy, token: string) => {
  try {
    const result = await toAPI({
      method: 'PATCH',
      route: 'material/buy',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Material;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const deleteOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'DELETE',
      route: 'material',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Material;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
