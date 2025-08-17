import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications, markNotificationAsRead } from "@/actions/notifications";

export function useNotifications(userId?: string) {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId || ""),
    enabled: !!userId,
  });

  const markAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  return {
    notifications,
    isLoading,
    refetch,
    markAsRead,
  };
}
