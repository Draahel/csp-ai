"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Plus, Settings, LayoutGrid, ClipboardList } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/worker", label: "Reportes", icon: Briefcase },
  { href: "/tasks", label: "Tareas", icon: ClipboardList },
  { href: "/admin", label: "Administracion", icon: LayoutGrid },
  { href: "/design-system", label: "Sistema de Diseno", icon: Settings },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 bg-background border-b border-border hidden md:block z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "#D31219" }}
            >
              UL
            </div>
            <span className="text-lg font-bold text-foreground hidden lg:inline">
              Sistema de Reportes
            </span>
          </Link>

          {/* Main navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative",
                    isActive
                      ? "bg-red-50 text-red-600 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                      style={{ backgroundColor: "#D31219" }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action button */}
          <Link href="/report/new" className="flex-shrink-0">
            <Button
              className="gap-2 font-semibold"
              style={{ backgroundColor: "#D31219" }}
            >
              <Plus className="h-4 w-4" />
              Nuevo Reporte
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
