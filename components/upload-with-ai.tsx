"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, File, CheckCircle2, X, Send, Zap } from "lucide-react"
import { mockAIAnalysis } from "@/lib/mock-data"

interface UploadedFile {
  id: string
  name: string
  size: number
  status: "uploading" | "analyzing" | "classification" | "processed"
  progress: number
  aiAnalysis?: any
  selectedTrd?: string
  selectedSeries?: string
  selectedSubseries?: string
}

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  message: string
  timestamp: Date
}

export function UploadWithAI() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      message: "Hola, soy tu asistente IA. Carga un documento y te ayudaré a clasificarlo automáticamente.",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      handleFiles(selectedFiles)
    }
  }

  const handleFiles = (fileList: File[]) => {
    fileList.forEach((file) => {
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        const newFile: UploadedFile = {
          id: Math.random().toString(36),
          name: file.name,
          size: file.size,
          status: "uploading",
          progress: 0,
        }
        setFiles((prev) => [...prev, newFile])
        setSelectedFileId(newFile.id)

        // Simular carga y análisis
        let currentProgress = 0
        const uploadInterval = setInterval(() => {
          currentProgress += Math.random() * 30
          if (currentProgress >= 100) {
            currentProgress = 100
            clearInterval(uploadInterval)
            setTimeout(() => {
              setFiles((prev) =>
                prev.map((f) => (f.id === newFile.id ? { ...f, status: "analyzing", progress: 100 } : f)),
              )

              // Simular análisis IA
              setTimeout(() => {
                const isInvoice = file.name.toLowerCase().includes("factura")
                const analysis = isInvoice ? mockAIAnalysis.invoiceAnalysis : mockAIAnalysis.contractAnalysis

                setFiles((prev) =>
                  prev.map((f) =>
                    f.id === newFile.id
                      ? {
                          ...f,
                          status: "classification",
                          aiAnalysis: analysis,
                          selectedSeries: analysis.suggestedSeries,
                          selectedSubseries: analysis.suggestedSubseries,
                        }
                      : f,
                  ),
                )

                // Agregar mensaje IA
                setChatMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    type: "assistant",
                    message: `He analizado el documento "${file.name}" y detecté que es un ${analysis.detectedType} con ${(analysis.confidence * 100).toFixed(0)}% de confianza. Sugiero clasificarlo en la serie "${analysis.suggestedSeries}" > "${analysis.suggestedSubseries}". ¿Estás de acuerdo?`,
                    timestamp: new Date(),
                  },
                ])
              }, 2000)
            }, 500)
          }
          setFiles((prev) =>
            prev.map((f) => (f.id === newFile.id ? { ...f, progress: Math.min(currentProgress, 100) } : f)),
          )
        }, 200)
      }
    })
  }

  const handleChatSend = () => {
    if (!chatInput.trim()) return

    const selectedFile = files.find((f) => f.id === selectedFileId)
    if (!selectedFile) return

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    }
    setChatMessages((prev) => [...prev, userMessage])

    // Respuesta IA simulada
    setTimeout(() => {
      let assistantResponse = ""

      if (chatInput.toLowerCase().includes("crear trd") || chatInput.toLowerCase().includes("nueva trd")) {
        assistantResponse =
          "Entendido. Para crear una nueva Tabla de Retención Documental (TRD), necesito que me proporciones: 1) Años de retención, 2) Método de disposición (Destrucción/Archivo Permanente), 3) Base legal. ¿Qué valores asignas?"
      } else if (chatInput.toLowerCase().includes("si") || chatInput.toLowerCase().includes("de acuerdo")) {
        assistantResponse = `Perfecto. He clasificado "${selectedFile.name}" en ${selectedFile.selectedSeries} > ${selectedFile.selectedSubseries}. Ahora selecciona la TRD aplicable o crea una nueva si es necesaria.`
        setFiles((prev) => prev.map((f) => (f.id === selectedFileId ? { ...f, status: "processed" } : f)))
      } else if (chatInput.toLowerCase().includes("no")) {
        assistantResponse =
          "Entendido. ¿Cuál sería la clasificación correcta? Puedo ayudarte a buscar la serie y subserie adecuadas."
      } else {
        assistantResponse =
          "Entendido. Recuerda que puedes crear una nueva TRD, reclasificar el documento o asignarlo a una TRD existente."
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          message: assistantResponse,
          timestamp: new Date(),
        },
      ])
    }, 1000)

    setChatInput("")
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
    if (selectedFileId === id) setSelectedFileId(null)
  }

  const selectedFile = files.find((f) => f.id === selectedFileId)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Carga de Documentos con IA</h1>
          <p className="text-muted-foreground">
            Arrastra tus documentos y déjame clasificarlos automáticamente según series, subseries y TRD
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <Card
              className={`border-2 border-dashed transition-all ${
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Arrastra documentos aquí</h2>
                  <p className="text-muted-foreground mb-6">O haz clic para seleccionar archivos desde tu equipo</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Seleccionar Archivos
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-4">
                    Tipos: PDF, JPG, PNG | Máximo 50MB | La IA analizará automáticamente
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Files List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-foreground">Documentos Cargados</h3>
                {files.map((file) => (
                  <FileUploadItem
                    key={file.id}
                    file={file}
                    onRemove={removeFile}
                    isSelected={file.id === selectedFileId}
                    onSelect={() => setSelectedFileId(file.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-1">
            <Card className="flex flex-col h-full max-h-[700px]">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Asistente IA
                </CardTitle>
              </CardHeader>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              {selectedFile && (
                <div className="border-t border-border p-4 space-y-3">
                  {selectedFile.aiAnalysis && (
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                      <p className="text-xs font-semibold text-accent mb-2">Análisis IA</p>
                      <div className="space-y-1 text-xs">
                        <p>
                          <span className="font-medium">Tipo:</span> {selectedFile.aiAnalysis.detectedType}
                        </p>
                        <p>
                          <span className="font-medium">Confianza:</span>{" "}
                          {(selectedFile.aiAnalysis.confidence * 100).toFixed(0)}%
                        </p>
                        <p>
                          <span className="font-medium">Serie:</span> {selectedFile.selectedSeries}
                        </p>
                        <p>
                          <span className="font-medium">Subserie:</span> {selectedFile.selectedSubseries}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      placeholder="Escribe aquí..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                      className="bg-input border-border text-sm"
                    />
                    <Button onClick={handleChatSend} size="sm" className="bg-primary hover:bg-primary/90 px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function FileUploadItem({
  file,
  onRemove,
  isSelected,
  onSelect,
}: {
  file: UploadedFile
  onRemove: (id: string) => void
  isSelected: boolean
  onSelect: () => void
}) {
  const getStatusIcon = () => {
    if (file.status === "processed") {
      return <CheckCircle2 className="w-5 h-5 text-accent" />
    }
    if (file.status === "analyzing" || file.status === "classification") {
      return <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    }
    return <File className="w-5 h-5 text-secondary" />
  }

  const getStatusText = () => {
    if (file.status === "processed") return "Procesado y clasificado"
    if (file.status === "classification") return "Listo para revisar clasificación"
    if (file.status === "analyzing") return "Analizando con IA..."
    return `Subiendo... ${file.progress}%`
  }

  return (
    <Card
      className={`cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : ""}`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusIcon()}
              <div>
                <p className="font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{getStatusText()}</p>
          </div>
          {file.status === "processed" && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(file.id)
              }}
              className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
