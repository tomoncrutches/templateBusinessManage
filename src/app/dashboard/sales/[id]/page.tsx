import SalesDetailContainer, {
  SalesDetailContainerSkeleton,
} from '@/components/sales-detail-container';

import Screen from '@/components/screen';
import { Subtitle } from '@/components/ui/subtitle';
import { Suspense } from 'react';

export default function SalesDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { number: number };
}) {
  const id = params.id || '';
  const number = searchParams.number || undefined;

  return (
    <Screen className='flex flex-col gap-3'>
      <Subtitle>Venta #{number?.toString().padStart(6, '0') ?? id}</Subtitle>
      <Suspense key={id} fallback={<SalesDetailContainerSkeleton />}>
        <SalesDetailContainer key={id} id={id} />
      </Suspense>
    </Screen>
  );
}
