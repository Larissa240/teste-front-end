# Teste Front-End Econverse

Página desenvolvida com React, TypeScript e Sass, com base no layout do Figma. A vitrine carrega os produtos do JSON da Econverse e exibe os detalhes do produto selecionado em um modal.

## Tecnologias

- React e TypeScript
- Vite
- Sass
- Vitest e Testing Library

Não foram utilizadas bibliotecas de interface.

## Requisitos

- Node.js 24.x, versão utilizada na validação do projeto
- npm
- Conexão com a internet para carregar produtos, imagens e fontes

## Como executar

Na pasta do projeto:

```bash
npm ci
npm run dev
```

Abra o endereço informado no terminal, normalmente http://localhost:5173.

## Compilação

```bash
npm run build
```

Os arquivos compilados ficam na pasta `dist`. Para conferir essa versão localmente:

```bash
npm run preview
```

## Testes

```bash
npm test
```

O projeto possui sete testes que verificam o carregamento e a validação dos produtos, tratamento de erros, nova tentativa de consulta, abertura e fechamento do modal e controle de quantidade.

Após a atualização para Vitest 5.0.5, os sete testes e a compilação passaram. A auditoria realizada com npm não apontou vulnerabilidades naquele momento.

## Funcionalidades

- Vitrines com produtos carregados do JSON.
- Busca por nome na primeira vitrine.
- Carrossel com setas e rolagem por toque.
- Modal com imagem, nome, descrição, preço e quantidade.
- Fechamento do modal pelo botão, pela tecla Esc ou ao clicar fora.
- Estados de carregamento, erro e lista vazia.
- Layout adaptado para desktop e celular.
- Validação local do formulário de newsletter.

## Organização

```text
src/
  components/   Componentes da página, vitrine e modal
  services/     Consulta dos produtos e formatação de preços
  types/        Tipos dos dados
  styles/       Estilos Sass e ajustes responsivos
public/
  assets/       Imagens utilizadas na página
tests/          Testes automatizados
```

## Decisões de implementação

**Consulta dos produtos:** a aplicação usa a rota local `/api/products`. O proxy configurado no Vite encaminha a consulta ao JSON da Econverse para resolver a restrição de CORS do servidor de origem. Isso funciona com `npm run dev` e `npm run preview`. Para publicar em uma hospedagem, é necessário configurar uma rota de servidor ou proxy equivalente; os arquivos de `dist` sozinhos não fornecem essa rota.

**Preços:** o campo `price` é tratado como valor em reais, pois o enunciado não especifica centavos. Os valores recebidos são preservados, inclusive os mais altos. O parcelamento é calculado em duas vezes. O preço anterior riscado não foi incluído, porque esse dado não existe no JSON.

**Categorias:** o JSON fornecido contém apenas celulares e não possui campo de categoria. As demais categorias mostram uma mensagem de lista vazia.

**Imagens:** no desktop, banner e parceiros usam recortes das exportações do layout, com textos incorporados. No celular, essas seções usam recortes de áreas sem texto, com títulos e botões em HTML.

**Ações demonstrativas:** a compra não processa pagamentos e a newsletter não envia dados. Os ícones de conta, favoritos e carrinho são ilustrativos.

**Acessibilidade e SEO:** uso de HTML semântico, idioma pt-BR, título e descrição da página, textos alternativos nas imagens e navegação por teclado. O modal usa o elemento nativo `dialog`.

