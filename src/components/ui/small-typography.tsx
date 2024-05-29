import { ReactNode } from 'react';

export function SmallTypography({
  children,
  className,
  variant,
  id,
}: {
  children: ReactNode;
  className?: string;
  variant?: 'xs' | 'sm';
  id?: string;
}) {
  return (
    <small
      id={id}
      className={`text-${variant ?? 'sm'} font-medium leading-none ${className}`}
      suppressHydrationWarning
    >
      {children}
    </small>
  );
}
