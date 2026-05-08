# Financy - Frontend

O **Financy** é uma aplicação de gerenciamento de finanças pessoais. Este repositório contém a implementação do frontend, desenvolvida com tecnologias modernas focadas em performance, tipagem forte e excelente experiência de desenvolvimento.

## 🚀 Tecnologias

As principais tecnologias utilizadas no projeto são:

- **React 19**: Biblioteca para construção de interfaces.
- **TypeScript**: Superset JavaScript para tipagem estática.
- **Vite 8**: Ferramenta de build extremamente rápida.
- **Apollo Client**: Gerenciamento de estado e consultas GraphQL.
- **TanStack Router**: Roteamento baseado em arquivos com segurança de tipos (Type-safe).
- **Tailwind CSS v4**: Framework CSS utilitário para estilização.
- **Zustand**: Gerenciamento de estado global simplificado.
- **React Hook Form + Zod**: Gerenciamento de formulários e validação de esquemas.
- **Biome**: Linter e formatador de código rápido e integrado.
- **Lucide React**: Biblioteca de ícones.

## 📁 Estrutura do Projeto

A estrutura segue um padrão modular aproveitando o sistema de rotas do TanStack Router:

```text
src/
├── components/       # Componentes de UI e layout reutilizáveis
│   ├── layout/       # Componentes de estrutura (header, etc.)
│   └── ui/           # Componentes base (botões, inputs, modais)
├── lib/
│   └── graphql/      # Configuração do Apollo, queries e mutations
├── pages/            # Definições de rotas e componentes de página
│   ├── _auth/        # Rotas públicas (login, registro)
│   └── _protected/   # Rotas que exigem autenticação (dashboard, transações)
├── store/            # Gerenciamento de estado global (Zustand)
├── utils/            # Funções utilitárias, esquemas e constantes
├── main.tsx          # Ponto de entrada da aplicação
└── route-tree.gen.ts # Árvore de rotas gerada automaticamente
```

## 🛠️ Como Executar Localmente

### Pré-requisitos

- **Node.js** (recomenda-se versão LTS)
- **pnpm** (gerenciador de pacotes utilizado)

### Passos para Instalação

1. Clone o repositório.
2. Na raíz da pasta `frontend`, instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`.
   - Ajuste a URL da API GraphQL conforme necessário.
4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
5. Acesse `http://localhost:5173` no seu navegador.

### Outros Comandos Úteis

- `pnpm build`: Gera a versão de produção otimizada.
- `pnpm lint`: Executa o Biome para verificar e corrigir problemas de linting e formatação.
- `pnpm preview`: Visualiza o build de produção localmente.

## 📝 Convenções de Desenvolvimento

- **Estilização**: Priorize classes utilitárias do Tailwind CSS.
- **Rotas**: Novas páginas devem ser criadas dentro de `src/pages/`. O TanStack Router atualizará `route-tree.gen.ts` automaticamente.
- **Código**: O Biome é utilizado para manter a consistência do código. Não é necessário configurar o Prettier ou ESLint separadamente.
  - Recuo de 2 espaços.
  - Sem ponto e vírgula (sempre que possível).
  - Aspas simples para strings, duplas para JSX.
