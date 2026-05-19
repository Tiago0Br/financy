# Financy - Backend

Esta é a API GraphQL do projeto **Financy**, um sistema de gerenciamento de finanças pessoais. O backend fornece funcionalidades para autenticação de usuários, gerenciamento de categorias e rastreamento de transações (receitas e despesas) com isolamento de dados por usuário.

## 🚀 Tecnologias

As principais tecnologias utilizadas neste projeto são:

- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework Web:** [Express](https://expressjs.com/) + [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **GraphQL:** [TypeGraphQL](https://typegraphql.com/) (Abordagem code-first)
- **ORM:** [Prisma](https://www.prisma.io/) com SQLite (através do adaptador `better-sqlite3`)
- **Autenticação:** [JWT](https://jwt.io/) & [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validação:** [Zod](https://zod.dev/)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)

## 📁 Estrutura do Projeto

O projeto segue uma arquitetura modular, organizada da seguinte forma:

```text
src/
├── dtos/          # Objetos de Transferência de Dados (Input e Output) para GraphQL
├── errors/        # Classes de erro customizadas e lógica de formatação
├── graphql/       # Contexto e decoradores do GraphQL
├── lib/           # Instâncias de bibliotecas compartilhadas (ex: Prisma Client)
├── middlewares/   # Middlewares do Type-GraphQL (ex: autenticação)
├── models/        # Definições de ObjectTypes do TypeGraphQL (Schema)
├── resolvers/     # Resolvers GraphQL (controladores da API)
├── use-cases/     # Camada de Regras de Negócio e Casos de Uso
├── utils/         # Funções utilitárias (Hash, JWT, etc.)
├── env.ts         # Validação de variáveis de ambiente com Zod
└── server.ts      # Ponto de entrada da aplicação
```

## ⚙️ Pré-requisitos

- Node.js (versão LTS recomendada)
- [pnpm](https://pnpm.io/) (v10.30.2+)

## 🛠️ Como Executar Localmente

1.  **Instalar dependências:**

    ```bash
    pnpm install
    ```

2.  **Configurar variáveis de ambiente:**
    Copie o arquivo `.env.example` para `.env` e preencha as informações necessárias.

    ```bash
    cp .env.example .env
    ```

3.  **Executar migrações do banco de dados:**
    Prepare o banco de dados SQLite local:

    ```bash
    npx prisma migrate dev
    ```

4.  **Iniciar o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    O servidor estará disponível por padrão em `http://localhost:4000/graphql` (ou na porta definida no `.env`).

## 📋 Scripts Disponíveis

- `pnpm dev`: Inicia o servidor com hot-reloading usando `tsx`.
- `pnpm lint`: Executa a verificação e correção automática de estilo de código com o Biome.
- `pnpm check-types`: Executa a verificação de tipos do TypeScript.

## 🔐 Variáveis de Ambiente

As seguintes variáveis devem ser configuradas no arquivo `.env`:

| Variável                    | Descrição                                   | Exemplo                 |
| :-------------------------- | :------------------------------------------ | :---------------------- |
| `NODE_ENV`                  | Ambiente da aplicação                       | `development`           |
| `PORT`                      | Porta onde o servidor será executado        | `4000`                  |
| `DATABASE_URL`              | URL de conexão do Prisma (SQLite)           | `file:./dev.db`         |
| `JWT_SECRET`                | Chave secreta para assinatura de tokens JWT | `sua_chave_secreta`     |
| `TOKEN_EXPIRES_IN`          | Tempo de expiração do token de acesso       | `1d`                    |
| `REFREASH_TOKEN_EXPIRES_IN` | Tempo de expiração do refresh token         | `7d`                    |
| `FRONTEND_URL`              | URL do frontend para configuração de CORS   | `http://localhost:5173` |
