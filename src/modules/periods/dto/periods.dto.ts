import { IsBoolean, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class PeriodsDto {
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsDateString()
  @IsNotEmpty()
  repeate_date: boolean;

  @IsBoolean()
  repeate_flag: boolean;
}

export class CreatePeriodDto {
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsNumber()
  @IsNotEmpty()
  repeate_date: number;

  @IsBoolean()
  repeate_flag: boolean;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}

export class UpdatePeriodDto {
  limit?: number;
  start_date?: string;
  end_date?: string;
  repeate_date?: number;
  repeate_flag?: boolean;
  category_id?: number;
}