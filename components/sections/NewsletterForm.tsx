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
      className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <Input
        type="email"
        name="email"
        autoComplete="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isSubmitting}
        required
        className="h-10 sm:max-w-sm"
        aria-label="Email para newsletter"
      />
      <Button type="submit" disabled={isSubmitting} className="h-10 shrink-0">
        {isSubmitting ? "Enviando..." : "Quero receber novidades"}
      </Button>
    </form>
  )
}
