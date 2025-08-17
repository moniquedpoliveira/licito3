'use server';

import { mockDb } from '@/lib/mock-data';

export async function getContratosStats() {
  try {
    const contratos = mockDb.findContratos();
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    return {
      total: contratos.length,
      ativos: contratos.filter(c => new Date(c.dataFim) > now).length,
      vencendoEm30Dias: contratos.filter(c => {
        const dataFim = new Date(c.dataFim);
        return dataFim <= thirtyDaysFromNow && dataFim >= now;
      }).length,
      valorTotal: contratos.reduce((acc, c) => acc + c.valor, 0),
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return {
      total: 0,
      ativos: 0,
      vencendoEm30Dias: 0,
      valorTotal: 0,
    };
  }
}