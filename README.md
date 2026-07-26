# Clerileide Concept

Landing page responsiva para a Clerileide Concept, criada para posicionamento
premium e conversão direta em agendamentos pelo WhatsApp.

## Estrutura

- Hero editorial com proposta de valor
- Tratamentos assinatura com seleção para a sacola
- Vitrine de produtos por necessidade capilar
- Sacola persistente com quantidades e finalização pelo WhatsApp
- Galeria de resultados reais em formato antes e depois, com fotos autorizadas
- Experiência de atendimento em três etapas
- Apresentação da especialista e reconhecimento Star Pro 2024
- Perguntas frequentes
- CTA e links diretos para WhatsApp e Instagram

## Configuração rápida

O número do WhatsApp fica centralizado no objeto `CONFIG`, no início do arquivo
`script.js`. Atualize `whatsappNumber` somente com números, incluindo o código do
país e o DDD.

## Desenvolvimento local

O site é estático e não exige build:

```bash
python3 -m http.server 4173
```

Depois, acesse `http://localhost:4173`.

## Publicação

O projeto é compatível com GitHub Pages. Em **Settings > Pages**, selecione
**Deploy from a branch**, escolha `main` e a pasta `/ (root)`.
