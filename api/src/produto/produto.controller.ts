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
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './produto.entity';

@Controller('produtos')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return await this.produtoService.create(createProdutoDto);
  }

  @Get()
  async findAll(): Promise<Produto[]> {
    return await this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Produto> {
    return await this.produtoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @Put(':id')
  async replace(
    @Param('id') id: number,
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<Produto> {
    return await this.produtoService.replace(id, createProdutoDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.produtoService.remove(id);
  }
}
