# Roadmap do Projeto Financy

Este documento descreve as etapas de desenvolvimento do backend do Financy, com estimativas de prazos baseadas na complexidade técnica de cada tarefa.

## Etapa 1: Autenticação e Gestão de Usuários
**Estimativa: 3 a 4 dias**

- [X] **Implementar Registro de Usuários**: Criar resolver para cadastro de novos usuários com criptografia de senha (bcrypt) e validação de dados. (1 dia)
- [X] **Implementar Fluxo de Login**: Desenvolver a lógica de autenticação e geração de tokens JWT para sessões seguras. (1 dia)
- [ ] **Integração de Contexto**: Configurar o Apollo Server para extrair o usuário do token JWT e disponibilizá-lo no `context` de todos os resolvers. (1 a 2 dias)

## Etapa 2: Gestão de Categorias
**Estimativa: 2 a 3 dias**

- [ ] **Modelagem de Dados**: Criar o modelo `Category` no Prisma com relacionamento com o `User`. (0.5 dia)
- [ ] **CRUD de Categorias**: Implementar as operações de criação, edição, exclusão e listagem de categorias. (1.5 a 2 dias)
- [ ] **Isolamento de Categorias**: Garantir que um usuário não consiga ver ou modificar categorias criadas por outros usuários. (0.5 dia)

## Etapa 3: Gestão de Transações
**Estimativa: 3 a 5 dias**

- [ ] **Modelagem de Transações**: Criar o modelo `Transaction` vinculado a um `User` e a uma `Category`. (1 dia)
- [ ] **CRUD de Transações**: Implementar resolvers para criar, editar, excluir e listar transações. (2 dias)
- [ ] **Filtros e Listagem Avançada**: Adicionar filtros por data, categoria e tipo (receita/despesa) na listagem de transações. (1 a 2 dias)

## Etapa 4: Segurança e Refinamento
**Estimativa: 2 a 3 dias**

- [ ] **Validação de Inputs**: Integrar Zod em todos os DTOs de entrada para garantir a integridade dos dados enviados pelo frontend. (1 dia)
- [ ] **Isolamento Global de Dados**: Revisão de segurança para garantir que todas as queries e mutations filtrem dados pelo `userId` do contexto. (1 dia)
- [ ] **Tratamento de Erros**: Padronizar as mensagens de erro do GraphQL para facilitar o consumo pela interface. (1 dia)
