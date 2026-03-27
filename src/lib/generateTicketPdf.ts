import jsPDF from "jspdf";
import qrcode from "qrcode-generator";
import type { SelectedSeat } from "@/pages/Compra";

interface TicketData {
  event: { title: string; date: string; venue: string };
  orderRef: string;
  selectedSeats: SelectedSeat[];
  total: number;
  buyerName?: string;
  buyerEmail?: string;
}

export function generateQrDataUrl(text: string, size = 6): string {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  return qr.createDataURL(size, 0);
}

export function generateTicketPdf(data: TicketData) {
  const { event, orderRef, selectedSeats, total } = data;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();

  const blue = [36, 68, 137] as const;
  const orange = [229, 97, 32] as const;
  const darkBlue = [26, 51, 102] as const;
  const gray = [120, 120, 120] as const;

  // --- Header band ---
  doc.setFillColor(...darkBlue);
  doc.rect(0, 0, w, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("TELETAQUILLA", 15, 18);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Tu entrada oficial", 15, 26);

  doc.setFontSize(10);
  doc.text(`Ref: ${orderRef}`, w - 15, 18, { align: "right" });
  doc.text(new Date().toLocaleDateString("es-ES"), w - 15, 26, { align: "right" });

  // --- QR Code (right side) ---
  const qrContent = JSON.stringify({ ref: orderRef, event: event.title, seats: selectedSeats.length, total });
  const qrDataUrl = generateQrDataUrl(qrContent);
  const qrSize = 42;
  const qrX = w - 15 - qrSize;
  const qrY = 48;
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

  doc.setFontSize(7);
  doc.setTextColor(...gray);
  doc.text("Escanea para validar tu entrada", qrX + qrSize / 2, qrY + qrSize + 5, { align: "center" });

  // --- Event info (left side) ---
  let y = 52;
  doc.setTextColor(...blue);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(event.title, w - qrSize - 40);
  doc.text(titleLines, 15, y);
  y += titleLines.length * 8 + 4;

  doc.setTextColor(...gray);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(event.date, 15, y);
  y += 6;
  doc.text(event.venue, 15, y);
  y += 14;

  // --- Dashed separator ---
  doc.setDrawColor(200, 200, 200);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(15, y, w - 15, y);
  doc.setLineDashPattern([], 0);
  y += 10;

  // --- Seats table ---
  doc.setTextColor(...darkBlue);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Detalle de entradas", 15, y);
  y += 8;

  // Table header
  doc.setFillColor(240, 242, 245);
  doc.rect(15, y - 4, w - 30, 8, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...gray);
  doc.text("ASIENTO", 20, y);
  doc.text("PRECIO", w - 20, y, { align: "right" });
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(50, 50, 50);
  selectedSeats.forEach((s) => {
    doc.text(`Fila ${s.row}, Butaca ${s.number}`, 20, y);
    doc.text(`${s.price.toFixed(2)} €`, w - 20, y, { align: "right" });
    y += 7;
  });

  // Separator
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, y, w - 15, y);
  y += 8;

  // Management fee
  const managementFee = Math.round(total * 0.1 * 100) / 100;
  const grandTotal = total + managementFee;

  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text("Subtotal", 20, y);
  doc.text(`${total.toFixed(2)} €`, w - 20, y, { align: "right" });
  y += 6;
  doc.text("Gastos de gestión", 20, y);
  doc.text(`${managementFee.toFixed(2)} €`, w - 20, y, { align: "right" });
  y += 8;

  // Total
  doc.setFillColor(...orange);
  doc.roundedRect(15, y - 5, w - 30, 14, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL", 20, y + 3);
  doc.text(`${grandTotal.toFixed(2)} €`, w - 20, y + 3, { align: "right" });
  y += 22;

  // --- Footer ---
  doc.setDrawColor(200, 200, 200);
  doc.setLineDashPattern([2, 2], 0);
  doc.line(15, y, w - 15, y);
  doc.setLineDashPattern([], 0);
  y += 8;

  doc.setFontSize(7);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  const footerLines = [
    "Esta entrada es personal e intransferible. Preséntala en formato digital o impresa en el acceso al recinto.",
    "TeleTaquilla no se responsabiliza de entradas adquiridas fuera de los canales oficiales.",
    `Referencia de pedido: ${orderRef} — Generado el ${new Date().toLocaleString("es-ES")}`,
  ];
  footerLines.forEach((line) => {
    doc.text(line, w / 2, y, { align: "center" });
    y += 4;
  });

  // Bottom brand bar
  doc.setFillColor(...blue);
  doc.rect(0, doc.internal.pageSize.getHeight() - 8, w, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("www.teletaquilla.com", w / 2, doc.internal.pageSize.getHeight() - 2.5, { align: "center" });

  doc.save(`TeleTaquilla_${orderRef}.pdf`);
}
