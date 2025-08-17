"use server";

import {
  signIn,
  signOut,
} from "@/lib/auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    throw new Error("Credenciais inválidas");
  }

  revalidatePath("/");
  redirect("/administrador");
}

export async function signOutAction() {
  await signOut();
  revalidatePath("/");
  redirect("/");
}

export async function createUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role) {
    throw new Error("Todos os campos são obrigatórios");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Em uma implementação real, aqui você salvaria no banco
    console.log("Criando usuário:", { name, email, role, hashedPassword });
    
    revalidatePath("/administrador");
    return { success: true };
  } catch (error) {
    throw new Error("Erro ao criar usuário");
  }
}

export async function changePasswordAction(formData: FormData) {
  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("Todos os campos são obrigatórios");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Em uma implementação real, aqui você atualizaria no banco
    console.log("Alterando senha:", { hashedPassword });
    
    revalidatePath("/administrador");
    return { success: true };
  } catch (error) {
    throw new Error("Erro ao alterar senha");
  }
}
