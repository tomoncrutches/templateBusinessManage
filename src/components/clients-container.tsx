import { ClientItem, ClientItemSkeleton } from './client-item';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import { Client } from '@/types/clients.types';
import { Skeleton } from './ui/skeleton';
import { SmallTypography } from './ui/small-typography';
import { cookies } from 'next/headers';
import { getAll } from '@/services/clients.service';

export const ClientsContainerSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
          <TableHead>
            <Skeleton className='h-2 w-24' />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
        <ClientItemSkeleton />
      </TableBody>
    </Table>
  );
};

type Props = {
  query?: string;
};

export default async function ClientsContainer({ query }: Props) {
  const token = cookies().get('token');
  const clients = await getAll(token?.value as string);

  const filteredClients = query
    ? (clients as Client[]).filter((client) => {
        if (client.name.toLowerCase().includes(query.toLowerCase()))
          return true;
        if (client.email.toLowerCase().includes(query.toLowerCase()))
          return true;
        if (client.phone.toLowerCase().includes(query.toLowerCase()))
          return true;
      })
    : clients;

  if (clients instanceof Error)
    return <SmallTypography>{clients.message}</SmallTypography>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Atención al cliente</TableHead>
          <TableHead>Dirección</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(filteredClients as Client[]).length > 0 ? (
          (filteredClients as Client[]).map((client) => (
            <ClientItem key={client.id} client={client} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>No se encontraron clientes.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
