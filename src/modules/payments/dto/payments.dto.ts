import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  payment_name: string;

  @IsNumber()
  @IsNotEmpty()
  money: number;

  @IsDateString()
  @IsNotEmpty()
  payment_time: string;

  @IsNumber()
  @IsNotEmpty()
  period_id: number;
}

export class UpdatePaymentDto {
  payment_name?: string;
  money?: number;
  payment_time?: string;
  period_id?: number;
  updated_date?: string;
}