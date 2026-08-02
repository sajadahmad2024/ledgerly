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
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiOperation({ summary: 'Create a new financial account' })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateAccountDto,
  ) {
    const account = await this.accountsService.createAccount(userId, dto);
    return {
      success: true,
      data: account,
      message: 'Account created successfully',
    };
  }

  @ApiOperation({ summary: 'Get all active accounts for authenticated user' })
  @ApiResponse({ status: 200, description: 'List of accounts' })
  @Get()
  async findAll(@CurrentUser('id') userId: string) {
    const accounts = await this.accountsService.findAllAccounts(userId);
    return {
      success: true,
      data: accounts,
    };
  }

  @ApiOperation({ summary: 'Get a specific account by ID' })
  @ApiResponse({ status: 200, description: 'Account details' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @Get(':id')
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const account = await this.accountsService.findAccountById(id, userId);
    return {
      success: true,
      data: account,
    };
  }

  @ApiOperation({ summary: 'Update an existing account' })
  @ApiResponse({ status: 200, description: 'Account updated successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAccountDto,
  ) {
    const account = await this.accountsService.updateAccount(id, userId, dto);
    return {
      success: true,
      data: account,
      message: 'Account updated successfully',
    };
  }

  @ApiOperation({ summary: 'Soft archive an account' })
  @ApiResponse({ status: 200, description: 'Account archived successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @Delete(':id')
  async archive(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const account = await this.accountsService.archiveAccount(id, userId);
    return {
      success: true,
      data: account,
      message: 'Account archived successfully',
    };
  }
}
