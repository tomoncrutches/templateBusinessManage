'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

import { Button } from './ui/button';
import { Client } from '@/types/clients.types';
import { FormAdd } from './sales-form';
import { FormAddClient } from './clients-form';
import { PlusIcon } from '@radix-ui/react-icons';
import { Product } from '@/types/products.types';
import { useDialog } from '@/hooks/useDialog';

export const SalesAddDialog = ({
  clients,
  products,
}: {
  clients: Client[];
  products: Product[];
}) => {
  const { showDialog, handleDialog } = useDialog();
  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button className='bg-green-megallon' onClick={handleDialog}>
          Nueva venta
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Nueva venta</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos de la venta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAdd
          clients={clients as Client[]}
          products={products as Product[]}
          handleDialog={handleDialog}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ClientAddDialog = ({
  showDialog,
  handleDialog,
}: {
  showDialog: boolean;
  handleDialog: () => void;
}) => {
  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={handleDialog}
          variant='outline'
          size='icon'
          type='button'
        >
          <PlusIcon className='h-4 w-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
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
