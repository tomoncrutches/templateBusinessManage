import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Controller, useForm } from 'react-hook-form';
import { MIN_INPUT_DOUBLE_VALUE, MIN_INPUT_VALUE } from '@/const/utils';
import { Material, MaterialForBuy } from '@/types/material.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { buy, create, update } from '@/services/material.service';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MATERIAL_TYPES } from '@/const/material-types';
import { MForm } from '@/types/messages.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SmallTypography } from './ui/small-typography';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useState } from 'react';

export const FormAdd = ({ handleDialog }: { handleDialog: () => void }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Material>();

  const onSubmit = async (values: Material) => {
    const payload: Material = {
      name: values.name,
      stock: +values.stock,
      type: values.type,
      actual_price: +values.actual_price,
      image_file: values.image_file,
    };

    try {
      const token = Cookies.get('token');

      await create(payload, token as string);
      toast.success('Material agregado con éxito.');
      handleDialog();
      revalidateDataByTag('material');
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
            <SmallTypography className='text-red-500' variant={'xs'}>
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
          })}
          placeholder='Harina de Garbanzos'
          id='name'
          className='max-w-72'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='type'>Tipo</Label>
          {errors.name && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors?.type?.message}
            </SmallTypography>
          )}
        </div>
        <Controller
          control={control}
          name='type'
          rules={{
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
          }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className='max-w-72 text-xs sm:max-w-56 sm:text-sm'>
                <SelectValue placeholder='Seleccione un tipo' />
              </SelectTrigger>
              <SelectContent className='max-w-72 text-xs sm:max-w-56 sm:text-sm'>
                {MATERIAL_TYPES.map((type) => {
                  return (
                    <SelectItem key={type.value} value={type.value}>
                      {type.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='stock'>Stock</Label>
          {errors.stock && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.stock.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('stock', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_DOUBLE_VALUE,
              message: MForm.MIN_VALUE_DOUBLE,
            },
          })}
          placeholder='1000'
          id='stock'
          type='number'
          step={0.01}
          className='max-w-20'
        />
        <span className='font-semibold opacity-50'>g</span>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='actual_price'>Precio</Label>
          {errors.actual_price && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.actual_price.message}
            </SmallTypography>
          )}
        </div>
        <span className='grow text-end font-semibold'>$</span>
        <Input
          {...register('actual_price', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='1500'
          id='actual_price'
          type='number'
          className='max-w-32'
        />
        <span className='font-semibold opacity-50'>x KG</span>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='image'>Imagen</Label>
          {errors.image_file && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.image_file.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('image_file', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
          })}
          id='image_file'
          type='file'
          className='max-w-56'
        />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction
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
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export const FormEditter = ({
  actualValues,
  handleDialog,
}: {
  actualValues: Material;
  handleDialog: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<Material>({
    defaultValues: {
      name: actualValues?.name,
      type: actualValues?.type,
      stock: actualValues?.stock,
      actual_price: actualValues?.actual_price,
    },
  });
  const [imageURL, setImageURL] = useState(actualValues.image);

  const onSubmit = async (values: Material) => {
    const payload: Material = {
      id: actualValues?.id,
      name: values.name,
      stock: +values.stock,
      type: values.type,
      actual_price: +values.actual_price,
      image: values?.image_file?.length === 0 ? actualValues.image : undefined,
      image_file: values.image_file ?? undefined,
    };
    try {
      const token = Cookies.get('token');

      await update(payload, token as string);
      toast.success('Material actualizado con éxito.');
      handleDialog();
      revalidateDataByTag('material');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='!m-0 flex flex-col gap-4 pt-6'
      >
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col items-start gap-2'>
            <Label className='text-xs sm:text-sm' htmlFor='name'>
              Nombre
            </Label>
            {errors.name && (
              <SmallTypography
                className='text-start text-red-500'
                variant={'xs'}
              >
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
            })}
            placeholder='Harina de Garbanzos'
            id='name'
            className='max-w-72 text-xs sm:text-sm'
          />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='type'>Tipo</Label>
            {errors.name && (
              <SmallTypography className='text-red-500' variant={'xs'}>
                {errors?.type?.message}
              </SmallTypography>
            )}
          </div>
          <Controller
            control={control}
            name='type'
            rules={{
              required: {
                value: true,
                message: MForm.ATTRIBUTE_REQUIRED,
              },
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger className='max-w-72 text-xs sm:max-w-56 sm:text-sm'>
                  <SelectValue placeholder='Seleccione un tipo' />
                </SelectTrigger>
                <SelectContent className='max-w-72 text-xs sm:max-w-56 sm:text-sm'>
                  {MATERIAL_TYPES.map((type) => {
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        {type.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex grow flex-col items-start gap-2'>
            <Label className='text-xs sm:text-sm' htmlFor='stock'>
              Stock
            </Label>
            {errors.stock && (
              <SmallTypography
                className='text-start text-red-500'
                variant={'xs'}
              >
                {errors.stock.message}
              </SmallTypography>
            )}
          </div>
          <Input
            {...register('stock', {
              required: {
                value: true,
                message: MForm.ATTRIBUTE_REQUIRED,
              },
              min: {
                value: MIN_INPUT_DOUBLE_VALUE,
                message: MForm.MIN_VALUE_DOUBLE,
              },
            })}
            placeholder='1000'
            step={0.01}
            id='stock'
            type='number'
            className='max-w-[88px] text-xs sm:max-w-32 sm:text-sm'
          />
          <span className='font-semibold opacity-50'>g</span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col items-start gap-2'>
            <Label className='text-xs sm:text-sm' htmlFor='actual_price'>
              Precio
            </Label>
            {errors.actual_price && (
              <SmallTypography
                className='text-start text-red-500'
                variant={'xs'}
              >
                {errors.actual_price.message}
              </SmallTypography>
            )}
          </div>
          <span className='grow text-end font-semibold'>$</span>
          <Input
            {...register('actual_price', {
              required: {
                value: true,
                message: MForm.ATTRIBUTE_REQUIRED,
              },
              min: {
                value: MIN_INPUT_VALUE,
                message: MForm.MIN_VALUE,
              },
            })}
            placeholder='1500'
            id='actual_price'
            type='number'
            className='max-w-32 text-xs sm:text-sm'
          />
          <span className='font-semibold opacity-50'>x KG</span>
        </div>
        <Image
          src={imageURL as string}
          width={200}
          height={100}
          className='aspect-video w-full rounded-xl object-cover'
          alt={`Imágen de ${actualValues.name}`}
        />
        <div className='flex flex-col items-end justify-between gap-4 md:flex-row md:items-center md:gap-0'>
          <Button
            type='button'
            variant={'outline'}
            className='h-8 rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2'
            onClick={() => document.getElementById('image_file')?.click()}
          >
            Seleccionar imágen
          </Button>
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
        </div>
      </form>
      <Input
        {...register('image_file', {
          onChange: (e) => {
            if (!e.target.files[0]) setImageURL(actualValues.image);
            else setImageURL(URL.createObjectURL(e.target.files[0]));
          },
        })}
        id='image_file'
        type='file'
        className='hidden max-w-56'
      />
    </>
  );
};

export const FormBuy = ({
  handleDialog,
  id,
  actualPrice,
}: {
  handleDialog: () => void;
  id: string;
  actualPrice: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MaterialForBuy>({
    defaultValues: { price: actualPrice },
  });

  const onSubmit = async (values: MaterialForBuy) => {
    const payload: MaterialForBuy = {
      quantity: Number(values.quantity),
      price: Number(values.price),
      id,
    };
    try {
      const token = Cookies.get('token');

      await buy(payload, token as string);
      toast.success('Compra registrada con éxito.');
      handleDialog();
      revalidateDataByTag('material');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='quantity'>Cantidad</Label>
          {errors.quantity && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.quantity.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('quantity', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='3000'
          id='quantity'
          type='number'
          className='max-w-32'
        />
        <span className='font-semibold opacity-50'>g</span>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label htmlFor='price'>Precio</Label>
          {errors.price && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.price.message}
            </SmallTypography>
          )}
        </div>
        <span className='grow text-end font-semibold'>$</span>
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
          placeholder='1500'
          id='price'
          type='number'
          className='max-w-32'
        />
        <span className='font-semibold opacity-50'>x KG</span>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          type='submit'
          className='bg-green-megallon'
          disabled={isSubmitting}
        >
          {!isSubmitting ? (
            <>Registrar</>
          ) : (
            <>
              <ReloadIcon className='mr-2 animate-spin' />
              Registrando
            </>
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};
