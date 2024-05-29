import Image from 'next/image';
import Screen from '@/components/screen';
import { SigninForm } from '@/components/signin-form';

export default function Home() {
  return (
    <Screen className='flex flex-col items-center justify-center gap-14'>
      <Image
        src={'/logo.png'}
        width={400}
        height={400}
        alt='Logo de Megallón'
        quality={100}
        priority
        id='logo'
      />
      <SigninForm />
    </Screen>
  );
}
