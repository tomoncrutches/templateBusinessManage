import { ProductType } from '@/types/products.types';
import { ProductTypeEditter } from './finances-dialog';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAllTypes } from '@/services/products.service';

export const ProductTypesContainerSkeleton = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='h-3 w-32' />
      <Skeleton className='h-3 w-32' />
    </div>
  );
};

export default async function ProductTypesContainer() {
  const token = cookies().get('token');
  const types: ProductType[] | Error = await getAllTypes(
    token?.value as string,
  );
  if (types instanceof Error)
    return <SmallTypography>{types.message}</SmallTypography>;

  return (
    <div className='flex flex-col gap-3'>
      {(types as ProductType[]).map((type) => (
        <div key={type.id} className='flex items-center gap-4'>
          <span className='grow text-sm lg:text-base'>{type.name}</span>
          <SmallTypography>
            ${type.price.toLocaleString('ES-AR')}
          </SmallTypography>
          <ProductTypeEditter data={type} />
        </div>
      ))}
    </div>
  );
}
