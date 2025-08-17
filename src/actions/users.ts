'use server';

import { mockDb } from '@/lib/mock-data';
import type { User } from '@/lib/mock-data';

export async function getUsers(): Promise<User[]> {
  try {
    // Retorna apenas os dados necessários (sem senha)
    return mockDb.findContratos().map(contrato => ({
      id: contrato.id,
      email: `gestor${contrato.id}@example.com`,
      name: `Gestor ${contrato.id}`,
      role: 'GESTOR_CONTRATO' as const,
    } as User));
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = mockDb.findUserById(id);
    if (!user) return null;
    
    // Retorna sem a senha
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    } as User;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
} 