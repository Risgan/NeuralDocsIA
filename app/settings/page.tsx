"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Mi Empresa S.A.",
    email: "admin@miempresa.com",
    language: "es",
    automationLevel: "high",
    notifications: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Configuración guardada exitosamente")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-primary hover:underline text-sm mb-4 inline-block flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en NeuralDocs AI</p>
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Company Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Empresa</CardTitle>
              <CardDescription>Datos básicos y contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Nombre de Empresa</label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Correo Administrativo</label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="bg-input border-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Personalización del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Idioma</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Nivel de Automatización</label>
                <select
                  value={settings.automationLevel}
                  onChange={(e) => setSettings({ ...settings, automationLevel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground"
                >
                  <option value="low">Bajo (requiere aprobación manual)</option>
                  <option value="medium">Medio (revisión selectiva)</option>
                  <option value="high">Alto (automatización máxima)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Notificaciones por Email</label>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      notifications: !settings.notifications,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                    settings.notifications ? "bg-accent" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Protege tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
