"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  Filter,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dados mockados para demonstração
const mockContratos = [
  {
    id: "1",
    numero: "001/2024",
    objeto: "Aquisição de equipamentos de informática",
    contratada: "Tech Solutions Ltda",
    valor: 50000.00,
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
    status: "ATIVO",
    modalidade: "Pregão Eletrônico",
    fiscal: "João Silva",
    vencendoEm: 45,
  },
  {
    id: "2",
    numero: "002/2024",
    objeto: "Serviços de limpeza e conservação",
    contratada: "Limpeza Express Ltda",
    valor: 25000.00,
    dataInicio: "2024-02-01",
    dataFim: "2024-11-30",
    status: "ATIVO",
    modalidade: "Pregão Presencial",
    fiscal: "Maria Santos",
    vencendoEm: 120,
  },
  {
    id: "3",
    numero: "003/2024",
    objeto: "Manutenção de ar condicionado",
    contratada: "Clima Control Ltda",
    valor: 15000.00,
    dataInicio: "2024-03-01",
    dataFim: "2024-08-31",
    status: "SUSPENSO",
    modalidade: "Dispensa",
    fiscal: "Pedro Costa",
    vencendoEm: 30,
  },
  {
    id: "4",
    numero: "004/2024",
    objeto: "Fornecimento de material de escritório",
    contratada: "Papelaria Central Ltda",
    valor: 8000.00,
    dataInicio: "2024-04-01",
    dataFim: "2024-12-31",
    status: "ATIVO",
    modalidade: "Pregão Eletrônico",
    fiscal: "Ana Oliveira",
    vencendoEm: 200,
  },
  {
    id: "5",
    numero: "005/2024",
    objeto: "Serviços de segurança patrimonial",
    contratada: "Segurança Total Ltda",
    valor: 35000.00,
    dataInicio: "2024-01-15",
    dataFim: "2024-12-31",
    status: "ATIVO",
    modalidade: "Concorrência",
    fiscal: "Carlos Ferreira",
    vencendoEm: 15,
  },
];

const mockStats = {
  total: mockContratos.length,
  ativos: mockContratos.filter((c) => c.status === "ATIVO").length,
  suspensos: mockContratos.filter((c) => c.status === "SUSPENSO").length,
  vencendoEm30Dias: mockContratos.filter((c) => c.vencendoEm <= 30).length,
  valorTotal: mockContratos.reduce((acc, c) => acc + c.valor, 0),
  valorMedio: mockContratos.reduce((acc, c) => acc + c.valor, 0) / mockContratos.length,
};

const mockDadosGrafico = [
  { mes: "Jan", contratos: 2, valor: 85000 },
  { mes: "Fev", contratos: 1, valor: 25000 },
  { mes: "Mar", contratos: 1, valor: 15000 },
  { mes: "Abr", contratos: 1, valor: 8000 },
  { mes: "Mai", contratos: 0, valor: 0 },
  { mes: "Jun", contratos: 0, valor: 0 },
];

const mockDadosPizza = [
  { name: "Ativos", value: mockStats.ativos, color: "#10b981" },
  { name: "Suspensos", value: mockStats.suspensos, color: "#f59e0b" },
];

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [modalidadeFilter, setModalidadeFilter] = useState("TODAS");

  const filteredContratos = mockContratos.filter((contrato) => {
    const matchesSearch = contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.objeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.contratada.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "TODOS" || contrato.status === statusFilter;
    const matchesModalidade = modalidadeFilter === "TODAS" || contrato.modalidade === modalidadeFilter;
    
    return matchesSearch && matchesStatus && matchesModalidade;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ATIVO":
        return "bg-green-100 text-green-800";
      case "SUSPENSO":
        return "bg-yellow-100 text-yellow-800";
      case "ENCERRADO":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVencendoColor = (dias: number) => {
    if (dias <= 30) return "text-red-600 font-semibold";
    if (dias <= 60) return "text-yellow-600 font-semibold";
    return "text-green-600";
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard de Contratos</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Contrato
          </Button>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Contratos cadastrados no sistema
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
              {mockStats.ativos}
            </div>
            <p className="text-xs text-muted-foreground">
              Em execução normal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencendo em 30 dias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockStats.vencendoEm30Dias}
            </div>
            <p className="text-xs text-muted-foreground">
              Requer atenção imediata
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockStats.valorTotal.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor total dos contratos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Evolução Mensal de Contratos</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockDadosGrafico}>
                <XAxis
                  dataKey="mes"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <Tooltip />
                <Bar
                  dataKey="contratos"
                  fill="currentColor"
                  className="fill-primary"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status dos Contratos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={mockDadosPizza}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockDadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>
            Gerencie todos os contratos administrativos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contratos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os Status</SelectItem>
                <SelectItem value="ATIVO">Ativos</SelectItem>
                <SelectItem value="SUSPENSO">Suspensos</SelectItem>
                <SelectItem value="ENCERRADO">Encerrados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modalidadeFilter} onValueChange={setModalidadeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODAS">Todas as Modalidades</SelectItem>
                <SelectItem value="Pregão Eletrônico">Pregão Eletrônico</SelectItem>
                <SelectItem value="Pregão Presencial">Pregão Presencial</SelectItem>
                <SelectItem value="Concorrência">Concorrência</SelectItem>
                <SelectItem value="Dispensa">Dispensa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Contratada</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Fiscal</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell className="font-medium">{contrato.numero}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={contrato.objeto}>
                      {contrato.objeto}
                    </TableCell>
                    <TableCell>{contrato.contratada}</TableCell>
                    <TableCell>R$ {contrato.valor.toLocaleString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contrato.status)}>
                        {contrato.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={getVencendoColor(contrato.vencendoEm)}>
                        {contrato.vencendoEm} dias
                      </span>
                    </TableCell>
                    <TableCell>{contrato.fiscal}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
