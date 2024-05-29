'use client';

import { Button } from './ui/button';
import { Sale } from '@/types/sales.types';
import autotable from 'jspdf-autotable';
import jsPDF from 'jspdf';

export const ButtonSaleInvoice = ({ data }: { data: Sale }) => {
  const handleDownloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4', true);

    pdf.addImage({
      imageData: document.getElementById('logo') as HTMLImageElement,
      x: 80,
      y: 20,
      width: 40,
      height: 27,
    });

    autotable(pdf, {
      theme: 'grid',
      head: [['Producto', 'Cantidad', 'Total']],
      headStyles: { fillColor: '#184c1c' },
      body: data.saleDetail.map((detail) => [
        detail.product.name,
        detail.quantity,
        `$${(
          detail.quantity * (detail.product.type?.price as number)
        ).toLocaleString('ES-AR')}`,
      ]),
      margin: {
        top: 60,
      },
    });

    const date = new Date(data?.date);

    autotable(pdf, {
      theme: 'grid',
      head: [['Cliente', 'Dirección', 'Horario', 'Facturación', 'Total']],
      headStyles: { fillColor: '#184c1c' },
      body: [
        [
          data.client?.name as string,
          (data.client?.address?.address as string) ?? '-',
          data.client?.attention as string,
          `${date.toLocaleDateString('ES-AR')}`,
          {
            content: `$${data.total.toLocaleString('ES-AR')}`,
            styles: {
              fontStyle: 'bold',
            },
          },
        ],
      ],
    });

    pdf.save(
      `megallon_factura_${data?.client?.name}_${date.toLocaleDateString('ES-AR')}.pdf`,
    );
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      className='h-8 rounded-md bg-green-megallon px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm'
    >
      Descargar factura
    </Button>
  );
};
