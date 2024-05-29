import MaterialContainer, {
  MaterialContainerSkeleton,
} from '@/components/material-container';

import { FilterByTypeBar } from '@/components/filter-bar';
import { MaterialAddDialog } from '@/components/material-dialog';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Material({
  searchParams,
}: {
  searchParams: { query?: string; type?: string };
}) {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Material</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        A continuación, visualizarás una lista de los materiales que estan
        registrados en el sistema. Además, podrás agregar nuevos materiales, asi
        como también modificar y eliminar los existentes.
      </Paragraph>
      <aside className='flex flex-col items-start gap-6 sm:flex-row sm:items-center'>
        <div className='flex w-full grow items-center gap-6'>
          <SearchBar placeholder='Filtra por nombre' />
          <FilterByTypeBar />
        </div>
        <MaterialAddDialog />
      </aside>
      <Suspense key={query + type} fallback={<MaterialContainerSkeleton />}>
        <MaterialContainer query={query} type={type} />
      </Suspense>
    </Screen>
  );
}
