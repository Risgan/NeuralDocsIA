"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Plus, Archive, Edit2 } from "lucide-react"
import { documentRetentionTables, documentSeries } from "@/lib/mock-data"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  message: string
}

export default function TrdManagerPage() {
  const [activeTab, setActiveTab] = useState("listado")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      message:
        "Hola, soy tu asistente para gestionar Tablas de Retención Documental. ¿Deseas crear una nueva TRD o editar una existente?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [creatingTrd, setCreatingTrd] = useState(false)
  const [trdForm, setTrdForm] = useState({
    documentType: "",
    series: "",
    subseries: "",
    retentionYears: "5",
    disposalMethod: "Destrucción",
    legalBasis: "",
  })

  const handleChatSend = () => {
    if (!chatInput.trim()) return

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        message: chatInput,
      },
    ])

    setTimeout(() => {
      let response = ""

      if (
        chatInput.toLowerCase().includes("crear") ||
        chatInput.toLowerCase().includes("nueva") ||
        chatInput.toLowerCase().includes("new")
      ) {
        response =
          "Perfecto. Para crear una nueva TRD necesito que me proporciones: 1) Tipo de documento, 2) Serie, 3) Subserie, 4) Años de retención, 5) Método de disposición, 6) Base legal. ¿Comenzamos?"
        setCreatingTrd(true)
      } else if (chatInput.toLowerCase().includes("años") || chatInput.toLowerCase().includes("retención")) {
        response = "Entendido. He actualizado los años de retención. ¿Cuál sería el nuevo valor? (ej: 5, 7, 10 años)"
      } else if (
        chatInput.toLowerCase().includes("destrucción") ||
        chatInput.toLowerCase().includes("archivo") ||
        chatInput.toLowerCase().includes("disposición")
      ) {
        response =
          "Correcto. He actualizado el método de disposición. Recuerda que puedes elegir entre: Destrucción o Archivo Permanente."
      } else {
        response =
          "Puedo ayudarte a crear, editar o visualizar TRD. ¿Qué necesitas hacer? Dime 'crear nueva TRD' para comenzar."
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          message: response,
        },
      ])
    }, 800)

    setChatInput("")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Archive className="w-8 h-8 text-primary" />
            Gestor de Tablas de Retención Documental (TRD)
          </h1>
          <p className="text-muted-foreground">
            Define y administra las políticas de retención y disposición de documentos
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listado">Listado de TRD</TabsTrigger>
            <TabsTrigger value="crear">Crear/Editar</TabsTrigger>
          </TabsList>

          {/* Tab: Listado */}
          <TabsContent value="listado" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {documentRetentionTables.map((trd) => (
                <Card key={trd.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">TIPO DOCUMENTAL</p>
                        <p className="font-bold text-foreground">{trd.documentTypeName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">SERIE / SUBSERIE</p>
                        <p className="text-sm text-foreground">
                          {trd.serieId} / {trd.subserieId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">RETENCIÓN</p>
                        <p className="font-bold text-primary">{trd.retentionYears} años</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">DISPOSICIÓN</p>
                        <p className="text-sm text-foreground">{trd.disposalMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold mb-1">BASE LEGAL</p>
                        <p className="text-sm text-foreground">{trd.legalBasis}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex gap-2 bg-transparent"
                          onClick={() => setActiveTab("crear")}
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">{trd.notes}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Crear/Editar */}
          <TabsContent value="crear">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulario */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Nueva Tabla de Retención Documental
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Tipo de Documento</label>
                      <Input
                        placeholder="ej: Factura Venta, Contrato de Servicios"
                        value={trdForm.documentType}
                        onChange={(e) => setTrdForm({ ...trdForm, documentType: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Serie</label>
                        <select
                          value={trdForm.series}
                          onChange={(e) => setTrdForm({ ...trdForm, series: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                        >
                          <option value="">Seleccionar</option>
                          {documentSeries.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.code} - {s.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Subserie</label>
                        <Input
                          placeholder="ej: Facturación, Correspondencia"
                          value={trdForm.subseries}
                          onChange={(e) => setTrdForm({ ...trdForm, subseries: e.target.value })}
                          className="bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Años de Retención</label>
                        <Input
                          type="number"
                          value={trdForm.retentionYears}
                          onChange={(e) => setTrdForm({ ...trdForm, retentionYears: e.target.value })}
                          className="bg-input border-border"
                          min="1"
                          max="99"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Método de Disposición</label>
                        <select
                          value={trdForm.disposalMethod}
                          onChange={(e) => setTrdForm({ ...trdForm, disposalMethod: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm"
                        >
                          <option value="Destrucción">Destrucción</option>
                          <option value="Archivo Permanente">Archivo Permanente</option>
                          <option value="Microfilmación">Microfilmación</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Base Legal</label>
                      <Input
                        placeholder="ej: Código Tributario, NTC 5730, Código Civil"
                        value={trdForm.legalBasis}
                        onChange={(e) => setTrdForm({ ...trdForm, legalBasis: e.target.value })}
                        className="bg-input border-border"
                      />
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                      Guardar TRD
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Chat */}
              <div className="lg:col-span-1">
                <Card className="flex flex-col h-full max-h-[600px]">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="text-lg">Asistente TRD</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto space-y-3 p-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.type === "user"
                              ? "bg-primary text-primary-foreground rounded-br-none"
                              : "bg-muted text-foreground rounded-bl-none"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Escribe aquí..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                        className="bg-input border-border text-sm"
                      />
                      <Button onClick={handleChatSend} size="icon" className="bg-primary hover:bg-primary/90">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
