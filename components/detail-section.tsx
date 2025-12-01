"use client"

import type React from "react"

interface DetailSectionProps {
  icon: React.ElementType
  title: string
  badge?: React.ReactNode
  children: React.ReactNode
  delay?: number
}

export function DetailSection({ icon: Icon, title, badge, children, delay = 0 }: DetailSectionProps) {
  return (
    <div
      className="bg-card rounded-xl border border-border p-5 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}
