'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { FormAddFixedExpense, FormProductTypeEditter } from './finances-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

import { Button } from './ui/button';
import FinancesIcon from './icons/finances-icon';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { ProductType } from '@/types/products.types';
import { useDialog } from '@/hooks/useDialog';

export const ProductTypeEditter = ({ data }: { data: ProductType }) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <Sheet open={showDialog}>
      <SheetTrigger asChild onClick={handleDialog}>
        <Button variant={'outline'} size={'icon'} className=''>
          <Pencil2Icon />
        </Button>
      </SheetTrigger>
      <SheetContent onEscapeKeyDown={handleDialog} hide={handleDialog}>
        <SheetHeader>
          <SheetTitle>Editar tipo {data.name}</SheetTitle>
          <SheetDescription>
            Modifique el precio del tipo de producto.
          </SheetDescription>
          <FormProductTypeEditter
            handleDialog={handleDialog}
            actualValues={data}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const FixedExpensesDialog = () => {
  const { showDialog, handleDialog } = useDialog();
  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={handleDialog}
          className='flex h-8 items-center gap-2 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2'
        >
          <FinancesIcon size={16} color='#fcfaf8' />
          Agregar gasto fijo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar gasto fijo</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguente con los datos del gasto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAddFixedExpense handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
