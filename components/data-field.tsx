"use client"

import type React from "react"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataFieldProps {
  label: string
  value?: string | number
  mono?: boolean
  copyable?: boolean
  size?: "sm" | "md" | "lg"
}

export function DataField({ label, value, mono = false, copyable = false, size = "md" }: DataFieldProps) {
  const [copied, setCopied] = useState(false)

  if (!value) return null

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await navigator.clipboard.writeText(String(value))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div
      className={`group ${sizeClasses[size]} bg-muted/30 rounded-lg border border-border/50 hover:border-primary/20 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
        {copyable && (
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
          </Button>
        )}
      </div>
      <p
        className={`${textSizeClasses[size]} font-medium text-foreground ${mono ? "font-mono" : ""}`}
        dir={mono ? "ltr" : "rtl"}
      >
        {value}
      </p>
    </div>
  )
}
