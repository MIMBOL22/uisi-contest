import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTableOutputDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  restaurant_uuid: string;
}
