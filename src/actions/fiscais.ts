"use server";

import { mockDb } from '@/lib/mock-data';
import type { ChecklistItem } from '@/lib/mock-data';

export async function getChecklistItems(contratoId: string, tipo?: string): Promise<ChecklistItem[]> {
  try {
    return mockDb.findChecklistItems(contratoId, tipo);
  } catch (error) {
    console.error('Erro ao buscar itens do checklist:', error);
    return [];
  }
}

export async function updateChecklistItem(id: string, data: Partial<ChecklistItem>): Promise<ChecklistItem | null> {
  try {
    return mockDb.updateChecklistItem(id, data);
  } catch (error) {
    console.error('Erro ao atualizar item do checklist:', error);
    return null;
  }
}
