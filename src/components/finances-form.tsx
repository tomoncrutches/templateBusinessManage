import { AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog';
import { MIN_INPUT_VALUE, MIN_LENGTH_VALUE } from '@/const/utils';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MForm } from '@/types/messages.types';
import { ProductType } from '@/types/products.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SheetFooter } from './ui/sheet';
import { SmallTypography } from './ui/small-typography';
import { Transaction } from '@/types/transaction.types';
import { create } from '@/services/transaction.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { updateType } from '@/services/products.service';
import { useForm } from 'react-hook-form';

export const FormProductTypeEditter = ({
  actualValues,
  handleDialog,
}: {
  actualValues: ProductType;
  handleDialog: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductType>({
    defaultValues: {
      price: actualValues.price,
    },
  });

  const onSubmit = async (values: ProductType) => {
    const payload: ProductType = {
      id: actualValues?.id,
      price: Number(values.price),
    };
    try {
      const token = Cookies.get('token');

      await updateType(payload, token as string);
      toast.success('Precio actualizado con éxito.');
      handleDialog();
      revalidateDataByTag('product_types');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='!m-0 flex flex-col gap-4 pt-6'
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col items-start gap-2'>
          <Label className='text-xs sm:text-sm' htmlFor='price'>
            Precio
          </Label>
          {errors.price && (
            <SmallTypography className='text-start text-red-500' variant={'xs'}>
              {errors.price.message}
            </SmallTypography>
          )}
        </div>
        <SmallTypography className='text-xs font-semibold sm:text-sm'>
          $
        </SmallTypography>
        <Input
          {...register('price', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          id='price'
          type='number'
          placeholder='2500'
          className='max-w-24 text-xs sm:text-sm'
        />
      </div>
      <SheetFooter>
        <Button
          type='submit'
          className='h-8 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2'
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <>Modificar</>
          ) : (
            <>
              <ReloadIcon className='mr-2 animate-spin' />
              Modificando
            </>
          )}
        </Button>
      </SheetFooter>
    </form>
  );
};

export const FormAddFixedExpense = ({
  handleDialog,
}: {
  handleDialog: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Transaction>();

  const onSubmit = async (values: Transaction) => {
    const payload: Transaction = {
      ...values,
      value: -Number(values.value),
      date: new Date(),
      type: 'Fijo',
    };
    try {
      const token = Cookies.get('token');

      await create(payload, token as string);
      toast.success('Gasto fijo agregado con éxito.');
      handleDialog();
      revalidateDataByTag('transactions');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Nombre</Label>
          {errors.name && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.name.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('name', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            minLength: {
              value: MIN_LENGTH_VALUE,
              message: MForm.MIN_LENGTH,
            },
          })}
          id='name'
          placeholder='Delivery'
          className='max-w-56'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='value'>Monto</Label>
          {errors.value && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.value.message}
            </SmallTypography>
          )}
        </div>
        <span className='grow text-end font-semibold'>$</span>
        <Input
          {...register('value', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='10000'
          id='value'
          type='number'
          className='max-w-32'
        />
      </div>
      <AlertDialogFooter>
        <Button
          type='submit'
          className='bg-green-megallon'
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
        </Button>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
      </AlertDialogFooter>
    </form>
  );
};
