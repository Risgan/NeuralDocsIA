import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppWrapper } from "@/components/app-wrapper"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeuralDocs AI - Gestor Documental Inteligente",
  description:
    "Analiza, clasifica y gestiona documentos con inteligencia artificial. Automatiza procesos documentales complejos.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <AppWrapper>{children}</AppWrapper>
        <Analytics />
      </body>
    </html>
  )
}
