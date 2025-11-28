import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TableModule } from './table/table.module';
import { ReserveModule } from './reserve/reserve.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModel } from './restaurant/restaurant.model';
import 'dotenv/config';
import { TableModel } from './table/table.model';
import { ReserveModel } from './reserve/reserve.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'postgres',
      entities: [RestaurantModel, TableModel, ReserveModel],
      synchronize: true
    }),
    RestaurantModule,
    TableModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
