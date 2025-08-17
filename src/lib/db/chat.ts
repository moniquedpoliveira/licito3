"use server"

// Por enquanto, vamos deixar como uma função vazia
// já que não temos dados mockados para chat ainda
export async function saveChat(userId: string, messages: any[]) {
  console.log('Salvando chat:', { userId, messages });
  return { success: true };
}

export async function getChats(userId: string) {
  console.log('Buscando chats para usuário:', userId);
  return [];
}

export async function getChat(chatId: string) {
  console.log('Buscando chat:', chatId);
  return null;
}

export async function deleteChat(chatId: string) {
  console.log('Deletando chat:', chatId);
  return { success: true };
} 