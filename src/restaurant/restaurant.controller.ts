import { Body, Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantInputDto } from './dto/create-restaurant.input.dto';
import { CreateRestaurantOutputDto } from './dto/create-restaurant.output.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('create')
  async create(
    @Body() body: CreateRestaurantInputDto,
  ): Promise<CreateRestaurantOutputDto> {
    return await this.restaurantService.create(body);
  }
}
