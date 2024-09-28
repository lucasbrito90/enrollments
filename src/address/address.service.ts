import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,

    private readonly userService: UserService,
  ) {}

  async findUsersAddresses(id: string) {
    return this.addressRepository.find({
      where: { user: { id } },
    });
  }
  async addUsersAddress(createAddressDto: CreateAddressDto) {
    const user = await this.userService.findOne(createAddressDto.user_id);

    try {
      const address = this.addressRepository.create({
        ...createAddressDto,
        user,
      });

      await this.addressRepository.save(address);

      return address;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }
    }
  }

  async removeUsersAddress(id: string) {
    const address = await this.addressRepository.findOne({
      where: { id },
    });

    if (!address) throw new NotFoundException('Address not found');

    await this.addressRepository.remove(address);
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressRepository.preload({
      id: id,
      ...updateAddressDto,
    });

    if (!address) throw new NotFoundException('Address not found');

    return this.addressRepository.save(address);
  }
}
