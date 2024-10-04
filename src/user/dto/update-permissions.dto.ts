import { IsArray } from 'class-validator';

export class updatePermissionsDto {
  @IsArray()
  permissions: string[];
}
