import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Controller, useForm } from 'react-hook-form';
import { MIN_INPUT_DOUBLE_VALUE, MIN_INPUT_VALUE } from '@/const/utils';
import { MinusIcon, PlusIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Product,
  ProductType,
  Production,
  Recipe,
} from '@/types/products.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { create, update } from '@/services/products.service';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MForm } from '@/types/messages.types';
import { Material } from '@/types/material.types';
import { RecipeItem } from './recipe-item';
import { SmallTypography } from './ui/small-typography';
import { TimePickerDemo } from './ui/time-picker-demo';
import { cn } from '@/lib/utils';
import { create as createProduction } from '@/services/production.service';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useControllerProducts } from '@/hooks/useControllerProducts';
import { useControllerRecipes } from '@/hooks/useControllerRecipes';
import { useState } from 'react';

export const FormAdd = ({
  handleDialog,
  productTypes,
  material,
}: {
  handleDialog: () => void;
  productTypes: ProductType[];
  material: Material[];
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Product>();

  const {
    selectedRecipes,
    addSelectedRecipes,
    areEmptySelectedRecipes,
    deleteSelectedRecipe,
    handleChangeSelectValue,
    handleChangeSelectedRecipeQuantity,
    setShowSelectedRecipesError,
    showSelectedRecipesError,
  } = useControllerRecipes();

  const onSubmit = async (values: Product) => {
    if (areEmptySelectedRecipes) return;

    const payload: Product = {
      name: values.name,
      stock: Number(values.stock),
      type_id: values.type_id,
      image_file: values.image_file,
      materialRecipe: selectedRecipes,
    };

    try {
      const token = Cookies.get('token');

      await create(payload, token as string);
      toast.success('Producto creado con éxito.');
      handleDialog();
      revalidateDataByTag('products');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm' htmlFor='name'>
            Nombre
          </Label>
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
          placeholder='Medallón de Berenjena'
          id='name'
          className='text-xs sm:max-w-72 sm:text-sm'
        />
      </div>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm' htmlFor='stock'>
            Stock
          </Label>
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
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='250'
          id='stock'
          type='number'
          className='text-xs sm:max-w-72 sm:text-sm'
        />
      </div>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm' htmlFor='type_id'>
            Tipo
          </Label>
          {errors.type_id && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.type_id.message}
            </SmallTypography>
          )}
        </div>
        <Controller
          control={control}
          name='type_id'
          rules={{
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
          }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className='text-xs sm:max-w-72 sm:text-sm'>
                <SelectValue placeholder='Seleccione un tipo' />
              </SelectTrigger>
              <SelectContent className='text-xs sm:max-w-72 sm:text-sm'>
                {productTypes.map((type) => {
                  return (
                    <SelectItem key={type?.id} value={type?.id}>
                      {type?.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm' htmlFor='image'>
            Imagen
          </Label>
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
          className='text-xs sm:max-w-72 sm:text-sm'
        />
      </div>
      <div
        className={cn(
          'flex flex-col justify-between gap-4 sm:flex-row',
          selectedRecipes.length <= 1
            ? 'items-start sm:items-center'
            : 'sm:items-start',
        )}
      >
        <Label
          htmlFor='name'
          className={cn(
            'text-xs sm:text-sm',
            selectedRecipes.length > 1 ? 'lg:pt-[10px]' : '',
          )}
        >
          Receta
        </Label>
        <ul className='flex max-h-36 w-full flex-col gap-4 overflow-auto'>
          {selectedRecipes.map((recipe, index) => {
            return (
              <li
                key={recipe.material_id + index}
                className='flex items-center justify-between gap-1 sm:gap-4'
              >
                <RecipeItem
                  index={index}
                  recipe={recipe}
                  selectedRecipes={selectedRecipes}
                  material={material}
                  handleChangeSelectValue={handleChangeSelectValue}
                />
                <Input
                  type='number'
                  step={0.01}
                  min={MIN_INPUT_DOUBLE_VALUE}
                  placeholder='500'
                  className='w-20 text-xs sm:text-sm'
                  defaultValue={recipe.quantity}
                  onChange={(e) =>
                    handleChangeSelectedRecipeQuantity(
                      +e.target.value,
                      recipe.material_id,
                    )
                  }
                />
                <SmallTypography className='opacity-50'>g</SmallTypography>
                <Button
                  onClick={() =>
                    index === 0
                      ? addSelectedRecipes()
                      : deleteSelectedRecipe(index)
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
      {areEmptySelectedRecipes && showSelectedRecipesError && (
        <SmallTypography
          id='error-selected-products'
          className='text-red-500'
          variant={'xs'}
        >
          {MForm.ATTRIBUTE_RECIPE_INCOMPLETE}
        </SmallTypography>
      )}
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          type='submit'
          className=' bg-green-megallon'
          onClick={
            areEmptySelectedRecipes
              ? () => setShowSelectedRecipesError(true)
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

export const FormEditter = ({
  actualValues,
  handleDialog,
  productTypes,
  material,
}: {
  actualValues: Product;
  handleDialog: () => void;
  productTypes: ProductType[];
  material: Material[];
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    defaultValues: {
      name: actualValues?.name,
      stock: actualValues?.stock,
      type_id: actualValues?.type_id,
    },
  });
  const [imageURL, setImageURL] = useState(actualValues.image);

  const {
    selectedRecipes,
    addSelectedRecipes,
    areEmptySelectedRecipes,
    deleteSelectedRecipe,
    handleChangeSelectValue,
    handleChangeSelectedRecipeQuantity,
    setShowSelectedRecipesError,
    showSelectedRecipesError,
  } = useControllerRecipes(
    (actualValues.materialRecipe as Recipe[]).length > 0
      ? (actualValues.materialRecipe as Recipe[]).map((m) => ({
          material_id: m.material_id,
          quantity: m.quantity,
        }))
      : undefined,
  );

  const onSubmit = async (values: Product) => {
    if (areEmptySelectedRecipes) return;

    const payload: Product = {
      id: actualValues?.id,
      name: values.name,
      stock: Number(values.stock),
      type_id: values.type_id,
      image: values?.image_file?.length === 0 ? actualValues.image : undefined,
      image_file: values.image_file ?? undefined,
      materialRecipe: selectedRecipes,
    };

    try {
      const token = Cookies.get('token');

      await update(payload, token as string);
      toast.success('Producto actualizado con éxito.');
      handleDialog();
      revalidateDataByTag('products');
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
            placeholder='Medallon de Berenjena'
            id='name'
            className='max-w-52 text-xs sm:text-sm'
          />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col items-start gap-2'>
            <Label className='text-xs sm:text-sm' htmlFor='type.id'>
              Tipo
            </Label>
            {errors.type_id && (
              <SmallTypography
                className='text-start text-red-500'
                variant={'xs'}
              >
                {errors.type_id.message}
              </SmallTypography>
            )}
          </div>
          <Controller
            control={control}
            name='type_id'
            rules={{
              required: {
                value: true,
                message: MForm.ATTRIBUTE_REQUIRED,
              },
            }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} {...field}>
                <SelectTrigger className='max-w-52 text-xs sm:text-sm'>
                  <SelectValue placeholder='Seleccione un tipo' />
                </SelectTrigger>
                <SelectContent className='max-w-52 text-xs sm:text-sm'>
                  {productTypes.map((type) => {
                    return (
                      <SelectItem key={type?.id} value={type?.id}>
                        {type?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col items-start gap-2'>
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
                value: MIN_INPUT_VALUE,
                message: MForm.MIN_VALUE,
              },
            })}
            placeholder='250'
            id='stock'
            type='number'
            className='max-w-52 text-xs sm:text-sm'
          />
        </div>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex items-center gap-4'>
            <Label htmlFor='select_recipe' className='text-xs sm:text-sm'>
              Receta
            </Label>
            {areEmptySelectedRecipes && showSelectedRecipesError && (
              <SmallTypography
                id='error-selected-products'
                className='text-red-500'
                variant={'xs'}
              >
                {MForm.ATTRIBUTE_RECIPE_INCOMPLETE}
              </SmallTypography>
            )}
          </div>
          <ul className='flex w-full flex-col gap-4 overflow-auto'>
            {selectedRecipes.map((recipe, index) => {
              return (
                <li
                  key={recipe.material_id + index + '_edit'}
                  className='flex flex-col gap-4'
                >
                  <div className='flex items-center justify-between'>
                    <RecipeItem
                      index={index}
                      material={material}
                      recipe={recipe}
                      selectedRecipes={selectedRecipes}
                      handleChangeSelectValue={handleChangeSelectValue}
                    />
                    <Button
                      onClick={() =>
                        index === 0
                          ? addSelectedRecipes()
                          : deleteSelectedRecipe(index)
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
                  </div>
                  <div className='flex items-center gap-4'>
                    <Input
                      type='number'
                      step={0.01}
                      min={MIN_INPUT_DOUBLE_VALUE}
                      placeholder='500'
                      className='w-20 text-xs sm:text-sm'
                      defaultValue={recipe.quantity}
                      onChange={(e) =>
                        handleChangeSelectedRecipeQuantity(
                          +e.target.value,
                          recipe.material_id,
                        )
                      }
                    />
                    <SmallTypography className='opacity-50'>g</SmallTypography>
                  </div>
                </li>
              );
            })}
          </ul>
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
            Seleccionar imagen
          </Button>
          <Button
            type='submit'
            className='h-8 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2'
            onClick={
              areEmptySelectedRecipes
                ? () => setShowSelectedRecipesError(true)
                : () => {}
            }
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
        className='hidden'
      />
    </>
  );
};

export const FormAddProduction = ({
  products,
  handleDialog,
}: {
  products: Product[];
  handleDialog: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Production>({ defaultValues: { date: new Date() } });

  const {
    selectedProducts,
    addSelectedProducts,
    deleteSelectedProduct,
    handleChangeSelectValue,
    handleChangeSelectedProductQuantity,
    handleChangeSelectedRecipesQuantity,
    areEmptySelectedProducts,
    showSelectedProductsError,
    setShowSelectedProductsError,
  } = useControllerProducts(true);

  const onSubmit = async (values: Production) => {
    if (areEmptySelectedProducts) return;

    const payload: Production = {
      date: values.date,
      hours: Number(values.hours),
      personal_quantity: Number(values.personal_quantity),
      products: selectedProducts,
    };
    try {
      const token = Cookies.get('token');

      await createProduction(payload, token as string);
      toast.success('Producción registrada con éxito.');
      handleDialog();
      revalidateDataByTag('products');
      revalidateDataByTag('material');
      revalidateDataByTag('production');
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
        <div className='flex flex-col gap-2'>
          <Label htmlFor='hours'>Horas</Label>
          {errors.hours && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.hours.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('hours', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='8'
          id='hours'
          type='number'
          className='max-w-24'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='personal_quantity'>Cantidad de personal</Label>
          {errors.personal_quantity && (
            <SmallTypography className='text-red-500' variant={'xs'}>
              {errors.personal_quantity.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('personal_quantity', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            min: {
              value: MIN_INPUT_VALUE,
              message: MForm.MIN_VALUE,
            },
          })}
          placeholder='10'
          id='personal_quantity'
          type='number'
          className='max-w-36'
        />
      </div>
      <div className='flex flex-col justify-between gap-4'>
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
                <Select
                  onValueChange={(value) =>
                    handleChangeSelectValue(value, index)
                  }
                  defaultValue={selectedProduct.id}
                >
                  <SelectTrigger className='w-48'>
                    <SelectValue placeholder='Seleccione un produ...' />
                  </SelectTrigger>
                  <SelectContent className='w-48'>
                    {products.map((product) => {
                      return (
                        <SelectItem
                          key={product.id}
                          value={product.id as string}
                          disabled={
                            selectedProducts.find((p) => p.id === product.id)
                              ? true
                              : false
                          }
                        >
                          {product.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Input
                  type='number'
                  className='w-16'
                  placeholder='50'
                  defaultValue={selectedProduct.quantity}
                  onChange={(e) =>
                    handleChangeSelectedProductQuantity(
                      +e.target.value,
                      selectedProduct.id,
                    )
                  }
                />
                <div className='flex items-center gap-2'>
                  <Label htmlFor={`recipes-for-${index}`}>Recetas</Label>
                  <Input
                    type='number'
                    id={`recipes-for-${index}`}
                    placeholder='10'
                    className='w-14'
                    defaultValue={selectedProduct.recipe_quantity}
                    onChange={(e) =>
                      handleChangeSelectedRecipesQuantity(
                        +e.target.value,
                        selectedProduct.id,
                      )
                    }
                  />
                </div>
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
