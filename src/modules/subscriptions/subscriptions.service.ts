import { Injectable } from '@nestjs/common';
import { database } from '../../db/db';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto/subscriptions.dto';

@Injectable()
export class SubscriptionsService {
  async createSubscription(data: CreateSubscriptionDto) {
    console.log(data);
    return database.subscription.create({
      data: {
        ...data,
        payment_date: new Date(data.payment_date).toISOString(),
      },
      include: {
        category: true,
      },
    });
  }

  async getAllSubscriptions() {
    return database.subscription.findMany({
      include: {
        category: true,
      },
      orderBy: {
        payment_date: 'desc',
      },
    });
  }

  async getSubscriptionById(id: number) {
    return database.subscription.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async getCategorySubscriptions(categoryId: number) {
    return database.subscription.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        payment_date: 'desc',
      },
    });
  }

  async updateSubscription(id: number, data: UpdateSubscriptionDto) {
    const updateData = { ...data };
    if (data.payment_date) {
      updateData.payment_date = new Date(data.payment_date).toISOString();
    }

    return database.subscription.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });
  }

  async deleteSubscription(id: number) {
    return database.subscription.delete({
      where: { id },
    });
  }
}
