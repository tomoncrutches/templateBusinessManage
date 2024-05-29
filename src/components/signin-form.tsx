'use client';

import { Login, User } from '@/types/user.types';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MForm } from '@/types/messages.types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { SmallTypography } from './ui/small-typography';
import { authStore } from '@/store/auth.store';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  const { login } = authStore();
  const { push } = useRouter();

  const onSubmit = async (values: User) => {
    const payload: Login = {
      username: values.username,
      password: values.password as string,
    };
    try {
      const { access_token, exp } = (await login(payload)) as {
        access_token: string;
        exp: number;
      };
      Cookies.set('token', access_token as string, { expires: exp });
      toast.success('Sesión iniciada con éxito.');

      push('/dashboard');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full max-w-96 flex-col items-center gap-6'
    >
      <div className='flex w-full flex-col gap-1.5'>
        <Label htmlFor='username'>Usuario</Label>
        <Input
          {...register('username', {
            required: { value: true, message: MForm.ATTRIBUTE_REQUIRED },
          })}
          id='username'
          type='text'
          className='w-full'
        />
        {errors.username && (
          <SmallTypography variant='xs' className='text-red-500'>
            {errors.username.message}
          </SmallTypography>
        )}
      </div>
      <div className='flex w-full flex-col gap-1.5'>
        <Label htmlFor='password'>Contraseña</Label>
        <Input
          {...register('password', {
            required: { value: true, message: MForm.ATTRIBUTE_REQUIRED },
          })}
          id='password'
          type='password'
          className='w-full'
        />
        {errors.password && (
          <SmallTypography variant='xs' className='text-red-500'>
            {errors.password.message}
          </SmallTypography>
        )}
      </div>
      <Button
        type='submit'
        className='mt-8 w-fit bg-green-megallon'
        disabled={isSubmitting}
      >
        {!isSubmitting ? (
          <>Iniciar sesión</>
        ) : (
          <>
            <ReloadIcon className='mr-2 animate-spin' />
            Iniciando sesión
          </>
        )}
      </Button>
    </form>
  );
};
