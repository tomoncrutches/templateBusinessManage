import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

import { Skeleton } from './ui/skeleton';

export const HomeStatisticsSkeleton = () => {
  return (
    <Card className='col-span-full h-96 lg:col-span-3'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-2 w-48 lg:h-3' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-2 w-64 lg:h-3' />
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default function HomeStatistics() {
  return (
    <Card className='col-span-full lg:col-span-3'>
      <CardHeader>
        <CardTitle>Estadísticas del último mes</CardTitle>
        <CardDescription>
          En este momento las estadísticas no se encuentran disponibles.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
