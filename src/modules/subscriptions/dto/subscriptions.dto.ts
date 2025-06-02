import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  subscription_name: string;

  @IsNumber()
  @IsNotEmpty()
  subscription_money: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsDateString()
  @IsNotEmpty()
  payment_date: string;

  @IsNumber()
  @IsNotEmpty()
  period: number;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}

export class UpdateSubscriptionDto {
  subscription_name?: string;
  subscription_money?: number;
  currency?: string;
  payment_date?: string;
  period?: number;
  active?: boolean;
  category_id?: number;
}