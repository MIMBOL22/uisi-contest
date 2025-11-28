import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRestaurantInputDto } from './dto/create-restaurant.input.dto';
import { Repository } from 'typeorm';
import { RestaurantModel } from './restaurant.model';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { generateRandomString } from '../utils/generateRandomString';
import { CreateRestaurantOutputDto } from './dto/create-restaurant.output.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(RestaurantModel)
    private restaurantRepository: Repository<RestaurantModel>,
  ) {}

  async getByUUID(uuid: string) {
    return await this.restaurantRepository.findOneBy({ uuid });
  }

  async checkSecretCode(uuid: string, secret_code: string): Promise<boolean> {
    const restaurant = await this.getByUUID(uuid);
    if (!restaurant) return false;
    return await bcrypt.compare(secret_code, restaurant.admin_secret_code_hash);
  }

  async create(
    inputData: CreateRestaurantInputDto,
  ): Promise<CreateRestaurantOutputDto> {
    const findRestaurants = await this.restaurantRepository.find({
      where: { name: inputData.name },
    });
    if (findRestaurants?.length) {
      throw new ConflictException('Restaurant with these name already exist');
    }

    const admin_secret = generateRandomString(32);

    const createdRestaurant = new RestaurantModel();
    createdRestaurant.admin_secret_code_hash = await bcrypt.hash(
      admin_secret,
      await bcrypt.genSalt(10),
    );
    createdRestaurant.name = inputData.name;
    createdRestaurant.address = inputData.address;
    createdRestaurant.admin_phone = inputData.admin_phone;
    await createdRestaurant.save();

    const outputEntity = new CreateRestaurantOutputDto();
    outputEntity.name = inputData.name;
    outputEntity.admin_phone = inputData.admin_phone;
    outputEntity.address = inputData.address;
    outputEntity.uuid = createdRestaurant.uuid;
    outputEntity.secret_code = admin_secret;

    return outputEntity;
  }
}
