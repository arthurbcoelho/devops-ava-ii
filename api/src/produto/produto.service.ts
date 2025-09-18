import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    try {
      const produto = this.produtoRepository.create(createProdutoDto);
      return await this.produtoRepository.save(produto);
    } catch (error) {
      if (error.code === '23505') { // Postgres unique violation error code
        throw new ConflictException('SKU já existe');
      }
      throw error;
    }
  }

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return produto;
  }

  async findBySku(sku: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { sku },
    });

    if (!produto) {
      throw new NotFoundException(`Produto com SKU ${sku} não encontrado`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    
    try {
      Object.assign(produto, updateProdutoDto);
      return await this.produtoRepository.save(produto);
    } catch (error) {
      if (error.code === '23505') { // Postgres unique violation error code
        throw new ConflictException('SKU já existe');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.remove(produto);
  }

  async replace(id: number, createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id);
    
    try {
      // Replace all fields (except id and timestamps)
      produto.sku = createProdutoDto.sku;
      produto.name = createProdutoDto.name;
      produto.price = createProdutoDto.price;
      produto.in_stock = createProdutoDto.in_stock ?? true;
      
      return await this.produtoRepository.save(produto);
    } catch (error) {
      if (error.code === '23505') { // Postgres unique violation error code
        throw new ConflictException('SKU já existe');
      }
      throw error;
    }
  }

  async findInStock(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { in_stock: true },
      order: { created_at: 'DESC' },
    });
  }

  async updateStock(id: number, inStock: boolean): Promise<Produto> {
    const produto = await this.findOne(id);
    produto.in_stock = inStock;
    return await this.produtoRepository.save(produto);
  }
}
