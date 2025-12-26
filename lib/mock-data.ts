// Mock data structure for document management system

export const documentSeries = [
  {
    id: "s001",
    code: "100",
    name: "GESTIÓN ADMINISTRATIVA",
    description: "Documentos relacionados con la administración general",
    subseries: [
      {
        id: "ss001",
        code: "110",
        name: "Correspondencia",
        documentTypes: [
          {
            id: "dt001",
            name: "Carta Comercial",
            requiredMetadata: ["remitente", "destinatario", "fecha", "asunto", "número_referencia"],
          },
          {
            id: "dt002",
            name: "Memo Interno",
            requiredMetadata: ["de", "para", "fecha", "asunto", "prioridad"],
          },
        ],
      },
      {
        id: "ss002",
        code: "120",
        name: "Informes y Reportes",
        documentTypes: [
          {
            id: "dt003",
            name: "Informe General",
            requiredMetadata: ["titulo", "autor", "fecha", "periodo", "conclusiones"],
          },
        ],
      },
    ],
  },
  {
    id: "s002",
    code: "200",
    name: "GESTIÓN FINANCIERA",
    description: "Documentos relacionados con transacciones económicas",
    subseries: [
      {
        id: "ss003",
        code: "210",
        name: "Facturación",
        documentTypes: [
          {
            id: "dt004",
            name: "Factura Venta",
            requiredMetadata: ["número_factura", "fecha", "cliente", "monto_total", "items", "iva"],
          },
          {
            id: "dt005",
            name: "Factura Compra",
            requiredMetadata: ["número_factura", "fecha", "proveedor", "monto_total", "items", "iva"],
          },
        ],
      },
      {
        id: "ss004",
        code: "220",
        name: "Contratos",
        documentTypes: [
          {
            id: "dt006",
            name: "Contrato de Servicios",
            requiredMetadata: ["partes", "fecha_inicio", "fecha_fin", "valor_total", "alcance", "condiciones"],
          },
          {
            id: "dt007",
            name: "Contrato de Compraventa",
            requiredMetadata: [
              "partes",
              "producto_descripcion",
              "cantidad",
              "precio_unitario",
              "valor_total",
              "condiciones_pago",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s003",
    code: "300",
    name: "GESTIÓN LEGAL",
    description: "Documentos de carácter legal y cumplimiento normativo",
    subseries: [
      {
        id: "ss005",
        code: "310",
        name: "Documentos Legales",
        documentTypes: [
          {
            id: "dt008",
            name: "Resolución",
            requiredMetadata: ["número_resolución", "fecha", "objeto", "autoridad", "efectiva_desde"],
          },
        ],
      },
    ],
  },
]

// Tablas de Retención Documental (TRD)
export const documentRetentionTables = [
  {
    id: "trd001",
    serieId: "s001",
    subserieId: "ss001",
    documentTypeId: "dt001",
    documentTypeName: "Carta Comercial",
    retentionYears: 5,
    disposalMethod: "Destrucción",
    legalBasis: "NTC 5730",
    notes: "Retención completa según regulación comercial",
  },
  {
    id: "trd002",
    serieId: "s002",
    subserieId: "ss003",
    documentTypeId: "dt004",
    documentTypeName: "Factura Venta",
    retentionYears: 7,
    disposalMethod: "Archivo Permanente",
    legalBasis: "Código Tributario",
    notes: "Retención ampliada por requisitos fiscales",
  },
  {
    id: "trd003",
    serieId: "s002",
    subserieId: "ss004",
    documentTypeId: "dt006",
    documentTypeName: "Contrato de Servicios",
    retentionYears: 10,
    disposalMethod: "Archivo Permanente",
    legalBasis: "Código Civil",
    notes: "Retención completa por obligaciones contractuales",
  },
]

// Simulated document analysis results
export const mockAIAnalysis = {
  invoiceAnalysis: {
    detectedType: "Factura Venta",
    confidence: 0.98,
    extractedFields: {
      número_factura: { value: "FAC-2024-00123", confidence: 0.99 },
      fecha: { value: "2024-06-15", confidence: 0.99 },
      cliente: { value: "Empresa XYZ SAS", confidence: 0.95 },
      monto_total: { value: "$2,450,000", confidence: 0.97 },
      items: { value: "3 artículos", confidence: 0.92 },
      iva: { value: "$392,000", confidence: 0.96 },
    },
    suggestedSeries: "GESTIÓN FINANCIERA",
    suggestedSubseries: "Facturación",
    complianceIssues: [],
  },
  contractAnalysis: {
    detectedType: "Contrato de Servicios",
    confidence: 0.96,
    extractedFields: {
      partes: { value: "Empresa A y Proveedor B", confidence: 0.94 },
      fecha_inicio: { value: "2024-01-01", confidence: 0.98 },
      fecha_fin: { value: "2024-12-31", confidence: 0.98 },
      valor_total: { value: "$50,000,000", confidence: 0.93 },
      alcance: { value: "Servicios de consultoría y asesoría", confidence: 0.89 },
      condiciones: { value: "Pago mensual, renovable anualmente", confidence: 0.85 },
    },
    suggestedSeries: "GESTIÓN FINANCIERA",
    suggestedSubseries: "Contratos",
    complianceIssues: [],
  },
}

// Simulated uploaded documents
export const mockUploadedDocuments = [
  {
    id: "doc001",
    name: "Factura FV-2024-001",
    type: "Factura Venta",
    series: "GESTIÓN FINANCIERA",
    subseries: "Facturación",
    uploadDate: "2024-06-15",
    status: "procesado",
    aiConfidence: 0.98,
  },
  {
    id: "doc002",
    name: "Contrato Servicios - Proveedor X",
    type: "Contrato de Servicios",
    series: "GESTIÓN FINANCIERA",
    subseries: "Contratos",
    uploadDate: "2024-06-14",
    status: "procesado",
    aiConfidence: 0.96,
  },
  {
    id: "doc003",
    name: "Memo Interno - Reunión Q2",
    type: "Memo Interno",
    series: "GESTIÓN ADMINISTRATIVA",
    subseries: "Correspondencia",
    uploadDate: "2024-06-13",
    status: "procesado",
    aiConfidence: 0.94,
  },
]

// Expanded mock data with documents having versions and complete metadata
export const mockDocumentsWithVersions = [
  {
    id: "doc001",
    name: "Factura FV-2024-001",
    type: "Factura Venta",
    series: "GESTIÓN FINANCIERA",
    subseries: "Facturación",
    trdId: "trd002",
    uploadDate: "2024-06-15",
    status: "procesado",
    aiConfidence: 0.98,
    versions: [
      {
        versionNumber: 1,
        date: "2024-06-15",
        uploadedBy: "user@empresa.com",
        changes: "Versión original",
        metadata: {
          número_factura: "FAC-2024-001",
          fecha: "2024-06-15",
          cliente: "Empresa XYZ SAS",
          monto_total: "$2,450,000",
          items: 3,
          iva: "$392,000",
        },
      },
      {
        versionNumber: 2,
        date: "2024-06-16",
        uploadedBy: "admin@empresa.com",
        changes: "Corrección de monto total",
        metadata: {
          número_factura: "FAC-2024-001",
          fecha: "2024-06-15",
          cliente: "Empresa XYZ SAS",
          monto_total: "$2,550,000",
          items: 3,
          iva: "$408,000",
        },
      },
    ],
    trdInfo: {
      retentionYears: 7,
      disposalMethod: "Archivo Permanente",
      legalBasis: "Código Tributario",
      retentionEndDate: "2031-06-15",
    },
  },
  {
    id: "doc002",
    name: "Contrato Servicios - Proveedor X",
    type: "Contrato de Servicios",
    series: "GESTIÓN FINANCIERA",
    subseries: "Contratos",
    trdId: "trd003",
    uploadDate: "2024-06-14",
    status: "procesado",
    aiConfidence: 0.96,
    versions: [
      {
        versionNumber: 1,
        date: "2024-06-14",
        uploadedBy: "user@empresa.com",
        changes: "Versión original",
        metadata: {
          partes: "Empresa A y Proveedor B",
          fecha_inicio: "2024-01-01",
          fecha_fin: "2024-12-31",
          valor_total: "$50,000,000",
          alcance: "Servicios de consultoría",
          condiciones: "Pago mensual",
        },
      },
    ],
    trdInfo: {
      retentionYears: 10,
      disposalMethod: "Archivo Permanente",
      legalBasis: "Código Civil",
      retentionEndDate: "2034-06-14",
    },
  },
]
