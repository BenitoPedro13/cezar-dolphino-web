# Chunk 8 — Apoie + newsletter

## Objetivo
Implementar mecanismos simples de monetização e retenção de audiência.

## Resultado esperado
- PIX copiável com feedback instantâneo.
- Botão Ko-fi funcional.
- Links de streaming destacados.
- Captura de e-mail para newsletter pronta para integração.

## Passo a passo
1. Implementar card de apoio via PIX com botão “copiar chave”.
2. Usar `navigator.clipboard` + toast do Sonner para confirmação.
3. Adicionar botão Ko-fi abrindo em nova aba.
4. Adicionar botões/links de plataformas de streaming.
5. Implementar bloco de newsletter:
   - versão MVP: captura visual com handler local
   - fase seguinte: integração Mailchimp/Brevo
6. Criar mensagens de microcopy claras e humanas.

## Critérios de aceite
- Usuário consegue copiar PIX em 1 clique.
- Fluxo de apoio está claro e sem fricção.
- Bloco de newsletter não bloqueia MVP se integração externa não estiver pronta.

## Checklist de validação
- [ ] Testar clipboard em navegadores mobile e desktop.
- [ ] Verificar comportamento de popup-blocker para Ko-fi.
- [ ] Garantir fallback amigável para erro de cópia.

## Riscos comuns
- Dependência de HTTPS para clipboard API.
- Mensagens vagas sem feedback de ação concluída.

## Entregáveis
- Jornada de apoio e retenção funcional.
