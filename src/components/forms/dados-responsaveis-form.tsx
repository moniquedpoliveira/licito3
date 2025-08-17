"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Dados mockados de fiscais
const mockFiscais = [
  { id: "1", name: "João Silva", email: "joao.silva@example.com" },
  { id: "2", name: "Maria Santos", email: "maria.santos@example.com" },
  { id: "3", name: "Pedro Costa", email: "pedro.costa@example.com" },
  { id: "4", name: "Ana Oliveira", email: "ana.oliveira@example.com" },
];

interface Fiscal {
  id: string;
  name: string;
  email: string;
}

const formSchema = z.object({
  gestorContrato: z.string().min(1, "Gestor do contrato é obrigatório"),
  emailGestor: z.string().email("Email inválido"),
  telefoneGestor: z.string().optional(),
  fiscalAdministrativoId: z.string().optional(),
  fiscalTecnicoId: z.string().optional(),
  fiscalSubstitutoId: z.string().optional(),
});

interface DadosResponsaveisFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  initialData?: Partial<z.infer<typeof formSchema>>;
}

export function DadosResponsaveisForm({
  onSubmit,
  initialData,
}: DadosResponsaveisFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      gestorContrato: "",
      emailGestor: "",
      telefoneGestor: "",
      fiscalAdministrativoId: "",
      fiscalTecnicoId: "",
      fiscalSubstitutoId: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="gestorContrato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gestor do Contrato</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do gestor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailGestor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email do Gestor</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="gestor@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefoneGestor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone do Gestor</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiscalAdministrativoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiscal Administrativo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fiscal administrativo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockFiscais.map((fiscal) => (
                      <SelectItem key={fiscal.id} value={fiscal.id}>
                        {fiscal.name} ({fiscal.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiscalTecnicoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiscal Técnico</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fiscal técnico" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockFiscais.map((fiscal) => (
                      <SelectItem key={fiscal.id} value={fiscal.id}>
                        {fiscal.name} ({fiscal.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fiscalSubstitutoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiscal Substituto</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fiscal substituto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockFiscais.map((fiscal) => (
                      <SelectItem key={fiscal.id} value={fiscal.id}>
                        {fiscal.name} ({fiscal.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Salvar Responsáveis
        </Button>
      </form>
    </Form>
  );
}
