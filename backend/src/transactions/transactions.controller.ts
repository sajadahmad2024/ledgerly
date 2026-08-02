import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Record a new financial transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction recorded successfully',
  })
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateTransactionDto,
  ) {
    const transaction = await this.transactionsService.createTransaction(
      userId,
      dto,
    );
    return {
      success: true,
      data: transaction,
      message: 'Transaction recorded successfully',
    };
  }

  @ApiOperation({
    summary: 'Get paginated list of transactions for authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Paginated transactions list' })
  @Get()
  async findAll(
    @CurrentUser('id') userId: string,
    @Query() query: PaginationQueryDto,
  ) {
    const paginatedResult =
      await this.transactionsService.findAllTransactions(userId, query);
    return {
      success: true,
      data: paginatedResult,
    };
  }

  @ApiOperation({ summary: 'Calculate virtual balance for an account' })
  @ApiResponse({ status: 200, description: 'Account virtual balance' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @Get('balance/:accountId')
  async getBalance(
    @CurrentUser('id') userId: string,
    @Param('accountId', ParseUUIDPipe) accountId: string,
  ) {
    const balanceData = await this.transactionsService.getAccountBalance(
      accountId,
      userId,
    );
    return {
      success: true,
      data: balanceData,
    };
  }

  @ApiOperation({ summary: 'Get a specific transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction details' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Get(':id')
  async findOne(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const transaction = await this.transactionsService.findTransactionById(
      id,
      userId,
    );
    return {
      success: true,
      data: transaction,
    };
  }

  @ApiOperation({ summary: 'Update a transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Patch(':id')
  async update(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionsService.updateTransaction(
      id,
      userId,
      dto,
    );
    return {
      success: true,
      data: transaction,
      message: 'Transaction updated successfully',
    };
  }

  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiResponse({
    status: 200,
    description: 'Transaction deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Delete(':id')
  async remove(
    @CurrentUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.transactionsService.deleteTransaction(id, userId);
  }
}
