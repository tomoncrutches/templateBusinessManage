import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SalesItem, { SalesItemSkeleton } from './sales-item';

import { Sale } from '@/types/sales.types';
import { Skeleton } from './ui/skeleton';
import { cookies } from 'next/headers';
import { getLastWeek } from '@/services/sales.service';

export const HomeLastSalesSkeleton = () => {
  return (
    <Card className='col-span-full h-96 lg:col-span-4'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-2 w-48 lg:h-3' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-2 w-64 lg:h-3' />
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-6'>
        <SalesItemSkeleton basic />
        <SalesItemSkeleton basic />
        <SalesItemSkeleton basic />
        <SalesItemSkeleton basic />
        <SalesItemSkeleton basic />
        <SalesItemSkeleton basic />
      </CardContent>
    </Card>
  );
};

export default async function HomeLastSales() {
  const token = cookies().get('token');
  const sales: Sale[] | Error = await getLastWeek(token?.value as string);

  return (
    <Card className='col-span-full lg:col-span-4'>
      {sales instanceof Error ? (
        <CardHeader>
          <CardTitle>Últimas ventas</CardTitle>
          <CardDescription>{sales.message}</CardDescription>
        </CardHeader>
      ) : sales.length > 0 ? (
        <>
          <CardHeader>
            <CardTitle className='leading-5'></CardTitle>
            <CardDescription>
              Se han realizado {sales.length} ventas en los últimos 7 días.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex max-h-96 flex-col gap-6 overflow-auto'>
            {sales.map((sale) => {
              return <SalesItem key={sale.id} data={sale} basic />;
            })}
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className='leading-5'>Últimas ventas</CardTitle>
            <CardDescription>
              No se han realizado ventas en los últimos 7 días.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex h-96 flex-col gap-6 overflow-auto'></CardContent>
        </>
      )}
    </Card>
  );
}
