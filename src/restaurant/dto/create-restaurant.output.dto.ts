import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateRestaurantOutputDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  address: string;

  @IsString()
  @IsNotEmpty()
  secret_code: string;

  @IsString()
  @MinLength(3)
  admin_phone: string;
}
