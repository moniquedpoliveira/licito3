"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Interface local para Contrato
interface Contrato {
  id?: string;
  nomeContratada?: string;
  cnpjContratada?: string;
  enderecoContratada?: string;
  telefoneContratada?: string;
  emailContratada?: string;
  representanteLegal?: string;
  cpfRepresentante?: string;
  cargoRepresentante?: string;
  telefoneRepresentante?: string;
  emailRepresentante?: string;
}

interface DadosContratadaFormProps {
  data: Partial<Contrato>
  onDataChange: (data: Partial<Contrato>) => void
}

export function DadosContratadaForm({ data, onDataChange }: DadosContratadaFormProps) {
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      nomeContratada: data.nomeContratada || "",
      cnpjContratada: data.cnpjContratada || "",
      enderecoContratada: data.enderecoContratada || "",
      telefoneContratada: data.telefoneContratada || "",
      emailContratada: data.emailContratada || "",
      representanteLegal: data.representanteLegal || "",
      cpfRepresentante: data.cpfRepresentante || "",
      cargoRepresentante: data.cargoRepresentante || "",
      telefoneRepresentante: data.telefoneRepresentante || "",
      emailRepresentante: data.emailRepresentante || "",
    },
  })

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onDataChange(value as Partial<Contrato>)
    })
    return () => subscription.unsubscribe()
  }, [watch, onDataChange])

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dados da Contratada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nomeContratada">Nome/Razão Social *</Label>
            <Input
              id="nomeContratada"
              placeholder="Nome da empresa contratada"
              {...register("nomeContratada", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpjContratada">CNPJ *</Label>
            <Input
              id="cnpjContratada"
              placeholder="00.000.000/0000-00"
              {...register("cnpjContratada", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enderecoContratada">Endereço</Label>
            <Input
              id="enderecoContratada"
              placeholder="Endereço completo"
              {...register("enderecoContratada")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefoneContratada">Telefone</Label>
            <Input
              id="telefoneContratada"
              placeholder="(11) 99999-9999"
              {...register("telefoneContratada")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailContratada">E-mail</Label>
            <Input
              id="emailContratada"
              type="email"
              placeholder="contato@empresa.com"
              {...register("emailContratada")}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Representante Legal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="representanteLegal">Nome do Representante *</Label>
            <Input
              id="representanteLegal"
              placeholder="Nome completo do representante"
              {...register("representanteLegal", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpfRepresentante">CPF do Representante *</Label>
            <Input
              id="cpfRepresentante"
              placeholder="000.000.000-00"
              {...register("cpfRepresentante", { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargoRepresentante">Cargo/Função</Label>
            <Input
              id="cargoRepresentante"
              placeholder="Ex: Diretor, Gerente, etc."
              {...register("cargoRepresentante")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefoneRepresentante">Telefone do Representante</Label>
            <Input
              id="telefoneRepresentante"
              placeholder="(11) 99999-9999"
              {...register("telefoneRepresentante")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailRepresentante">E-mail do Representante</Label>
            <Input
              id="emailRepresentante"
              type="email"
              placeholder="representante@empresa.com"
              {...register("emailRepresentante")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
