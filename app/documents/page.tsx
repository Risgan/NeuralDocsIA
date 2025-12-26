"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronRight, FileText, Upload, Archive } from "lucide-react"
import Link from "next/link"
import { mockDocumentsWithVersions } from "@/lib/mock-data"
import { DocumentHierarchy } from "@/components/document-hierarchy"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("documentos")

  const filteredDocuments = mockDocumentsWithVersions.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestor Documental</h1>
          <p className="text-muted-foreground">
            Sistema integral de gestión con series, subseries, TRD y control de versiones
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="estructura">Estructura Documental</TabsTrigger>
            <TabsTrigger value="trd">Tablas de Retención</TabsTrigger>
          </TabsList>

          {/* Tab: Documentos */}
          <TabsContent value="documentos" className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Busca documentos por nombre, tipo, serie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Link href="/upload">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto">
                  <Upload className="w-4 h-4" />
                  Subir Documentos
                </Button>
              </Link>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <Link key={doc.id} href={`/document/${doc.id}`}>
                    <Card className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">{doc.name}</p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                                  {doc.series}
                                </span>
                                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                                  {doc.subseries}
                                </span>
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                  v{doc.versions.length}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-semibold text-foreground">{doc.type}</p>
                            <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                              {doc.status}
                            </span>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">No se encontraron documentos</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tab: Estructura Documental */}
          <TabsContent value="estructura">
            <DocumentHierarchy />
          </TabsContent>

          {/* Tab: Tablas de Retención */}
          <TabsContent value="trd">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5" />
                  Tablas de Retención Documental (TRD)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold text-foreground">Tipo Documental</th>
                        <th className="text-left p-3 font-semibold text-foreground">Serie</th>
                        <th className="text-left p-3 font-semibold text-foreground">Subserie</th>
                        <th className="text-left p-3 font-semibold text-foreground">Retención</th>
                        <th className="text-left p-3 font-semibold text-foreground">Disposición</th>
                        <th className="text-left p-3 font-semibold text-foreground">Base Legal</th>
                        <th className="text-left p-3 font-semibold text-foreground">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDocumentsWithVersions.map((doc) => (
                        <tr key={doc.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-3">{doc.type}</td>
                          <td className="p-3">{doc.series}</td>
                          <td className="p-3">{doc.subseries}</td>
                          <td className="p-3 font-semibold">{doc.trdInfo.retentionYears} años</td>
                          <td className="p-3">{doc.trdInfo.disposalMethod}</td>
                          <td className="p-3 text-xs">{doc.trdInfo.legalBasis}</td>
                          <td className="p-3">
                            <Link href={`/trd-manager?id=${doc.trdId}`}>
                              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                                Ver
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Link href="/trd-manager">
                  <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Upload className="w-4 h-4" />
                    Crear Nueva TRD
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
