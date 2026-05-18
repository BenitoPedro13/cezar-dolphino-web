"use client"

import { Copy, QrCode } from "lucide-react"
import { toast } from "sonner"

import { siteConfig } from "@/data/site-config"
import { Button } from "@/components/ui/button"

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
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-border bg-card/40 p-8">
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground">
            <QrCode className="size-4" />
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
            (01) PIX
          </span>
        </div>
        <h3 className="mt-10 font-display text-3xl font-medium leading-[0.95] tracking-[-0.02em] text-foreground sm:text-4xl">
          Gostou? Me pague
          <span className="block text-foreground/40">um café.</span>
        </h3>
        <p className="mt-4 font-sans text-sm text-muted-foreground">
          Use a chave abaixo no seu app de pagamentos.
        </p>
        <p className="mt-5 break-all rounded-sm border border-border bg-background px-4 py-3 font-mono text-xs text-foreground">
          {siteConfig.pixKey}
        </p>
      </div>
      <Button
        type="button"
        onClick={copyPixKey}
        className="mt-8 h-11 w-fit gap-2 rounded-full bg-foreground px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-background hover:bg-foreground/90"
      >
        <Copy className="size-3.5" />
        Copiar chave PIX
      </Button>
    </div>
  )
}
