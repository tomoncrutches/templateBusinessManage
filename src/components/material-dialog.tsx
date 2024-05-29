'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { FormAdd, FormBuy, FormEditter } from './material-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

import { Button } from './ui/button';
import { Material } from '@/types/material.types';
import { useDialog } from '@/hooks/useDialog';

export const MaterialAddDialog = () => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild onClick={handleDialog}>
        <Button className='bg-green-megallon'>Agregar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar material</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del material.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAdd handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const MaterialEditterSheet = ({ data }: { data: Material }) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <Sheet open={showDialog}>
      <SheetTrigger asChild onClick={handleDialog}>
        <Button size={'sm'} variant={'outline'}>
          Editar
        </Button>
      </SheetTrigger>
      <SheetContent onEscapeKeyDown={handleDialog} hide={handleDialog}>
        <SheetHeader>
          <SheetTitle>Editar material</SheetTitle>
          <SheetDescription>
            Modifique lo que desee acerca del material.
          </SheetDescription>
          <FormEditter handleDialog={handleDialog} actualValues={data} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const MaterialBuyDialog = ({
  actualPrice,
  id,
}: {
  actualPrice: number;
  id: string;
}) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild onClick={handleDialog}>
        <Button size={'sm'} variant={'outline'}>
          Comprar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Comprar material</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos de compra del material.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormBuy
          handleDialog={handleDialog}
          actualPrice={actualPrice}
          id={id}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};
