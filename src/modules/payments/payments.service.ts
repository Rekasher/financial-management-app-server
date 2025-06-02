import { Injectable } from '@nestjs/common';
import { database } from '../../db/db';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payments.dto';

@Injectable()
export class PaymentsService {
  async createPayment(data: CreatePaymentDto, userId: number) {
    // First verify that the period belongs to a category owned by the user
    const period = await database.period.findUnique({
      where: { id: data.period_id },
      include: { category: true }
    });

    if (!period || period.category.user_id !== userId) {
      throw new Error('Period not found or not authorized');
    }

    return database.payment.create({
      data: {
        ...data,
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      },
    });
  }

  async getUserPayments(userId: number) {
    return database.payment.findMany({
      where: {
        period: {
          category: {
            user_id: userId
          }
        }
      },
      include: {
        period: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        payment_time: 'desc'
      }
    });
  }

  async getPaymentById(id: number, userId: number) {
    const payment = await database.payment.findUnique({
      where: { id },
      include: {
        period: {
          include: {
            category: true
          }
        }
      }
    });

    if (!payment || payment.period.category.user_id !== userId) {
      throw new Error('Payment not found or not authorized');
    }

    return payment;
  }

  async getPeriodPayments(periodId: number, userId: number) {
    // First verify that the period belongs to a category owned by the user
    const period = await database.period.findUnique({
      where: { id: periodId },
      include: { category: true }
    });

    if (!period || period.category.user_id !== userId) {
      throw new Error('Period not found or not authorized');
    }

    return database.payment.findMany({
      where: {
        period_id: periodId
      },
      orderBy: {
        payment_time: 'desc'
      }
    });
  }

  async updatePayment(id: number, data: UpdatePaymentDto, userId: number) {
    // First verify that the payment belongs to a period owned by the user
    const payment = await database.payment.findUnique({
      where: { id },
      include: {
        period: {
          include: {
            category: true
          }
        }
      }
    });

    if (!payment || payment.period.category.user_id !== userId) {
      throw new Error('Payment not found or not authorized');
    }

    return database.payment.update({
      where: { id },
      data: {
        ...data,
        updated_date: new Date().toISOString(),
      },
    });
  }

  async deletePayment(id: number, userId: number) {
    // First verify that the payment belongs to a period owned by the user
    const payment = await database.payment.findUnique({
      where: { id },
      include: {
        period: {
          include: {
            category: true
          }
        }
      }
    });

    if (!payment || payment.period.category.user_id !== userId) {
      throw new Error('Payment not found or not authorized');
    }

    return database.payment.delete({
      where: { id },
    });
  }
}
