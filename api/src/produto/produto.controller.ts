import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './produto.entity';

@ApiTags('produtos')
@Controller('produtos')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({ type: CreateProdutoDto })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: Produto })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'SKU já existe' })
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return await this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso', type: [Produto] })
  async findAll(): Promise<Produto[]> {
    return await this.produtoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'number' })
  @ApiResponse({ status: 200, description: 'Produto encontrado', type: Produto })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async findOne(@Param('id') id: number): Promise<Produto> {
    return await this.produtoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar produto parcialmente' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'number' })
  @ApiBody({ type: UpdateProdutoDto })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: Produto })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Substituir produto completamente' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'number' })
  @ApiBody({ type: CreateProdutoDto })
  @ApiResponse({ status: 200, description: 'Produto substituído com sucesso', type: Produto })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async replace(
    @Param('id') id: number,
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<Produto> {
    return await this.produtoService.replace(id, createProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover produto' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: 'number' })
  @ApiResponse({ status: 204, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return await this.produtoService.remove(id);
  }
}
