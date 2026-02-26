"use client"

import { Search, Bell, Settings, AlertTriangle, Clock, CheckCircle2, ChevronRight, Filter, User, Plus } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Report {
  id: string
  title: string
  student: string
  criticality: "critical" | "medium" | "low"
  progress: number
  timeAgo: string
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Problema con matrícula",
    student: "Juan Pérez",
    criticality: "critical",
    progress: 25,
    timeAgo: "Hace 30 min"
  },
  {
    id: "2", 
    title: "Solicitud de certificado",
    student: "María García",
    criticality: "medium",
    progress: 60,
    timeAgo: "Hace 2 horas"
  },
  {
    id: "3",
    title: "Actualización de notas",
    student: "Carlos López",
    criticality: "low",
    progress: 90,
    timeAgo: "Hace 5 horas"
  },
  {
    id: "4",
    title: "Queja de infraestructura",
    student: "Ana Martínez",
    criticality: "critical",
    progress: 10,
    timeAgo: "Hace 1 hora"
  }
]

const criticalityConfig = {
  critical: {
    label: "Crítico",
    color: "#D31219",
    bgColor: "rgba(211, 18, 25, 0.1)"
  },
  medium: {
    label: "Medio",
    color: "#B28A12",
    bgColor: "rgba(178, 138, 18, 0.1)"
  },
  low: {
    label: "Bajo",
    color: "#2D8A3C",
    bgColor: "rgba(45, 138, 60, 0.1)"
  }
}

export function WorkerHomeView() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2" style={{ borderColor: '#B28A12' }}>
              <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                LR
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">Laura Rodríguez</p>
              <p className="text-xs text-muted-foreground">Coordinadora Académica</p>
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost"
            className="relative h-10 w-10"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span 
              className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: '#D31219' }}
            />
            <span className="sr-only">Notificaciones</span>
          </Button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Search Bar and Create Button */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar reportes, estudiantes..."
              className="pl-10 h-12 bg-card border-border"
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
            >
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
          
          {/* Create Report Button */}
          <Link href="/report/new" className="block">
            <Button 
              className="w-full h-11 font-semibold gap-2"
              style={{ backgroundColor: '#D31219' }}
            >
              <Plus className="h-5 w-5" />
              Crear Nuevo Reporte
            </Button>
          </Link>
        </div>

        {/* Reportes Section - Table Format */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-label text-muted-foreground">Reportes Asignados</label>
            <Badge variant="secondary" className="text-xs">
              {mockReports.length} pendientes
            </Badge>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-semibold text-muted-foreground">Reporte</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground text-center w-20">Criticidad</TableHead>
                  <TableHead className="text-xs font-semibold text-muted-foreground w-28">Progreso</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReports.map((report) => {
                  const config = criticalityConfig[report.criticality]
                  return (
                    <TableRow 
                      key={report.id} 
                      className="cursor-pointer hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-1 h-10 rounded-full shrink-0"
                            style={{ backgroundColor: config.color }}
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{report.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{report.student}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-3">
                        <Badge 
                          className="text-[10px] px-2 py-0.5"
                          style={{ backgroundColor: config.bgColor, color: config.color }}
                        >
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <Progress 
                              value={report.progress} 
                              className="h-1.5 flex-1 mr-2"
                              indicatorColor={config.color}
                            />
                            <span className="text-xs font-medium text-foreground w-8 text-right">{report.progress}%</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground">{report.timeAgo}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>

          <Link href="/tasks">
            <Button 
              variant="outline" 
              className="w-full border-border hover:bg-muted bg-transparent"
            >
              Ver todos los reportes
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </section>

        {/* Alertas Section */}
        <section className="space-y-3">
          <label className="text-label text-muted-foreground">Alertas</label>

          <div className="space-y-2">
            {/* Alerta crítica */}
            <Card className="overflow-hidden" style={{ backgroundColor: 'rgba(211, 18, 25, 0.05)', borderColor: 'rgba(211, 18, 25, 0.2)' }}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(211, 18, 25, 0.1)' }}>
                    <AlertTriangle className="h-4 w-4" style={{ color: '#D31219' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">3 reportes críticos sin atender</p>
                    <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Alerta de tiempo */}
            <Card className="overflow-hidden" style={{ backgroundColor: 'rgba(178, 138, 18, 0.05)', borderColor: 'rgba(178, 138, 18, 0.2)' }}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(178, 138, 18, 0.1)' }}>
                    <Clock className="h-4 w-4" style={{ color: '#B28A12' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">5 reportes próximos a vencer</p>
                    <p className="text-xs text-muted-foreground">Menos de 24 horas restantes</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Alerta completados */}
            <Card className="overflow-hidden" style={{ backgroundColor: 'rgba(45, 138, 60, 0.05)', borderColor: 'rgba(45, 138, 60, 0.2)' }}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(45, 138, 60, 0.1)' }}>
                    <CheckCircle2 className="h-4 w-4" style={{ color: '#2D8A3C' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">12 reportes completados hoy</p>
                    <p className="text-xs text-muted-foreground">Excelente productividad</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuraciones Section */}
        <section className="space-y-3 pb-6">
          <label className="text-label text-muted-foreground">Configuraciones</label>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Notificaciones */}
              <button className="w-full flex items-center gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors text-left">
                <div className="p-2 rounded-lg bg-muted">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">Notificaciones</p>
                  <p className="text-xs text-muted-foreground">Configurar alertas y avisos</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Categorías */}
              <button className="w-full flex items-center gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors text-left">
                <div className="p-2 rounded-lg bg-muted">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">Categorías asignadas</p>
                  <p className="text-xs text-muted-foreground">Gestionar tipos de reportes</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Preferencias */}
              <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="p-2 rounded-lg bg-muted">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">Preferencias</p>
                  <p className="text-xs text-muted-foreground">Ajustes de la aplicación</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
