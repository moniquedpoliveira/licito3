// Interface local para Contrato
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
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function exportContratosToCSV(contratos: Contrato[]): string {
  const headers = [
    'Número do Contrato',
    'Objeto',
    'Valor Total',
    'Órgão Contratante',
    'Nome da Contratada',
    'Gestor do Contrato',
    'Status',
    'Data de Criação'
  ];

  const csvData = contratos.map(contrato => [
    contrato.numeroContrato || '',
    contrato.objeto || '',
    contrato.valorTotal?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '',
    contrato.orgaoContratante || '',
    contrato.nomeContratada || '',
    contrato.gestorContrato || '',
    contrato.status || '',
    contrato.createdAt ? new Date(contrato.createdAt).toLocaleDateString('pt-BR') : ''
  ]);

  const csvContent = [headers, ...csvData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  return csvContent;
}

export function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 