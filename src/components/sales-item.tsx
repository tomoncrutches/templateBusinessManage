'use client';

import { ConfirmStateDialog, DeleteDialog } from './shared';
import {
  changeDelivered,
  changePaid,
  deleteOne,
} from '@/services/sales.service';

import { Button } from './ui/button';
import { CalendarIcon } from './icons/calendar-icon';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Sale } from '@/types/sales.types';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cn } from '@/lib/utils';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/useDialog';

export const SalesItemSkeleton = ({ basic }: { basic?: boolean }) => {
  return (
    <div className='flex flex-col gap-2'>
      {!basic && <Skeleton className='h-3 w-64' />}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-3 w-40 lg:h-4' />
        <Skeleton className='h-3 w-24 lg:h-4' />
      </div>
      {!basic && <Skeleton className='h-3 w-48' />}
    </div>
  );
};

export default function SalesItem({
  data,
  basic,
}: {
  data: Sale;
  basic?: boolean;
}) {
  const date = new Date(data.date);
  const dateToLocaleString = `${date.toLocaleDateString('ES-AR')} ${date.toLocaleTimeString('ES-AR')}`;

  const deleteDialog = useDialog();
  const confirmPaidDialog = useDialog();
  const confirmDeliveredDialog = useDialog();

  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');

      await deleteOne(data?.id as string, token as string);
      toast.success('Venta eliminada con éxito.');
      revalidateDataByTag('sales');
      deleteDialog.handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handlePaid = async () => {
    try {
      const token = Cookies.get('token');

      await changePaid(data?.id as string, token as string);
      toast.success(
        `Se realizó con éxito el cambio de estado de pago de la venta #${data?.number?.toString().padStart(6, '0')}`,
      );
      revalidateDataByTag('sales');
      confirmPaidDialog.handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleDelivered = async () => {
    try {
      const token = Cookies.get('token');

      await changeDelivered(data?.id as string, token as string);
      toast.success(
        `Se realizó con éxito el cambio de estado de entrega de la venta #${data?.number?.toString().padStart(6, '0')}`,
      );
      revalidateDataByTag('sales');
      confirmDeliveredDialog.handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col items-end gap-4 sm:flex-row sm:items-center lg:flex-row lg:justify-between'>
      <div className='flex w-full flex-col gap-2'>
        <SmallTypography variant='xs' className='opacity-50'>
          #{data?.number?.toString().padStart(6, '0')}
        </SmallTypography>
        <div className='flex w-full items-center justify-between gap-4 font-medium sm:justify-normal sm:gap-6'>
          <span className='text-sm sm:text-lg'>{data?.client?.name}</span>
          <span className='rounded-md bg-green-megallon/20 px-2 py-[2px] text-base sm:text-lg'>
            ${data?.total.toLocaleString('ES-AR')}
          </span>
        </div>
        {!basic && (
          <div className='flex items-center gap-2 opacity-50'>
            <CalendarIcon size={16} />
            <SmallTypography variant='xs'>{dateToLocaleString}</SmallTypography>
          </div>
        )}
      </div>
      <div
        className={cn(
          'flex flex-wrap items-center justify-end gap-3',
          !basic && 'md:min-w-96',
        )}
      >
        {!basic && (
          <>
            <ConfirmStateDialog
              title={`¿Estás seguro de que quieres cambiar el estado de pago de la venta #${data?.number?.toString().padStart(6, '0')}?`}
              action='Pago'
              state={data.paid}
              handleConfirm={handlePaid}
              handleDialog={confirmPaidDialog.handleDialog}
              showDialog={confirmPaidDialog.showDialog}
            />
            <ConfirmStateDialog
              title={`¿Estás seguro de que quieres cambiar el estado de entrega de la venta #${data?.number?.toString().padStart(6, '0')}?`}
              action='Entregado'
              state={data.delivered}
              handleConfirm={handleDelivered}
              handleDialog={confirmDeliveredDialog.handleDialog}
              showDialog={confirmDeliveredDialog.showDialog}
            />
            <DeleteDialog
              title={`¿Estás seguro de eliminar la venta con ID ${data.id}?`}
              showDialog={deleteDialog.showDialog}
              handleDelete={handleDelete}
              handleDialog={deleteDialog.handleDialog}
            />
          </>
        )}
        <Link
          href={`/dashboard/sales/${data.id}?number=${data.number}`}
          className={!basic ? 'md:ml-6' : ''}
        >
          <Button size={!basic ? 'sm' : 'default'} variant={'outline'}>
            Detalle
          </Button>
        </Link>
      </div>
    </div>
  );
}
