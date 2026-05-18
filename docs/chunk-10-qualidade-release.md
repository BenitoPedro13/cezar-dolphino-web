# Chunk 10 — Qualidade, analytics e release

## Objetivo
Preparar o MVP para produção com qualidade visual/técnica, medição de uso e deploy confiável.

## Resultado esperado
- Site responsivo, acessível e performático.
- Analytics básico ativo (Plausible).
- Deploy em Vercel com ambiente configurado.

## Passo a passo
1. Fazer revisão de responsividade completa (`sm`, `md`, `lg`).
2. Revisar acessibilidade:
   - labels, foco visível, contraste, navegação por teclado
3. Configurar SEO base:
   - `metadata` global
   - `og-image`
   - `robots.txt`
4. Inserir script Plausible em `layout.tsx` com `afterInteractive`.
5. Configurar variáveis de ambiente:
   - `NEXT_PUBLIC_FORMSPREE_ID`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
   - `NEXT_PUBLIC_KOFI_USERNAME`
6. Publicar em Vercel e validar fluxo de preview/produção.
7. Criar checklist de smoke test pós-deploy.

## Critérios de aceite
- Lighthouse próximo da meta do projeto (principalmente Performance e Best Practices).
- Sem regressão crítica visual/funcional em mobile.
- Eventos básicos de tráfego coletados no analytics.

## Checklist de validação
- [ ] Rodar validação final de links externos.
- [ ] Confirmar funcionamento do player em produção.
- [ ] Testar formulário e copiar PIX no ambiente publicado.

## Riscos comuns
- Variável de ambiente ausente no deploy.
- Mudanças de última hora quebrando consistência visual.

## Entregáveis
- MVP publicado e monitorável.
