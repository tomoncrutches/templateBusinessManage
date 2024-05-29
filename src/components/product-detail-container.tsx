import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Product, Production, ProductionDetail } from '@/types/products.types';

import Image from 'next/image';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { Subtitle } from './ui/subtitle';
import { cookies } from 'next/headers';
import { getLastFourWeeks } from '@/services/production.service';
import { getOne } from '@/services/products.service';

export const ProductDetailContainerSkeleton = () => {
  return (
    <Card className='mt-16 flex flex-col-reverse justify-between sm:flex-row lg:mt-0'>
      <CardContent className='flex flex-col justify-between gap-4'>
        <section className='flex flex-col gap-4'>
          <Skeleton className='h-3 w-64 md:w-96' />
          <Skeleton className='h-7 w-44 md:w-72' />
          <Skeleton className='h-3 w-56' />
          <section className='flex flex-col gap-4'>
            <Skeleton className='h-3 w-24' />
            <div className='flex items-center gap-4'>
              <Skeleton className='h-5 w-36' />
              <Skeleton className='h-5 w-36' />
            </div>
          </section>
          <div className='flex flex-col gap-8 pt-4'>
            <Skeleton className='h-3 w-64 md:w-96' />
            <ul className='flex flex-wrap gap-8'>
              <li className='flex flex-col gap-4'>
                <Skeleton className='h-3 w-56 md:w-96' />
                <Skeleton className='h-3 w-32 md:w-64' />
                <Skeleton className='h-3 w-12 md:w-20' />
                <Skeleton className='h-3 w-28 md:w-48' />
                <Skeleton className='h-3 w-20 md:w-32' />
              </li>
              <li className='flex flex-col gap-4'>
                <Skeleton className='h-3 w-56 md:w-96' />
                <Skeleton className='h-3 w-32 md:w-64' />
                <Skeleton className='h-3 w-12 md:w-20' />
                <Skeleton className='h-3 w-28 md:w-48' />
                <Skeleton className='h-3 w-20 md:w-32' />
              </li>
              <li className='flex flex-col gap-4'>
                <Skeleton className='h-3 w-56 md:w-96' />
                <Skeleton className='h-3 w-32 md:w-64' />
                <Skeleton className='h-3 w-12 md:w-20' />
                <Skeleton className='h-3 w-28 md:w-48' />
                <Skeleton className='h-3 w-20 md:w-32' />
              </li>
            </ul>
          </div>
        </section>
      </CardContent>
      <Skeleton className='aspect-square h-auto w-full rounded-t-xl rounded-bl-none rounded-br-none object-cover sm:w-96 sm:rounded-br-xl sm:rounded-tl-none md:rounded-l-none lg:w-[420px] xl:w-[520px]' />
    </Card>
  );
};

export default async function ProductDetailContainer({ id }: { id: string }) {
  const token = cookies().get('token');
  const data: Product = await getOne(id, token?.value as string);
  const lastFourWeeksProductions: Production[] | Error = await getLastFourWeeks(
    id,
    token?.value as string,
  );

  return (
    <Card className='mt-16 flex flex-col-reverse justify-between sm:flex-row lg:mt-0'>
      <CardContent className='flex flex-col justify-between gap-4'>
        <section className='flex flex-col gap-4'>
          <SmallTypography className='!text-xs opacity-50 sm:!text-sm'>
            {data?.id}
          </SmallTypography>
          <Subtitle>{data?.name}</Subtitle>
          <SmallTypography className='!text-xs sm:!text-sm'>
            {data?.stock} unidades disponibles
          </SmallTypography>
          <section className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <span className='w-fit rounded-md bg-green-megallon/20 px-3 py-1.5 text-sm font-medium leading-5 md:text-base'>
                {data?.type?.name}
              </span>
              <span className='w-fit rounded-md bg-green-megallon px-3 py-1.5 text-sm font-medium leading-5 text-primary-foreground md:text-base'>
                ${data?.type?.price}
              </span>
            </div>
          </section>
        </section>
        {(lastFourWeeksProductions as Production[]).length > 0 ? (
          <div className='flex flex-col gap-8 pt-4'>
            <CardTitle className='leading-5 md:leading-none'>
              Producciones
            </CardTitle>
            <CardDescription>
              Realizadas en las últimas 4 semanas
            </CardDescription>
            <ul className='flex flex-wrap gap-8'>
              {(lastFourWeeksProductions as Production[]).map((production) => {
                const { id, date, hours, personal_quantity, ProductionDetail } =
                  production;
                return (
                  <li key={id} className='flex flex-col gap-4'>
                    <SmallTypography>
                      <strong>Fecha </strong>
                      {new Date(date).toLocaleDateString('ES-AR')}{' '}
                      {new Date(date).toLocaleTimeString('ES-AR')}
                    </SmallTypography>
                    <SmallTypography>
                      <strong>Horas </strong>
                      {hours}
                    </SmallTypography>
                    <SmallTypography>
                      <strong>Cantidad de personal </strong>
                      {personal_quantity}
                    </SmallTypography>
                    <SmallTypography>
                      <strong>Cantidad: </strong>
                      {(ProductionDetail as ProductionDetail[])[0].quantity}
                    </SmallTypography>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <CardTitle className='leading-5 md:leading-none'>
              Producciones
            </CardTitle>
            <CardDescription>
              No se encontraron producciones en las últimas 4 semanas.
            </CardDescription>
          </div>
        )}
      </CardContent>
      <Image
        src={data?.image as string}
        width={1000}
        height={1000}
        className='aspect-square h-auto w-max rounded-r-lg object-cover sm:w-96 lg:w-[420px] xl:w-[520px]'
        alt={`Imágen de ${data?.name}`}
      />
    </Card>
  );
}
