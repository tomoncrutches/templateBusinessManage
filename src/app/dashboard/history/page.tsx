import HistoryContainer, {
  HistoryContainerSkeleton,
} from '@/components/history-container';
import React, { Suspense } from 'react';

import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import SearchBar from '@/components/search-bar';
import { Title } from '@/components/ui/title';

export default function History({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams?.query ?? '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Historial</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        Acá podrás visualizar el historial con todas las modificaciones que se
        hayan realizado relacionadas a los productos, materiales, sabores, entre
        otras cosas.
      </Paragraph>
      <aside>
        <SearchBar
          placeholder='Filtra por usuario, fecha o acción'
          width='sm:w-72'
        />
      </aside>
      <Suspense key={query} fallback={<HistoryContainerSkeleton />}>
        <HistoryContainer query={query} />
      </Suspense>
    </Screen>
  );
}
