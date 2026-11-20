import { jsPDF } from 'jspdf';

export function generateLabelPdf(batchData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [100, 150]
  });

  doc.setFontSize(14);
  doc.text(batchData.productName || 'Food Product', 50, 15, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`FSSAI Lic: ${batchData.fssaiNumber || 'Pending'}`, 50, 22, { align: 'center' });
  doc.text(`Batch ID: ${batchData.batchId}`, 10, 32);
  doc.text(`Net Qty: ${batchData.netWeight || '250g'}`, 10, 40);
  doc.text(`Mfg Date: ${batchData.mfgDate || new Date().toISOString().slice(0, 10)}`, 10, 48);

  doc.setFontSize(9);
  doc.text('Ingredients (Descending order):', 10, 58);
  const ingredientsStr = batchData.ingredients?.map(i => `${i.name} (${i.percentage}%)`).join(', ') || 'N/A';
  doc.text(doc.splitTextToSize(ingredientsStr, 80), 10, 64);

  return doc;
}
