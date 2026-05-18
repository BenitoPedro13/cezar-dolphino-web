"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <Card className="mt-8 border-border/80 bg-card/60">
      <CardHeader>
        <CardTitle className="font-display text-2xl italic">
          Envie uma mensagem
        </CardTitle>
        <CardDescription>
          Para shows, parcerias e imprensa. Campos marcados são obrigatórios.
        </CardDescription>
      </CardHeader>
      <CardContent>
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

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="submit"
              form="contact-form"
              disabled={form.state.isSubmitting}
            >
              {form.state.isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={form.state.isSubmitting}
              onClick={() => form.reset()}
            >
              Limpar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
