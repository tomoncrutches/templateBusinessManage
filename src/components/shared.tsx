import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { ReactNode, useState } from 'react';

import { Button } from './ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

export const DeleteDialog = ({
  title,
  handleDelete,
  handleDialog,
  showDialog,
}: {
  title: ReactNode;
  handleDelete: () => void;
  handleDialog: () => void;
  showDialog: boolean;
}) => {
  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          size={'sm'}
          className='bg-green-megallon/20 text-primary hover:bg-green-megallon hover:text-primary-foreground'
          onClick={handleDialog}
        >
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-green-megallon'
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ConfirmStateDialog = ({
  title,
  action,
  state,
  handleConfirm,
  handleDialog,
  showDialog,
}: {
  title: ReactNode;
  action: string;
  state: boolean;
  handleConfirm: () => Promise<void>;
  handleDialog: () => void;
  showDialog: boolean;
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleClick = async () => {
    setSubmitting(true);
    await handleConfirm();
    setSubmitting(false);
  };

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogTrigger asChild>
        <Button
          size={'sm'}
          className={cn(
            '',
            state ? 'bg-green-megallon' : 'bg-red-500/70 hover:bg-red-500',
          )}
          onClick={handleDialog}
        >
          {action}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={handleDialog}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
            className='bg-green-megallon'
            disabled={submitting}
          >
            {!submitting ? (
              'Confirmar'
            ) : (
              <>
                <ReloadIcon className='mr-2 animate-spin' />
                Confirmando
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
