import { Card, CardContent } from '@/components/ui/card';
import ExpensesContainer, {
  ExpensesContainerSkeleton,
} from '@/components/finances-expenses-container';
import FinancesBalanceContainer, {
  FinancesBalanceContainerSkeleton,
} from '@/components/finances-balance-container';
import IncomeContainer, {
  IncomeContainerSkeleton,
} from '@/components/finances-income-container';
import ProductTypesContainer, {
  ProductTypesContainerSkeleton,
} from '@/components/finances-product-types-container';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PercentageIcon from '@/components/icons/percentage-icon';
import Screen from '@/components/screen';
import { Suspense } from 'react';

export default function Finances() {
  return (
    <Screen className='mt-16 grid grid-cols-8 gap-10 lg:mt-0 lg:gap-6'>
      <div className='col-span-full flex flex-col gap-4 md:col-span-4 lg:col-span-3'>
        <Suspense
          fallback={
            <Card>
              <CardContent className='flex flex-col gap-4'>
                <FinancesBalanceContainerSkeleton />
                <ProductTypesContainerSkeleton />
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardContent className='flex flex-col gap-4'>
              <FinancesBalanceContainer />
              <ProductTypesContainer />
            </CardContent>
          </Card>
        </Suspense>
        <Link href={'finances/transactions'} className='w-full'>
          <Button
            variant={'secondary'}
            className='h-8 w-full rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
          >
            Ver todos los movimientos
          </Button>
        </Link>
      </div>
      <Suspense fallback={<ExpensesContainerSkeleton />}>
        <ExpensesContainer />
      </Suspense>
      <Suspense fallback={<IncomeContainerSkeleton />}>
        <IncomeContainer />
      </Suspense>
      <div className='col-span-full flex flex-col gap-4 md:col-span-5 2xl:col-span-3'>
        <div className='flex items-center justify-between gap-2'>
          <span className='overflow-hidden text-ellipsis text-lg font-semibold lg:text-2xl'>
            Recomendación
          </span>
          <Button className='flex h-8 items-center gap-2 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2'>
            <PercentageIcon size={16} />
            Modificar porcentajes
          </Button>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Clásica</TableCell>
              <TableCell>$2.300,50</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gourmet</TableCell>
              <TableCell>$3.040,50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Screen>
  );
}
