import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { updatePermissionsDto } from './dto/update-permissions.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.userService.findAll(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
  }

  @Put(':id/permissions')
  async updatePermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePermissionsDto: updatePermissionsDto,
  ) {
    await this.cacheManager.del('menu');
    return await this.userService.updatePermissions(id, updatePermissionsDto);
  }
}
