import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (attendance) => {

  const doc = new jsPDF();

  doc.text("Attendance Report", 20, 20);

  autoTable(doc, {
    head: [["ID", "Date", "Status"]],
    body: attendance.map(a => [
      a.id,
      a.date,
      a.status
    ])
  });

  doc.save("attendance.pdf");
};