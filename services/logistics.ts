
import { jsPDF } from 'jspdf';
import { Order } from '../types';

export const generateOrderReceipt = (order: Order) => {
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 1500 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const createdAt = new Date(order.createdAt);
  const addDays = (date: Date, days: number) => {
    const r = new Date(date);
    r.setDate(r.getDate() + days);
    return r.toLocaleDateString('en-IN');
  };

  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const drawTableHeader = (y: number) => {
    doc.setFontSize(10);
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, 170, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text('Product Name', 25, y + 6);
    doc.text('Qty', 130, y + 6);
    doc.text('Price', 150, y + 6);
    doc.text('Total', 175, y + 6);
    doc.setFont('helvetica', 'normal');
  };

  // Header - Page 1
  doc.setFillColor(239, 68, 68); 
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('QUICKCART V1.0', 20, 25);
  doc.setFontSize(10);
  doc.text('OFFICIAL ORDER RECEIPT - V1.0', 20, 33);

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.text(`Tracking ID: ${order.id}`, 140, 55);
  doc.text(`Date: ${createdAt.toLocaleString('en-IN')}`, 140, 60);

  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 20, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(order.shippingAddress.name, 20, 82);
  doc.text(order.shippingAddress.email, 20, 87);
  doc.text(`${order.shippingAddress.address}`, 20, 92);
  doc.text(`${order.shippingAddress.city}, India - ${order.shippingAddress.zip}`, 20, 97);

  doc.setFont('helvetica', 'bold');
  doc.text('BILL FROM:', 120, 75);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('QuickCart India Hub', 120, 82);
  doc.text('22/3, 20/3, Dharmatala Rd', 120, 87);
  doc.text('Belur, Bally, Howrah', 120, 92);
  doc.text('West Bengal - 711202', 120, 97);

  let y = 110;
  drawTableHeader(y);
  y += 17;

  order.items.forEach((item) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      doc.setFillColor(239, 68, 68);
      doc.rect(0, 0, 210, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`QUICKCART V1.0 - ${order.id} (Cont.)`, 20, 10);
      y = 25;
      drawTableHeader(y);
      y += 17;
    }

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(9);
    const name = item.name.length > 45 ? item.name.substring(0, 42) + '...' : item.name;
    doc.text(name, 25, y);
    doc.text(item.quantity.toString(), 132, y);
    doc.text(`INR ${item.price.toFixed(2)}`, 148, y);
    doc.text(`INR ${(item.price * item.quantity).toFixed(2)}`, 173, y);
    y += 10;
  });

  if (y > pageHeight - 65) {
    doc.addPage();
    doc.setFillColor(239, 68, 68);
    doc.rect(0, 0, 210, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`QUICKCART V1.0 - Order Summary`, 20, 10);
    y = 30;
  }

  y += 5;
  doc.setDrawColor(230, 230, 230);
  doc.line(20, y, 190, y);
  y += 10;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text('Subtotal:', 140, y);
  doc.text(`INR ${subtotal.toFixed(2)}`, 173, y);
  y += 7;
  doc.text('GST (12%):', 140, y);
  doc.text(`INR ${tax.toFixed(2)}`, 173, y);
  y += 7;
  doc.text('Shipping:', 140, y);
  doc.text(shipping === 0 ? 'FREE' : `INR ${shipping.toFixed(2)}`, 173, y);
  
  y += 10;
  doc.setFillColor(239, 68, 68);
  doc.rect(130, y - 5, 65, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('GRAND TOTAL:', 135, y + 5);
  doc.text(`INR ${total.toFixed(2)}`, 165, y + 5);

  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('Thank you for shopping at QuickCart India V1.0. This is a secure digital receipt.', 105, pageHeight - 15, { align: 'center' });

  doc.save(`QuickCart_Receipt_${order.id}.pdf`);
};
