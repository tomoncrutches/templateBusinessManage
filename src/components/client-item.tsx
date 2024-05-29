'use client';

import { ClientDeleteDialog, ClientEditDialog } from './clients-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { TableCell, TableRow } from './ui/table';

import { Button } from './ui/button';
import { Client } from '@/types/clients.types';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import MapPinIcon from './icons/map-pin-icon';
import { Skeleton } from './ui/skeleton';

export const ClientItemSkeleton = () => {
  return (
    <TableRow>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-48' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-48' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-32' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-32' />
      </TableCell>
      <TableCell className='py-4'>
        <Skeleton className='h-2 w-24' />
      </TableCell>
    </TableRow>
  );
};

type Props = {
  client: Client;
};

export const ClientItem = ({ client }: Props) => {
  return (
    <TableRow key={client.id}>
      <TableCell>{client.name}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell>{client.attention}</TableCell>
      <TableCell>{client.address?.address ?? 'Sin dirección.'}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <a
                href={`https://www.google.com.ar/maps/search/${client.address?.address?.replaceAll(' ', '+')}`}
                target='_blank'
              >
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className='flex w-full justify-start gap-2'
                >
                  <MapPinIcon size={16} />
                  <span>Ir a Maps</span>
                </Button>
              </a>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <ClientEditDialog data={client} />
              <ClientDeleteDialog data={client} />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
