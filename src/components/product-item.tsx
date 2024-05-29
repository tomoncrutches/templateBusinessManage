'use client';

import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { IProductSale, Product, ProductType } from '@/types/products.types';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { DeleteDialog } from './shared';
import Image from 'next/image';
import Link from 'next/link';
import { Material } from '@/types/material.types';
import { ProductEditterSheet } from './product-dialog';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cn } from '@/lib/utils';
import { deleteOne } from '@/services/products.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useDialog } from '@/hooks/useDialog';
import { useState } from 'react';

export const ProductItemSkeleton = () => {
  return (
    <div className='flex items-center gap-8'>
      <Skeleton className='hidden h-24 rounded-full md:block md:h-24 lg:h-[135px] lg:w-[135px]' />
      <div className='flex grow flex-col gap-2'>
        <Skeleton className='h-4 w-48' />
        <div className='flex flex-wrap items-center gap-3'>
          <Skeleton className='h-3 w-32' />
          <Skeleton className='h-3 w-24' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    </div>
  );
};

export default function ProductItem({
  data,
  productTypes,
  material,
}: {
  data: Product;
  productTypes: ProductType[];
  material: Material[];
}) {
  const deleteDialog = useDialog();
  const handleDelete = async () => {
    try {
      const token = Cookies.get('token');
      await deleteOne(data?.id as string, token as string);
      toast.success('Producto eliminado con éxito.');
      revalidateDataByTag('products');
      deleteDialog.handleDialog();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className='flex w-full items-start justify-between sm:gap-8 md:items-center'>
      <Image
        src={data.image as string}
        alt={`Imágen de ${data.name}`}
        width={135}
        height={135}
        className='hidden aspect-square h-24 w-24 rounded-full object-cover sm:block lg:h-32 lg:w-32'
      />
      <div className='flex grow flex-col gap-3'>
        <span className='text-sm font-semibold md:text-xl'>{data.name}</span>
        <div className='flex flex-wrap items-center gap-3'>
          <span
            className={cn(
              'rounded-md bg-green-megallon/20 px-2 py-1 text-xs font-medium leading-5 md:px-3 md:py-1.5 md:text-sm',
              data.type?.name === 'Gourmet'
                ? 'bg-black text-white'
                : 'bg-green-megallon text-white',
            )}
          >
            {data.type?.name}
          </span>
          <SmallTypography className='!text-xs md:!text-sm'>
            ${(data.type as ProductType).price.toLocaleString('ES-AR')} x unidad
          </SmallTypography>
          <SmallTypography className='overflow-hidden text-ellipsis text-nowrap !text-xs md:!text-sm'>
            {data.stock} disponibles
          </SmallTypography>
        </div>
      </div>
      <div className='flex flex-col items-end gap-3 md:flex-row md:items-center'>
        <ProductEditterSheet
          data={data}
          productsTypes={productTypes}
          material={material}
        />
        <Link href={`products/${data.id}`}>
          <Button
            className='h-8 rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
            variant={'outline'}
          >
            Detalle
          </Button>
        </Link>
        <DeleteDialog
          title={`¿Estás seguro de eliminar el producto ${data.name}?`}
          showDialog={deleteDialog.showDialog}
          handleDelete={handleDelete}
          handleDialog={deleteDialog.handleDialog}
        />
      </div>
    </div>
  );
}

type Props = {
  index: number;
  data: Product[];
  selectedProducts: IProductSale[];
  selected: IProductSale;
  handleChangeSelectValue: (value: string, index: number) => void;
};

export const ProductSelectorForSale = ({
  index,
  data,
  selected,
  selectedProducts,
  handleChangeSelectValue,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-40 justify-between sm:w-52'
        >
          {selected.id
            ? data.find((item) => item.id === selected.id)?.name
            : 'Seleccione un producto'}
          <ChevronUpIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-40 p-0 sm:w-52'>
        <Command>
          <CommandInput placeholder='Busca un producto...' />
          <CommandList>
            <CommandEmpty>Producto no encontrado.</CommandEmpty>
            <CommandGroup heading='Productos'>
              {data?.map((item) => {
                return (
                  <CommandItem
                    key={item.id}
                    value={item.name as string}
                    onSelect={(value) => {
                      const id = data.find((item) =>
                        item.name.toLowerCase().includes(value.toLowerCase()),
                      )?.id;

                      handleChangeSelectValue(id as string, index);
                      setOpen(false);
                    }}
                    disabled={
                      selectedProducts.find((sp) => sp.id === item.id)
                        ? true
                        : false
                    }
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedProducts.find((sp) => sp.id === item.id)
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    {item.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
