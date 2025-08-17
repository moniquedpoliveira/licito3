"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Interface local para Contrato
interface Contrato {
  id?: string;
  vigenciaInicio?: Date;
  vigenciaTermino?: Date;
  prazoExecucao?: string;
  dataAssinatura?: Date;
  dataPublicacao?: Date;
  prorrogacao?: string;
  observacoesVigencia?: string;
}

interface DadosVigenciaFormProps {
  data: Partial<Contrato>
  onDataChange: (data: Partial<Contrato>) => void
}

const toISODateString = (date: Date | string | undefined | null) => {
  if (!date) return ""
  try {
    return new Date(date).toISOString().split("T")[0]
  } catch (e) {
    return ""
  }
}

export function DadosVigenciaForm({ data, onDataChange }: DadosVigenciaFormProps) {
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      vigenciaInicio: toISODateString(data.vigenciaInicio),
      vigenciaTermino: toISODateString(data.vigenciaTermino),
      prazoExecucao: data.prazoExecucao || "",
      dataAssinatura: toISODateString(data.dataAssinatura),
      dataPublicacao: toISODateString(data.dataPublicacao),
      prorrogacao: data.prorrogacao || "",
      observacoesVigencia: data.observacoesVigencia || "",
    },
  })

  // Watch for changes and update parent
  useEffect(() => {
    const subscription = watch((value) => {
      onDataChange({
        ...value,
        vigenciaInicio: value.vigenciaInicio ? new Date(value.vigenciaInicio) : undefined,
        vigenciaTermino: value.vigenciaTermino ? new Date(value.vigenciaTermino) : undefined,
        dataAssinatura: value.dataAssinatura ? new Date(value.dataAssinatura) : undefined,
        dataPublicacao: value.dataPublicacao ? new Date(value.dataPublicacao) : undefined,
      } as Partial<Contrato>)
    })
    return () => subscription.unsubscribe()
  }, [watch, onDataChange])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vigenciaInicio">Início da Vigência *</Label>
          <Input
            id="vigenciaInicio"
            type="date"
            {...register("vigenciaInicio", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vigenciaTermino">Término da Vigência *</Label>
          <Input
            id="vigenciaTermino"
            type="date"
            {...register("vigenciaTermino", { required: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prazoExecucao">Prazo de Execução</Label>
        <Input
          id="prazoExecucao"
          placeholder="Ex: 12 meses, 365 dias, etc."
          {...register("prazoExecucao")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataAssinatura">Data de Assinatura</Label>
          <Input
            id="dataAssinatura"
            type="date"
            {...register("dataAssinatura")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataPublicacao">Data de Publicação</Label>
          <Input
            id="dataPublicacao"
            type="date"
            {...register("dataPublicacao")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prorrogacao">Prorrogação (se houver)</Label>
        <Input
          id="prorrogacao"
          placeholder="Ex: 6 meses adicionais"
          {...register("prorrogacao")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoesVigencia">Observações sobre Vigência</Label>
        <Textarea
          id="observacoesVigencia"
          placeholder="Observações adicionais sobre prazos e vigência..."
          rows={3}
          {...register("observacoesVigencia")}
        />
      </div>
    </div>
  )
}
