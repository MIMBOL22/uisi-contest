import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { RestaurantModel } from '../restaurant/restaurant.model';
import { ReserveModel } from '../reserve/reserve.model';

@Entity()
export class TableModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => RestaurantModel, (restaurant) => restaurant.tables)
  restaurant: RestaurantModel;

  @OneToMany(() => ReserveModel, (reserve) => reserve.table)
  reserves: ReserveModel[];

  @Column()
  name: string;
}
