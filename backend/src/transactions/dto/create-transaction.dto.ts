import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateTransactionDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Account UUID',
  })
  @IsUUID('4', { message: 'Invalid account ID' })
  @IsNotEmpty({ message: 'Account ID is required' })
  accountId!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category UUID',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'Invalid category ID' })
  categoryId?: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.EXPENSE,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType, { message: 'Invalid transaction type' })
  @IsNotEmpty({ message: 'Transaction type is required' })
  type!: TransactionType;

  @ApiProperty({
    example: 450.5,
    description: 'Transaction amount (positive value)',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Amount must be a valid number with max 2 decimal places' },
  )
  @Min(0.01, { message: 'Amount must be greater than zero' })
  @IsNotEmpty({ message: 'Amount is required' })
  amount!: number;

  @ApiProperty({
    example: 'Grocery shopping at DMart',
    description: 'Short description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Bought vegetables and snacks',
    description: 'Optional detailed notes',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: '2026-08-02T10:00:00.000Z',
    description: 'Transaction date (ISO string)',
    required: false,
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'Transaction date must be a valid ISO date string' },
  )
  transactionDate?: string;
}
