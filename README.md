# Clerileide Concept

Landing page responsiva para a Clerileide Concept, criada para posicionamento
premium e conversão direta em agendamentos pelo WhatsApp.

## Estrutura

- Visual premium escuro com detalhes dourados
- Hero editorial em slides para mechas, ruivos, escovas e hidratação
- Barra de diferenciais logo abaixo do hero
- Vitrine de assinaturas animada pela rolagem: anel de luz dourado, modelos recortadas e textos revelados letra a letra (versão estática para quem prefere menos movimento)
- Tratamentos assinatura em cards com foto e seleção para a sacola
- Vitrine de produtos por necessidade capilar
- Sacola persistente com quantidades e finalização pelo WhatsApp
- Galeria de resultados reais em formato antes e depois, com fotos autorizadas
- Layout responsivo para desktop e celular
- Experiência de atendimento em três etapas
- Apresentação da especialista e reconhecimento Star Pro 2024
- Perguntas frequentes
- Formulário de agendamento (nome e procedimento) que envia o pedido pelo WhatsApp
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

## Segurança

O `index.html` traz uma política de segurança de conteúdo (CSP) na tag
`<meta http-equiv="Content-Security-Policy">`. Ela só permite scripts do próprio
site, fontes do Google Fonts e imagens locais. Ao incluir um serviço externo
(por exemplo, um mapa, pixel ou script de análise), adicione o domínio dele na
política. Se o pequeno script em linha do `<head>` mudar, atualize o hash
`sha256-...` correspondente.
