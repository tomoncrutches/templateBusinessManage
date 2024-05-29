'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { FormAddClient, FormEditter } from './clients-form';
import { Pencil1Icon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

import { Button } from './ui/button';
import { Client } from '@/types/clients.types';
import Cookies from 'js-cookie';
import { deleteOne } from '@/services/clients.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/useDialog';
import { useSubmitting } from '@/hooks/useSubmitting';

export const ClientAddDialog = () => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button onClick={handleDialog} className='bg-green-megallon'>
          Agregar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onEscapeKeyDown={handleDialog}
        className='max-h-dvh overflow-auto'
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Nuevo cliente</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del cliente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAddClient handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

type Props = {
  data: Client;
};

export const ClientEditDialog = ({ data }: Props) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <Sheet open={showDialog}>
      <SheetTrigger asChild>
        <Button
          onClick={handleDialog}
          variant={'ghost'}
          size={'sm'}
          className='flex w-full justify-start gap-2'
        >
          <Pencil1Icon className='h-4 w-4' />
          <span>Modificar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        onEscapeKeyDown={handleDialog}
        hide={handleDialog}
        className='flex flex-col gap-4 overflow-y-auto'
      >
        <SheetHeader>
          <SheetTitle>Editar cliente</SheetTitle>
          <SheetDescription>
            Modifique lo que desee acerca del cliente.
          </SheetDescription>
        </SheetHeader>
        <FormEditter data={data} handleDialog={handleDialog} />
      </SheetContent>
    </Sheet>
  );
};

export const ClientDeleteDialog = ({ data }: Props) => {
  const { showDialog, handleDialog } = useDialog();
  const { submitting, handleSubmitting } = useSubmitting();

  const handleDelete = async () => {
    handleSubmitting();
    try {
      const token = Cookies.get('token');

      await deleteOne(data?.id as string, token as string);
      toast.success('Cliente eliminado con éxito.');
      revalidateDataByTag('clients');
      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
    handleSubmitting();
  };

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={handleDialog}
          variant={'ghost'}
          size={'sm'}
          className='flex w-full justify-start gap-2'
        >
          <TrashIcon className='h-4 w-4' />
          <span>Eliminar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de elminar el cliente{' '}
            <span className='font-bold'>{data.name}</span>?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-green-megallon'
            disabled={submitting}
          >
            {submitting ? (
              <>
                <ReloadIcon className='mr-2 animate-spin' />
                Confirmando
              </>
            ) : (
              'Confirmar'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
