import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payments.dto';
import { Request } from 'express';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(
    @Body() data: CreatePaymentDto,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.paymentsService.createPayment(data, req.user.id);
  }

  @Get()
  async getUserPayments(@Req() req: Request & { user: { id: number } }) {
    return this.paymentsService.getUserPayments(req.user.id);
  }

  @Get(':id')
  async getPaymentById(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.paymentsService.getPaymentById(Number(id), req.user.id);
  }

  @Get('period/:periodId')
  async getPeriodPayments(
    @Param('periodId') periodId: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.paymentsService.getPeriodPayments(Number(periodId), req.user.id);
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() data: UpdatePaymentDto,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.paymentsService.updatePayment(Number(id), data, req.user.id);
  }

  @Delete(':id')
  async deletePayment(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.paymentsService.deletePayment(Number(id), req.user.id);
  }
}
