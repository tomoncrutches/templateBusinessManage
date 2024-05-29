import TransactionsContainer, {
  TransactionContainerSkeleton,
} from '@/components/transactions-container';

import { FilterBar } from '@/components/filter-bar';
import { Label } from '@/components/ui/label';
import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';
import { TransactionMode } from '@/types/transaction.types';

export default function Transactions({
  searchParams,
}: {
  searchParams: { type?: TransactionMode };
}) {
  const query = searchParams.type || '';

  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Transacciones</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        Se mostrarán todas las transacciones realizadas a partir de las ventas y
        los registros de gastos fijos y compras de Material.
      </Paragraph>
      <aside className='flex items-center gap-4'>
        <Label htmlFor='filter'>Filtrar por</Label>
        <FilterBar />
      </aside>
      <section>
        <Suspense key={query} fallback={<TransactionContainerSkeleton />}>
          <TransactionsContainer query={query as TransactionMode} />
        </Suspense>
      </section>
    </Screen>
  );
}
