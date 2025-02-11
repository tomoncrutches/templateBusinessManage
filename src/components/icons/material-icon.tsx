export default function MaterialIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-seeding'
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
      <path d='M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3' />
      <path d='M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3' />
      <path d='M12 20l0 -10' />
    </svg>
  );
}
