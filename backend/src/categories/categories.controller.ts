import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new custom category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateCategoryDto,
  ) {
    const category = await this.categoriesService.createCategory(userId, dto);
    return {
      success: true,
      data: category,
      message: 'Category created successfully',
    };
  }

  @ApiOperation({
    summary: 'Get all categories (system defaults + user custom)',
  })
  @ApiResponse({ status: 200, description: 'List of categories' })
  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    const categoriesList =
      await this.categoriesService.findAllCategories(userId);
    return {
      success: true,
      data: categoriesList,
    };
  }

  @ApiOperation({ summary: 'Get a specific category by ID' })
  @ApiResponse({ status: 200, description: 'Category details' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id')
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const category = await this.categoriesService.findCategoryById(id, userId);
    return {
      success: true,
      data: category,
    };
  }

  @ApiOperation({ summary: 'Update a custom category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({
    status: 403,
    description: 'System default categories cannot be modified',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.updateCategory(
      id,
      userId,
      dto,
    );
    return {
      success: true,
      data: category,
      message: 'Category updated successfully',
    };
  }

  @ApiOperation({ summary: 'Delete a custom category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'System default categories cannot be deleted',
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Delete(':id')
  async remove(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.categoriesService.deleteCategory(id, userId);
  }
}
