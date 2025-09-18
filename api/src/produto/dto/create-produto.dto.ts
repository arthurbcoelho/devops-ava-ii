import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ 
    description: 'Código SKU único do produto',
    example: 'PROD-001',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  sku: string;

  @ApiProperty({ 
    description: 'Nome do produto',
    example: 'Smartphone Samsung Galaxy S21',
    maxLength: 255
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ 
    description: 'Preço do produto em reais',
    example: 1299.99,
    minimum: 0,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({ 
    description: 'Indica se o produto está em estoque',
    example: true,
    default: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  in_stock?: boolean = true;
}
