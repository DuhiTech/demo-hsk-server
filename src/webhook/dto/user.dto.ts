// user-created.dto.ts
import { IsBoolean, IsString, IsOptional, IsArray, IsNumber, IsObject, IsUrl, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class EmailItem {
  @ApiProperty()
  @IsEmail()
  email_address: string;
}

export class UserCreatedData {
  @ApiProperty()
  @IsBoolean()
  backup_code_enabled: boolean;

  @ApiProperty()
  @IsBoolean()
  banned: boolean;

  @ApiProperty()
  @IsBoolean()
  create_organization_enabled: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  create_organizations_limit: number | null;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsBoolean()
  delete_self_enabled: boolean;

  @ApiProperty()
  @IsArray()
  email_addresses: EmailItem[];

  @ApiProperty()
  @IsArray()
  enterprise_accounts: any[];

  @ApiProperty()
  @IsArray()
  external_accounts: any[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  external_id: string | null;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsBoolean()
  has_image: boolean;

  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  last_active_at: Date;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  last_sign_in_at: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  legal_accepted_at: Date;

  @ApiProperty()
  @IsBoolean()
  locked: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lockout_expires_in_seconds: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  mfa_disabled_at: number | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  mfa_enabled_at: number | null;

  @ApiProperty()
  @IsString()
  object: string;

  @ApiProperty()
  @IsArray()
  passkeys: any[];

  @ApiProperty()
  @IsBoolean()
  password_enabled: boolean;

  @ApiProperty()
  @IsArray()
  phone_numbers: any[];

  @ApiProperty()
  @IsString()
  primary_email_address_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  primary_phone_number_id: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  primary_web3_wallet_id: string | null;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  private_metadata: object | null;

  @ApiProperty()
  @IsUrl()
  profile_image_url: string;

  @ApiProperty()
  @IsObject()
  public_metadata: object;

  @ApiProperty()
  @IsArray()
  saml_accounts: any[];

  @ApiProperty()
  @IsBoolean()
  totp_enabled: boolean;

  @ApiProperty()
  @IsBoolean()
  two_factor_enabled: boolean;

  @ApiProperty()
  @IsObject()
  unsafe_metadata: object;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  updated_at: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string | null;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  verification_attempts_remaining: number | null;

  @ApiProperty()
  @IsArray()
  web3_wallets: any[];
}

export class UserCreatedDto {
  @ApiProperty()
  @IsObject()
  data: UserCreatedData;
}
