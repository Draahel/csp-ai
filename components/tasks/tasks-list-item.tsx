"use client"

import Link from "next/link"
import { ChevronRight, Clock, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { TaskItem } from "./tasks-list-view"

interface TasksListItemProps {
  task: TaskItem
  criticalityConfig: Record<string, { label: string; color: string; bgColor: string }>
  statusConfig: Record<string, { label: string; color: string; bgColor: string }>
  categoryConfig: Record<string, { label: string }>
}

function formatTimeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (mins < 60) return `Hace ${mins} min`
  if (hours < 24) return `Hace ${hours} h`
  if (days < 7) return `Hace ${days} dias`
  return new Date(dateStr).toLocaleDateString("es-ES", { day: "numeric", month: "short" })
}

export function TasksListItem({
  task,
  criticalityConfig,
  statusConfig,
  categoryConfig,
}: TasksListItemProps) {
  const crit = criticalityConfig[task.criticality]
  const stat = statusConfig[task.status]
  const cat = categoryConfig[task.category]

  return (
    <Link href={`/task/${task.id}`} className="block group">
      <Card className="overflow-hidden transition-all hover:shadow-md hover:border-border/80 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <CardContent className="p-0">
          {/* Mobile layout */}
          <div className="md:hidden">
            <div className="flex items-stretch">
              {/* Criticality indicator bar */}
              <div
                className="w-1.5 shrink-0"
                style={{ backgroundColor: crit.color }}
              />
              <div className="flex-1 p-3 space-y-2.5">
                {/* Top row: ID + badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    {task.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      className="text-[10px] px-1.5 py-0.5"
                      style={{ backgroundColor: crit.bgColor, color: crit.color }}
                    >
                      {crit.label}
                    </Badge>
                    <Badge
                      className="text-[10px] px-1.5 py-0.5"
                      style={{ backgroundColor: stat.bgColor, color: stat.color }}
                    >
                      {stat.label}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <p className="font-semibold text-sm text-foreground leading-tight line-clamp-2">
                  {task.title}
                </p>

                {/* Student + Category */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {task.student}
                  </span>
                  <span className="flex items-center gap-1">
                    {cat.label}
                  </span>
                </div>

                {/* Progress + Time */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2">
                    <Progress
                      value={task.progress}
                      className="h-1.5 flex-1"
                    />
                    <span className="text-xs font-medium text-foreground w-8 text-right">
                      {task.progress}%
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(task.createdAt)}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <div className="flex items-center pr-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4 p-4">
              {/* Criticality bar */}
              <div
                className="w-1 h-14 rounded-full shrink-0"
                style={{ backgroundColor: crit.color }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-medium text-muted-foreground">
                    {task.id}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 bg-muted/50"
                  >
                    {cat.label}
                  </Badge>
                </div>
                <p className="font-semibold text-sm text-foreground truncate">
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span>{task.student}</span>
                  <span>-</span>
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(task.createdAt)}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  className="text-xs px-2 py-0.5"
                  style={{ backgroundColor: crit.bgColor, color: crit.color }}
                >
                  {crit.label}
                </Badge>
                <Badge
                  className="text-xs px-2 py-0.5"
                  style={{ backgroundColor: stat.bgColor, color: stat.color }}
                >
                  {stat.label}
                </Badge>
              </div>

              {/* Progress */}
              <div className="w-32 shrink-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progreso</span>
                  <span className="text-xs font-medium text-foreground">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-1.5" />
              </div>

              {/* Arrow */}
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
