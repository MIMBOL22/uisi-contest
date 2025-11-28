import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TableModel } from '../table/table.model';

@Entity()
export class RestaurantModel extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;

  @Column()
  admin_phone: string;

  @Column()
  admin_secret_code_hash: string;

  @OneToMany(() => TableModel, (table) => table.restaurant)
  tables: TableModel[];
}
