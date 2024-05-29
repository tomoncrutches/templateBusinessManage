'use client';

import { MaterialBuyDialog, MaterialEditterSheet } from './material-dialog';

import Cookies from 'js-cookie';
import { DeleteDialog } from './shared';
import Image from 'next/image';
import { Material } from '@/types/material.types';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { deleteOne } from '@/services/material.service';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/useDialog';
import { useRouter } from 'next/navigation';

export const MaterialItemSkeleton = () => {
  return (
    <div className='flex items-center gap-8'>
      <Skeleton className='h-16 w-16 rounded-full' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-3 w-64' />
        <Skeleton className='h-3 w-48' />
        <Skeleton className='h-3 w-44' />
      </div>
    </div>
  );
};

export default function MaterialItem({ data }: { data: Material }) {
  const { showDialog, handleDialog } = useDialog();
  const { refresh } = useRouter();

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');

      await deleteOne(data?.id as string, token as string);
      toast.success('Material eliminado con éxito.');
      refresh();
      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className='flex gap-4 sm:items-center sm:gap-8'>
      <Image
        src={data?.image as string}
        width={100}
        height={100}
        quality={100}
        alt={`Imagen de ${data.name}`}
        className='hidden aspect-square h-16 w-16 rounded-full object-cover sm:block'
      />
      <div className='flex grow flex-col gap-1'>
        <span className='text-sm font-semibold'>{data.name}</span>
        <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3'>
          <SmallTypography variant='xs'>
            ${data.actual_price.toLocaleString('ES-AR')} x KG
          </SmallTypography>
          {data.stock < 0 ? (
            <SmallTypography variant='xs' className='text-red-500'>
              ¡Stock agotado! Se registro un consumo de materia prima no
              disponible de {-data.stock} gramos.
            </SmallTypography>
          ) : (
            <SmallTypography variant='xs'>
              {data.stock} gramos disponibles
            </SmallTypography>
          )}
        </div>
      </div>
      <div className='flex flex-col items-end gap-3 md:flex-row md:items-center'>
        <MaterialEditterSheet data={data} />
        <MaterialBuyDialog
          id={data.id as string}
          actualPrice={data.actual_price}
        />
        <DeleteDialog
          title={`¿Estás seguro de eliminar el material ${data?.name}?`}
          showDialog={showDialog}
          handleDialog={handleDialog}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
