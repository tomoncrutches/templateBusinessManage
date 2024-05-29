import HomeLastSales, {
  HomeLastSalesSkeleton,
} from '@/components/home-last-sales';
import HomeStatistics, {
  HomeStatisticsSkeleton,
} from '@/components/home-statistics';

import { Paragraph } from '@/components/ui/paragraph';
import Screen from '@/components/screen';
import { Suspense } from 'react';
import { Title } from '@/components/ui/title';

export default function Dashboard() {
  return (
    <Screen className='flex flex-col gap-6'>
      <Title>Inicio</Title>
      <Paragraph className='text-sm md:text-base md:leading-7'>
        En este sistema podrás gestionar los productos y sus respectivas
        producciones, detallando ingredientes a utilizar y todo lo que conlleva
        su proceso, entre otras cosas. Además, podrás administrar las ventas que
        se realicen, asi como tambien visualizar diferentes estadísticas para
        poder llevar un buen control de tu negocio.
      </Paragraph>
      <section className='grid grid-cols-7 gap-6'>
        <Suspense
          fallback={
            <>
              <HomeLastSalesSkeleton />
              <HomeStatisticsSkeleton />
            </>
          }
        >
          <HomeLastSales />
          <HomeStatistics />
        </Suspense>
      </section>
    </Screen>
  );
}
