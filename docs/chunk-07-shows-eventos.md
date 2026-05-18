# Chunk 7 — Shows e eventos

## Objetivo
Passar credibilidade para contratantes e fãs, com agenda clara e estados de disponibilidade.

## Resultado esperado
- Lista de shows futuros com status e CTA de ingresso quando houver.
- Histórico de shows passados em seção colapsável.
- Estado vazio elegante quando não houver agenda ativa.

## Passo a passo
1. Implementar listagem principal com `Card`.
2. Mapear status visual (`upcoming`, `sold-out`, `tba`, `past`) com badge/label.
3. Adicionar botão de ingresso condicional (`ticketUrl`) ou fallback “Em breve”.
4. Criar bloco colapsável para shows passados.
5. Adicionar CTA para produtores apontando para `#contato`.
6. Implementar estado vazio com `Alert`.

## Critérios de aceite
- Usuário entende rapidamente onde e quando são os próximos shows.
- Se não houver shows, seção continua útil e não parece quebrada.
- Dados aceitam atualização manual simples por arquivo.

## Checklist de validação
- [ ] Testar datas em ordem correta.
- [ ] Testar links de ingressos válidos e inválidos.
- [ ] Testar cenários: só past, só upcoming, lista vazia.

## Riscos comuns
- Timezone alterando dia exibido de forma incorreta.
- Misturar semântica de status e estado visual.

## Entregáveis
- Seção de shows pronta para uso real.
