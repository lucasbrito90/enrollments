import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthGuard } from 'src/auth/auth-guard/auth/auth-guard.guard';
import { MenuItem, MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MenuItem[]> {
    const value = await this.cacheManager.get<MenuItem[]>('menu');

    if (!value) {
      const menu = await this.menuService.getMenu(id);
      await this.cacheManager.set('menu', menu);
      return menu;
    }

    return value;
  }
}
