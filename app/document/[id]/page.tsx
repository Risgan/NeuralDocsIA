"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Download, Send, ArrowLeft, Clock, Archive } from "lucide-react"
import Link from "next/link"
import { mockDocumentsWithVersions } from "@/lib/mock-data"

const processingSteps = [
  { label: "Tipo de documento detectado", completed: true },
  { label: "Extracción de datos clave", completed: true },
  { label: "Clasificación documental", completed: true },
  { label: "Validación de consistencia", completed: true },
  { label: "Preparación para archivo", completed: true },
]

export default function DocumentViewerPage({ params }: { params: { id: string } }) {
  const document = mockDocumentsWithVersions.find((d) => d.id === params.id) || mockDocumentsWithVersions[0]
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Hola, soy tu asistente IA. Puedo ayudarte a entender este documento. ¿Tienes alguna pregunta?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("metadatos")

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = inputValue
    setInputValue("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        retención: `Este documento tiene una retención de ${document.trdInfo.retentionYears} años según la TRD configurada. Fecha de disposición: ${document.trdInfo.retentionEndDate}`,
        trd: `Está asociado a la TRD: ${document.trdId}. Método de disposición: ${document.trdInfo.disposalMethod}. Base legal: ${document.trdInfo.legalBasis}`,
        versiones: `Este documento tiene ${document.versions.length} versiones registradas. La última fue modificada el ${document.versions[document.versions.length - 1].date}`,
        metadata: `Los metadatos extraídos son correctos. Todos los campos obligatorios están completos y validados.`,
      }

      let response =
        "Puedo ayudarte con información sobre este documento. Pregunta sobre retención, TRD, versiones o metadatos."

      const lowerInput = userMessage.toLowerCase()
      for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-card border-b border-border p-6">
          <Link
            href="/documents"
            className="text-primary hover:underline text-sm mb-4 inline-block flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                {document.name}
                <span className="flex items-center gap-1 text-accent text-sm font-normal bg-accent/10 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" /> {document.status}
                </span>
              </h1>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{document.series}</span>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{document.subseries}</span>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Document Preview & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Processing Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Procesamiento Inteligente</CardTitle>
                <CardDescription>Pasos completados por IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {processingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <span className="text-foreground text-sm">{step.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs: Metadatos, Versiones, TRD */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles Completos</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="metadatos">Metadatos</TabsTrigger>
                    <TabsTrigger value="versiones">Versiones ({document.versions.length})</TabsTrigger>
                    <TabsTrigger value="trd">TRD</TabsTrigger>
                  </TabsList>

                  {/* Metadatos */}
                  <TabsContent value="metadatos" className="space-y-3">
                    {document.versions[document.versions.length - 1].metadata &&
                      Object.entries(document.versions[document.versions.length - 1].metadata).map(([key, value]) => (
                        <div key={key} className="p-3 bg-muted rounded-lg">
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                            {key.replace(/_/g, " ")}
                          </p>
                          <p className="text-foreground font-medium">{String(value)}</p>
                        </div>
                      ))}
                  </TabsContent>

                  {/* Versiones */}
                  <TabsContent value="versiones" className="space-y-3">
                    {document.versions.map((version, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-foreground flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Versión {version.versionNumber}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {version.date} - Por {version.uploadedBy}
                            </p>
                          </div>
                          {index === document.versions.length - 1 && (
                            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">Actual</span>
                          )}
                        </div>
                        <p className="text-sm text-foreground bg-muted/50 p-2 rounded mt-2">{version.changes}</p>
                      </div>
                    ))}
                  </TabsContent>

                  {/* TRD */}
                  <TabsContent value="trd" className="space-y-3">
                    <div className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center gap-2">
                        <Archive className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Tabla de Retención Documental</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Años de Retención</p>
                          <p className="font-bold text-foreground text-lg">{document.trdInfo.retentionYears} años</p>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Fecha de Disposición</p>
                          <p className="font-bold text-foreground">{document.trdInfo.retentionEndDate}</p>
                        </div>
                        <div className="col-span-2 bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Método de Disposición</p>
                          <p className="font-bold text-foreground">{document.trdInfo.disposalMethod}</p>
                        </div>
                        <div className="col-span-2 bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Base Legal</p>
                          <p className="font-bold text-foreground">{document.trdInfo.legalBasis}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa del Documento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📄</span>
                    </div>
                    <p className="text-sm font-medium">{document.name}</p>
                    <p className="text-xs mt-2">ID: {document.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="flex flex-col h-[600px]">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg">Asistente IA</CardTitle>
                <CardDescription className="text-xs">Haz preguntas sobre el documento</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <div className="border-t border-border p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Haz una pregunta..."
                    className="bg-input border-border text-sm"
                  />
                  <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
