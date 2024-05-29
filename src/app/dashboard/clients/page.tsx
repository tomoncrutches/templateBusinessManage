import ClientsContainer, {
  ClientsContainerSkeleton,
} from '@/components/clients-container';

import { ClientAddDialog } from '@/components/clients-dialog';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import SearchBar from '@/components/search-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

type Props = {
  searchParams?: {
    query?: string;
  };
};

export default function Clients({ searchParams }: Props) {
  const query = searchParams?.query || '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Clientes</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        En este apartado visualizarás una tabla con los clientes registrados en
        el sistema. Además, podrás agregar nuevos, asi como también modificar y
        eliminar los existentes.
      </Paragraph>
      <aside className='flex flex-col items-start gap-6 sm:flex-row sm:items-center'>
        <SearchBar
          placeholder='Filtra por nombre, email o teléfono'
          width='sm:w-72'
        />
        <Suspense fallback={<Skeleton className='h-8 w-48 rounded-sm' />}>
          <ClientAddDialog />
        </Suspense>
      </aside>
      <Suspense key={query} fallback={<ClientsContainerSkeleton />}>
        <ClientsContainer query={query} />
      </Suspense>
    </Screen>
  );
}
