# Chunk 4 — Player state + engine

## Objetivo
Construir a base técnica do player com estado global previsível e motor de áudio isolado do ciclo de render do React.

## Resultado esperado
- Store global de player com Zustand.
- Engine singleton de áudio com Howler.
- Fluxo de reprodução funcional com fila.

## Passo a passo
1. Implementar `src/lib/player-store.ts` com:
   - estado: faixa atual, fila, índice, progresso, duração, volume, status
   - ações: `loadTrack`, `togglePlay`, `seek`, `setVolume`, `playNext`, `playPrev`
2. Implementar `src/lib/howler-engine.ts` como singleton:
   - `load`, `togglePlay`, `seek`, `setVolume`
   - callbacks de `onload`, `onplay`, `onpause`, `onend`
3. Garantir atualização periódica de progresso sem leak (interval cleanup).
4. Integrar `onEnd` com `playNext`.
5. Definir comportamento para troca rápida de faixa (unload seguro).

## Critérios de aceite
- Player toca, pausa, avança e retrocede corretamente.
- Progress e duration atualizam sem travamento.
- Troca de track não cria múltiplos áudios tocando ao mesmo tempo.

## Checklist de validação
- [ ] Testar sequência de 3+ músicas.
- [ ] Testar seek durante reprodução e pausado.
- [ ] Testar mudança de volume e persistência em sessão.

## Riscos comuns
- Intervalos não limpos gerando consumo de CPU.
- Estado da store dessincronizado com estado real do Howler.

## Entregáveis
- Núcleo de áudio pronto para UI final.
