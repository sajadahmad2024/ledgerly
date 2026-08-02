import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AccountType {
  CASH = 'CASH',
  BANK = 'BANK',
  CREDIT_CARD = 'CREDIT_CARD',
  WALLET = 'WALLET',
}

export class CreateAccountDto {
  @ApiProperty({ example: 'HDFC Bank', description: 'Account name' })
  @IsString()
  @IsNotEmpty({ message: 'Account name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  name!: string;

  @ApiProperty({
    enum: AccountType,
    example: AccountType.BANK,
    description: 'Account type',
  })
  @IsEnum(AccountType, { message: 'Invalid account type' })
  @IsNotEmpty({ message: 'Account type is required' })
  type!: AccountType;

  @ApiProperty({
    example: 'INR',
    description: 'ISO 3-letter currency code',
    required: false,
    default: 'INR',
  })
  @IsOptional()
  @IsString()
  @Length(3, 3, { message: 'Currency code must be exactly 3 characters' })
  currency?: string;
}
