import { table } from 'console';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'produtos'})
export class Produto {
  @ApiProperty({ 
    description: 'ID único do produto',
    example: 1
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ 
    description: 'Código SKU único do produto',
    example: 'PROD-001',
    maxLength: 100
  })
  @Column({ type: 'varchar', length: 100, unique: true })
  sku: string;

  @ApiProperty({ 
    description: 'Nome do produto',
    example: 'Smartphone Samsung Galaxy S21',
    maxLength: 255
  })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ 
    description: 'Preço do produto em reais',
    example: 1299.99,
    type: 'number',
    format: 'decimal'
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ 
    description: 'Indica se o produto está em estoque',
    example: true
  })
  @Column({ type: 'boolean', default: true })
  in_stock: boolean;

  @ApiProperty({ 
    description: 'Data de criação do produto',
    example: '2023-09-17T10:30:00Z'
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ 
    description: 'Data da última atualização do produto',
    example: '2023-09-17T10:30:00Z'
  })
  @UpdateDateColumn()
  updated_at: Date;
}
