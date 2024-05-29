import { Card, CardContent } from './ui/card';
import SalesItem, { SalesItemSkeleton } from './sales-item';

import { Sale } from '@/types/sales.types';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll } from '@/services/sales.service';

export const SalesContainerSkeleton = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-8'>
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
        <SalesItemSkeleton />
      </CardContent>
    </Card>
  );
};

export default async function SalesContainer({ query }: { query: string }) {
  const token = cookies().get('token');
  const sales: Sale[] | Error = await getAll(token?.value as string);

  const filteredSales = query
    ? sales instanceof Array &&
      sales?.filter((sale) => {
        if (sale?.client?.name.toLowerCase().includes(query)) return true;
        if (sale.total >= Number(query)) return true;
        if (new Date(sale.date).toLocaleDateString('ES-AR').includes(query))
          return true;
      })
    : sales;

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        {sales instanceof Error ? (
          <SmallTypography>{sales.message}</SmallTypography>
        ) : (filteredSales as Sale[])?.length > 0 ? (
          (filteredSales as Sale[])?.map((item) => {
            return <SalesItem key={item.id} data={item} />;
          })
        ) : (
          <SmallTypography>No se encontraron ventas.</SmallTypography>
        )}
      </CardContent>
    </Card>
  );
}
