import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { QueryFailedError, Repository } from 'typeorm';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,

    private readonly userService: UserService,
  ) {}
  async create(createPhoneDto: CreatePhoneDto) {
    try {
      const user = await this.userService.findOne(createPhoneDto.user_id);

      if (!user) throw new NotFoundException('User not found');

      return await this.phoneRepository.save({
        ...createPhoneDto,
        user,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }

  findAll(id: string) {
    return this.phoneRepository.find({
      where: { user: { id } },
    });
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const phone = await this.phoneRepository.preload({
      id: id,
      ...updatePhoneDto,
    });

    if (!phone) throw new NotFoundException('Phone not found');

    return await this.phoneRepository.save(phone);
  }

  remove(id: string) {
    return this.phoneRepository.delete(id);
  }
}
