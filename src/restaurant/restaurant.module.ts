import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModel } from './restaurant.model';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantModel])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
