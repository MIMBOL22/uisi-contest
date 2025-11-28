import { Body, Controller, Post } from '@nestjs/common';
import { CreateTableInputDto } from './dto/create-table.input.dto';
import { CreateTableOutputDto } from './dto/create-table.output.dto';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('create')
  async create(
    @Body() body: CreateTableInputDto,
  ): Promise<CreateTableOutputDto> {
    return await this.tableService.create(body);
  }
}
