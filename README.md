# deppi-extension-api

API backend para a extensão **Deppi**, construída com Node.js, TypeScript, Express e PostgreSQL.

---

## Tecnologias

- **[Node.js](https://nodejs.org/)** + **[TypeScript](https://www.typescriptlang.org/)** — linguagem e runtime (ESModules)
- **[Express 5](https://expressjs.com/)** — framework HTTP
- **[Prisma 7](https://www.prisma.io/)** — ORM com suporte a migrations, seed e type-safety
- **[PostgreSQL 15](https://www.postgresql.org/)** — banco de dados relacional
- **[Zod 4](https://zod.dev/)** — validação de dados e schemas
- **[JWT](https://jwt.io/)** — autenticação via tokens
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** — hash de senhas
- **[dotenv](https://github.com/motdotla/dotenv)** — gerenciamento de variáveis de ambiente
- **[Docker](https://www.docker.com/)** — ambiente de banco de dados em container

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/) e Docker Compose

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DiegoDMatos/deppi-extension-api.git
cd deppi-extension-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
DATABASE_URL="postgresql://deppi_extension_user:deppi_extension_password@localhost:5432/deppi_extension_db"
JWT_SECRET="sua_chave_secreta_aqui"
```

### 4. Suba o banco de dados com Docker

```bash
docker compose up -d
```

### 5. Gere o cliente Prisma e execute as migrations

```bash
npx prisma generate
```

> Este comando gera o cliente Prisma e aplica as migrations. O seed (`prisma/seed.ts`) é executado automaticamente após as migrations.

### 6. Inicie o servidor em modo de desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.

---

## 📁 Estrutura do Projeto

```
deppi-extension-api/
├── src/
│   ├── app.ts                    # Configuração do Express e registro de rotas
│   ├── server.ts                 # Ponto de entrada — inicia o servidor
│   ├── @types/express/           # Extensão de tipos do Express
│   ├── constants/                # Constantes da aplicação (ex: status de matrícula)
│   ├── controllers/              # Lógica dos endpoints
│   ├── lib/                      # Instância do Prisma
│   ├── middlewares/              # Autenticação e controle de permissões
│   ├── model/                    # DTOs e modelos de entrada
│   ├── routes/                   # Definição das rotas
│   └── services/                 # Regras de negócio
├── prisma/
│   ├── schema.prisma             # Definição dos modelos
│   ├── migrations/               # Histórico de migrations
│   └── seed.ts                   # Script de seed do banco
├── docker-compose.yml
├── prisma.config.ts
├── tsconfig.json
└── package.json
```

---

## Banco de Dados

O projeto utiliza **PostgreSQL 15** via Docker. As credenciais padrão para desenvolvimento estão definidas no `docker-compose.yml`:

| Campo    | Valor                      |
|----------|----------------------------|
| Host     | `localhost`                |
| Porta    | `5432`                     |
| Banco    | `deppi_extension_db`       |
| Usuário  | `deppi_extension_user`     |
| Senha    | `deppi_extension_password` |

Para visualizar o banco de dados com a interface do Prisma:

```bash
npx prisma studio
```

---

## Scripts disponíveis

| Comando                     | Descrição                                              |
|-----------------------------|--------------------------------------------------------|
| `npm run dev`               | Inicia o servidor com hot reload via `tsx watch`       |
| `npx prisma generate` | Gera o cliente Prisma e executa as migrations com seed |

---

## Autenticação

A API utiliza **JWT (JSON Web Tokens)**. Endpoints protegidos exigem o token no header:

```
Authorization: Bearer <seu_token>
```

As senhas são armazenadas com hash seguro via **bcryptjs**.

---

## Rotas da API

Base URL: `http://localhost:3333`

> 🔒 = requer JWT | 🔑 = requer permissão específica

### Auth — `/auth`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/auth/register` | Cadastro de estudante | Pública |
| `POST` | `/auth/login` | Login e geração de token JWT | Pública |
| `GET`  | `/auth/me` | Retorna dados do usuário logado | 🔒 JWT |
| `POST` | `/auth/admin/servidores` | Cadastro de servidor DEPPI (admin) | 🔒 `MANAGE_ROLES` |
| `POST` | `/auth/deppi/servidores` | Cadastro de professor | 🔒 `DEPPI_ROLES` |

### Courses — `/courses`

| Método   | Rota | Descrição | Acesso |
|----------|------|-----------|--------|
| `POST`   | `/courses` | Criar curso | 🔑 `CREATE_COURSES` |
| `GET`    | `/courses` | Listar cursos | 🔑 `VIEW_COURSES` |
| `PUT`    | `/courses/:id` | Atualizar curso | 🔑 `UPDATE_COURSES` |
| `DELETE` | `/courses/:id` | Remover curso | 🔑 `DELETE_COURSES` |

### Enrollments — `/enrollments`

| Método  | Rota | Descrição | Acesso |
|---------|------|-----------|--------|
| `POST`  | `/enrollments` | Realizar matrícula | 🔒 JWT |
| `GET`   | `/enrollments/me` | Listar minhas matrículas | 🔒 JWT |
| `PATCH` | `/enrollments/:enrollmentId/status` | Atualizar status da matrícula | 🔒 JWT |
| `GET`   | `/enrollments/:enrollmentId/history` | Histórico de uma matrícula | 🔒 JWT |
| `GET`   | `/enrollments/course/:courseId` | Listar matrículas de um curso | 🔒 JWT |
| `PATCH` | `/enrollments/:enrollmentId/approve` | Aprovar matrícula | 🔑 `enrollment.approve` |
| `PATCH` | `/enrollments/:enrollmentId/reject` | Rejeitar matrícula | 🔑 `enrollment.reject` |
| `PATCH` | `/enrollments/:enrollmentId/cancel` | Cancelar matrícula | 🔑 `enrollment.cancel` |

### Roles — `/roles`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/roles` | Criar role | 🔑 `MANAGE_ROLES` |
| `GET`  | `/roles` | Listar roles | 🔑 `MANAGE_ROLES` |
| `POST` | `/roles/:roleId/permissions/:permissionId` | Adicionar permissão a uma role | 🔑 `MANAGE_ROLES` |
| `POST` | `/users/:userId/roles/:roleId` | Atribuir role a um usuário | 🔑 `MANAGE_USERS` |

### Permissions — `/permissions`

| Método | Rota | Descrição | Acesso |
|--------|------|-----------|--------|
| `POST` | `/permissions` | Criar permissão | 🔑 `MANAGE_PERMISSIONS` |
| `GET`  | `/permissions` | Listar permissões | 🔑 `VIEW_PERMISSIONS` |

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
