import { InjectQueue } from '@nestjs/bull';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { AwsService } from 'src/aws/aws.service';
import {
  ENROLLMENT_QUEUE,
  USER_AVATAR_UPDATED_JOB,
  USER_CREATED_JOB,
} from 'src/common/events/constants.events';
import { PermissionService } from 'src/permission/permission.service';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { updatePermissionsDto } from './dto/update-permissions.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectQueue(ENROLLMENT_QUEUE)
    private queue: Queue,

    private readonly awsService: AwsService,
    private readonly permissionsService: PermissionService,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const userCreated = await this.userRepository.save(user);

      if (userCreated) {
        this.queue.add(USER_CREATED_JOB, userCreated);
      }
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.userRepository, {
      sortableColumns: ['name', 'email', 'role', 'sector'],
      nullSort: 'last',
      loadEagerRelations: true,
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['name', 'email', 'role', 'sector'],
      maxLimit: 50,
      defaultLimit: 10,
    });
  }

  async findOne(id: string): Promise<User> {
    const profileSteps = [
      'name',
      'email',
      'language',
      'sector',
      'role',
      'date_of_birth',
      'phone_number',
      'address',
      'city',
      'country',
      'state_province',
      'postal_code',
      'avatar',
    ];
    if (!id) throw new NotFoundException('User not found');

    const user = await this.userRepository.findOneBy({ id: id });

    const completedSteps = profileSteps.filter((step) => user[step]);

    user['completed_steps'] =
      (completedSteps.length / profileSteps.length) * 100;

    if (user) return user;

    throw new NotFoundException('User not found');
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (user) return await this.userRepository.save(user);

    throw new NotFoundException('User not found');
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async updatePermissions(
    id: string,
    updatePermissionsDto: updatePermissionsDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['permissions'],
    });

    if (!user) throw new NotFoundException('User not found');

    try {
      const permissions = await this.permissionsService.findAllByNames(
        updatePermissionsDto.permissions,
      );

      user.permissions = permissions;

      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw new HttpException(error.message, error.status);
    }
  }

  async updateAvatar(id: string, buffer: Buffer, mimetype: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) throw new NotFoundException('User not found');

    this.queue.add(USER_AVATAR_UPDATED_JOB, {
      user: user,
      avatar: {
        buffer: buffer,
        mimetype: mimetype, // Adiciona o tipo do arquivo (ex: image/jpeg)
      },
    });
  }
}
