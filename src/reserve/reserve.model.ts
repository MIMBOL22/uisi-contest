import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableModel } from '../table/table.model';

@Entity()
export class ReserveModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => TableModel, (table) => table.reserves)
  table: TableModel;

  @Column()
  guest_fullname: string;

  @Column()
  guest_phone: string;

  @Column()
  guest_secret_code_hash: string;

  // Time in UNIX
  @Column()
  start_time: number;

  // Time in UNIX
  @Column()
  send_time: number;
}
