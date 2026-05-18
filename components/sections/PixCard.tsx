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
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur transition-colors hover:border-primary/50">
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
            <QrCode className="size-5" />
          </span>
          <div className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
            PIX
          </div>
        </div>
        <h3 className="mt-6 font-display text-3xl italic text-foreground sm:text-4xl">
          Gostou? Me pague um café.
        </h3>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          Use a chave abaixo no seu app de pagamentos.
        </p>
        <p className="mt-5 break-all rounded-xl border border-border/60 bg-background/60 px-4 py-3 font-mono text-sm text-foreground">
          {siteConfig.pixKey}
        </p>
      </div>
      <Button
        type="button"
        onClick={copyPixKey}
        className="mt-8 h-12 w-fit gap-2 rounded-full px-7 text-sm uppercase tracking-[0.14em]"
      >
        <Copy className="size-4" />
        Copiar chave PIX
      </Button>
    </div>
  )
}
