# Roadmap do Projeto Financy

Este roadmap detalha as etapas de desenvolvimento do frontend da aplicação Financy, com estimativas de prazos baseadas na complexidade de cada tarefa.

## Etapa 1: Fundação e Autenticação

_Foco em configurar a comunicação com o backend e garantir o acesso seguro do usuário._

- [x] **Configurar Cliente GraphQL e Fluxo de Autenticação** (2 a 3 dias)
  - Configuração do Apollo Client.
  - Implementação das telas de Cadastro e Login seguindo o layout do Figma.
  - Gerenciamento de tokens (JWT) e persistência da sessão do usuário.

## Etapa 2: Gerenciamento de Categorias

_As categorias são essenciais para classificar as transações._

- [ ] **CRUD Completo de Categorias** (1 a 2 dias)
  - **Listagem:** Exibir todas as categorias criadas pelo usuário.
  - **Criação/Edição:** Formulários com validação para novas categorias ou alterações.
  - **Exclusão:** Remover categorias existentes com confirmação.

## Etapa 3: Gerenciamento de Transações

_O núcleo da aplicação, envolvendo maior complexidade de UI e integração de dados._

- [ ] **Listagem de Transações com Filtros** (1 a 2 dias)
  - Implementar a visualização principal de transações.
  - Adicionar filtros por data, tipo ou categoria.
- [ ] **CRUD de Transações com Relacionamento** (2 a 3 dias)
  - Criar, editar e excluir transações.
  - O formulário deve permitir a seleção de uma das categorias criadas na Etapa 2.

## Etapa 4: Segurança e Refinamento

_Garantir que a experiência do usuário seja fluida e segura._

- [ ] **Isolamento de Dados e Permissões no Frontend** (1 dia)
  - Garantir que o usuário visualize e gerencie apenas seus próprios dados.
  - Tratamento de erros de autorização e redirecionamento de usuários deslogados.
- [ ] **Polimento de UI/UX (Figma Check)** (1 a 2 dias)
  - Revisão final para garantir fidelidade total ao layout do Figma.
  - Implementação de feedbacks visuais (loaders, toasts de sucesso/erro).

---

### Observações Técnicas

- **Bundler:** Vite (obrigatório).
- **Consultas:** GraphQL (obrigatório).
- **Framework:** React com TypeScript.
- **Estilização:** Tailwind CSS v4.
- **Padrão:** Seguir fielmente o design proposto no Figma.
