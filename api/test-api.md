# API Produto - Teste com IDs Numéricos

## Endpoints Atualizados

Agora todos os endpoints que usam ID utilizam valores numéricos (BIGINT) ao invés de UUID.

### 1. Criar Produto
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "PROD001",
    "name": "Produto Teste",
    "price": 99.99,
    "in_stock": true
  }'
```

### 2. Listar Todos os Produtos
```bash
curl -X GET http://localhost:3000/produtos
```

### 3. Buscar Produto por ID (agora numérico)
```bash
curl -X GET http://localhost:3000/produtos/1
```

### 4. Buscar Produto por SKU
```bash
curl -X GET http://localhost:3000/produtos/sku/PROD001
```

### 5. Atualizar Produto (ID numérico)
```bash
curl -X PATCH http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Produto Atualizado",
    "price": 129.99
  }'
```

### 6. Atualizar Estoque (ID numérico)
```bash
curl -X PATCH http://localhost:3000/produtos/1/stock \
  -H "Content-Type: application/json" \
  -d '{
    "in_stock": false
  }'
```

### 7. Deletar Produto (ID numérico)
```bash
curl -X DELETE http://localhost:3000/produtos/1
```

## Estrutura da Entidade Atualizada

```typescript
@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('identity')  // Agora usa BIGINT auto-incremento
  id: number;                          // Tipo mudou de string para number

  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: true })
  in_stock: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

## Alterações Realizadas

1. **Entity**: ID mudou de `@PrimaryGeneratedColumn('uuid')` para `@PrimaryGeneratedColumn('identity')`
2. **Service**: Todos os métodos que recebem ID agora esperam `number` ao invés de `string`
3. **Controller**: Substituído `ParseUUIDPipe` por `ParseIntPipe` em todos os endpoints
4. **Validação**: IDs numéricos são validados automaticamente pelo `ParseIntPipe`

## Benefícios do BIGINT

- Melhor performance em consultas e índices
- Menor uso de memória e armazenamento
- Auto-incremento nativo do PostgreSQL
- IDs sequenciais e previsíveis
- Compatibilidade com sistemas legados
