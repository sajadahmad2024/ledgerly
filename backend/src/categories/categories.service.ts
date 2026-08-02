import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(userId: string, dto: CreateCategoryDto) {
    return await this.categoriesRepository.create({
      userId,
      name: dto.name,
      type: dto.type,
      icon: dto.icon,
      color: dto.color,
      isDefault: false,
    });
  }

  async findAllCategories(userId: string) {
    return await this.categoriesRepository.findByUserId(userId);
  }

  async findCategoryById(id: string, userId: string) {
    const category = await this.categoriesRepository.findById(id, userId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, userId: string, dto: UpdateCategoryDto) {
    const category = await this.findCategoryById(id, userId);

    // Prevent modifying system default categories
    if (category.isDefault || category.userId === null) {
      throw new ForbiddenException(
        'System default categories cannot be modified',
      );
    }

    const updated = await this.categoriesRepository.update(id, userId, dto);
    if (!updated) {
      throw new NotFoundException('Category not found');
    }
    return updated;
  }

  async deleteCategory(id: string, userId: string) {
    const category = await this.findCategoryById(id, userId);

    // Prevent deleting system default categories
    if (category.isDefault || category.userId === null) {
      throw new ForbiddenException(
        'System default categories cannot be deleted',
      );
    }

    const deleted = await this.categoriesRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundException('Category not found');
    }
    return { success: true, message: 'Category deleted successfully' };
  }
}
