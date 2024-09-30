import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import Menu from './menu-tree';

export type MenuItem = {
  header?: string;
  title?: string;
  icon?: string;
  to?: string;
  permission?: string;
  role?: string;
  children?: MenuItem[];
};

@Injectable()
export class MenuService {
  constructor(private readonly userService: UserService) {}

  async getMenu(id: string): Promise<MenuItem[]> {
    const user = await this.userService.findOne(id);

    const userPermissions = new Set(
      user.permissions.map((permission) => permission.name),
    );

    const permissions: string[] = Array.from(userPermissions);

    return this.filterByPermission(Menu, permissions);
  }

  private filterByPermission(
    menu: MenuItem[],
    permissions: string[],
  ): MenuItem[] {
    return menu
      .map((item) => {
        if (item.children) {
          const filteredChildren = this.filterByPermission(
            item.children,
            permissions,
          );
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
        }

        if (item.permission && permissions.includes(item.permission)) {
          return item;
        }

        return null;
      })
      .filter((item) => item !== null) as MenuItem[];
  }
}
