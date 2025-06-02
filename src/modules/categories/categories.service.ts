import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';

@Injectable()
export class CategoriesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { category_name, user_id, notification } = createCategoryDto;
    return this.prisma.category.create({
      data: {
        category_name,
        user_id,
        notification: notification ?? false,
        created_date: new Date(),
        updated_date: new Date(),
      },
    });
  }

  async getUserCategories(userId: number) {
    return this.prisma.category.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_date: 'desc',
      },
    });
  }

  async getCategoryById(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async deleteCategory(categoryId: number, userId: number) {
    try {
      // First verify the category exists and belongs to the user
      const category = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
          user_id: userId,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found or you do not have permission to delete it');
      }

      // Delete all payments for each period in this category
      await this.prisma.payment.deleteMany({
        where: {
          period: {
            category_id: categoryId,
          },
        },
      });

      // Delete all subscriptions for this category
      await this.prisma.subscription.deleteMany({
        where: {
          category_id: categoryId,
        },
      });

      // Delete all periods for this category
      await this.prisma.period.deleteMany({
        where: {
          category_id: categoryId,
        },
      });

      // Finally, delete the category
      return await this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete category: ' + error.message);
    }
  }
} 