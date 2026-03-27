import jsPDF from "jspdf";
import qrcode from "qrcode-generator";
import type { SelectedSeat } from "@/pages/Compra";

interface TicketData {
  event: { title: string; date: string; venue: string; category?: string; image?: string };
  orderRef: string;
  selectedSeats: SelectedSeat[];
  total: number;
  zone?: string;
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
  const { event, orderRef, selectedSeats, total, zone } = data;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  const blue = [36, 68, 137] as const;       // #244489
  const orange = [229, 97, 32] as const;      // #E56120
  const darkBlue = [26, 51, 102] as const;    // #1a3366
  const gray = [120, 120, 120] as const;
  const lightGray = [245, 245, 245] as const;

  // ─── HEADER BAND (like the reference image) ───
  const headerH = 48;
  doc.setFillColor(...blue);
  doc.rect(0, 0, w, headerH, "F");

  // Event poster placeholder (colored rectangle with initial)
  const posterX = 12;
  const posterY = 6;
  const posterW = 36;
  const posterH = 36;
  doc.setFillColor(...darkBlue);
  doc.roundedRect(posterX, posterY, posterW, posterH, 3, 3, "F");

  // Category badge on poster
  if (event.category) {
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(event.category.toUpperCase(), posterX + posterW / 2, posterY + posterH / 2, { align: "center" });
  }

  // Event info beside poster
  const infoX = posterX + posterW + 8;
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(event.title.toUpperCase(), w - infoX - 15);
  doc.text(titleLines, infoX, 14);

  const titleOffset = titleLines.length * 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(event.venue.toUpperCase(), infoX, 10 + titleOffset + 4);
  doc.text(event.date.toUpperCase(), infoX, 10 + titleOffset + 10);

  // Zone / sala info (large, like "SALA 01   18:20" in reference)
  if (zone) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...orange);
    doc.text(zone.toUpperCase(), infoX, 10 + titleOffset + 20);
  }

  // ─── LOCATOR BAR ───
  const locY = headerH + 2;
  doc.setFillColor(...darkBlue);
  doc.rect(0, locY, w, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(
    `LOCALIZADOR: ${orderRef} (${selectedSeats.length} ENTRADA${selectedSeats.length > 1 ? "S" : ""})`,
    w / 2,
    locY + 9,
    { align: "center" }
  );

  // ─── QR CODE (large, centered) ───
  const qrContent = JSON.stringify({
    ref: orderRef,
    event: event.title,
    seats: selectedSeats.map((s) => ({ row: s.row, number: s.number })),
    total,
  });
  const qrDataUrl = generateQrDataUrl(qrContent, 8);
  const qrSize = 60;
  const qrX = (w - qrSize) / 2;
  const qrY = locY + 20;
  doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

  // ─── SEAT TABLE ───
  let y = qrY + qrSize + 12;

  // Table header
  doc.setFillColor(...lightGray);
  doc.rect(30, y - 5, w - 60, 10, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkBlue);

  const col1 = 50;
  const col2 = w / 2;
  const col3 = w - 50;

  doc.text("FILA", col1, y + 1, { align: "center" });
  doc.text("BUTACA", col2, y + 1, { align: "center" });
  doc.text("PRECIO", col3, y + 1, { align: "center" });
  y += 10;

  // Table rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  selectedSeats.forEach((s) => {
    doc.text(String(s.row), col1, y, { align: "center" });
    doc.text(String(s.number), col2, y, { align: "center" });
    doc.text(`${s.price.toFixed(2)} €`, col3, y, { align: "center" });
    y += 8;
  });

  // ─── TOTALS ───
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(30, y, w - 30, y);
  y += 8;

  const managementFee = Math.round(total * 0.1 * 100) / 100;
  const grandTotal = total + managementFee;

  doc.setFontSize(9);
  doc.setTextColor(...gray);
  doc.text("Subtotal", 40, y);
  doc.text(`${total.toFixed(2)} €`, w - 40, y, { align: "right" });
  y += 6;
  doc.text("Gastos de gestión", 40, y);
  doc.text(`${managementFee.toFixed(2)} €`, w - 40, y, { align: "right" });
  y += 8;

  // Total badge
  doc.setFillColor(...orange);
  doc.roundedRect(30, y - 5, w - 60, 14, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL", 40, y + 3);
  doc.text(`${grandTotal.toFixed(2)} €`, w - 40, y + 3, { align: "right" });
  y += 22;

  // ─── FOOTER INFO ───
  doc.setFontSize(7);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  const footerLines = [
    "Esta entrada es personal e intransferible. Preséntala en formato digital o impresa en el acceso al recinto.",
    "TeleTaquilla no se responsabiliza de entradas adquiridas fuera de los canales oficiales.",
    `Referencia: ${orderRef} — Generado el ${new Date().toLocaleString("es-ES")}`,
  ];
  footerLines.forEach((line) => {
    doc.text(line, w / 2, y, { align: "center" });
    y += 4;
  });

  // ─── BOTTOM BRAND BAR ───
  doc.setFillColor(...blue);
  doc.rect(0, h - 10, w, 10, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("www.teletaquilla.com", w / 2, h - 3, { align: "center" });

  doc.save(`TeleTaquilla_${orderRef}.pdf`);
}
