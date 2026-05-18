# Chunk 0 — Fundação visual e setup

## Objetivo
Criar a base técnica e visual do projeto para que os próximos chunks sejam implementação de feature, não configuração.

## Resultado esperado
- Projeto Next.js 14+ com App Router rodando.
- Shadcn inicializado e integrado ao Tailwind.
- Tokens de marca e tipografia aplicados globalmente.
- Estrutura de diretórios alinhada à arquitetura do sistema.

## Entradas necessárias
- Paleta, tipografia e regras visuais do design doc.
- Decisão de stack (Next.js, Shadcn, Tailwind, Zustand, Howler, RHF, Zod).

## Passo a passo
1. Inicializar o projeto com TypeScript e App Router.
2. Configurar Tailwind e validar build CSS.
3. Inicializar Shadcn (`init`) e preparar aliases.
4. Instalar dependências do MVP:
   - `howler`, `zustand`
   - `react-hook-form`, `zod`, `@hookform/resolvers`
   - `lucide-react`, `sonner`
5. Atualizar `src/app/globals.css` com os tokens de marca (`--background`, `--card`, `--primary`, etc.) e `--radius`.
6. Configurar famílias de fonte em `tailwind.config.ts` (display, serif, sans/ui).
7. Criar a estrutura de pastas:
   - `src/components/{ui,sections,player,layout}`
   - `src/lib`
   - `src/data`
   - `public/{audio,images}`

## Critérios de aceite
- App inicia sem erro (`npm run dev`).
- Tema visual já reflete a identidade (cores + fontes).
- Estrutura de pastas existe e está limpa.
- Nenhum warning crítico de configuração.

## Checklist de validação
- [ ] Verificar se classes Shadcn usam os tokens corretamente.
- [ ] Confirmar fallback de fontes.
- [ ] Garantir que não há estilos hardcoded conflitando com tokens.

## Riscos comuns
- Inconsistência entre tokens do `globals.css` e uso semântico do Shadcn.
- Fonte carregando incorretamente por configuração parcial do Next Fonts.

## Entregáveis
- Projeto base funcional.
- Tema de marca aplicado.
- Estrutura pronta para os chunks de feature.
