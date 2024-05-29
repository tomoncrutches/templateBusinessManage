import FinancesIcon from '@/components/icons/finances-icon';
import HistoryIcon from '@/components/icons/history-icon';
import HomeIcon from '@/components/icons/home-icon';
import ManageIcon from '@/components/icons/manage-icon';
import MaterialIcon from '@/components/icons/material-icon';
import ProductsIcon from '@/components/icons/products-icon';
import { ReactNode } from 'react';
import SalesIcon from '@/components/icons/sales-icon';
import StatisticsIcon from '@/components/icons/statistics-icon';
import UsersIcon from '@/components/icons/users-icon';

interface IRoute {
  path: `/${string}`;
  name: string;
  icon: ({ size }: { size: number }) => ReactNode;
  paths?: IRoute[];
}

export const ROUTES: IRoute[] = [
  {
    path: '/dashboard',
    name: 'Inicio',
    icon: HomeIcon,
  },
  {
    path: '/dashboard/no-route',
    name: 'Gestión',
    icon: ManageIcon,
    paths: [
      {
        path: '/dashboard/material',
        name: 'Material',
        icon: MaterialIcon,
      },
      {
        path: '/dashboard/products',
        name: 'Productos',
        icon: ProductsIcon,
      },
    ],
  },
  {
    path: '/dashboard/sales',
    name: 'Ventas',
    icon: SalesIcon,
  },
  {
    path: '/dashboard/clients',
    name: 'Clientes',
    icon: UsersIcon,
  },
  {
    path: '/dashboard/history',
    name: 'Historial',
    icon: HistoryIcon,
  },
  {
    path: '/dashboard/finances',
    name: 'Finanzas',
    icon: FinancesIcon,
  },
  {
    path: '/dashboard/statistics',
    name: 'Estadísticas',
    icon: StatisticsIcon,
  },
];
