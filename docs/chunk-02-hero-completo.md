# Chunk 2 — Hero completo

## Objetivo
Entregar a primeira dobra com identidade forte, clareza de proposta artística e CTAs para conversão inicial.

## Resultado esperado
- Hero full-screen com fundo (vídeo/foto), overlay de grain e tipografia correta.
- CTAs principais funcionando.
- Links sociais visíveis e coerentes com a marca.

## Passo a passo
1. Implementar `Hero.tsx` como RSC (sem JS desnecessário).
2. Adicionar mídia de fundo:
   - vídeo curto com `poster` para fallback mobile
   - ou imagem otimizada com `next/image`
3. Inserir nome do artista + tagline.
4. Adicionar CTA primário (para `#musica`) e secundário (para `#shows`).
5. Inserir ícones sociais (`lucide-react`) com links externos.
6. Aplicar animação suave no indicador de scroll.
7. Ajustar responsividade e contraste de texto.

## Critérios de aceite
- Hero comunica imediatamente artista + estilo.
- CTAs funcionam e direcionam corretamente.
- Se fundo em vídeo falhar, fallback visual mantém qualidade.

## Checklist de validação
- [ ] Testar legibilidade em telas pequenas.
- [ ] Validar performance de carregamento da mídia hero.
- [ ] Confirmar foco/hover acessível nos botões.

## Riscos comuns
- Vídeo pesado degradando LCP.
- Overlay excessivo prejudicando leitura.

## Entregáveis
- Hero final do MVP, pronto para produção.
