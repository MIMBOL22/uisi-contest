import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateTableInputDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  restaurant_uuid: string;

  @MinLength(16)
  @IsString()
  admin_secret_code: string;
}
