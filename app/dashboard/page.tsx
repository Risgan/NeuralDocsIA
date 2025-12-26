"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { FileText, AlertCircle, CheckCircle2, Upload, Settings, LogOut, Menu, X } from "lucide-react"
import Link from "next/link"

const dashboardData = [
  { month: "Ene", documentos: 45 },
  { month: "Feb", documentos: 52 },
  { month: "Mar", documentos: 48 },
  { month: "Abr", documentos: 71 },
  { month: "May", documentos: 89 },
  { month: "Jun", documentos: 94 },
]

const documentTypes = [
  { name: "Facturas", value: 45, fill: "#2563EB" },
  { name: "Contratos", value: 28, fill: "#10B981" },
  { name: "Órdenes", value: 18, fill: "#F59E0B" },
  { name: "Otros", value: 9, fill: "#6B7280" },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } ${isMobile && !sidebarOpen ? "-translate-x-full" : ""}`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">NeuroDoc</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg text-muted-foreground"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <div className={`px-4 py-2 ${sidebarOpen ? "text-xs font-semibold text-muted-foreground uppercase" : ""}`}>
            {sidebarOpen && "Principal"}
          </div>
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Dashboard"
            href="/dashboard"
            active
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Upload className="w-5 h-5" />}
            label="Subir Documentos"
            href="/upload"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Gestor Documental"
            href="/documents"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Configuración"
            href="/settings"
            sidebarOpen={sidebarOpen}
          />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
            {sidebarOpen && "Salir"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-card border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Visión general de tu sistema de gestión documental</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Upload className="w-4 h-4" />
              Subir Documentos
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Documentos Procesados"
              value="324"
              description="En los últimos 30 días"
              icon={<CheckCircle2 className="w-6 h-6 text-accent" />}
            />
            <StatCard
              title="Documentos Pendientes"
              value="12"
              description="Esperando revisión"
              icon={<FileText className="w-6 h-6 text-secondary" />}
            />
            <StatCard
              title="Errores Detectados"
              value="3"
              description="Por IA - Requieren atención"
              icon={<AlertCircle className="w-6 h-6 text-destructive" />}
            />
          </div>

          {/* AI Achievement */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-primary">98%</div>
                <div>
                  <p className="font-semibold text-foreground">Automatización Exitosa</p>
                  <p className="text-sm text-muted-foreground">
                    La IA procesó automáticamente el 98% de los documentos sin intervención manual
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Procesamiento por Mes</CardTitle>
                <CardDescription>Documentos procesados últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }} />
                    <Line
                      type="monotone"
                      dataKey="documentos"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={{ fill: "#2563EB", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Tipos de Documentos</CardTitle>
                <CardDescription>Distribución en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={documentTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                      {documentTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, description, icon }: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function NavItem({ icon, label, href, active, sidebarOpen }: any) {
  return (
    <Link href={href}>
      <button
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        {icon}
        {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
      </button>
    </Link>
  )
}
