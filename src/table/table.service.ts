import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantModel } from '../restaurant/restaurant.model';
import { Repository } from 'typeorm';
import { generateRandomString } from '../utils/generateRandomString';
import * as bcrypt from 'bcryptjs';
import { TableModel } from './table.model';
import { CreateTableInputDto } from './dto/create-table.input.dto';
import { CreateTableOutputDto } from './dto/create-table.output.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableModel)
    private tableRepository: Repository<TableModel>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async create(inputData: CreateTableInputDto): Promise<CreateTableOutputDto> {
    const restaurant = await this.restaurantService.getByUUID(
      inputData.restaurant_uuid,
    );
    if (!restaurant) {
      throw new NotFoundException('Ресторан не найден');
    }
    if (
      !(await this.restaurantService.checkSecretCode(
        inputData.restaurant_uuid,
        inputData.admin_secret_code,
      ))
    ) {
      throw new UnauthorizedException('Неверный код!');
    }

    const createdTable = new TableModel();
    createdTable.name = inputData.name;
    createdTable.restaurant = restaurant;
    await createdTable.save();

    const outputEntity = new CreateTableOutputDto();
    outputEntity.name = inputData.name;
    outputEntity.uuid = createdTable.uuid;
    outputEntity.restaurant_uuid = inputData.restaurant_uuid;

    return outputEntity;
  }
}
