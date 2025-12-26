"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen } from "lucide-react"
import { documentSeries, mockDocumentsWithVersions } from "@/lib/mock-data"

export function DocumentHierarchy() {
  const [expandedSeries, setExpandedSeries] = useState<string[]>(["s001", "s002"])
  const [expandedSubseries, setExpandedSubseries] = useState<string[]>(["ss001", "ss003"])

  const toggleSeries = (id: string) => {
    setExpandedSeries((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleSubseries = (id: string) => {
    setExpandedSubseries((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="w-5 h-5" />
          Estructura de Series Documentales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {documentSeries.map((serie) => (
            <div key={serie.id}>
              {/* Serie */}
              <button
                onClick={() => toggleSeries(serie.id)}
                className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors text-left"
              >
                {expandedSeries.includes(serie.id) ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
                <FolderOpen className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">
                    {serie.code} - {serie.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{serie.description}</p>
                </div>
              </button>

              {/* Subseries */}
              {expandedSeries.includes(serie.id) && (
                <div className="ml-6 space-y-2">
                  {serie.subseries.map((subserie) => {
                    const docsInSubserie = mockDocumentsWithVersions.filter(
                      (d) => d.series === serie.name && d.subseries === subserie.name,
                    )

                    return (
                      <div key={subserie.id}>
                        <button
                          onClick={() => toggleSubseries(subserie.id)}
                          className="w-full flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors text-left"
                        >
                          {expandedSubseries.includes(subserie.id) ? (
                            <ChevronDown className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 flex-shrink-0" />
                          )}
                          <Folder className="w-4 h-4 text-secondary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {subserie.code} - {subserie.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{docsInSubserie.length} documentos</p>
                          </div>
                        </button>

                        {/* Document Types */}
                        {expandedSubseries.includes(subserie.id) && (
                          <div className="ml-6 space-y-1">
                            {subserie.documentTypes.map((docType) => (
                              <div
                                key={docType.id}
                                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 text-left"
                              >
                                <FileText className="w-4 h-4 text-accent flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground">{docType.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {docType.requiredMetadata.length} metadatos requeridos
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
