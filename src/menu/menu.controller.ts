import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MenuItem, MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<MenuItem[]> {
    return await this.menuService.getMenu(id);
  }
}
