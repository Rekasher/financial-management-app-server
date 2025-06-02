import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CategoriesDto {
  @IsNotEmpty({ message: 'Category name is required' })
  category_name: string;

  @IsDateString()
  created_date: string;

  @IsDateString()
  updated_date : string;

  @IsBoolean()
  notification: boolean;

  @IsBoolean()
  active: boolean;

  @IsNotEmpty({ message: 'Cash is required' })
  @IsNumber()
  cash: number;
}

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  category_name: string;

  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsOptional()
  notification?: boolean;
} 