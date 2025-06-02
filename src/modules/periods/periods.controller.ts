import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePeriodDto, UpdatePeriodDto } from './dto/periods.dto';
import { Request } from 'express';

@Controller('periods')
@UseGuards(JwtAuthGuard)
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Get()
  async getUserPeriods(@Req() req: Request & { user: { id: number } }) {
    return this.periodsService.getUserPeriods(req.user.id);
  }

  @Post()
  async createPeriod(
    @Body() data: CreatePeriodDto,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.periodsService.createPeriod(data, req.user.id);
  }

  @Get(':id')
  async getPeriodById(
    @Param('id') id: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.periodsService.getPeriodById(Number(id), req.user.id);
  }

  @Get('category/:categoryId')
  async getCategoryPeriods(
    @Param('categoryId') categoryId: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.periodsService.getCategoryPeriods(Number(categoryId), req.user.id);
  }

  @Put(':id/category/:categoryId')
  async updatePeriod(
    @Param('id') periodId: string,
    @Param('categoryId') categoryId: string,
    @Body() data: UpdatePeriodDto,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.periodsService.updatePeriod(Number(periodId), Number(categoryId), data, req.user.id);
  }

  @Delete(':id/category/:categoryId')
  async deletePeriod(
    @Param('id') periodId: string,
    @Param('categoryId') categoryId: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.periodsService.deletePeriod(Number(periodId), Number(categoryId), req.user.id);
  }
}
