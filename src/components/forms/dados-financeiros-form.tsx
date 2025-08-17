"use client"

import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Interface local para Contrato
interface Contrato {
  id?: string;
  valorTotal?: number;
  valorEstimado?: number;
  formaPagamento?: string;
  prazoPagamento?: string;
  garantia?: string;
  multa?: string;
  juros?: string;
  observacoesFinanceiras?: string;
}

interface DadosFinanceirosFormProps {
  data: Partial<Contrato>
  onDataChange: (data: Partial<Contrato>) => void
}

export function DadosFinanceirosForm({ data, onDataChange }: DadosFinanceirosFormProps) {
  const { register, watch, setValue, getValues } = useForm({
    defaultValues: {
      valorTotal: data.valorTotal || 0,
      valorEstimado: data.valorEstimado || 0,
      formaPagamento: data.formaPagamento || "",
      prazoPagamento: data.prazoPagamento || "",
      garantia: data.garantia || "",
      multa: data.multa || "",
      juros: data.juros || "",
      observacoesFinanceiras: data.observacoesFinanceiras || "",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="valorTotal">Valor Total do Contrato *</Label>
          <Input
            id="valorTotal"
            type="number"
            step="0.01"
            placeholder="0,00"
            {...register("valorTotal", { required: true, min: 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valorEstimado">Valor Estimado (se diferente)</Label>
          <Input
            id="valorEstimado"
            type="number"
            step="0.01"
            placeholder="0,00"
            {...register("valorEstimado", { min: 0 })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
          <Input
            id="formaPagamento"
            placeholder="Ex: Mensal, Trimestral, etc."
            {...register("formaPagamento", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prazoPagamento">Prazo de Pagamento</Label>
          <Input
            id="prazoPagamento"
            placeholder="Ex: 30 dias após entrega"
            {...register("prazoPagamento")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="garantia">Garantia</Label>
        <Input
          id="garantia"
          placeholder="Ex: 12 meses após entrega"
          {...register("garantia")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="multa">Multa por Atraso</Label>
          <Input
            id="multa"
            placeholder="Ex: 2% ao mês"
            {...register("multa")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="juros">Juros de Mora</Label>
          <Input
            id="juros"
            placeholder="Ex: 1% ao mês"
            {...register("juros")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoesFinanceiras">Observações Financeiras</Label>
        <Textarea
          id="observacoesFinanceiras"
          placeholder="Observações adicionais sobre aspectos financeiros..."
          rows={3}
          {...register("observacoesFinanceiras")}
        />
      </div>
    </div>
  )
}
