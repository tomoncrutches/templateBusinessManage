import { Card, CardContent } from './ui/card';
import MaterialItem, { MaterialItemSkeleton } from './material-item';

import { Material } from '@/types/material.types';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll } from '@/services/material.service';

export const MaterialContainerSkeleton = () => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-8'>
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
        <MaterialItemSkeleton />
      </CardContent>
    </Card>
  );
};

export default async function MaterialContainer({
  query,
  type,
}: {
  query?: string;
  type?: string;
}) {
  const token = cookies().get('token');
  const material: Material[] | Error = await getAll(token?.value as string);

  let filteredMaterial = material as Material[];

  if (query) {
    filteredMaterial = (material instanceof Array &&
      material.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      )) as Material[];
  }

  if (type && type !== 'Todos') {
    filteredMaterial = (filteredMaterial instanceof Array &&
      filteredMaterial.filter((item) => item.type === type)) as Material[];
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        {material instanceof Error ? (
          <SmallTypography>{material.message}</SmallTypography>
        ) : (filteredMaterial as Material[])?.length > 0 ? (
          (filteredMaterial as Material[])?.map((item) => {
            return <MaterialItem key={item.id} data={item} />;
          })
        ) : (
          <SmallTypography>No se encontraron materiales.</SmallTypography>
        )}
      </CardContent>
    </Card>
  );
}
