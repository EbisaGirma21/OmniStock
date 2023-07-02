import { jsPDF } from "jspdf";
import "jspdf-autotable";
export const generatePDF = (transfers, columns) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);

  doc.text("Transfer Table Document", 10, 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const descriptionText =
    "These products are transfered from Sender srore to Receiver store on listed transfed date";

  const descriptionChunks = doc.splitTextToSize(descriptionText, 180);
  let startY = 20;
  descriptionChunks.forEach((chunk) => {
    doc.text(chunk, 10, startY);
    startY += 7;
  });

  const tableData = transfers.map((row) =>
    columns.map((column) => row[column.field])
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.autoTable({
    head: [columns.map((column) => column.headerName)],
    body: tableData,
    startY: startY + 10, // Set the starting Y position for the table after the description
    //   styles: {
    //     // Apply styling to the table
    //     fontSize: 10,
    //     cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
    //   },
    //   headStyles: {
    //     // Apply styling to the table header
    //     fillColor: "#f2f2f2",
    //     textColor: "#000",
    //     fontStyle: "bold",
    //   },
    //   bodyStyles: {
    //     // Apply styling to the table body
    //     fillColor: "#fff",
    //   },
    didDrawPage: () => {
      // Add footer to each page
      const date = new Date().toLocaleDateString();
      const appName = "OmniStock";
      const footerText = `${date} | ${appName}`;
      const footerX = doc.internal.pageSize.getWidth() / 2;
      const footerY = doc.internal.pageSize.getHeight() - 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(footerText, footerX, footerY, { align: "center" });
    },
  });

  return doc;
};
