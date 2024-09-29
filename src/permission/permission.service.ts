import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryFailedError, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto[]) {
    try {
      //find if some permission already exists
      const permissions = await Promise.all(
        createPermissionDto.map(async (permission) => {
          return await this.permissionRepository.findOne({
            where: { name: permission.name },
          });
        }),
      );

      //if some permission already exists
      if (permissions.some((permission) => permission)) {
        throw new ConflictException(
          `Permission already exists: ${permissions
            .filter((permission) => permission)
            .map((permission) => permission.name)
            .join(', ')}`,
        );
      }

      await this.permissionRepository.save(createPermissionDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    return await this.permissionRepository.find();
  }

  async findOne(id: string) {
    return await this.permissionRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionRepository.preload({
      id,
      ...updatePermissionDto,
    });

    if (!permission) throw new NotFoundException(`Permission not found`);

    return await this.permissionRepository.save(permission);
  }

  async remove(id: string) {
    await this.permissionRepository.delete(id);
  }

  async findAllByNames(names: string[]) {
    return await this.permissionRepository.findBy({
      name: In(names),
    });
  }
}
