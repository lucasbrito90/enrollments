import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAddressDto {
  @IsUUID()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsNumber()
  readonly number: string;

  @IsString()
  @IsOptional()
  readonly complement?: string;

  @IsString()
  @IsNotEmpty()
  readonly neighborhood: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly state_province: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly postal_code: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly country: string;

  @IsNumber()
  @IsOptional()
  readonly latitude?: number;

  @IsNumber()
  @IsOptional()
  readonly longitude?: number;
}
