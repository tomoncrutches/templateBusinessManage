import Link from 'next/link';
import NavbarLinkIcon from './icons/navbar-link-icon';
import { ReactNode } from 'react';
import { SmallTypography } from './ui/small-typography';
import { cn } from '@/lib/utils';

export default function NavbarItem({
  children,
  icon,
  isActivePath,
  isLink,
  href,
  containDropdown,
  dropdownItems,
}: {
  children: string;
  icon: ReactNode;
  isActivePath: boolean;
  isLink?: boolean;
  href?: string;
  containDropdown?: boolean;
  dropdownItems?:
    | {
        name: string;
        path: string;
        icon: ({ size }: { size: number }) => ReactNode;
      }[]
    | undefined;
}) {
  const hideNavbar = () => {
    const navbar = document.getElementById('navbar');
    navbar?.classList.toggle('-translate-x-full');
  };

  return containDropdown ? (
    <ul className='group flex h-7 w-full flex-col items-start overflow-hidden duration-200 hover:h-[84px]'>
      <li
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-[6px]',
          isActivePath ? 'bg-green-megallon/20' : 'bg-transparent',
        )}
      >
        {icon}
        <SmallTypography className='grow'>{children}</SmallTypography>
        {!isActivePath && (
          <NavbarLinkIcon
            size={16}
            className='duration-200 group-hover:rotate-90'
          />
        )}
      </li>
      <ul className='-z-99 w-full pl-3 opacity-0 duration-200 group-hover:opacity-100'>
        {dropdownItems?.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.path}
              className='w-full rounded-md px-2 py-[6px]'
              onClick={hideNavbar}
            >
              <Link href={item.path} className='flex w-full items-center gap-2'>
                <Icon size={16} />
                <SmallTypography className='grow'>{item.name}</SmallTypography>
                {!isActivePath && <NavbarLinkIcon size={16} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </ul>
  ) : isLink ? (
    <li
      className={cn(
        'w-full rounded-md px-2 py-[6px]',
        isActivePath ? 'bg-green-megallon/20' : 'bg-transparent',
      )}
      onClick={hideNavbar}
    >
      <Link href={href as string} className='flex w-full items-center gap-2'>
        {icon}
        <SmallTypography className='grow'>{children}</SmallTypography>
        {!isActivePath && <NavbarLinkIcon size={16} />}
      </Link>
    </li>
  ) : (
    <li className='flex w-full cursor-pointer items-center gap-2 px-2 py-[6px]'>
      {icon}
      <SmallTypography className='grow'>{children}</SmallTypography>
    </li>
  );
}
