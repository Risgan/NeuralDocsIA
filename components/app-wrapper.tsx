"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/"

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <Sidebar />}
      <main className={!isLoginPage ? "ml-64" : ""}>{children}</main>
    </div>
  )
}
