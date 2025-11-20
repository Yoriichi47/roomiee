"use client";

import { Button } from "@/components/ui/button";
import { DownloadCloud } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function InvoiceDownloadButton({ bookingId }: { bookingId: string }) {
  const handleDownload = () => {
    const invoice = document.getElementById("invoice_element");

    if (invoice) {
      html2canvas(invoice).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const aspectRatio = imgWidth / imgHeight;

        const orientation = aspectRatio > 1 ? "l" : "p";

        const pdf = new jsPDF(orientation, "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (pdfWidth / imgWidth) * imgHeight;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${bookingId}.pdf`);
      });
    }
  };

  return (
    <Button
      onClick={handleDownload}
      className="mt-10 bg-green-600 hover:bg-green-700 justify-end"
    >
      Download Invoice <DownloadCloud />
    </Button>
  );
}
