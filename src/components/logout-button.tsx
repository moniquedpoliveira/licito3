"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton() {
  const handleSignOut = async () => {
    try {
      await signOutAction();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      className="w-full justify-start"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  );
}
