import * as z from "zod"

export const contactSubjects = [
  { value: "show", label: "Booking / Show" },
  { value: "press", label: "Imprensa" },
  { value: "collaboration", label: "Parceria" },
  { value: "other", label: "Outro" },
] as const

export type ContactSubject = (typeof contactSubjects)[number]["value"]

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Informe seu nome completo.")
    .max(80, "Nome muito longo."),
  email: z.email("Informe um email válido."),
  subject: z.enum(["show", "press", "collaboration", "other"], {
    message: "Selecione um assunto.",
  }),
  message: z
    .string()
    .min(20, "A mensagem deve ter pelo menos 20 caracteres.")
    .max(2000, "A mensagem deve ter no máximo 2000 caracteres."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export function getSubjectLabel(value: ContactSubject): string {
  return contactSubjects.find((item) => item.value === value)?.label ?? value
}

export async function submitContactForm(
  values: ContactFormValues,
): Promise<void> {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

  if (!formId) {
    throw new Error("FORMSPREE_NOT_CONFIGURED")
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        subject: getSubjectLabel(values.subject),
        message: values.message,
        _subject: `Contato — ${getSubjectLabel(values.subject)}`,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error("SUBMIT_FAILED")
    }
  } finally {
    clearTimeout(timeout)
  }
}
