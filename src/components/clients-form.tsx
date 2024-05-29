'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { MIN_LENGTH_VALUE, PHONE_LENGTH } from '@/const/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { create, update } from '@/services/clients.service';
import { generateHours, generateWeekdays, someIsNull } from '@/lib/utils';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';
import { Client } from '@/types/clients.types';
import Cookies from 'js-cookie';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MForm } from '@/types/messages.types';
import { Map } from './map';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SheetFooter } from './ui/sheet';
import { SmallTypography } from './ui/small-typography';
import { revalidateDataByTag } from '@/lib/actions';
import { toast } from 'sonner';
import { useAddress } from '@/hooks/useAddress';
import { useForm } from 'react-hook-form';

interface AttentionToClient {
  startingWeekday: string | null;
  endingWeekday: string | null;
  startingHour: string | null;
  endingHour: string | null;
  additionalNote: string | null;
}

export const FormAddClient = ({
  handleDialog,
}: {
  handleDialog: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Client>();

  const {
    location,
    address,
    error,
    handleLocation,
    handleGetAddress,
    noError,
  } = useAddress();

  const onSubmit = async (values: Client) => {
    if (someIsNull({ ...attentionToClient, additionalNote: undefined })) return;

    const {
      startingWeekday,
      endingWeekday,
      startingHour,
      endingHour,
      additionalNote,
    } = attentionToClient;
    const attentionToClientToString = `${startingWeekday} a ${endingWeekday} - ${startingHour} a ${endingHour} ${additionalNote ? `(${additionalNote})` : ''}`;

    const payload = {
      ...values,
      address: {
        lon: address.lon.toString(),
        lat: address.lat.toString(),
        address: address.address,
      },
      attention: attentionToClientToString,
    };
    try {
      const token = Cookies.get('token');

      await create(payload, token as string);
      toast.success('Cliente creado con éxito.');
      handleDialog();
      revalidateDataByTag('clients');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const [attentionToClient, setAttentionToClient] = useState<AttentionToClient>(
    {
      startingWeekday: null,
      endingWeekday: null,
      startingHour: null,
      endingHour: null,
      additionalNote: null,
    },
  );

  const handleChangeAttentionToClient = (
    fieldName: keyof AttentionToClient,
    value: string,
  ) => {
    setAttentionToClient((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [showAttentionError, setShowAttentionError] = useState(false);

  const weekdaysIncomplete =
    attentionToClient.startingWeekday === null ||
    attentionToClient.endingWeekday === null;

  const hoursIncomplete =
    attentionToClient.startingHour === null ||
    attentionToClient.endingHour === null;

  const weekdays = generateWeekdays();
  const hours = generateHours();

  useEffect(() => {
    const locationIsOK =
      location.street.length > 0 &&
      location.number.length > 0 &&
      location.city.length > 0;
    if (locationIsOK) {
      noError();
      handleGetAddress(location);
    }
  }, [location]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>Nombre</Label>
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
          className='max-w-72'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>Email</Label>
          {errors.email && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.email.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('email', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: MForm.INVALID_EMAIL,
            },
          })}
          type='email'
          className='max-w-72'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>Teléfono</Label>
          {errors.phone && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.phone.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('phone', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            minLength: {
              value: PHONE_LENGTH,
              message: MForm.MIN_PHONE_LENGTH,
            },
          })}
          type='tel'
          className='max-w-72'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label>Días</Label>
          {showAttentionError && weekdaysIncomplete && (
            <SmallTypography className='text-red-500' variant='xs'>
              {MForm.ATTRIBUTE_REQUIRED}
            </SmallTypography>
          )}
        </div>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('startingWeekday', value);
          }}
        >
          <SelectTrigger className='max-w-[123px]'>
            <SelectValue placeholder='Día' />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day, index) => (
              <SelectItem key={day + index} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>a</span>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('endingWeekday', value);
          }}
        >
          <SelectTrigger className='max-w-[123px]'>
            <SelectValue placeholder='Día' />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day, index) => (
              <SelectItem key={day + index} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label>Horario</Label>
          {showAttentionError && hoursIncomplete && (
            <SmallTypography className='text-red-500' variant='xs'>
              {MForm.ATTRIBUTE_REQUIRED}
            </SmallTypography>
          )}
        </div>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('startingHour', value);
          }}
        >
          <SelectTrigger className='max-w-[123px]'>
            <SelectValue placeholder='Hora' />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour, index) => (
              <SelectItem key={hour + index} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>a</span>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('endingHour', value);
          }}
        >
          <SelectTrigger className='max-w-[123px]'>
            <SelectValue placeholder='Hora' />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour, index) => (
              <SelectItem key={hour + index} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label>Nota adic. de horario</Label>
          <SmallTypography
            className='leading-normal text-gray-500'
            variant='xs'
          >
            Ej: Sábados - 09:00 a 12:00
          </SmallTypography>
        </div>
        <Input
          onChange={(event) => {
            handleChangeAttentionToClient('additionalNote', event.target.value);
          }}
          type='text'
          className='max-w-72'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-9 gap-4'>
          <div className='col-span-3 flex flex-col gap-2'>
            <Label>Calle</Label>
            <Input
              autoComplete='off'
              type='text'
              className='max-w-72'
              onChange={(e) => handleLocation('street', e.target.value)}
            />
          </div>
          <div className='col-span-2 flex flex-col gap-2'>
            <Label>Nro.</Label>
            <Input
              autoComplete='off'
              type='number'
              min={1}
              className='max-w-'
              onChange={(e) => handleLocation('number', e.target.value)}
            />
          </div>
          <div className='col-span-4 flex flex-col gap-2'>
            <Label>Barrio</Label>
            <Input
              autoComplete='off'
              type='text'
              className='max-w-72'
              onChange={(e) => handleLocation('city', e.target.value)}
            />
          </div>
        </div>
        {error && (
          <SmallTypography className='text-red-500' variant='xs'>
            Los datos de ubicación están incompletos.
          </SmallTypography>
        )}
        <Map
          lat={address.lat as number}
          lon={address.lon as number}
          height='140px'
        />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction
          type='submit'
          className='bg-green-megallon'
          onClick={
            weekdaysIncomplete || hoursIncomplete
              ? () => setShowAttentionError(true)
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

type Props = {
  data: Client;
  handleDialog: () => void;
};

export const FormEditter = ({ data, handleDialog }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Client>({ defaultValues: { ...data } });

  const {
    location,
    address,
    error,
    handleLocation,
    handleGetAddress,
    noError,
  } = useAddress(data?.address);

  const [attentionToClient, setAttentionToClient] = useState<AttentionToClient>(
    {
      startingWeekday: data?.attention?.split(' ')[0] as string,
      endingWeekday: data?.attention?.split(' ')[2] as string,
      startingHour: data?.attention?.split(' ')[4] as string,
      endingHour: data?.attention?.split(' ')[6] as string,
      additionalNote: null,
    },
  );

  const handleChangeAttentionToClient = (
    fieldName: keyof AttentionToClient,
    value: string,
  ) => {
    setAttentionToClient((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const [showAttentionError, setShowAttentionError] = useState(false);

  const weekdaysIncomplete =
    attentionToClient.startingWeekday === null ||
    attentionToClient.endingWeekday === null;

  const hoursIncomplete =
    attentionToClient.startingHour === null ||
    attentionToClient.endingHour === null;

  const weekdays = generateWeekdays();
  const hours = generateHours();

  const onSubmit = async (values: Client) => {
    if (someIsNull({ ...attentionToClient, additionalNote: undefined })) return;

    const {
      startingWeekday,
      endingWeekday,
      startingHour,
      endingHour,
      additionalNote,
    } = attentionToClient;
    const attentionToClientToString = `${startingWeekday} a ${endingWeekday} - ${startingHour} a ${endingHour} ${additionalNote ? `(${additionalNote})` : ''}`;

    const payload = {
      ...values,
      address: {
        lon: address.lon.toString(),
        lat: address.lat.toString(),
        address: address.address,
      },
      attention: attentionToClientToString,
    };

    try {
      const token = Cookies.get('token');

      await update(payload, token as string);
      toast.success('Cliente actualizado con éxito.');
      handleDialog();
      revalidateDataByTag('clients');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    const locationIsOK =
      location.street.length > 0 &&
      location.number.length > 0 &&
      location.city.length > 0;

    if (locationIsOK) {
      noError();
      handleGetAddress(location);
    }
  }, [location]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm'>Nombre</Label>
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
          className='max-w-72 text-xs sm:text-sm'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm'>Email</Label>
          {errors.email && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.email.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('email', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: MForm.INVALID_EMAIL,
            },
          })}
          type='email'
          className='max-w-72 text-xs sm:text-sm'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='text-xs sm:text-sm'>Teléfono</Label>
          {errors.phone && (
            <SmallTypography className='text-red-500' variant='xs'>
              {errors.phone.message}
            </SmallTypography>
          )}
        </div>
        <Input
          {...register('phone', {
            required: {
              value: true,
              message: MForm.ATTRIBUTE_REQUIRED,
            },
            minLength: {
              value: PHONE_LENGTH,
              message: MForm.MIN_PHONE_LENGTH,
            },
          })}
          type='tel'
          className='max-w-72 text-xs sm:text-sm'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label className='text-xs sm:text-sm'>Días</Label>
          {showAttentionError && weekdaysIncomplete && (
            <SmallTypography className='text-red-500' variant='xs'>
              {MForm.ATTRIBUTE_REQUIRED}
            </SmallTypography>
          )}
        </div>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('startingWeekday', value);
          }}
          defaultValue={attentionToClient.startingWeekday as string}
        >
          <SelectTrigger className='max-w-[123px] text-xs sm:text-sm'>
            <SelectValue placeholder='Día' />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day, index) => (
              <SelectItem
                className='text-xs sm:text-sm'
                key={day + index}
                value={day}
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className='text-xs sm:text-sm'>a</span>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('endingWeekday', value);
          }}
          defaultValue={attentionToClient.endingWeekday as string}
        >
          <SelectTrigger className='max-w-[123px] text-xs sm:text-sm'>
            <SelectValue placeholder='Día' />
          </SelectTrigger>
          <SelectContent>
            {weekdays.map((day, index) => (
              <SelectItem
                className='text-xs sm:text-sm'
                key={day + index}
                value={day}
              >
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow flex-col gap-2'>
          <Label className='max-w-4 overflow-hidden text-ellipsis text-nowrap text-xs sm:max-w-max sm:text-sm'>
            Horario
          </Label>
          {showAttentionError && hoursIncomplete && (
            <SmallTypography className='text-red-500' variant='xs'>
              {MForm.ATTRIBUTE_REQUIRED}
            </SmallTypography>
          )}
        </div>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('startingHour', value);
          }}
          defaultValue={attentionToClient.startingHour as string}
        >
          <SelectTrigger className='max-w-[123px] text-xs sm:text-sm'>
            <SelectValue placeholder='Hora' />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour, index) => (
              <SelectItem
                className='text-xs sm:text-sm'
                key={hour + index}
                value={hour}
              >
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className='text-xs sm:text-sm'>a</span>
        <Select
          onValueChange={(value) => {
            handleChangeAttentionToClient('endingHour', value);
          }}
          defaultValue={attentionToClient.endingHour as string}
        >
          <SelectTrigger className='max-w-[123px] text-xs sm:text-sm'>
            <SelectValue placeholder='Hora' />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour, index) => (
              <SelectItem
                className='text-xs sm:text-sm'
                key={hour + index}
                value={hour}
              >
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='max-w-24 overflow-hidden text-ellipsis text-nowrap text-xs sm:text-sm'>
            Nota adic. de horario
          </Label>
          <SmallTypography
            className='max-w-24 overflow-hidden text-ellipsis text-nowrap text-gray-500'
            variant='xs'
          >
            Ej: Sábados - 09:00 a 12:00
          </SmallTypography>
        </div>
        <Input
          onChange={(event) => {
            handleChangeAttentionToClient('additionalNote', event.target.value);
          }}
          type='text'
          className='max-w-72 text-xs sm:text-sm'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-9 gap-4'>
          <div className='col-span-3 flex flex-col gap-2'>
            <Label className='text-xs sm:text-sm'>Calle</Label>
            <Input
              autoComplete='off'
              type='text'
              className='max-w-72 text-xs sm:text-sm'
              onChange={(e) => handleLocation('street', e.target.value)}
              defaultValue={
                (data?.address?.address?.length as number) > 1
                  ? `${data?.address?.address?.split(' ')[0]} ${data?.address?.address?.split(' ')[1]}`
                  : ''
              }
            />
          </div>
          <div className='col-span-3 flex flex-col gap-2'>
            <Label className='text-xs sm:text-sm'>Nro.</Label>
            <Input
              autoComplete='off'
              type='number'
              min={1}
              className='max-w-72 text-xs sm:text-sm'
              onChange={(e) => handleLocation('number', e.target.value)}
              defaultValue={
                (data?.address?.address?.length as number) > 2
                  ? `${data?.address?.address?.split(' ')[2].replace(',', '')}`
                  : ''
              }
            />
          </div>
          <div className='col-span-3 flex flex-col gap-2'>
            <Label className='text-xs sm:text-sm'>Barrio</Label>
            <Input
              autoComplete='off'
              type='text'
              className='max-w-72 text-xs sm:text-sm'
              onChange={(e) => handleLocation('city', e.target.value)}
              defaultValue={
                (data?.address?.address?.length as number) > 4
                  ? `${data?.address?.address?.split(' ')[4]} ${data?.address?.address?.split(' ')[5].replace(',', '')}`
                  : ''
              }
            />
          </div>
        </div>
        {error && (
          <SmallTypography className='text-red-500' variant='xs'>
            Los datos de ubicación están incompletos.
          </SmallTypography>
        )}
        <Map
          lat={address?.lat as number}
          lon={address?.lon as number}
          height='230px'
        />
      </div>
      <SheetFooter>
        <Button
          type='submit'
          className='h-8 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2'
          onClick={
            weekdaysIncomplete || hoursIncomplete
              ? () => setShowAttentionError(true)
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
      </SheetFooter>
    </form>
  );
};
