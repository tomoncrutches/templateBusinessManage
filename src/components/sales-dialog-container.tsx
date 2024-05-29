import { Client } from '@/types/clients.types';
import { Product } from '@/types/products.types';
import { SalesAddDialog } from './sales-dialog';
import { cookies } from 'next/headers';
import { getAll } from '@/services/clients.service';
import { getAll as getProductsAll } from '@/services/products.service';

export default async function SalesDialogContainer() {
  const token = cookies().get('token');
  const clients: Client[] | Error = await getAll(token?.value as string);
  const products: Product[] | Error = await getProductsAll(
    token?.value as string,
  );

  if (clients instanceof Error || products instanceof Error) return <></>;
  return <SalesAddDialog clients={clients} products={products} />;
}
