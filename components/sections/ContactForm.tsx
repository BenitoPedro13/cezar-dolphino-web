"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  contactFormSchema,
  contactSubjects,
  submitContactForm,
  type ContactFormValues,
} from "@/lib/contact-form"

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "show",
  message: "",
}

export function ContactForm() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await submitContactForm(value)
        toast.success("Mensagem enviada!", {
          description: "Respondemos em até 3 dias úteis.",
        })
        form.reset()
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "FORMSPREE_NOT_CONFIGURED"
        ) {
          toast.error("Formulário em configuração", {
            description:
              "Defina NEXT_PUBLIC_FORMSPREE_ID no ambiente para ativar o envio.",
          })
          return
        }
        toast.error("Algo deu errado.", {
          description: "Tente novamente ou use o email direto abaixo.",
        })
      }
    },
  })

  return (
    <div>
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        (01) Send a message
      </p>
      <h3 className="mt-3 font-display text-2xl font-medium leading-[0.95] tracking-[-0.02em] text-foreground sm:text-3xl">
        Envie uma mensagem
      </h3>
      <p className="mt-2 font-sans text-sm text-muted-foreground">
        Para shows, parcerias e imprensa. Campos marcados são obrigatórios.
      </p>
      <div className="mt-6">
        <form
          id="contact-form"
          onSubmit={(event) => {
            event.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="contact-name">Nome</FieldLabel>
                    <Input
                      id="contact-name"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="name"
                      placeholder="Seu nome"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                    <Input
                      id="contact-email"
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      placeholder="seu@email.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="subject">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="contact-subject">Assunto</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value as ContactFormValues["subject"])
                      }
                    >
                      <SelectTrigger
                        id="contact-subject"
                        aria-invalid={isInvalid}
                        className="w-full"
                      >
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger>
                        {contactSubjects.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            <form.Field name="message">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="contact-message">Mensagem</FieldLabel>
                    <Textarea
                      id="contact-message"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      placeholder="Conte um pouco sobre o projeto, data, local..."
                      rows={6}
                      className="min-h-32 resize-y"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>
          </FieldGroup>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              type="submit"
              form="contact-form"
              disabled={form.state.isSubmitting}
              className="h-11 rounded-full bg-foreground px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-background hover:bg-foreground/90"
            >
              {form.state.isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={form.state.isSubmitting}
              onClick={() => form.reset()}
              className="h-11 rounded-full border-border bg-transparent px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em]"
            >
              Limpar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
