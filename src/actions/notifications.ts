"use server";

// Por enquanto, vamos deixar como funções vazias
// já que não temos dados mockados para notificações ainda
export async function getNotifications(userId: string) {
  return [];
}

export async function markNotificationAsRead(notificationId: string) {
  console.log('Marcando notificação como lida:', notificationId);
  return { success: true };
}
