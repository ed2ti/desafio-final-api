# REST API MVC - Desafio Final: Arquiteto(a) de Software

[![Node.js](https://img.shields.io/badge/Node.js-v22.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-orange.svg)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Projeto acadêmico** desenvolvido para o Desafio Final do Bootcamp de Arquitetura de Software (POS-AST267A) na XP Educação.

---

## 📋 Visão Geral

Este projeto implementa uma **API RESTful em arquitetura MVC** que disponibiliza dados de Clientes, Produtos e Pedidos para parceiros de uma empresa de vendas online. A solução foi projetada seguindo boas práticas de arquitetura de software, com foco em separação de responsabilidades, escalabilidade e manutenibilidade.

## 🏗️ Arquitetura

### Padrão MVC (Model-View-Controller)

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (API Consumer)                │
│                   (Parceiros da empresa)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP Requests (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ ClienteCtrl │  │ ProdutoCtrl │  │  PedidoCtrl │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
└─────────┼────────────────┼────────────────┼────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ ClienteSvc  │  │ ProdutoSvc  │  │  PedidoSvc  │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
└─────────┼────────────────┼────────────────┼────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                      MODEL LAYER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Cliente   │  │   Produto   │  │    Pedido   │        │
│  └─────────────┘  └─────────────┘  └──────┬──────┘        │
│                                    ┌──────▼──────┐         │
│                                    │ PedidoItens │         │
│                                    └──────┬──────┘         │
└──────────────────────────┬────────────────┼────────────────┘
                           ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                   PERSISTENCE LAYER                         │
│              SQLite Database                                │
└─────────────────────────────────────────────────────────────┘
```

### Modelo de Dados (ER)

| Entidade | Cardinalidade | Descrição |
|----------|---------------|-----------|
| **Cliente** | 1:N (Pedido) | Dados do cliente (nome, email, telefone) |
| **Produto** | 1:N (PedidoItens) | Dados do produto (nome, descrição, preço, estoque) |
| **Pedido** | 1:N (PedidoItens) | Cabeçalho do pedido (cliente, status) |
| **PedidoItens** | N:1 (Pedido + Produto) | Itens do pedido (quantidade, preço unitário) |

### Diagrama de Classes UML

```
┌─────────────────────┐
│      Cliente        │
├─────────────────────┤
│ - id: Integer       │
│ - nome: String      │
│ - email: String     │
│ - telefone: String  │
│ - created_at: Date  │
├─────────────────────┤
│ + findAll()         │
│ + findById(id)      │
│ + findByName(nome)  │
│ + count()           │
│ + create(data)      │
│ + update(id, data)  │
│ + delete(id)        │
└─────────────────────┘

┌─────────────────────┐
│      Produto        │
├─────────────────────┤
│ - id: Integer       │
│ - nome: String      │
│ - descricao: String │
│ - preco: Float      │
│ - estoque: Integer  │
│ - created_at: Date  │
├─────────────────────┤
│ + findAll()         │
│ + findById(id)      │
│ + findByName(nome)  │
│ + count()           │
│ + create(data)      │
│ + update(id, data)  │
│ + delete(id)        │
└─────────────────────┘

┌─────────────────────┐
│       Pedido        │
├─────────────────────┤
│ - id: Integer       │
│ - cliente_id: FK    │
│ - status: String    │
│ - created_at: Date  │
├─────────────────────┤
│ + findAll()         │
│ + findById(id)      │
│ + count()           │
│ + create(data)      │
│ + updateStatus()    │
│ + delete(id)        │
└─────────────────────┘

┌─────────────────────┐
│     PedidoItens     │
├─────────────────────┤
│ - id: Integer       │
│ - pedido_id: FK     │
│ - produto_id: FK    │
│ - quantidade: Int   │
│ - preco_unitario: F │
├─────────────────────┤
│ (acesso via Pedido) │
└─────────────────────┘
```

## 📁 Estrutura do Projeto

```
desafio-final-api/
├── src/
│   ├── app.js                    # Ponto de entrada da aplicação
│   ├── config/
│   │   └── database.js           # Configuração do SQLite + criação de tabelas
│   ├── controllers/              # Controllers REST (tratamento HTTP)
│   │   ├── cliente.controller.js
│   │   ├── produto.controller.js
│   │   └── pedido.controller.js
│   ├── models/                   # Entidades de domínio
│   │   ├── cliente.model.js
│   │   ├── produto.model.js
│   │   └── pedido.model.js
│   ├── routes/                   # Rotas HTTP
│   │   ├── cliente.routes.js
│   │   ├── produto.routes.js
│   │   └── pedido.routes.js
│   └── services/                 # Lógica de negócio
│       ├── cliente.service.js
│       ├── produto.service.js
│       └── pedido.service.js
├── docs/
│   └── diagrama-arquitetura.drawio  # Diagrama no Draw.io
├── data/
│   └── database.db               # Banco SQLite (gerado automaticamente)
├── package.json
├── .env
├── .gitignore
└── README.md
```

### Componentes

| Camada | Componente | Responsabilidade |
|--------|------------|------------------|
| **Controller** | `*.controller.js` | Recebe requisições HTTP, valida inputs, delega para Services, retorna responses JSON |
| **Service** | `*.service.js` | Contém a lógica de negócio, valida regras, orquestra operações |
| **Model** | `*.model.js` | Acesso direto ao banco de dados via SQLite, operações CRUD |
| **Routes** | `*.routes.js` | Mapeia endpoints HTTP para Controllers |
| **Config** | `database.js` | Configuração do banco, criação de tabelas, setup inicial |

## 🚀 Endpoints da API

### Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/clientes` | Listar todos os clientes |
| `GET` | `/api/clientes/:id` | Buscar cliente por ID |
| `GET` | `/api/clientes/nome/:nome` | Buscar por nome (parcial) |
| `GET` | `/api/clientes/contar` | Contar total de clientes |
| `POST` | `/api/clientes` | Criar novo cliente |
| `PUT` | `/api/clientes/:id` | Atualizar cliente |
| `DELETE` | `/api/clientes/:id` | Remover cliente |

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/produtos` | Listar todos os produtos |
| `GET` | `/api/produtos/:id` | Buscar produto por ID |
| `GET` | `/api/produtos/nome/:nome` | Buscar por nome (parcial) |
| `GET` | `/api/produtos/contar` | Contar total de produtos |
| `POST` | `/api/produtos` | Criar novo produto |
| `PUT` | `/api/produtos/:id` | Atualizar produto |
| `DELETE` | `/api/produtos/:id` | Remover produto |

### Pedidos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/pedidos` | Listar todos os pedidos (com itens) |
| `GET` | `/api/pedidos/:id` | Buscar pedido por ID (com itens) |
| `GET` | `/api/pedidos/contar` | Contar total de pedidos |
| `POST` | `/api/pedidos` | Criar novo pedido (com múltiplos itens) |
| `PUT` | `/api/pedidos/:id/status` | Atualizar status do pedido |
| `DELETE` | `/api/pedidos/:id` | Remover pedido |

## 💻 Como Executar

### Pré-requisitos

- Node.js v18+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/ed2ti/desafio-final-api.git
cd desafio-final-api

# Instalar dependências
npm install
```

### Iniciar o Servidor

```bash
# Modo produção
npm start

# Modo desenvolvimento (com hot reload)
npm run dev
```

O servidor iniciará na porta `3000` (configurável via variável de ambiente `PORT`).

### Exemplos de Uso (curl)

#### Criar um cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "123456789"
  }'
```

#### Criar um pedido com múltiplos produtos
```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": 1,
    "itens": [
      {"produto_id": 1, "quantidade": 2, "preco_unitario": 29.90},
      {"produto_id": 3, "quantidade": 1, "preco_unitario": 49.90}
    ]
  }'
```

#### Listar pedidos com valor total
```bash
curl http://localhost:3000/api/pedidos
```

#### Resposta exemplo
```json
{
  "id": 1,
  "cliente_id": 1,
  "status": "pendente",
  "itens": [
    {
      "id": 1,
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 29.90,
      "produto_nome": "Mouse Logitech"
    },
    {
      "id": 2,
      "produto_id": 3,
      "quantidade": 1,
      "preco_unitario": 49.90,
      "produto_nome": "Teclado Mecânico"
    }
  ],
  "valor_total": 109.70
}
```

## 🔧 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Node.js** | v22.x | Runtime JavaScript |
| **Express** | 4.18 | Framework web REST |
| **SQLite** | 3.x | Banco de dados leve (persistência) |
| **better-sqlite3** | 9.4 | Driver SQLite síncrono para Node.js |
| **dotenv** | 16.x | Variáveis de ambiente |

## 📊 Decisões de Projeto

### Por que SQLite?
- **Leveza**: Não requer servidor externo
- **Portabilidade**: Banco em arquivo único
- **Ideal para protótipo**: Foco na arquitetura, não na infraestrutura

### Por que separar Model do Repository?
- **Boas práticas**: O Model representa a entidade de domínio, não o acesso a dados
- **Escalabilidade**: Fácil trocar SQLite por PostgreSQL/MySQL futuramente
- **Testabilidade**: Services podem ser testados com mocks

### Por que tabela PedidoItens?
- **Relacionamento N:N**: Uma venda pode conter múltiplos produtos
- **Flexibilidade**: Cada item pode ter preço unitário diferente (promoções)
- **Rastreabilidade**: Histórico completo de cada item vendido

## ✅ Entregáveis do DESF5

| Item | Status | Localização |
|------|--------|-------------|
| 1. Arquitetura (C4/UML/Draw.io) | ✅ | `docs/diagrama-arquitetura.drawio` |
| 2. Estrutura de pastas MVC | ✅ | `src/` organizado |
| 3. Explicação dos componentes | ✅ | Este README + código documentado |
| 4. Código funcionando (opcional) | ✅ | Repositório GitHub |
| 5. Persistência funcionando (opcional) | ✅ | SQLite |

## 🧪 Testes

```bash
# Listar clientes
curl http://localhost:3000/api/clientes

# Criar e verificar
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Notebook","preco":2999.90,"estoque":10}'

# Verificar valor total do pedido
curl http://localhost:3000/api/pedidos/1
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🇬🇧 English Version

# REST API MVC - Final Challenge: Software Architect

> **Academic project** developed for the Final Challenge of the Software Architecture Bootcamp (POS-AST267A) at XP Education.

## Overview

This project implements a **RESTful API in MVC architecture** that provides Customer, Product, and Order data to partners of an online sales company. The solution follows software architecture best practices, focusing on separation of concerns, scalability, and maintainability.

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern:

- **Model**: Domain entities with direct database access (SQLite)
- **Service**: Business logic layer, validation, orchestration
- **Controller**: HTTP request handling, input validation, response formatting
- **Routes**: URL mapping to controllers

## Data Model

- **Customer** (Cliente): Name, email, phone
- **Product** (Produto): Name, description, price, stock
- **Order** (Pedido): Customer reference, status, items
- **OrderItems** (PedidoItens): Product reference, quantity, unit price

The relationship between Orders and Products is **Many-to-Many** through the `PedidoItens` junction table, allowing multiple products per order.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/clientes` | List all customers |
| `GET` | `/api/clientes/:id` | Get customer by ID |
| `GET` | `/api/clientes/nome/:nome` | Search customers by name |
| `GET` | `/api/clientes/contar` | Count total customers |
| `POST` | `/api/clientes` | Create customer |
| `PUT` | `/api/clientes/:id` | Update customer |
| `DELETE` | `/api/clientes/:id` | Delete customer |
| `GET` | `/api/produtos` | List all products |
| `GET` | `/api/produtos/:id` | Get product by ID |
| `GET` | `/api/produtos/nome/:nome` | Search products by name |
| `GET` | `/api/produtos/contar` | Count total products |
| `POST` | `/api/produtos` | Create product |
| `PUT` | `/api/produtos/:id` | Update product |
| `DELETE` | `/api/produtos/:id` | Delete product |
| `GET` | `/api/pedidos` | List all orders (with items) |
| `GET` | `/api/pedidos/:id` | Get order by ID (with items) |
| `GET` | `/api/pedidos/contar` | Count total orders |
| `POST` | `/api/pedidos` | Create order (with multiple items) |
| `PUT` | `/api/pedidos/:id/status` | Update order status |
| `DELETE` | `/api/pedidos/:id` | Delete order |

## Quick Start

```bash
git clone https://github.com/ed2ti/desafio-final-api.git
cd desafio-final-api
npm install
npm start
```

Server runs on port 3000. Test with:

```bash
# Create a customer
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"John Doe","email":"john@example.com","telefone":"123456789"}'

# Create a product
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Wireless Mouse","descricao":"Ergonomic mouse","preco":29.90,"estoque":50}'

# Create an order with multiple products
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": 1,
    "itens": [
      {"produto_id": 1, "quantidade": 2, "preco_unitario": 29.90},
      {"produto_id": 2, "quantidade": 1, "preco_unitario": 49.90}
    ]
  }'

# List orders (shows items and total value)
curl http://localhost:3000/api/pedidos
```

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | JavaScript runtime |
| Express | 4.18 | REST web framework |
| SQLite | 3.x | Lightweight database |
| better-sqlite3 | 9.4 | Synchronous SQLite driver |

## Design Decisions

- **SQLite**: Chosen for simplicity and portability — no external database server required
- **MVC Pattern**: Clear separation between HTTP handling (Controller), business logic (Service), and data access (Model)
- **Many-to-Many via Junction Table**: `PedidoItens` enables multiple products per order with individual pricing
- **Service Layer**: Centralizes business rules and validation, making the code testable and maintainable

## License

MIT License - see [LICENSE](LICENSE) for details.
