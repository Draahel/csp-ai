"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  X,
  ArrowUpDown,
  Clock,
  ListFilter,
  SlidersHorizontal,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { TasksListItem } from "./tasks-list-item"
import { TasksFilterPanel } from "./tasks-filter-panel"

// Criticality / status / category configs reused from project patterns
const criticalityConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  critical: { label: "Critico", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  medium: { label: "Medio", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  low: { label: "Bajo", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Pendiente", color: "#D31219", bgColor: "rgba(211, 18, 25, 0.1)" },
  in_progress: { label: "En Progreso", color: "#B28A12", bgColor: "rgba(178, 138, 18, 0.1)" },
  on_hold: { label: "En Espera", color: "#6B7280", bgColor: "rgba(107, 114, 128, 0.1)" },
  completed: { label: "Completado", color: "#2D8A3C", bgColor: "rgba(45, 138, 60, 0.1)" },
  rejected: { label: "Rechazado", color: "#EF4444", bgColor: "rgba(239, 68, 68, 0.1)" },
}

const categoryConfig: Record<string, { label: string }> = {
  enrollment: { label: "Matricula" },
  certificate: { label: "Certificado" },
  grades: { label: "Notas" },
  infrastructure: { label: "Infraestructura" },
  financial: { label: "Financiero" },
  other: { label: "Otro" },
}

export interface TaskItem {
  id: string
  title: string
  description: string
  student: string
  criticality: "critical" | "medium" | "low"
  status: "pending" | "in_progress" | "on_hold" | "completed" | "rejected"
  category: "enrollment" | "certificate" | "grades" | "infrastructure" | "financial" | "other"
  progress: number
  createdAt: string
  dueDate?: string
}

// Extended mock data
const mockTasks: TaskItem[] = [
  { id: "INC-2024-001", title: "Puerta del aula 301 danada", description: "La puerta presenta una grieta en el marco", student: "Maria Gonzalez", criticality: "critical", status: "in_progress", category: "infrastructure", progress: 50, createdAt: "2024-01-15T09:00:00", dueDate: "2024-01-20T09:00:00" },
  { id: "INC-2024-002", title: "Problema con matricula semestre 2024-1", description: "No se refleja el pago de matricula", student: "Juan Perez", criticality: "critical", status: "pending", category: "enrollment", progress: 0, createdAt: "2024-01-14T11:00:00", dueDate: "2024-01-18T09:00:00" },
  { id: "INC-2024-003", title: "Solicitud de certificado academico", description: "Certificado para tramite externo", student: "Ana Martinez", criticality: "low", status: "completed", category: "certificate", progress: 100, createdAt: "2024-01-12T08:00:00" },
  { id: "INC-2024-004", title: "Actualizacion de notas parcial 2", description: "Las notas no aparecen en el sistema", student: "Carlos Lopez", criticality: "medium", status: "in_progress", category: "grades", progress: 60, createdAt: "2024-01-13T14:00:00", dueDate: "2024-01-19T09:00:00" },
  { id: "INC-2024-005", title: "Queja por aula sin ventilacion", description: "El aula 205 no tiene ventiladores funcionales", student: "Laura Torres", criticality: "medium", status: "pending", category: "infrastructure", progress: 0, createdAt: "2024-01-14T10:00:00" },
  { id: "INC-2024-006", title: "Reembolso de matricula extemporanea", description: "Solicito reembolso por cobro indebido", student: "Diego Ramirez", criticality: "critical", status: "pending", category: "financial", progress: 0, createdAt: "2024-01-15T16:00:00", dueDate: "2024-01-17T09:00:00" },
  { id: "INC-2024-007", title: "Certificado de notas para beca", description: "Necesito certificado urgente para aplicar a beca", student: "Sofia Herrera", criticality: "medium", status: "in_progress", category: "certificate", progress: 40, createdAt: "2024-01-11T09:30:00", dueDate: "2024-01-16T09:00:00" },
  { id: "INC-2024-008", title: "Falla en sistema de calificaciones", description: "El sistema muestra notas incorrectas en 3 materias", student: "Andres Silva", criticality: "critical", status: "in_progress", category: "grades", progress: 30, createdAt: "2024-01-10T11:00:00", dueDate: "2024-01-15T09:00:00" },
  { id: "INC-2024-009", title: "Solicitud cambio de horario", description: "Cruce de horarios en dos materias obligatorias", student: "Valentina Castro", criticality: "low", status: "on_hold", category: "enrollment", progress: 20, createdAt: "2024-01-09T08:00:00" },
  { id: "INC-2024-010", title: "Dano en proyector salon 102", description: "El proyector no enciende desde hace una semana", student: "Felipe Morales", criticality: "medium", status: "pending", category: "infrastructure", progress: 0, createdAt: "2024-01-14T15:30:00", dueDate: "2024-01-21T09:00:00" },
  { id: "INC-2024-011", title: "Reclamo cobro biblioteca", description: "Cobro injustificado por libro devuelto a tiempo", student: "Camila Diaz", criticality: "low", status: "completed", category: "financial", progress: 100, createdAt: "2024-01-08T10:00:00" },
  { id: "INC-2024-012", title: "Goteras en pasillo edificio B", description: "Filtraciones de agua cuando llueve en el segundo piso", student: "Santiago Vargas", criticality: "critical", status: "pending", category: "infrastructure", progress: 0, createdAt: "2024-01-15T07:00:00", dueDate: "2024-01-16T09:00:00" },
  { id: "INC-2024-013", title: "Correccion de nota final Calculo II", description: "La nota final no coincide con las parciales", student: "Isabella Rojas", criticality: "medium", status: "in_progress", category: "grades", progress: 70, createdAt: "2024-01-12T13:00:00" },
  { id: "INC-2024-014", title: "Solicitud de paz y salvo", description: "Paz y salvo para grado programado en marzo", student: "Mateo Gutierrez", criticality: "low", status: "completed", category: "certificate", progress: 100, createdAt: "2024-01-07T09:00:00" },
  { id: "INC-2024-015", title: "Problema con carnet estudiantil", description: "El carnet no funciona para ingresar al campus", student: "Daniela Fernandez", criticality: "medium", status: "rejected", category: "other", progress: 0, createdAt: "2024-01-13T16:00:00" },
  { id: "INC-2024-016", title: "Ascensor fuera de servicio bloque C", description: "El ascensor lleva 3 dias sin funcionar", student: "Nicolas Acosta", criticality: "critical", status: "in_progress", category: "infrastructure", progress: 45, createdAt: "2024-01-14T08:00:00", dueDate: "2024-01-17T09:00:00" },
  { id: "INC-2024-017", title: "Certificado de permanencia", description: "Necesito certificado para tramite de EPS", student: "Gabriela Munoz", criticality: "low", status: "pending", category: "certificate", progress: 0, createdAt: "2024-01-15T11:30:00" },
  { id: "INC-2024-018", title: "Error en factura de matricula", description: "La factura tiene un valor diferente al acordado", student: "Alejandro Reyes", criticality: "medium", status: "on_hold", category: "financial", progress: 15, createdAt: "2024-01-10T14:00:00" },
]

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20]

export interface TaskFilters {
  search: string
  status: string
  criticality: string
  category: string
  sortBy: "createdAt" | "criticality" | "progress" | "title"
  sortOrder: "asc" | "desc"
}

const defaultFilters: TaskFilters = {
  search: "",
  status: "all",
  criticality: "all",
  category: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
}

export function TasksListView() {
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.status !== "all") count++
    if (filters.criticality !== "all") count++
    if (filters.category !== "all") count++
    return count
  }, [filters])

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...mockTasks]

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.id.toLowerCase().includes(query) ||
          t.student.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((t) => t.status === filters.status)
    }

    // Criticality filter
    if (filters.criticality !== "all") {
      result = result.filter((t) => t.criticality === filters.criticality)
    }

    // Category filter
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category)
    }

    // Sort
    const critOrder = { critical: 0, medium: 1, low: 2 }
    result.sort((a, b) => {
      let cmp = 0
      switch (filters.sortBy) {
        case "createdAt":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case "criticality":
          cmp = critOrder[a.criticality] - critOrder[b.criticality]
          break
        case "progress":
          cmp = a.progress - b.progress
          break
        case "title":
          cmp = a.title.localeCompare(b.title)
          break
      }
      return filters.sortOrder === "asc" ? cmp : -cmp
    })

    return result
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset page when filters change
  const updateFilter = (key: keyof TaskFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Tareas</h1>
            <p className="text-xs text-muted-foreground">
              {filteredTasks.length} {filteredTasks.length === 1 ? "tarea encontrada" : "tareas encontradas"}
            </p>
          </div>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative h-10 w-10">
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                {activeFilterCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground"
                    style={{ backgroundColor: "#D31219" }}
                  >
                    {activeFilterCount}
                  </span>
                )}
                <span className="sr-only">Filtros</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <TasksFilterPanel
                filters={filters}
                onFilterChange={updateFilter}
                onClear={clearFilters}
                activeCount={activeFilterCount}
              />
              <SheetFooter className="pt-4">
                <SheetClose asChild>
                  <Button className="w-full" style={{ backgroundColor: "#D31219" }}>
                    Aplicar filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block border-b border-border bg-card px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Todas las Tareas</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredTasks.length} {filteredTasks.length === 1 ? "tarea encontrada" : "tareas encontradas"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 md:px-6 md:py-6 max-w-7xl md:mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por titulo, ID o estudiante..."
            className="pl-10 h-12 bg-card border-border"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
          {filters.search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
              onClick={() => updateFilter("search", "")}
            >
              <X className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Limpiar busqueda</span>
            </Button>
          )}
        </div>

        {/* Desktop Filters Row */}
        <div className="hidden md:flex items-center gap-3 flex-wrap">
          <Select
            value={filters.status}
            onValueChange={(v) => updateFilter("status", v)}
          >
            <SelectTrigger className="w-[160px] bg-card">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {Object.entries(statusConfig).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.criticality}
            onValueChange={(v) => updateFilter("criticality", v)}
          >
            <SelectTrigger className="w-[160px] bg-card">
              <SelectValue placeholder="Criticidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toda criticidad</SelectItem>
              {Object.entries(criticalityConfig).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.category}
            onValueChange={(v) => updateFilter("category", v)}
          >
            <SelectTrigger className="w-[160px] bg-card">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorias</SelectItem>
              {Object.entries(categoryConfig).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(v) => {
              const [sortBy, sortOrder] = v.split("-") as [TaskFilters["sortBy"], TaskFilters["sortOrder"]]
              setFilters((prev) => ({ ...prev, sortBy, sortOrder }))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-[200px] bg-card">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3.5 w-3.5" />
                <SelectValue placeholder="Ordenar por" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt-desc">Mas recientes</SelectItem>
              <SelectItem value="createdAt-asc">Mas antiguas</SelectItem>
              <SelectItem value="criticality-asc">Criticidad (alta primero)</SelectItem>
              <SelectItem value="criticality-desc">Criticidad (baja primero)</SelectItem>
              <SelectItem value="progress-asc">Progreso (menor)</SelectItem>
              <SelectItem value="progress-desc">Progreso (mayor)</SelectItem>
              <SelectItem value="title-asc">Titulo (A-Z)</SelectItem>
              <SelectItem value="title-desc">Titulo (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Active filter badges (mobile) */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 md:hidden">
            {filters.status !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 pr-1 bg-card"
              >
                {statusConfig[filters.status]?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => updateFilter("status", "all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.criticality !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 pr-1 bg-card"
              >
                {criticalityConfig[filters.criticality]?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => updateFilter("criticality", "all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {filters.category !== "all" && (
              <Badge
                variant="outline"
                className="gap-1 pr-1 bg-card"
              >
                {categoryConfig[filters.category]?.label}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => updateFilter("category", "all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}

        {/* Tasks List */}
        {paginatedTasks.length === 0 ? (
          <Card className="py-16">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <ListFilter className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-semibold text-foreground mb-1">No se encontraron tareas</p>
              <p className="text-sm text-muted-foreground mb-4">
                Intenta ajustar los filtros o la busqueda
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {paginatedTasks.map((task) => (
              <TasksListItem
                key={task.id}
                task={task}
                criticalityConfig={criticalityConfig}
                statusConfig={statusConfig}
                categoryConfig={categoryConfig}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredTasks.length > 0 && (
          <Card className="overflow-hidden">
            <CardContent className="p-3 md:p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Items per page */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Mostrar</span>
                  <Select
                    value={String(itemsPerPage)}
                    onValueChange={(v) => {
                      setItemsPerPage(Number(v))
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger className="w-[70px] h-8 bg-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">por pagina</span>
                </div>

                {/* Page info */}
                <p className="text-sm text-muted-foreground text-center">
                  Mostrando{" "}
                  <span className="font-medium text-foreground">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>
                  {" - "}
                  <span className="font-medium text-foreground">
                    {Math.min(currentPage * itemsPerPage, filteredTasks.length)}
                  </span>
                  {" de "}
                  <span className="font-medium text-foreground">{filteredTasks.length}</span>
                </p>

                {/* Page controls */}
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                    <span className="sr-only">Primera pagina</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Pagina anterior</span>
                  </Button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        if (totalPages <= 5) return true
                        if (page === 1 || page === totalPages) return true
                        if (Math.abs(page - currentPage) <= 1) return true
                        return false
                      })
                      .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
                        if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                          acc.push("ellipsis")
                        }
                        acc.push(page)
                        return acc
                      }, [])
                      .map((item, idx) =>
                        item === "ellipsis" ? (
                          <span key={`ellipsis-${idx}`} className="px-1 text-muted-foreground text-sm">
                            ...
                          </span>
                        ) : (
                          <Button
                            key={item}
                            variant={currentPage === item ? "default" : "outline"}
                            size="icon"
                            className="h-8 w-8"
                            style={
                              currentPage === item
                                ? { backgroundColor: "#D31219", color: "#FFFFFF" }
                                : {}
                            }
                            onClick={() => setCurrentPage(item as number)}
                          >
                            {item}
                          </Button>
                        )
                      )}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Pagina siguiente</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                    <span className="sr-only">Ultima pagina</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom spacer for mobile nav */}
        <div className="h-4 md:hidden" />
      </main>
    </div>
  )
}
