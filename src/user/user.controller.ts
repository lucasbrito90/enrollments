import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AwsService } from 'src/aws/aws.service';
import { isAnImage } from 'src/common/utils/images/compressor-image';
import { CreateUserDto } from './dto/create-user.dto';
import { updatePermissionsDto } from './dto/update-permissions.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly awsService: AwsService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.userService.findAll(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
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

  @UseInterceptors(FileInterceptor('avatar'))
  @Patch(':id/avatar')
  async updateAvatar(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * (1024 * 1024) })],
      }),
    )
    avatar: Express.Multer.File,
  ) {
    if (!(await isAnImage(avatar.buffer))) {
      throw new BadRequestException('Invalid file type.');
    }

    const fileKey = `${randomUUID()}-${Date.now()}`;
    const bucket = 'avatars';

    await this.awsService.createBucket(bucket);
    await this.awsService.uploadFile(avatar, bucket, fileKey);

    return await this.userService.updateAvatar(id, fileKey);
  }

  @Get(':id/avatar')
  async getAvatar(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user.avatar) {
      throw new BadRequestException('User has no avatar.');
    }

    return await this.awsService.getFile('avatars', user.avatar);
  }
}
