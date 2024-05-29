import { Card, CardContent, CardFooter, CardTitle } from './ui/card';

import { ButtonSaleInvoice } from './button-sale-invoice';
import { Map } from './map';
import { Sale } from '@/types/sales.types';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getOne } from '@/services/sales.service';

export const SalesDetailContainerSkeleton = () => {
  return (
    <Card>
      <CardContent className='grid grid-cols-4 gap-6'>
        <div className='col-span-4 flex flex-col gap-3 sm:col-span-2'>
          <Skeleton className='h-4 w-32 rounded-sm' />
          <section className='flex flex-col gap-2'>
            <Skeleton className='h-3 w-64 rounded-sm' />
            <Skeleton className='h-3 w-48 rounded-sm' />
            <Skeleton className='h-3 w-48 rounded-sm' />
            <Skeleton className='h-3 w-48 rounded-sm' />
          </section>
        </div>
        <div className='col-span-4 flex flex-col gap-3 sm:col-span-2'>
          <Skeleton className='h-4 w-32 rounded-sm' />
          <section className='flex flex-col gap-2'>
            <Skeleton className='h-3 w-48 rounded-sm' />
            <Skeleton className='h-6 w-24 rounded-sm' />
          </section>
        </div>
        <div className='col-span-4 flex flex-col gap-3'>
          <Skeleton className='h-4 w-32 rounded-sm' />
          <section className='grid grid-cols-4 gap-6'>
            <div className='col-span-4 flex flex-col gap-2 sm:col-span-2'>
              <Skeleton className='h-2 w-64 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-4 w-24 rounded-sm' />
            </div>
            <div className='col-span-4 flex flex-col gap-2 sm:col-span-2'>
              <Skeleton className='h-2 w-64 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-4 w-24 rounded-sm' />
            </div>
            <div className='col-span-4 flex flex-col gap-2 sm:col-span-2'>
              <Skeleton className='h-2 w-64 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-2 w-48 rounded-sm' />
              <Skeleton className='h-4 w-24 rounded-sm' />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function SalesDetailContainer({ id }: { id: string }) {
  const token = cookies().get('token');
  const data = await getOne(id, token?.value as string);

  const date = data instanceof Error ? null : new Date(data?.date);

  return (
    <Card>
      <CardContent className='grid grid-cols-4 gap-6'>
        {data instanceof Error ? (
          <SmallTypography>{data.message}</SmallTypography>
        ) : (
          <>
            <div className='col-span-4 flex flex-col gap-3'>
              <CardTitle>Productos</CardTitle>
              <section className='grid grid-cols-4 gap-6'>
                {data?.saleDetail.map((detail) => {
                  const productTotal =
                    detail?.quantity * (detail?.product?.type?.price as number);

                  return (
                    <div
                      key={detail?.id} //ID del detalle (detalle !== producto)
                      className='col-span-2 flex flex-col gap-2'
                    >
                      <SmallTypography className='!text-xs sm:!text-sm'>
                        {detail?.product?.name}
                      </SmallTypography>
                      <SmallTypography className='!text-xs opacity-75 sm:!text-sm'>
                        {detail?.quantity} unidades
                      </SmallTypography>
                      <span className='w-fit rounded-md bg-green-megallon/20 px-2 py-[2px] text-sm font-medium'>
                        ${productTotal.toLocaleString('ES-AR')}
                      </span>
                    </div>
                  );
                })}
              </section>
            </div>
            <div className='col-span-2 flex flex-col gap-3'>
              <CardTitle>Cliente</CardTitle>
              <section className='flex flex-col gap-2'>
                <SmallTypography className='!text-xs sm:!text-sm'>
                  {data?.client?.name}
                </SmallTypography>
                <a
                  href={`mailto:${data?.client?.email}`}
                  target='_blank'
                  className='w-fit max-w-28 overflow-hidden text-ellipsis text-xs font-medium leading-4 opacity-75 hover:text-green-megallon hover:underline sm:max-w-max sm:text-sm'
                >
                  {data?.client?.email}
                </a>
                <a
                  target='_blank'
                  href={`https://wa.me/${data?.client?.phone}`}
                  className='w-fit max-w-28 overflow-hidden text-ellipsis text-xs font-medium leading-4 opacity-75 hover:text-green-megallon hover:underline sm:text-sm'
                >
                  {data?.client?.phone}
                </a>
              </section>
            </div>
            <div className='col-span-2 flex flex-col gap-3'>
              <CardTitle>Información</CardTitle>
              <section className='flex flex-col gap-2'>
                <SmallTypography className='text-nowrap !text-xs opacity-75 sm:!text-sm'>
                  {(date as Date).toLocaleDateString('ES-AR')}{' '}
                  {(date as Date).toLocaleTimeString('ES-AR')}
                </SmallTypography>
                <span className='w-fit rounded-md bg-green-megallon/20 px-2 py-[2px] text-base font-medium md:text-lg'>
                  $ {data?.total.toLocaleString('ES-AR')}
                </span>
              </section>
            </div>
            <div className='col-span-4 flex flex-col gap-3'>
              <CardTitle>Ubicación</CardTitle>
              <Map
                lat={Number(data?.client?.address?.lat)}
                lon={Number(data?.client?.address?.lon)}
              />
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <ButtonSaleInvoice data={data as Sale} />
      </CardFooter>
    </Card>
  );
}
