# Financy

O **Financy** é um sistema de gerenciamento de finanças pessoais completo, composto por uma API GraphQL (Backend) e uma aplicação web moderna (Frontend). O projeto permite que os usuários controlem suas receitas e despesas, gerenciem categorias personalizadas e visualizem resumos financeiros de forma intuitiva e segura.

Este projeto foi desenvolvido como avaliação da fase final da minha pós-graduação em **Desenvolvimento Fullstack e IA** na **Faculdade de Tecnologia Rocketseat**.

---

## 🚀 Tecnologias

O projeto utiliza uma stack moderna baseada em TypeScript para garantir segurança de tipos e alta performance em ambas as pontas.

### Backend

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express + Apollo Server (GraphQL)
- **Linguagem:** TypeScript
- **ORM:** Prisma com SQLite
- **Autenticação:** JWT & Bcryptjs
- **Validação:** Zod

### Frontend

- **Framework:** React 19
- **Build Tool:** Vite 8
- **Roteamento:** TanStack Router (Type-safe)
- **Estado & Dados:** Apollo Client & Zustand
- **Estilização:** Tailwind CSS v4
- **Formulários:** React Hook Form + Zod

---

## 📁 Estrutura do Repositório

O projeto está organizado em um monorepo, com a seguinte estrutura:

```text
financy/
├── backend/                  # API GraphQL, Banco de Dados e Regras de Negócio
│   └── src/
│       ├── dtos/             # Objetos de Transferência de Dados (Input/Output)
│       ├── graphql/          # Contexto e decoradores do GraphQL
│       ├── lib/              # Instâncias de bibliotecas (Prisma Client)
│       ├── middlewares/      # Middlewares do Express (Autenticação)
│       ├── models/           # Definições de ObjectTypes (Schema)
│       ├── resolvers/        # Resolvers GraphQL (Controladores)
│       ├── services/         # Regras de Negócio e Integração com Banco
│       ├── utils/            # Funções utilitárias (Hash, JWT)
│       └── server.ts         # Ponto de entrada da aplicação
└── frontend/                 # Interface do Usuário e Consumo da API
    └── src/
        ├── components/       # Componentes de UI e layout reutilizáveis
        │   ├── layout/       # Componentes de estrutura (Header, etc.)
        │   └── ui/           # Componentes base (Botões, Inputs, Modais)
        ├── lib/graphql/      # Configuração do Apollo, Queries e Mutations
        ├── pages/            # Definições de rotas e componentes de página
        │   ├── _auth/        # Rotas públicas (Login, Registro)
        │   └── _protected/   # Rotas autenticadas (Dashboard, Transações)
        ├── store/            # Gerenciamento de estado global (Zustand)
        ├── utils/            # Funções utilitárias, esquemas e constantes
        └── main.tsx          # Ponto de entrada da aplicação
```

---

## ⚙️ Pré-requisitos

Para rodar o projeto localmente, você precisará de:

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [pnpm](https://pnpm.io/) (gerenciador de pacotes utilizado no projeto)

---

## 🛠️ Como Executar

### 1. Configuração do Backend

Entre na pasta do backend e instale as dependências:

```bash
cd backend
pnpm install
```

Configure o arquivo `.env` baseado no `.env.example`, execute as migrações do banco de dados e inicie o servidor:

```bash
npx prisma migrate dev
pnpm dev
```

O servidor estará disponível em `http://localhost:4000/graphql`.

### 2. Configuração do Frontend

Em um novo terminal, entre na pasta do frontend e instale as dependências:

```bash
cd frontend
pnpm install
```

Configure o arquivo `.env` (apontando para a URL do backend) e inicie a aplicação:

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 📋 Principais Funcionalidades

- **Autenticação completa:** Registro e Login com persistência de sessão via JWT.
- **Gestão de Transações:** CRUD completo de receitas e despesas.
- **Gestão de Categorias:** Organização personalizada de gastos.
- **Dashboard:** Resumo financeiro com cards de totais e tabelas de transações recentes.
- **Isolamento de Dados:** Cada usuário visualiza e gerencia apenas seus próprios dados.

---

Desenvolvido por **Tiago Lopes**.
