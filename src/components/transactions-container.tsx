import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Transaction, TransactionMode } from '@/types/transaction.types';
import { TransactionItem, TransactionItemSkeleton } from './transaction-item';

import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll } from '@/services/transaction.service';

export const TransactionContainerSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </TableBody>
    </Table>
  );
};

export default async function TransactionsContainer({
  query,
}: {
  query?: TransactionMode;
}) {
  const token = cookies().get('token');
  const transactions = await getAll(token?.value as string);

  const filteredTransactions = query
    ? transactions instanceof Array &&
      transactions?.filter((t) => {
        if (query === TransactionMode.ALL) return true;
        if (query === TransactionMode.EXPENSE) return t.value < 0;
        if (query === TransactionMode.INCOME) return t.value > 0;
      })
    : transactions;

  if (transactions instanceof Error)
    return <SmallTypography>{transactions.message}</SmallTypography>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(filteredTransactions as Transaction[]).length > 0 ? (
          (filteredTransactions as Transaction[]).map((t) => {
            const date = new Date(t.date);

            return <TransactionItem key={t.id} data={t} date={date} />;
          })
        ) : (
          <TableRow>
            <TableCell>No se encontraron transacciones.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
