# DevOps AVA II - API de Produtos

Este projeto contém uma API REST desenvolvida com NestJS para gerenciamento de produtos, com PostgreSQL como banco de dados.

## 🏗️ Estrutura do Projeto

- **api/**: Backend em NestJS com TypeORM
- **front/**: Frontend em React
- **deploy/**: Scripts e configurações de deploy

## 🚀 API de Produtos

A API oferece operações CRUD completas para gerenciamento de produtos.

### Base URL
```
http://localhost:3000
```

### Endpoints Disponíveis

#### 📋 Listar todos os produtos
```http
GET /produtos
```

**Resposta:**
```json
[
  {
    "id": 1,
    "sku": "PROD-001",
    "name": "Notebook Gamer",
    "price": "2499.99",
    "in_stock": true,
    "created_at": "2025-09-17T10:00:00.000Z",
    "updated_at": "2025-09-17T10:00:00.000Z"
  }
]
```

#### 📦 Listar produtos em estoque
```http
GET /produtos/in-stock
```

#### 🔍 Buscar produto por ID
```http
GET /produtos/{id}
```

**Exemplo:**
```bash
curl http://localhost:3000/produtos/1
```

#### 🏷️ Buscar produto por SKU
```http
GET /produtos/sku/{sku}
```

**Exemplo:**
```bash
curl http://localhost:3000/produtos/sku/PROD-001
```

#### ➕ Criar novo produto
```http
POST /produtos
Content-Type: application/json
```

**Body:**
```json
{
  "sku": "PROD-002",
  "name": "Mouse Wireless",
  "price": 89.99,
  "in_stock": true
}
```

**Exemplo com curl:**
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD-002",
    "name": "Mouse Wireless",
    "price": 89.99,
    "in_stock": true
  }'
```

#### ✏️ Atualizar produto (parcial)
```http
PATCH /produtos/{id}
Content-Type: application/json
```

**Body (campos opcionais):**
```json
{
  "name": "Mouse Wireless Pro",
  "price": 129.99
}
```

**Exemplo com curl:**
```bash
curl -X PATCH http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse Wireless Pro",
    "price": 129.99
  }'
```

#### 🔄 Substituir produto completo
```http
PUT /produtos/{id}
Content-Type: application/json
```

**Body (todos os campos obrigatórios):**
```json
{
  "sku": "PROD-002-V2",
  "name": "Mouse Wireless Pro Max",
  "price": 179.99,
  "in_stock": false
}
```

**Exemplo com curl:**
```bash
curl -X PUT http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD-002-V2",
    "name": "Mouse Wireless Pro Max",
    "price": 179.99,
    "in_stock": false
  }'
```

#### 🗑️ Deletar produto
```http
DELETE /produtos/{id}
```

**Exemplo com curl:**
```bash
curl -X DELETE http://localhost:3000/produtos/1
```

### 📊 Validações

#### Campos obrigatórios para criação:
- `sku`: String única, máximo 100 caracteres
- `name`: String, máximo 255 caracteres
- `price`: Número decimal positivo com até 2 casas decimais

#### Campos opcionais:
- `in_stock`: Boolean (padrão: `true`)

### ⚠️ Códigos de Erro

- **400 Bad Request**: Dados inválidos ou faltando campos obrigatórios
- **404 Not Found**: Produto não encontrado
- **409 Conflict**: SKU já existe (duplicado)

### 📝 Exemplos de Resposta de Erro

**Produto não encontrado:**
```json
{
  "statusCode": 404,
  "message": "Produto com ID 999 não encontrado"
}
```

**SKU duplicado:**
```json
{
  "statusCode": 409,
  "message": "SKU já existe"
}
```

**Dados inválidos:**
```json
{
  "statusCode": 400,
  "message": [
    "sku should not be empty",
    "price must be a positive number"
  ],
  "error": "Bad Request"
}
```

## 🛠️ Como executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Configuração do Banco
```bash
# Configurar variáveis de ambiente
export DB_HOST=localhost
export DB_PORT=5432
export DB_USERNAME=postgres
export DB_PASSWORD=postgres
export DB_DATABASE=produtos_db
```

### Executar a API
```bash
cd api
npm install
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## 📚 Tecnologias Utilizadas

- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: React
- **Validação**: class-validator, class-transformer
- **Documentação**: Swagger (em desenvolvimento)
