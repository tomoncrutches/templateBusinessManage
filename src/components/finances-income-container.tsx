import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import { Button } from './ui/button';
import { IncomeIcon } from './icons/income-icon';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { Title } from './ui/title';
import { Transaction } from '@/types/transaction.types';
import { cookies } from 'next/headers';
import { getAllIncome } from '@/services/transaction.service';

export const IncomeContainerSkeleton = () => {
  return (
    <div className='col-span-full flex flex-col gap-4 md:col-start-5 md:col-end-9'>
      <Skeleton className='h-8 w-48' />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className='h-3 w-24' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-3 w-24' />
            </TableHead>
            <TableHead>
              <Skeleton className='h-3 w-24' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
            <TableCell>
              <Skeleton className='h-3 w-24' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default async function IncomeContainer() {
  const firstDayOfTheCurrentMonth = new Date();
  firstDayOfTheCurrentMonth.setDate(1);
  firstDayOfTheCurrentMonth.setHours(0, 0, 0, 0);

  const token = cookies().get('token');

  const transactions = await getAllIncome(
    token?.value as string,
    firstDayOfTheCurrentMonth.toISOString(),
  );

  return (
    <div className='col-span-full flex flex-col gap-4 md:col-start-5 md:col-end-9'>
      <Title>Ingresos</Title>
      {transactions instanceof Error ? (
        <SmallTypography>{transactions.message}</SmallTypography>
      ) : (transactions as Transaction[]).length > 0 ? (
        <>
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
              {transactions.slice(0, 20).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell className='flex items-center gap-2'>
                    <IncomeIcon size={22} />
                    <span>$ {transaction.value.toLocaleString('ES-AR')}</span>
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('ES-AR')}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell colSpan={3}>
                  $
                  {transactions
                    .reduce(
                      (total, transaction) =>
                        total + (transaction?.value as number),
                      0,
                    )
                    .toLocaleString('ES-AR')}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Link href={'finances/transactions?type=income'} className='w-full'>
            <Button
              variant={'secondary'}
              className='h-8 w-full rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
            >
              Ver todos los ingresos
            </Button>
          </Link>
        </>
      ) : (
        <SmallTypography>
          No se encontraron ingresos disponibles.
        </SmallTypography>
      )}
    </div>
  );
}
