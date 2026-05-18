# Chunk 3 — Camada de dados tipados

## Objetivo
Centralizar conteúdo em arquivos tipados para evitar hardcode em componentes e facilitar migração futura para CMS.

## Resultado esperado
- Tipos canônicos criados em `src/lib/types.ts`.
- Conteúdo inicial em `src/data/*.ts`.
- Helpers utilitários para formatação básica.

## Passo a passo
1. Criar interfaces:
   - `Track`
   - `Show`
   - `SiteConfig`
2. Criar `src/data/tracks.ts` com lista inicial de faixas.
3. Criar `src/data/shows.ts` com agenda inicial e status.
4. Criar `src/data/site-config.ts` com links sociais, PIX, tagline e bios.
5. Criar utilitários em `src/lib/utils.ts`:
   - `formatDuration`
   - `formatShowDate`
6. Atualizar seções para consumir dados desses arquivos.

## Critérios de aceite
- Componentes exibem dados vindos de `src/data`.
- TypeScript acusa erro quando shape de conteúdo está inválido.
- Nenhum conteúdo essencial fica hardcoded no JSX.

## Checklist de validação
- [ ] Testar lista vazia de shows.
- [ ] Testar track sem link opcional de streaming.
- [ ] Conferir formatação de data e duração.

## Riscos comuns
- Divergência entre tipos e uso real nos componentes.
- Dependência implícita de campos opcionais sem fallback.

## Entregáveis
- Camada de conteúdo tipada e sustentável.
