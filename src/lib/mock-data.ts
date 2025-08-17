export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'GESTOR_CONTRATO' | 'FISCAL' | 'ORDENADOR_DESPESAS';
  password: string; // hash da senha
}

export interface Contrato {
  id: string;
  numero: string;
  objeto: string;
  valor: number;
  dataInicio: string;
  dataFim: string;
  status: 'ATIVO' | 'SUSPENSO' | 'ENCERRADO';
  gestorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  contratoId: string;
  tipo: 'INICIAL' | 'EXECUCAO' | 'FINAL';
  item: string;
  observacao?: string;
  status: 'PENDENTE' | 'CONCLUIDO' | 'NAO_APLICAVEL';
  index: number;
}

// Dados mockados
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrador',
    role: 'ADMIN',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  },
  {
    id: '2',
    email: 'gestor@example.com',
    name: 'Gestor de Contratos',
    role: 'GESTOR_CONTRATO',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  },
  {
    id: '3',
    email: 'fiscal@example.com',
    name: 'Fiscal',
    role: 'FISCAL',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  },
  {
    id: '4',
    email: 'ordenador@example.com',
    name: 'Ordenador de Despesas',
    role: 'ORDENADOR_DESPESAS',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  },
];

export const mockContratos: Contrato[] = [
  {
    id: '1',
    numero: '001/2024',
    objeto: 'Aquisição de equipamentos de informática',
    valor: 50000.00,
    dataInicio: '2024-01-01',
    dataFim: '2024-12-31',
    status: 'ATIVO',
    gestorId: '2',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    numero: '002/2024',
    objeto: 'Serviços de limpeza',
    valor: 25000.00,
    dataInicio: '2024-02-01',
    dataFim: '2024-11-30',
    status: 'ATIVO',
    gestorId: '2',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    numero: '003/2024',
    objeto: 'Manutenção de ar condicionado',
    valor: 15000.00,
    dataInicio: '2024-03-01',
    dataFim: '2024-08-31',
    status: 'SUSPENSO',
    gestorId: '2',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

export const mockChecklistItems: ChecklistItem[] = [
  // Checklist Inicial - Contrato 1
  {
    id: '1',
    contratoId: '1',
    tipo: 'INICIAL',
    item: 'Documentação do contrato está completa',
    status: 'CONCLUIDO',
    index: 1,
  },
  {
    id: '2',
    contratoId: '1',
    tipo: 'INICIAL',
    item: 'Recursos financeiros disponíveis',
    status: 'CONCLUIDO',
    index: 2,
  },
  {
    id: '3',
    contratoId: '1',
    tipo: 'INICIAL',
    item: 'Equipe técnica designada',
    status: 'PENDENTE',
    index: 3,
  },
  // Checklist Execução - Contrato 1
  {
    id: '4',
    contratoId: '1',
    tipo: 'EXECUCAO',
    item: 'Cronograma de execução aprovado',
    status: 'CONCLUIDO',
    index: 1,
  },
  {
    id: '5',
    contratoId: '1',
    tipo: 'EXECUCAO',
    item: 'Relatórios de progresso em dia',
    status: 'PENDENTE',
    index: 2,
  },
  // Checklist Final - Contrato 1
  {
    id: '6',
    contratoId: '1',
    tipo: 'FINAL',
    item: 'Obra/ serviço concluído',
    status: 'NAO_APLICAVEL',
    index: 1,
  },
  {
    id: '7',
    contratoId: '1',
    tipo: 'FINAL',
    item: 'Relatório final apresentado',
    status: 'NAO_APLICAVEL',
    index: 2,
  },
];

// Funções para simular operações do banco
export const mockDb = {
  // Users
  findUserByEmail: (email: string): User | undefined => {
    return mockUsers.find(user => user.email === email);
  },
  
  findUserById: (id: string): User | undefined => {
    return mockUsers.find(user => user.id === id);
  },

  // Contratos
  findContratos: (): Contrato[] => {
    return mockContratos;
  },

  findContratoById: (id: string): Contrato | undefined => {
    return mockContratos.find(contrato => contrato.id === id);
  },

  createContrato: (data: Omit<Contrato, 'id' | 'createdAt' | 'updatedAt'>): Contrato => {
    const newContrato: Contrato = {
      ...data,
      id: (mockContratos.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockContratos.push(newContrato);
    return newContrato;
  },

  updateContrato: (id: string, data: Partial<Contrato>): Contrato | null => {
    const index = mockContratos.findIndex(contrato => contrato.id === id);
    if (index === -1) return null;
    
    mockContratos[index] = {
      ...mockContratos[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockContratos[index];
  },

  // Checklist
  findChecklistItems: (contratoId: string, tipo?: string): ChecklistItem[] => {
    let items = mockChecklistItems.filter(item => item.contratoId === contratoId);
    if (tipo) {
      items = items.filter(item => item.tipo === tipo);
    }
    return items.sort((a, b) => a.index - b.index);
  },

  updateChecklistItem: (id: string, data: Partial<ChecklistItem>): ChecklistItem | null => {
    const index = mockChecklistItems.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    mockChecklistItems[index] = {
      ...mockChecklistItems[index],
      ...data,
    };
    return mockChecklistItems[index];
  },
};
