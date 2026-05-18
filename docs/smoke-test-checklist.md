# Smoke test pós-deploy

Use este checklist após publicar na Vercel (preview e produção).

## Ambiente

- [ ] `NEXT_PUBLIC_SITE_URL` aponta para o domínio correto
- [ ] `NEXT_PUBLIC_FORMSPREE_ID` configurado (contato)
- [ ] `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` configurado (analytics)
- [ ] `NEXT_PUBLIC_KOFI_USERNAME` opcional (fallback em `site-config`)

## Navegação e layout

- [ ] Home carrega sem erro no console
- [ ] Header fixo e âncoras (`#musica`, `#sobre`, etc.) funcionam
- [ ] Skip link “Pular para o conteudo” visível ao focar com Tab
- [ ] Layout ok em mobile (375px) e desktop (1280px+)

## Player

- [ ] Reproduzir faixa em `/audio/colors-cover.mp3`
- [ ] Play/pause, seek, volume e skip funcionam
- [ ] Barra do player não cobre CTAs críticos no mobile

## Apoie e contato

- [ ] Copiar chave PIX exibe toast de sucesso
- [ ] Link Ko-fi abre em nova aba
- [ ] Formulário de contato envia (Formspree) ou exibe erro claro
- [ ] Newsletter MVP valida e exibe feedback

## SEO e meta

- [ ] `/robots.txt` e `/sitemap.xml` acessíveis
- [ ] Preview Open Graph (WhatsApp, Twitter, LinkedIn) mostra título e imagem
- [ ] `metadataBase` e URL canônica corretos

## Links externos

- [ ] SoundCloud, Instagram, YouTube, Spotify, TikTok abrem corretamente

## Analytics

- [ ] Visitas aparecem no dashboard Plausible (pode levar alguns minutos)
