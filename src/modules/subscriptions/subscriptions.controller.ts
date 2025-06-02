import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/subscriptions.dto';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  async createSubscription(@Body() data: CreateSubscriptionDto) {
    console.log(data);
    return this.subscriptionsService.createSubscription(data);
  }

  @Get()
  async getAllSubscriptions() {
    return this.subscriptionsService.getAllSubscriptions();
  }

  @Get(':id')
  async getSubscriptionById(@Param('id') id: string) {
    return this.subscriptionsService.getSubscriptionById(Number(id));
  }

  @Get('category/:categoryId')
  async getCategorySubscriptions(@Param('categoryId') categoryId: string) {
    return this.subscriptionsService.getCategorySubscriptions(Number(categoryId));
  }

  @Put(':id')
  async updateSubscription(
    @Param('id') id: string,
    @Body() data: UpdateSubscriptionDto
  ) {
    return this.subscriptionsService.updateSubscription(Number(id), data);
  }

  @Delete(':id')
  async deleteSubscription(@Param('id') id: string) {
    return this.subscriptionsService.deleteSubscription(Number(id));
  }
}
