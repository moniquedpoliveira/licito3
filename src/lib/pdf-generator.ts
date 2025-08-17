import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Interfaces locais
interface Contrato {
  id?: string;
  numeroContrato?: string;
  objeto?: string;
  valorTotal?: number;
  vigenciaInicio?: Date;
  vigenciaTermino?: Date;
  orgaoContratante?: string;
  nomeContratada?: string;
  gestorContrato?: string;
}

interface ChecklistItem {
  id?: string;
  item?: string;
  status?: string;
  observacao?: string;
}

export async function generateContratoPDF(contrato: Contrato, checklistItems: ChecklistItem[] = []) {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text("Relatório de Contrato", 105, 20, { align: "center" });
  
  // Dados do contrato
  doc.setFontSize(12);
  doc.text(`Número: ${contrato.numeroContrato || 'N/A'}`, 20, 40);
  doc.text(`Objeto: ${contrato.objeto || 'N/A'}`, 20, 50);
  doc.text(`Valor: R$ ${contrato.valorTotal?.toLocaleString('pt-BR') || 'N/A'}`, 20, 60);
  doc.text(`Órgão: ${contrato.orgaoContratante || 'N/A'}`, 20, 70);
  doc.text(`Contratada: ${contrato.nomeContratada || 'N/A'}`, 20, 80);
  doc.text(`Gestor: ${contrato.gestorContrato || 'N/A'}`, 20, 90);
  
  // Checklist
  if (checklistItems.length > 0) {
    doc.text("Checklist:", 20, 110);
    let y = 120;
    checklistItems.forEach((item, index) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${index + 1}. ${item.item || 'N/A'} - ${item.status || 'N/A'}`, 20, y);
      y += 10;
    });
  }
  
  return doc.output('blob');
}
