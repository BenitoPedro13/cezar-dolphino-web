"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"

import { siteConfig } from "@/data/site-config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PixCard() {
  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(siteConfig.pixKey)
      toast.success("Chave PIX copiada!", {
        description: "Cole no seu app de pagamentos.",
      })
    } catch {
      toast.error("Não foi possível copiar", {
        description: "Selecione e copie a chave manualmente.",
      })
    }
  }

  return (
    <Card className="border-border/80 bg-card/60">
      <CardHeader>
        <CardTitle className="font-display text-2xl italic">PIX</CardTitle>
        <CardDescription>
          Gostou do que ouviu? Me pague um café.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="rounded-md border border-border/80 bg-background/50 px-3 py-2 font-mono text-sm text-foreground break-all">
          {siteConfig.pixKey}
        </p>
        <Button type="button" onClick={copyPixKey} className="w-full gap-2 sm:w-auto">
          <Copy className="size-4" />
          Copiar chave PIX
        </Button>
      </CardContent>
    </Card>
  )
}
