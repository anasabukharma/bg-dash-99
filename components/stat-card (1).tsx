"use client"

import type React from "react"

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: number
  variant: "default" | "warning" | "success" | "destructive"
}

export function StatCard({ icon: Icon, label, value, variant }: StatCardProps) {
  const variantStyles = {
    default: "bg-muted/50 text-muted-foreground",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
  }

  return (
    <div className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-200">
      <div className={`p-2.5 rounded-xl ${variantStyles[variant]} transition-transform group-hover:scale-105`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
