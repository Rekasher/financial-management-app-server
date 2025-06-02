import { Controller, Post, Get, Body, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesDto } from './dto/categories.dto';
import { Request } from 'express';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() data: CategoriesDto, @Req() req: Request & { user: { id: number } }) {
    return this.categoriesService.create({
      ...data,
      user_id: req.user.id,
    });
  }

  @Get()
  async getUserCategories(@Req() req: Request & { user: { id: number } }) {
    console.log('Creating category for user ID:', req.user.id);
    return this.categoriesService.getUserCategories(req.user.id);
  }

  @Get(':id')
  async getCategoryById(@Param('id') categoryId: string) {
    return this.categoriesService.getCategoryById(Number(categoryId));
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id') categoryId: string,
    @Req() req: Request & { user: { id: number } }
  ) {
    return this.categoriesService.deleteCategory(Number(categoryId), req.user.id);
  }
} 