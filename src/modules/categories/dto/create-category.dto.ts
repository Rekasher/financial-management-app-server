import { IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name is required' })
  category_name: string;

  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number;

  @IsOptional()
  @IsBoolean()
  notification?: boolean;
} 