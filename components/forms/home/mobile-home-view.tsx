"use client"

import Link from "next/link"
import { Search, Plus, Settings, AlertTriangle, Bell, ChevronRight, Tag, FolderOpen, CheckSquare, Clock, FileText, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function MobileHomeView() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-secondary">
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground text-sm">Juan David Pérez</p>
            <p className="text-xs text-muted-foreground">Estudiante</p>
          </div>
        </div>
        <Button 
          size="icon" 
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Agregar nuevo reporte</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Buscar reportes..."
            className="pl-10 h-12 bg-card border-border"
          />
        </div>

        {/* Configurar Section */}
        <section className="space-y-3">
          <label className="text-label text-muted-foreground">Configurar</label>
          <Button 
            variant="outline" 
            className="w-full h-14 justify-between text-left font-medium border-border hover:bg-muted bg-transparent"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <Settings className="h-5 w-5 text-secondary-foreground" />
              </div>
              <span>Mis preferencias</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </section>

        {/* Alertas Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-label text-muted-foreground">Alertas</label>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2 text-primary hover:text-primary/80 hover:bg-primary/5"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="text-xs font-medium">Agregar</span>
            </Button>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3">
            {/* Critical Alert */}
            <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: '#D31219' }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(211, 18, 25, 0.1)' }}>
                      <AlertTriangle className="h-5 w-5" style={{ color: '#D31219' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Críticas</p>
                      <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: '#D31219' }}
                    >
                      5
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning Alert */}
            <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: '#B28A12' }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(178, 138, 18, 0.1)' }}>
                      <Bell className="h-5 w-5" style={{ color: '#B28A12' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">En revisión</p>
                      <p className="text-xs text-muted-foreground">Pendientes de respuesta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: '#B28A12' }}
                    >
                      12
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolved */}
            <Card className="border-l-4 overflow-hidden" style={{ borderLeftColor: '#2D8A3C' }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(45, 138, 60, 0.1)' }}>
                      <Bell className="h-5 w-5" style={{ color: '#2D8A3C' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Resueltas</p>
                      <p className="text-xs text-muted-foreground">Completadas este mes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: '#2D8A3C' }}
                    >
                      28
                    </span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Acceso Rápido Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-label text-muted-foreground">Acceso Rápido</label>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Configurar accesos rápidos</span>
            </Button>
          </div>

          {/* Quick Access Tags */}
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant="outline" 
              className="cursor-pointer h-9 px-3 text-sm font-medium bg-card hover:bg-muted border-border transition-colors flex items-center gap-2"
            >
              <Tag className="h-3.5 w-3.5" style={{ color: '#D31219' }} />
              <span>Urgente</span>
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer h-9 px-3 text-sm font-medium bg-card hover:bg-muted border-border transition-colors flex items-center gap-2"
            >
              <FolderOpen className="h-3.5 w-3.5" style={{ color: '#B28A12' }} />
              <span>Académico</span>
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer h-9 px-3 text-sm font-medium bg-card hover:bg-muted border-border transition-colors flex items-center gap-2"
            >
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Bienestar</span>
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer h-9 px-3 text-sm font-medium bg-card hover:bg-muted border-border transition-colors flex items-center gap-2"
            >
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Financiero</span>
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer h-9 px-3 text-sm font-medium bg-card hover:bg-muted border-border transition-colors flex items-center gap-2"
            >
              <Tag className="h-3.5 w-3.5" style={{ color: '#2D8A3C' }} />
              <span>Infraestructura</span>
            </Badge>
          </div>

          {/* Quick Task - Full Width */}
          <Button 
            variant="outline" 
            className="w-full h-12 justify-start text-left font-medium border-border hover:bg-muted bg-card"
          >
            <div className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5" style={{ color: '#D31219' }} />
              <span>Revisar reportes pendientes</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </Button>
        </section>

        {/* Recientes Section */}
        <section className="space-y-3 pb-6">
          <label className="text-label text-muted-foreground">Recientes</label>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Recent Item 1 */}
              <div className="flex items-center gap-3 p-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">Reporte de matrícula</p>
                  <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <Badge 
                  className="text-xs shrink-0"
                  style={{ backgroundColor: 'rgba(211, 18, 25, 0.1)', color: '#D31219' }}
                >
                  Crítico
                </Badge>
              </div>

              {/* Recent Item 2 */}
              <div className="flex items-center gap-3 p-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">Solicitud de certificado</p>
                  <p className="text-xs text-muted-foreground">Hace 5 horas</p>
                </div>
                <Badge 
                  className="text-xs shrink-0"
                  style={{ backgroundColor: 'rgba(178, 138, 18, 0.1)', color: '#B28A12' }}
                >
                  En revisión
                </Badge>
              </div>

              {/* Recent Item 3 */}
              <div className="flex items-center gap-3 p-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">Queja biblioteca</p>
                  <p className="text-xs text-muted-foreground">Ayer</p>
                </div>
                <Badge 
                  className="text-xs shrink-0"
                  style={{ backgroundColor: 'rgba(45, 138, 60, 0.1)', color: '#2D8A3C' }}
                >
                  Resuelto
                </Badge>
              </div>

              {/* Recent Item 4 */}
              <div className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="p-2 rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">Actualización de notas</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
                <Badge 
                  className="text-xs shrink-0"
                  style={{ backgroundColor: 'rgba(178, 138, 18, 0.1)', color: '#B28A12' }}
                >
                  En revisión
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Ver mas */}
          <Link href="/tasks">
            <Button 
              variant="ghost" 
              className="w-full text-primary hover:text-primary/80 hover:bg-primary/5"
            >
              Ver todos los reportes
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
