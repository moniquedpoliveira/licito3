"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Dados mockados para o dashboard
const mockStats = {
  totalContratos: 12,
  contratosAtivos: 8,
  contratosVencendo: 3,
  contratosVencidos: 1,
  valorTotal: 1250000,
  contratosPorMes: [
    { mes: "Jan", contratos: 2 },
    { mes: "Fev", contratos: 3 },
    { mes: "Mar", contratos: 1 },
    { mes: "Abr", contratos: 4 },
    { mes: "Mai", contratos: 2 },
    { mes: "Jun", contratos: 0 },
  ],
};

export function FiscaisDashboardStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    // Em uma implementação real, aqui você buscaria os dados do servidor
    setStats(mockStats);
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalContratos}</div>
          <p className="text-xs text-muted-foreground">
            Contratos sob sua responsabilidade
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.contratosAtivos}
          </div>
          <p className="text-xs text-muted-foreground">
            Em execução normal
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vencendo em 30 dias</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.contratosVencendo}
          </div>
          <p className="text-xs text-muted-foreground">
            Requer atenção
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {stats.valorTotal.toLocaleString("pt-BR")}
          </div>
          <p className="text-xs text-muted-foreground">
            Valor dos contratos ativos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
