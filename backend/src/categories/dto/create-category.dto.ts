import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CategoryType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'Groceries', description: 'Category name' })
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  name!: string;

  @ApiProperty({
    enum: CategoryType,
    example: CategoryType.EXPENSE,
    description: 'Category type (INCOME or EXPENSE)',
  })
  @IsEnum(CategoryType, { message: 'Invalid category type' })
  @IsNotEmpty({ message: 'Category type is required' })
  type!: CategoryType;

  @ApiProperty({
    example: 'shopping-cart',
    description: 'Icon identifier name',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'Hex color code',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  color?: string;
}
