import { ProductAddDialog, ProductAddProductionDialog } from './product-dialog';
import { getAll, getAllTypes } from '@/services/products.service';

import { Material } from '@/types/material.types';
import { cookies } from 'next/headers';
import { getAll as getAllMaterial } from '@/services/material.service';

export async function ProductDialogContainer() {
  const token = cookies().get('token');
  const productTypes = await getAllTypes(token?.value as string);
  const material = await getAllMaterial(token?.value as string);

  if (productTypes instanceof Error) return <></>;
  return (
    <ProductAddDialog
      productsTypes={productTypes}
      material={material as Material[]}
    />
  );
}

export async function ProductAddProductionDialogContainer() {
  const token = cookies().get('token');
  const products = await getAll(token?.value as string);

  if (products instanceof Error) return <></>;
  return <ProductAddProductionDialog products={products} />;
}
