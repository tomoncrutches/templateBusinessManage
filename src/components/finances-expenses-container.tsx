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
import { ExpenseIcon } from './icons/expense-icon';
import { FixedExpensesDialog } from './finances-dialog';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { Title } from './ui/title';
import { Transaction } from '@/types/transaction.types';
import { cookies } from 'next/headers';
import { getAllExpenses } from '@/services/transaction.service';

export const ExpensesContainerSkeleton = () => {
  return (
    <>
      <div className='col-span-full flex flex-col gap-4 md:col-start-5 md:col-end-9'>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-6 w-72' />
          <Skeleton className='h-6 w-24' />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
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
            </TableRow>
            <TableRow>
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
            </TableRow>
            <TableRow>
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
            </TableRow>
            <TableRow>
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
            </TableRow>
            <TableRow>
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
      <div className='col-span-full flex flex-col gap-4 md:col-span-4'>
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
    </>
  );
};

export default async function ExpensesContainer() {
  const firstDayOfTheCurrentMonth = new Date();
  firstDayOfTheCurrentMonth.setDate(1);
  firstDayOfTheCurrentMonth.setHours(0, 0, 0, 0);

  const token = cookies().get('token');

  const expenses = await getAllExpenses(
    token?.value as string,
    false,
    firstDayOfTheCurrentMonth.toISOString(),
  );

  if (expenses instanceof Error) {
    return (
      <div className='col-span-4'>
        <SmallTypography>{expenses.message}</SmallTypography>
      </div>
    );
  }

  const fixedExpenses = expenses.filter((expense) => expense.type === 'Fijo');
  const variableExpenses = expenses.filter(
    (expense) => expense.type === 'Variable',
  );

  return (
    <>
      <div className='col-span-full flex flex-col gap-4 md:col-start-5 md:col-end-9'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-lg font-semibold lg:text-2xl'>
            Registro de Gastos Fijos
          </span>
          <FixedExpensesDialog />
        </div>
        {(fixedExpenses as Transaction[]).length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fixedExpenses.slice(0, 20).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell className='flex items-center gap-2'>
                      <ExpenseIcon size={22} />
                      <span>$ {expense.value.toLocaleString('ES-AR')}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString('ES-AR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell colSpan={2}>
                    $
                    {fixedExpenses
                      .reduce(
                        (total, expense) => total + (expense?.value as number),
                        0,
                      )
                      .toLocaleString('ES-AR')}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Link
              href={'finances/transactions?type=expense'}
              className='w-full'
            >
              <Button
                variant={'secondary'}
                className='h-8 w-full rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
              >
                Ver todos los gastos
              </Button>
            </Link>
          </>
        ) : (
          <SmallTypography>No se encontraron gastos fijos.</SmallTypography>
        )}
      </div>
      <div className='col-span-full flex flex-col gap-4 md:col-span-4'>
        <Title>Gastos</Title>
        {(variableExpenses as Transaction[]).length > 0 ? (
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
                {variableExpenses.slice(0, 20).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell className='flex items-center gap-2'>
                      <ExpenseIcon size={22} />
                      <span>$ {expense.value.toLocaleString('ES-AR')}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(expense.date).toLocaleDateString('ES-AR')}
                    </TableCell>
                    <TableCell>{expense.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell colSpan={3}>
                    $
                    {variableExpenses
                      .reduce(
                        (total, expense) => total + (expense?.value as number),
                        0,
                      )
                      .toLocaleString('ES-AR')}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Link
              href={'finances/transactions?type=expense'}
              className='w-full'
            >
              <Button
                variant={'secondary'}
                className='h-8 w-full rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
              >
                Ver todos los gastos
              </Button>
            </Link>
          </>
        ) : (
          <SmallTypography>
            No se encontraron gastos disponibles.
          </SmallTypography>
        )}
      </div>
    </>
  );
}
