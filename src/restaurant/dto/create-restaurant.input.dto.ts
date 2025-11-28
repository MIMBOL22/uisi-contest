import {
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRestaurantInputDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsMobilePhone('ru-RU')
  admin_phone: string;
}
