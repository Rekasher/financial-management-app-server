import { Injectable } from '@nestjs/common';
import { database } from '../../db/db';
import { CreatePeriodDto, UpdatePeriodDto } from './dto/periods.dto';

@Injectable()
export class PeriodsService {
  async getUserPeriods(userId: number) {
    return database.period.findMany({
      where: {
        category: {
          user_id: userId
        }
      },
      include: {
        category: true
      },
      orderBy: {
        start_date: 'desc'
      }
    });
  }

  async createPeriod(data: CreatePeriodDto, userId: number) {
    // First verify that the category belongs to the user
    const category = await database.category.findUnique({
      where: { id: data.category_id }
    });

    if (!category || category.user_id !== userId) {
      throw new Error('Category not found or not authorized');
    }

    return database.period.create({
      data: {
        ...data,
      },
    });
  }

  async getPeriodById(id: number, userId: number) {
    const period = await database.period.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!period || period.category.user_id !== userId) {
      throw new Error('Period not found or not authorized');
    }

    return period;
  }

  async getCategoryPeriods(categoryId: number, userId: number) {
    // First verify that the category belongs to the user
    const category = await database.category.findUnique({
      where: { id: categoryId }
    });

    if (!category || category.user_id !== userId) {
      throw new Error('Category not found or not authorized');
    }

    return database.period.findMany({
      where: {
        category_id: categoryId
      },
      orderBy: {
        start_date: 'desc'
      }
    });
  }

  async updatePeriod(periodId: number, categoryId: number, data: UpdatePeriodDto, userId: number) {
    // First verify that the period belongs to a category owned by the user
    const period = await database.period.findUnique({
      where: {
        id: periodId,
        category_id: categoryId
      },
      include: {
        category: true
      }
    });

    if (!period || period.category.user_id !== userId) {
      throw new Error('Period not found or not authorized');
    }

    return database.period.update({
      where: {
        id: periodId,
        category_id: categoryId
      },
      data: {
        ...data,
      }
    });
  }

  async deletePeriod(periodId: number, categoryId: number, userId: number) {
    // First verify that the period belongs to a category owned by the user
    const period = await database.period.findUnique({
      where: {
        id: periodId,
        category_id: categoryId
      },
      include: {
        category: true
      }
    });

    if (!period || period.category.user_id !== userId) {
      throw new Error('Period not found or not authorized');
    }

    return database.period.delete({
      where: {
        id: periodId,
        category_id: categoryId
      }
    });
  }
}
