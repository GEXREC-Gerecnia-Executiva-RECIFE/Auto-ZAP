# Suporte de TI - Chatbot de Atendimento

Este projeto é um chatbot de suporte de TI que realiza atendimento automático para usuários, com registro de chamados em diferentes categorias, como suporte, troca de senha, manutenção, entre outros. O sistema também possui funcionalidades de autenticação de usuários e gerenciamento de chamados.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints da API](#endpoints-da-api)
  - [GET /messages](#get-messages)
  - [GET /messages/numero/:number](#get-messages-numero)
  - [GET /messages/tipo/:type](#get-messages-tipo)
  - [GET /messages/hoje](#get-messages-hoje)
  - [PUT /situation](#put-situation)
  - [DELETE /messages/delete/:id](#delete-messages-delete)
  - [POST /createUsers](#post-createusers)
  - [POST /login](#post-login)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Pré-requisitos

Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/)

## Instalação

1. Clone o repositório para sua máquina:

   ```bash
   git clone https://github.com/SamuelJeff/reHub.git
   ```

2. Navegue para o diretório do projeto:

   ```bash
   cd suporte-ti-chatbot
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

## Configuração

1. **Banco de Dados**: O projeto utiliza SQLite, então você precisa configurar o banco de dados criando o arquivo `knexfile.js` para definir o ambiente de desenvolvimento.

   Exemplo de configuração (`knexfile.js`):

   ```js
   module.exports = {
     development: {
       client: 'sqlite3',
       connection: {
         filename: './db/DataBase.db'
       },
       useNullAsDefault: true
     }
   };
   ```

2. **Migrações**: Execute as migrações para criar as tabelas necessárias:

   ```bash
   npx knex migrate:latest
   ```

3. **Variáveis de Ambiente**: Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=3000
   ```

## Execução

Para iniciar o servidor:

```bash
node server.js
```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

### **GET /messages**

Retorna todas as mensagens registradas.

**Resposta:**

```json
[
  {
    "number": "12345",
    "firstMessage": "Primeira mensagem",
    "nameMessage": "Nome do Usuário",
    "unitMessage": "Unidade do Usuário",
    "typeMessage": "Tipo de Chamado",
    "optionMessage": "Opção Escolhida",
    "detailMessage": "Detalhes do Chamado"
  }
]
```

### **GET /messages/numero/:number**

Retorna todas as mensagens filtradas pelo número do usuário.

**Parâmetros de URL:**

- `number` - Número do usuário (string).

**Exemplo de Uso:**

```http
GET /messages/numero/12345
```

**Resposta:**

```json
[
  {
    "number": "12345",
    "firstMessage": "Solicitação de suporte",
    "nameMessage": "João",
    "unitMessage": "TI",
    "typeMessage": "Suporte",
    "optionMessage": "Hardware",
    "detailMessage": "Problema com computador."
  }
]
```

### **GET /messages/tipo/:type**

Retorna todas as mensagens filtradas pelo tipo de chamado.

**Parâmetros de URL:**

- `type` - Tipo do chamado (string).

**Exemplo de Uso:**

```http
GET /messages/tipo/Manutenção
```

**Resposta:**

```json
[
  {
    "number": "67890",
    "firstMessage": "Chamado sobre manutenção",
    "nameMessage": "Maria",
    "unitMessage": "Financeiro",
    "typeMessage": "Manutenção",
    "optionMessage": "Software",
    "detailMessage": "Atualização do sistema."
  }
]
```

### **GET /messages/hoje**

Retorna todos os chamados do dia atual.

**Resposta:**

```json
[
  {
    "number": "67890",
    "firstMessage": "Chamado do dia",
    "nameMessage": "Carlos",
    "unitMessage": "RH",
    "typeMessage": "Troca de Senha",
    "optionMessage": "Acesso",
    "detailMessage": "Senha expirada."
  }
]
```

### **PUT /situation**

Atualiza a situação de um chamado para "resolved".

**Parâmetros de Query:**

- `id` - ID do chamado (string).

**Exemplo de Uso:**

```http
PUT /situation?id=123
```

**Resposta:**

```json
{
  "message": "Situação atualizada para resolved."
}
```

### **DELETE /messages/delete/:id**

Deleta um chamado pelo ID.

**Parâmetros de URL:**

- `id` - ID do chamado (string).

**Exemplo de Uso:**

```http
DELETE /messages/delete/123
```

**Resposta:**

```json
{
  "message": "Chamado deletado."
}
```

### **POST /createUsers**

Cria um novo usuário no sistema.

**Parâmetros de Body:**

- `name` - Nome do usuário (string).
- `password` - Senha do usuário (string).

**Exemplo de Body:**

```json
{
  "name": "João",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "message": "Usuário cadastrado com sucesso!"
}
```

### **POST /login**

Autentica um usuário e retorna um token.

**Parâmetros de Body:**

- `name` - Nome do usuário (string).
- `password` - Senha do usuário (string).

**Exemplo de Body:**

```json
{
  "name": "João",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Estrutura do Projeto

O projeto segue a seguinte estrutura de diretórios:

```
suporte-ti-chatbot/
├── db/                    # Banco de dados e migrações
│   ├── migrations/        # Scripts de migração
│   ├── DataBase.db        # Arquivo do banco SQLite
│   └── db.js              # Configuração do banco
├── src/
│   ├── controllers/       # Controladores da aplicação
│   ├── models/            # Modelos de dados
│   └── view/              # Arquivos estáticos e frontend
├── main.js                # Arquivo principal do bot
├── server.js              # Configuração principal do servidor Express
├── knexfile.js            # Configuração do Knex
└── variables.env          # Variáveis de ambiente
```