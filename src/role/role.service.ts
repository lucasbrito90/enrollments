import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionService } from 'src/permission/permission.service';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly permissionService: PermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const permissions = await this.permissionService.findAllByNames(
      createRoleDto.permissions,
    );

    try {
      const role = this.roleRepository.create({
        name: createRoleDto.name,
      });

      role.permissions = permissions;

      await this.roleRepository.save(role);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.roleRepository.find({
        relations: ['permissions'],
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }
    }
  }

  async findOne(id: string) {
    return await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const permissions = await this.permissionService.findAllByNames(
      updateRoleDto.permissions,
    );

    try {
      const role = await this.roleRepository.preload({
        id: id,
        name: updateRoleDto.name,
        permissions: permissions,
      });

      if (!role) throw new NotFoundException('Role not found');

      role.permissions = permissions;

      await this.roleRepository.save(role);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException(error.message);
      }

      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) throw new NotFoundException('Role not found');

    await this.roleRepository.delete(id);
  }
}
