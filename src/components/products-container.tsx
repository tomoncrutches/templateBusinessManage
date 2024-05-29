import { Card, CardContent } from './ui/card';
import { Product, ProductType } from '@/types/products.types';
import ProductItem, { ProductItemSkeleton } from './product-item';
import { getAll, getAllTypes } from '@/services/products.service';

import { Material } from '@/types/material.types';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll as getAllMaterial } from '@/services/material.service';

export const ProductsContainerSkeleton = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
        <ProductItemSkeleton />
      </CardContent>
    </Card>
  );
};

export default async function ProductsContainer({ query }: { query?: string }) {
  const token = cookies().get('token');
  const products: Product[] | Error = await getAll(token?.value as string);
  const productsTypes: ProductType[] | Error = await getAllTypes(
    token?.value as string,
  );

  const material = await getAllMaterial(token?.value as string);

  const filteredProducts = query
    ? products instanceof Array &&
      products.filter((product) => {
        if (product.name.toLowerCase().includes(query.toLowerCase()))
          return true;
        if (product.type?.name?.toLowerCase().includes(query.toLowerCase()))
          return true;
        if ((product.stock as number) >= Number(query)) return true;
      })
    : products;

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        {products instanceof Error ? (
          <SmallTypography>{products.message}</SmallTypography>
        ) : (filteredProducts as Product[])?.length > 0 ? (
          (filteredProducts as Product[])?.map((item) => {
            return (
              <ProductItem
                key={item.id}
                data={item}
                productTypes={productsTypes as ProductType[]}
                material={material as Material[]}
              />
            );
          })
        ) : (
          <SmallTypography>No se encontraron productos.</SmallTypography>
        )}
      </CardContent>
    </Card>
  );
}
