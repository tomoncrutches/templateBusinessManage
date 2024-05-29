'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Controller, useForm } from 'react-hook-form';
import { MinusIcon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Product, ProductForSale, ProductType } from '@/types/products.types';
import { SaleForCreate, SaleToCreate } from '@/types/sales.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Client } from '@/types/clients.types';
import { ClientAddDialog } from './sales-dialog';
import Cookies from 'js-cookie';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MForm } from '@/types/messages.types';
import { ProductSelectorForSale } from './product-item';
import { SmallTypography } from './ui/small-typography';
import { TimePickerDemo } from './ui/time-picker-demo';
import { cn } from '@/lib/utils';
import { create } from '@/services/sales.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useControllerProducts } from '@/hooks/useControllerProducts';
import { useDialog } from '@/hooks/useDialog';

export const FormAdd = ({
  clients,
  products,
  handleDialog,
}: {
  clients: Client[];
  products: Product[];
  handleDialog: () => void;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
  } = useForm<SaleToCreate>({
    defaultValues: {
      date: new Date(),
    },
  });
  const {
    selectedProducts,
    addSelectedProducts,
    deleteSelectedProduct,
    handleChangeSelectValue,
    handleChangeSelectedProductQuantity,
    areEmptySelectedProducts,
    showSelectedProductsError,
    setShowSelectedProductsError,
  } = useControllerProducts();

  const addClientDialog = useDialog();

  const onSubmit = async (values: SaleToCreate) => {
    if (areEmptySelectedProducts) return;

    try {
      const selectedProductsData: ProductForSale[] = selectedProducts.map(
        (product) => {
          const foundProduct = products.find((item) => product.id === item.id);
          if (foundProduct) {
            return {
              id: foundProduct.id,
              price: (foundProduct.type as ProductType).price,
              quantity: product.quantity,
            } as ProductForSale;
          } else
            throw new Error(
              'Ocurrió un error al obtener los datos de los productos seleccionados.',
            );
        },
      );
      const total = selectedProductsData.reduce(
        (total, product) =>
          total + (product?.price as number) * (product?.quantity as number),
        0,
      );
      const payload: SaleForCreate = {
        data: {
          date: values.date ?? new Date(),
          total,
          client_id: values.client_id,
        },
        items: selectedProductsData,
      };
      const token = Cookies.get('token');

      await create(payload, token as string);
      toast.success('Venta agregada con éxito.');
      handleDialog();
      revalidateDataByTag('sales');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  watch();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Fecha</Label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className='w-56 justify-start font-normal'
            >
              {`
              ${getValues('date')?.toLocaleDateString('ES-AR') ?? new Date().toLocaleDateString('ES-AR')} 
              ${getValues('date')?.toLocaleTimeString('ES-AR') ?? new Date().toLocaleTimeString('ES-AR')}
              `}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='mt-2 w-auto p-0' align='center'>
            <Controller
              control={control}
              name='date'
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  <div className='border-t border-border p-3'>
                    <TimePickerDemo
                      date={field.value}
                      setDate={field.onChange}
                    />
                  </div>
                </>
              )}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='name'>Cliente</Label>
          {errors.client_id && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.client_id.message}
            </SmallTypography>
          )}
        </div>
        <Controller
          control={control}
          name='client_id'
          rules={{
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
          }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className='w-40 sm:w-56'>
                <SelectValue placeholder='Seleccione un cliente' />
              </SelectTrigger>
              <SelectContent className='w-40 sm:w-56'>
                {clients.map((client) => {
                  return (
                    <SelectItem key={client?.id} value={client?.id as string}>
                      {client?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        <ClientAddDialog
          showDialog={addClientDialog.showDialog}
          handleDialog={addClientDialog.handleDialog}
        />
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-4 sm:flex-row',
          selectedProducts.length > 1 ? 'sm:items-start' : 'sm:items-center',
        )}
      >
        <Label
          htmlFor='name'
          className={selectedProducts.length > 1 ? 'pt-[10px]' : ''}
        >
          Productos
        </Label>
        <ul className='flex w-full flex-col gap-4'>
          {selectedProducts.map((selectedProduct, index) => {
            return (
              <li
                key={selectedProduct.id + index}
                className='flex items-center justify-between gap-4'
              >
                <ProductSelectorForSale
                  index={index}
                  data={products}
                  selected={selectedProduct}
                  selectedProducts={selectedProducts}
                  handleChangeSelectValue={handleChangeSelectValue}
                />
                <Input
                  type='number'
                  className='w-20 sm:w-28'
                  placeholder='10'
                  defaultValue={selectedProduct.quantity}
                  onChange={(e) =>
                    handleChangeSelectedProductQuantity(
                      +e.target.value,
                      selectedProduct.id,
                    )
                  }
                />
                <Button
                  onClick={() =>
                    index === 0
                      ? addSelectedProducts()
                      : deleteSelectedProduct(index)
                  }
                  variant='outline'
                  size='icon'
                  type='button'
                >
                  {index === 0 ? (
                    <PlusIcon className='h-4 w-4' />
                  ) : (
                    <MinusIcon className='h-4 w-4' />
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
      {areEmptySelectedProducts && showSelectedProductsError && (
        <SmallTypography
          id='error-selected-products'
          className='text-red-500'
          variant={'xs'}
        >
          {MForm.ATTRIBUTE_PRODUCT_INCOMPLETE}
        </SmallTypography>
      )}

      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          type='submit'
          className='bg-green-megallon'
          onClick={
            areEmptySelectedProducts
              ? () => setShowSelectedProductsError(true)
              : () => {}
          }
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <>Agregar</>
          ) : (
            <>
              <ReloadIcon className='mr-2 animate-spin' />
              Agregando
            </>
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};
