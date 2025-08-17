"use server";

// Por enquanto, vamos deixar como uma função vazia
// já que não temos dados mockados para esclarecimentos ainda
export async function solicitarEsclarecimentos(data: {
  contratoId: string;
  itemId: string;
  pergunta: string;
  userId: string;
}) {
  console.log('Solicitação de esclarecimento:', data);
  return { success: true };
}

export async function responderEsclarecimentos(data: {
  esclarecimentoId: string;
  resposta: string;
  userId: string;
}) {
  console.log('Resposta de esclarecimento:', data);
  return { success: true };
} 