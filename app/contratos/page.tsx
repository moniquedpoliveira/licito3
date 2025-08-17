"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados mockados
const mockContratos = [
  {
    id: "1",
    numero: "001/2024",
    processo: "PA-2024-001",
    objeto: "Aquisição de equipamentos de informática para modernização da infraestrutura tecnológica",
    contratada: "Tech Solutions Ltda",
    cnpj: "12.345.678/0001-90",
    valor: 50000.00,
    dataInicio: "2024-01-01",
    dataFim: "2024-12-31",
    status: "ATIVO",
    modalidade: "Pregão Eletrônico",
    fiscal: "João Silva",
    gestor: "Maria Santos",
    vencendoEm: 45,
    checklist: {
      inicial: { total: 15, concluido: 12 },
      mensal: { total: 8, concluido: 6 },
      final: { total: 10, concluido: 0 },
    },
  },
  {
    id: "2",
    numero: "002/2024",
    processo: "PA-2024-002",
    objeto: "Serviços de limpeza e conservação de prédios públicos",
    contratada: "Limpeza Express Ltda",
    cnpj: "98.765.432/0001-10",
    valor: 25000.00,
    dataInicio: "2024-02-01",
    dataFim: "2024-11-30",
    status: "ATIVO",
    modalidade: "Pregão Presencial",
    fiscal: "Maria Santos",
    gestor: "Carlos Ferreira",
    vencendoEm: 120,
    checklist: {
      inicial: { total: 12, concluido: 12 },
      mensal: { total: 6, concluido: 5 },
      final: { total: 8, concluido: 0 },
    },
  },
  {
    id: "3",
    numero: "003/2024",
    processo: "PA-2024-003",
    objeto: "Manutenção preventiva e corretiva de sistemas de ar condicionado",
    contratada: "Clima Control Ltda",
    cnpj: "11.222.333/0001-44",
    valor: 15000.00,
    dataInicio: "2024-03-01",
    dataFim: "2024-08-31",
    status: "SUSPENSO",
    modalidade: "Dispensa",
    fiscal: "Pedro Costa",
    gestor: "Ana Oliveira",
    vencendoEm: 30,
    checklist: {
      inicial: { total: 10, concluido: 8 },
      mensal: { total: 4, concluido: 2 },
      final: { total: 6, concluido: 0 },
    },
  },
];

export default function ContratosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [modalidadeFilter, setModalidadeFilter] = useState("TODAS");
  const [selectedContrato, setSelectedContrato] = useState<any>(null);

  const filteredContratos = mockContratos.filter((contrato) => {
    const matchesSearch = 
      contrato.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.processo.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const getChecklistProgress = (checklist: any) => {
    const total = checklist.inicial.total + checklist.mensal.total + checklist.final.total;
    const concluido = checklist.inicial.concluido + checklist.mensal.concluido + checklist.final.concluido;
    return Math.round((concluido / total) * 100);
  };

  const handleViewContrato = (contrato: any) => {
    setSelectedContrato(contrato);
  };

  const handleEditContrato = (id: string) => {
    router.push(`/contratos/${id}/editar`);
  };

  const handleDeleteContrato = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este contrato?")) {
      console.log("Excluir contrato:", id);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Contratos</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button onClick={() => router.push("/contratos/novo")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Contrato
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, processo, objeto ou contratada..."
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
        </CardContent>
      </Card>

      {/* Tabela de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle>Contratos Administrativos</CardTitle>
          <CardDescription>
            {filteredContratos.length} contratos encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número/Processo</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Contratada</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Checklist</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContratos.map((contrato) => (
                  <TableRow key={contrato.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contrato.numero}</div>
                        <div className="text-sm text-muted-foreground">{contrato.processo}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="truncate" title={contrato.objeto}>
                        {contrato.objeto}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contrato.contratada}</div>
                        <div className="text-sm text-muted-foreground">{contrato.cnpj}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        R$ {contrato.valor.toLocaleString('pt-BR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contrato.status)}>
                        {contrato.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className={getVencendoColor(contrato.vencendoEm)}>
                          {contrato.vencendoEm} dias
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${getChecklistProgress(contrato.checklist)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {getChecklistProgress(contrato.checklist)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewContrato(contrato)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Detalhes do Contrato {contrato.numero}</DialogTitle>
                              <DialogDescription>
                                Informações completas do contrato administrativo
                              </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="geral" className="w-full">
                              <TabsList>
                                <TabsTrigger value="geral">Geral</TabsTrigger>
                                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                                <TabsTrigger value="fiscalizacao">Fiscalização</TabsTrigger>
                              </TabsList>
                              <TabsContent value="geral" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold">Dados Básicos</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><strong>Número:</strong> {contrato.numero}</div>
                                      <div><strong>Processo:</strong> {contrato.processo}</div>
                                      <div><strong>Modalidade:</strong> {contrato.modalidade}</div>
                                      <div><strong>Status:</strong> {contrato.status}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">Valores e Prazos</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><strong>Valor:</strong> R$ {contrato.valor.toLocaleString('pt-BR')}</div>
                                      <div><strong>Início:</strong> {contrato.dataInicio}</div>
                                      <div><strong>Fim:</strong> {contrato.dataFim}</div>
                                      <div><strong>Vencendo em:</strong> {contrato.vencendoEm} dias</div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Objeto</h4>
                                  <p className="text-sm">{contrato.objeto}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Contratada</h4>
                                  <div className="text-sm">
                                    <div><strong>Razão Social:</strong> {contrato.contratada}</div>
                                    <div><strong>CNPJ:</strong> {contrato.cnpj}</div>
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="checklist" className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Checklist Inicial</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="text-2xl font-bold">{contrato.checklist.inicial.concluido}/{contrato.checklist.inicial.total}</div>
                                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                          className="bg-green-600 h-2 rounded-full"
                                          style={{ width: `${(contrato.checklist.inicial.concluido / contrato.checklist.inicial.total) * 100}%` }}
                                        ></div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Checklist Mensal</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="text-2xl font-bold">{contrato.checklist.mensal.concluido}/{contrato.checklist.mensal.total}</div>
                                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                          className="bg-blue-600 h-2 rounded-full"
                                          style={{ width: `${(contrato.checklist.mensal.concluido / contrato.checklist.mensal.total) * 100}%` }}
                                        ></div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-sm">Checklist Final</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <div className="text-2xl font-bold">{contrato.checklist.final.concluido}/{contrato.checklist.final.total}</div>
                                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                          className="bg-purple-600 h-2 rounded-full"
                                          style={{ width: `${(contrato.checklist.final.concluido / contrato.checklist.final.total) * 100}%` }}
                                        ></div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>
                              <TabsContent value="fiscalizacao" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold">Fiscal</h4>
                                    <p className="text-sm">{contrato.fiscal}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold">Gestor</h4>
                                    <p className="text-sm">{contrato.gestor}</p>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditContrato(contrato.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteContrato(contrato.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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
