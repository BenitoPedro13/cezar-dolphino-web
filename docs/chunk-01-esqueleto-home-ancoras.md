# Chunk 1 — Esqueleto da home e navegação por âncoras

## Objetivo
Montar a espinha dorsal da página única do MVP com seções na ordem correta e navegação por âncoras.

## Resultado esperado
- `page.tsx` com todas as seções renderizadas em ordem.
- `Header` e `Footer` presentes.
- Links de navegação levando ao `id` correto em cada seção.

## Passo a passo
1. Criar componentes de layout:
   - `src/components/layout/Header.tsx`
   - `src/components/layout/Footer.tsx`
2. Criar componentes placeholder em `src/components/sections/`:
   - `Hero`, `Music`, `About`, `Influences`, `Shows`, `Support`, `Newsletter`, `Contact`.
3. Em `src/app/page.tsx`, montar a ordem de scroll do MVP.
4. Atribuir `id` nas seções-alvo (`musica`, `sobre`, `shows`, `apoie`, `contato`).
5. Mapear links do Header para `#id`.
6. Garantir offset visual de rolagem se o header for fixo.

## Critérios de aceite
- Clique no menu rola para a seção correta.
- Ordem das seções coincide com o design doc.
- Estrutura navegável mesmo com conteúdo inicial simples.

## Checklist de validação
- [ ] Testar âncoras no desktop e mobile.
- [ ] Confirmar comportamento com refresh em URL com hash.
- [ ] Verificar acessibilidade de navegação por teclado.

## Riscos comuns
- Header fixo cobrindo título da seção ao navegar por hash.
- IDs divergentes entre menu e seção.

## Entregáveis
- Home estruturada e navegável.
- Base pronta para substituir placeholders por seções finais.
