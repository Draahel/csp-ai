"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowUpDown, X } from "lucide-react"
import type { TaskFilters } from "./tasks-list-view"

interface TasksFilterPanelProps {
  filters: TaskFilters
  onFilterChange: (key: keyof TaskFilters, value: string) => void
  onClear: () => void
  activeCount: number
}

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendiente", color: "#D31219" },
  { value: "in_progress", label: "En Progreso", color: "#B28A12" },
  { value: "on_hold", label: "En Espera", color: "#6B7280" },
  { value: "completed", label: "Completado", color: "#2D8A3C" },
  { value: "rejected", label: "Rechazado", color: "#EF4444" },
]

const criticalityOptions = [
  { value: "all", label: "Todas" },
  { value: "critical", label: "Critico", color: "#D31219" },
  { value: "medium", label: "Medio", color: "#B28A12" },
  { value: "low", label: "Bajo", color: "#2D8A3C" },
]

const categoryOptions = [
  { value: "all", label: "Todas" },
  { value: "enrollment", label: "Matricula" },
  { value: "certificate", label: "Certificado" },
  { value: "grades", label: "Notas" },
  { value: "infrastructure", label: "Infraestructura" },
  { value: "financial", label: "Financiero" },
  { value: "other", label: "Otro" },
]

const sortOptions = [
  { value: "createdAt-desc", label: "Mas recientes" },
  { value: "createdAt-asc", label: "Mas antiguas" },
  { value: "criticality-asc", label: "Criticidad (alta)" },
  { value: "criticality-desc", label: "Criticidad (baja)" },
  { value: "progress-asc", label: "Progreso (menor)" },
  { value: "progress-desc", label: "Progreso (mayor)" },
]

export function TasksFilterPanel({
  filters,
  onFilterChange,
  onClear,
  activeCount,
}: TasksFilterPanelProps) {
  return (
    <div className="py-4 space-y-6 overflow-y-auto">
      {/* Clear all */}
      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
          onClick={onClear}
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Limpiar todos los filtros ({activeCount})
        </Button>
      )}

      {/* Status */}
      <div className="space-y-3">
        <Label className="text-label text-muted-foreground">Estado</Label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => {
            const isActive = filters.status === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onFilterChange("status", opt.value)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
                style={
                  isActive
                    ? {
                        backgroundColor: opt.color ? `${opt.color}15` : "var(--secondary)",
                        color: opt.color || "var(--secondary-foreground)",
                        borderColor: opt.color ? `${opt.color}40` : "var(--border)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--muted-foreground)",
                        borderColor: "var(--border)",
                      }
                }
              >
                {opt.color && (
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: opt.color }}
                  />
                )}
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Criticality */}
      <div className="space-y-3">
        <Label className="text-label text-muted-foreground">Criticidad</Label>
        <div className="flex flex-wrap gap-2">
          {criticalityOptions.map((opt) => {
            const isActive = filters.criticality === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onFilterChange("criticality", opt.value)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
                style={
                  isActive
                    ? {
                        backgroundColor: opt.color ? `${opt.color}15` : "var(--secondary)",
                        color: opt.color || "var(--secondary-foreground)",
                        borderColor: opt.color ? `${opt.color}40` : "var(--border)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--muted-foreground)",
                        borderColor: "var(--border)",
                      }
                }
              >
                {opt.color && (
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: opt.color }}
                  />
                )}
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <Label className="text-label text-muted-foreground">Categoria</Label>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((opt) => {
            const isActive = filters.category === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => onFilterChange("category", opt.value)}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
                style={
                  isActive
                    ? {
                        backgroundColor: "var(--secondary)",
                        color: "var(--secondary-foreground)",
                        borderColor: "var(--border)",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--muted-foreground)",
                        borderColor: "var(--border)",
                      }
                }
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Sort */}
      <div className="space-y-3">
        <Label className="text-label text-muted-foreground flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5" />
          Ordenar por
        </Label>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((opt) => {
            const currentSort = `${filters.sortBy}-${filters.sortOrder}`
            const isActive = currentSort === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const [sortBy, sortOrder] = opt.value.split("-") as [
                    TaskFilters["sortBy"],
                    TaskFilters["sortOrder"]
                  ]
                  onFilterChange("sortBy", sortBy)
                  // Slight hack - we need to set sortOrder too, but the interface only accepts one at a time
                  // So we set sortBy first, then sortOrder via a timeout
                  setTimeout(() => onFilterChange("sortOrder", sortOrder), 0)
                }}
                className="px-3 py-1.5 rounded-full text-sm font-medium transition-all border"
                style={
                  isActive
                    ? {
                        backgroundColor: "#D3121915",
                        color: "#D31219",
                        borderColor: "#D3121940",
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--muted-foreground)",
                        borderColor: "var(--border)",
                      }
                }
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
