import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { RestaurantModule } from "../restaurant/restaurant.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TableModel } from "./table.model";

@Module({
  imports: [TypeOrmModule.forFeature([TableModel]), RestaurantModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
