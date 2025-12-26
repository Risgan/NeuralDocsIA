"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Upload, FolderOpen, Settings, LogOut, Menu, X, BarChart3, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Upload, label: "Subir Documentos", href: "/upload" },
    { icon: FolderOpen, label: "Gestor Documental", href: "/documents" },
    { icon: Zap, label: "Gestión de TRD", href: "/trd-manager" },
    { icon: Settings, label: "Configuración", href: "/settings" },
  ]

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-40 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">NeuralDocs</span>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-muted rounded-lg text-muted-foreground transition-colors"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {isOpen && (
            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase mb-4">Menú Principal</div>
          )}
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span>{item.label}</span>}
              </button>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button
            variant="ghost"
            className={`w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground ${
              isOpen ? "" : "p-2"
            }`}
          >
            <LogOut className="w-4 h-4" />
            {isOpen && "Salir"}
          </Button>
        </div>
      </aside>
    </>
  )
}
