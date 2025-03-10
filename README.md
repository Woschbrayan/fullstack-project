# Fullstack Project - Watch Brasil

 **Gerenciamento de vídeos e categorias com autenticação de usuários**

---

## Sobre o Projeto

Este é um **sistema Fullstack** desenvolvido como parte de um **desafio técnico da Watch Brasil**. O sistema permite que os usuários **cadastrados e autenticados** possam **gerenciar vídeos e categorias**.

O projeto conta com **autenticação JWT**, um **backend em Node.js com Fastify** e um **frontend moderno com Vue.js e TailwindCSS**.

---

## Tecnologias Utilizadas

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Frontend
- ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![Pinia](https://img.shields.io/badge/Pinia-F6B93B?style=for-the-badge&logo=vue.js&logoColor=white)

### Ferramentas de Desenvolvimento
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

## Instalação do Projeto

### 🔹 **Pré-requisitos**
Antes de iniciar, certifique-se de ter instalado:
- **[Node.js](https://nodejs.org/en/download/)** (v20+)
- **[Docker](https://www.docker.com/get-started)**
- **[Git](https://git-scm.com/)**

### **Clone o repositório**
```bash
# Clone este repositório
$ git clone https://github.com/Woschbrayan/fullstack-project.git

# Acesse a pasta do projeto
$ cd fullstack-project
```

### **Configuração do Backend**
```bash
# Acesse a pasta backend
$ cd backend

# Instale as dependências
$ npm install

# Inicie o banco de dados no Docker
$ docker-compose up -d

# Execute as migrations do Prisma
$ npx prisma migrate dev --name init

# Rode o servidor backend
$ node server.js
```
O backend rodará em: `http://localhost:3000`

### **Configuração do Frontend**
```bash
# Acesse a pasta frontend
$ cd ../frontend

# Instale as dependências
$ npm install

# Execute o projeto
$ npm run dev
```
O frontend rodará em: `http://localhost:5173`

---

## Endpoints da API

| Método | Rota           | Descrição                        |
|--------|---------------|--------------------------------|
| POST   | `/login`      | Autenticação e geração de JWT |
| POST   | `/users`      | Criação de usuários           |
| GET    | `/users`      | Listagem de usuários          |
| POST   | `/categories` | Criação de categorias         |
| GET    | `/categories` | Listagem de categorias        |
| POST   | `/videos`     | Cadastro de vídeos            |
| GET    | `/videos`     | Listagem de vídeos            |

---

## Testes
O projeto possui **testes unitários e de integração** utilizando **Jest e Supertest**.

```bash
# Executar testes unitários
$ npm test

# Testes de carga com K6
$ k6 run load-test.js
```

---
## Screenshots

### Tela de Login
![Tela de Login](docs/images/login_screen.png)

### Home
![Dashboard](docs/images/home_screen.png)


**Desenvolvido por [Brayan Wosch](https://github.com/Woschbrayan)**
