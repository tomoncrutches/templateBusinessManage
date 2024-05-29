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

import LogoutIcon from './icons/logout-icon';
import NavbarItem from './navbar-item';
import { ReloadIcon } from '@radix-ui/react-icons';

export const SignoutDialog = ({
  handleLogout,
  loggingOut,
}: {
  handleLogout: () => void;
  loggingOut: boolean;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <NavbarItem icon={<LogoutIcon size={16} />} isActivePath={false}>
          Cerrar sesión
        </NavbarItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro que deseas cerrar sesión?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            type='button'
            onClick={handleLogout}
            className='bg-green-megallon'
            disabled={loggingOut}
          >
            {!loggingOut ? (
              'Cerrar sesión'
            ) : (
              <>
                <ReloadIcon className='mr-2 animate-spin' />
                Cerrando sesión
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
