import { Product, ProductType } from '@/types/products.types';

import { ErrorMessages } from '@/types/response.types';
import { toAPI } from '@/lib/utils';

export const getAll = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'products',
      tags: ['products'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Product[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const create = async (payload: Product, token: string) => {
  const formData = new FormData();
  formData.append(
    'product',
    JSON.stringify({ ...payload, image: undefined, image_file: undefined }),
  );
  const image_file = payload.image_file?.item(0);
  formData.append('image_file', image_file as File);

  try {
    const result = await toAPI({
      method: 'POST',
      route: 'products',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Product;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const update = async (payload: Product, token: string) => {
  const formData = new FormData();
  formData.append(
    'product',
    JSON.stringify({ ...payload, image_file: undefined }),
  );
  if (payload.image_file) formData.append('image_file', payload.image_file[0]);
  try {
    const result = await toAPI({
      method: 'PUT',
      route: 'products',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Product;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: `products/detail?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as Product;
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const getAllTypes = async (token: string) => {
  try {
    const result = await toAPI({
      method: 'GET',
      route: 'products/types',
      tags: ['product_types'],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) return new Error(result.message);

    return result as ProductType[];
  } catch (error) {
    return new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const updateType = async (payload: ProductType, token: string) => {
  try {
    const result = await toAPI({
      method: 'PATCH',
      route: 'products/types',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as ProductType;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};

export const deleteOne = async (id: string, token: string) => {
  try {
    const result = await toAPI({
      method: 'DELETE',
      route: `products?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if ('statusCode' in result) throw new Error(result.message);

    return result as Product;
  } catch (error) {
    if (error) throw error;
    throw new Error(ErrorMessages.API_NOT_AVAILABLE);
  }
};
