import ProductDetailContainer, {
  ProductDetailContainerSkeleton,
} from '@/components/product-detail-container';

import Screen from '@/components/screen';
import { Suspense } from 'react';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const id = params.id || '';

  return (
    <Screen className='flex flex-col gap-3'>
      <Suspense fallback={<ProductDetailContainerSkeleton />}>
        <ProductDetailContainer key={id} id={id} />
      </Suspense>
    </Screen>
  );
}
