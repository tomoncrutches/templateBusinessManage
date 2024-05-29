import {
  ProductAddProductionDialogContainer,
  ProductDialogContainer,
} from '@/components/product-dialog-container';
import ProductsContainer, {
  ProductsContainerSkeleton,
} from '@/components/products-container';

import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import SearchBar from '@/components/search-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Products({
  searchParams,
}: {
  searchParams: {
    query?: string;
  };
}) {
  const query = searchParams.query ?? '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Productos</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        A continuación, visualizarás una lista de los productos que estan
        registrados en el sistema. Además, podrás agregar nuevos productos, asi
        como también modificar y eliminar los existentes.
      </Paragraph>
      <aside className='flex flex-col items-start gap-6 sm:flex-row sm:items-center'>
        <SearchBar
          placeholder='Filtra por nombre o stock disponible'
          width='sm:w-72 grow'
        />
        <Suspense
          fallback={
            <div className='flex flex-col items-center gap-6 md:flex-row'>
              <Skeleton className='h-8 w-48 rounded-sm' />
              <Skeleton className='h-8 w-28 rounded-sm' />
            </div>
          }
        >
          <ProductAddProductionDialogContainer />
          <ProductDialogContainer />
        </Suspense>
      </aside>
      <Suspense key={query} fallback={<ProductsContainerSkeleton />}>
        <ProductsContainer query={query} />
      </Suspense>
    </Screen>
  );
}
