'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { FormAdd, FormAddProduction, FormEditter } from './product-form';
import { Product, ProductType } from '@/types/products.types';
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

export const ProductAddDialog = ({
  productsTypes,
  material,
}: {
  productsTypes: ProductType[];
  material: Material[];
}) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild onClick={handleDialog}>
        <Button className='bg-green-megallon'>Agregar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar producto</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos del producto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAdd
          handleDialog={handleDialog}
          material={material}
          productTypes={productsTypes as ProductType[]}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ProductEditterSheet = ({
  data,
  productsTypes,
  material,
}: {
  data: Product;
  productsTypes: ProductType[];
  material: Material[];
}) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <Sheet open={showDialog}>
      <SheetTrigger asChild onClick={handleDialog}>
        <Button
          className='h-8 rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
          variant={'outline'}
        >
          Editar
        </Button>
      </SheetTrigger>
      <SheetContent
        onEscapeKeyDown={handleDialog}
        hide={handleDialog}
        className='overflow-auto'
      >
        <SheetHeader>
          <SheetTitle>Editar producto</SheetTitle>
          <SheetDescription>
            Modifique lo que desee acerca del producto.
          </SheetDescription>
          <FormEditter
            handleDialog={handleDialog}
            actualValues={data}
            productTypes={productsTypes as ProductType[]}
            material={material}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const ProductAddProductionDialog = ({
  products,
}: {
  products: Product[];
}) => {
  const { showDialog, handleDialog } = useDialog();

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild onClick={handleDialog}>
        <Button className='bg-green-megallon'>Nueva producción</Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>Nueva producción</AlertDialogTitle>
          <AlertDialogDescription>
            Complete lo siguiente con los datos de la producción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <FormAddProduction products={products} handleDialog={handleDialog} />
      </AlertDialogContent>
    </AlertDialog>
  );
};
