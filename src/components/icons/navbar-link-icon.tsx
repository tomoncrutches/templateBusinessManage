export default function NavbarLinkIcon({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`icon icon-tabler icon-tabler-chevron-right ${className}`}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='#2c3e50'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 6l6 6l-6 6' />
    </svg>
  );
}
