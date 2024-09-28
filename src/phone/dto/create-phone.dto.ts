import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePhoneDto {
  @IsString()
  readonly country_code: string;

  @IsString()
  readonly number: string;

  @IsString()
  @IsOptional()
  readonly extension?: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsBoolean()
  @IsOptional()
  readonly is_primary: boolean;

  @IsUUID()
  readonly user_id: string;
}
