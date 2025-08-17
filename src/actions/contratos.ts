"use server";

import { mockDb } from '@/lib/mock-data';
import type { Contrato } from '@/lib/mock-data';

export async function getContratos(): Promise<Contrato[]> {
  try {
    return mockDb.findContratos();
  } catch (error) {
    console.error('Erro ao buscar contratos:', error);
    return [];
  }
}

export async function getContratoById(id: string): Promise<Contrato | null> {
  try {
    const contrato = mockDb.findContratoById(id);
    return contrato || null;
  } catch (error) {
    console.error('Erro ao buscar contrato:', error);
    return null;
  }
}

export async function createContrato(data: Omit<Contrato, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contrato | null> {
  try {
    return mockDb.createContrato(data);
  } catch (error) {
    console.error('Erro ao criar contrato:', error);
    return null;
  }
}

export async function updateContrato(id: string, data: Partial<Contrato>): Promise<Contrato | null> {
  try {
    return mockDb.updateContrato(id, data);
  } catch (error) {
    console.error('Erro ao atualizar contrato:', error);
    return null;
  }
}
