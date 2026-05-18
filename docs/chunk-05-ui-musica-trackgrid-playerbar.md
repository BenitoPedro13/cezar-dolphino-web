# Chunk 5 — UI de música (TrackGrid + PlayerBar)

## Objetivo
Entregar a experiência musical completa no front: descobrir faixa, filtrar, reproduzir e controlar áudio.

## Resultado esperado
- Grid de faixas com destaque da música featured.
- Filtros por categoria com Tabs.
- Barra de player fixa e totalmente funcional.

## Passo a passo
1. Criar `TrackCard.tsx` com capa, título, metadados e botão play.
2. Criar `TrackGrid.tsx` com:
   - destaque `featured`
   - lista restante em grid
   - filtro `Todos / Originais / Covers / Ao Vivo`
3. Criar `PlayerControls.tsx` para play/pause/next/prev.
4. Implementar `PlayerBar.tsx` com:
   - info da faixa atual
   - slider de progresso
   - slider de volume
   - controles principais
5. Integrar cliques do grid com store (`loadTrack`) e fila.
6. Ajustar comportamento de esconder/mostrar barra quando nenhuma faixa foi carregada.

## Critérios de aceite
- Clique em qualquer faixa inicia reprodução imediatamente.
- Barra reflete sempre a faixa ativa.
- Filtro não quebra fila nem navegação de next/prev.

## Checklist de validação
- [ ] Testar no mobile (barra fixa sem sobrepor conteúdo crítico).
- [ ] Confirmar estados de loading/disabled quando necessário.
- [ ] Validar foco de teclado nos controles.

## Riscos comuns
- Filtro reconstruindo fila de forma inesperada.
- Slider com jitter por atualização de progresso em alta frequência.

## Entregáveis
- Seção de música end-to-end funcional.
