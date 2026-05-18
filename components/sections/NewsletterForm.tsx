"use client"

import { FormEvent, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) {
      toast.error("Informe um email válido.")
      return
    }

    setIsSubmitting(true)
    try {
      // MVP: captura local — integrar Mailchimp/Brevo na fase 2
      await new Promise((resolve) => setTimeout(resolve, 400))
      toast.success("Você entrou na lista!", {
        description: "Sem spam. Só novidades quando houver.",
      })
      setEmail("")
    } catch {
      toast.error("Algo deu errado.", {
        description: "Tente novamente em instantes.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <label className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        Email
      </label>
      <Input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isSubmitting}
        required
        className="h-11 rounded-md border-border bg-background"
        aria-label="Email para newsletter"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-11 w-full shrink-0 rounded-full bg-foreground font-mono text-[0.65rem] uppercase tracking-[0.18em] text-background hover:bg-foreground/90 sm:w-fit sm:px-6"
      >
        {isSubmitting ? "Enviando..." : "Entrar na lista"}
      </Button>
    </form>
  )
}
