import SalesContainer, {
  SalesContainerSkeleton,
} from '@/components/sales-container';

import { Paragraph } from '@/components/ui/paragraph';
import SalesDialogContainer from '@/components/sales-dialog-container';
import Screen from '@/components/screen';
import SearchBar from '@/components/search-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Sales({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query ?? '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Ventas</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        En esta pantalla se mostrará un listado con las ventas efectuadas.
        Además, podrás registrar una nueva venta y modificar y/o eliminar alguna
        ya registrada.
      </Paragraph>
      <aside className='flex flex-col items-start gap-6 sm:flex-row sm:items-center'>
        <SearchBar
          placeholder='Filtra por monto, usuario o fecha'
          width='sm:w-72'
        />
        <Suspense fallback={<Skeleton className='h-8 w-28 rounded-sm' />}>
          <SalesDialogContainer />
        </Suspense>
      </aside>
      <Suspense key={query} fallback={<SalesContainerSkeleton />}>
        <SalesContainer query={query} />
      </Suspense>
    </Screen>
  );
}
