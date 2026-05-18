# Chunk 9 — Contato e booking

## Objetivo
Fechar o funil profissional do site com formulário validado, entrega por e-mail e fallback de contato.

## Resultado esperado
- Formulário com validação client-side robusta.
- Envio real para Formspree.
- Mensagens de sucesso/erro consistentes.

## Passo a passo
1. Criar esquema `zod` para os campos:
   - nome, e-mail, assunto, mensagem
2. Implementar formulário com componentes Shadcn + `react-hook-form`.
3. Conectar endpoint Formspree (`/f/{FORM_ID}`) com `fetch` POST.
4. Tratar estados:
   - loading
   - sucesso
   - erro de rede/API
5. Exibir toasts de feedback e limpar formulário após sucesso.
6. Adicionar e-mail textual de fallback e SLA de resposta.

## Critérios de aceite
- Validação impede envio de formulário inválido.
- Envio válido chega na caixa de entrada configurada.
- Usuário recebe feedback imediato sobre o resultado.

## Checklist de validação
- [ ] Testar todos os erros de validação.
- [ ] Testar envio com sucesso e erro 4xx/5xx.
- [ ] Validar acessibilidade de labels e mensagens.

## Riscos comuns
- Esquema zod inconsistente com campos UI.
- Falta de tratamento de timeout/rede intermitente.

## Entregáveis
- Canal profissional de contato operacional.
