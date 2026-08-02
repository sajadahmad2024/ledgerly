import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { AccountsRepository } from '../accounts/accounts.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { PaginationQueryDto, PaginatedResult } from '../common/dto/pagination-query.dto';
import { Transaction } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly accountsRepository: AccountsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createTransaction(userId: string, dto: CreateTransactionDto) {
    // 1. Verify account exists and belongs to authenticated user
    const account = await this.accountsRepository.findById(
      dto.accountId,
      userId,
    );
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // 2. Verify category exists if provided
    if (dto.categoryId) {
      const category = await this.categoriesRepository.findById(
        dto.categoryId,
        userId,
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    const transactionDate = dto.transactionDate
      ? new Date(dto.transactionDate)
      : new Date();

    return await this.transactionsRepository.create({
      userId,
      accountId: dto.accountId,
      categoryId: dto.categoryId ?? null,
      type: dto.type,
      amount: dto.amount.toString(),
      description: dto.description ?? null,
      notes: dto.notes ?? null,
      transactionDate,
    });
  }

  async findAllTransactions(
    userId: string,
    query: PaginationQueryDto,
  ): Promise<PaginatedResult<Transaction>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { items, total } = await this.transactionsRepository.findByUserId(
      userId,
      page,
      limit,
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  async findTransactionById(id: string, userId: string) {
    const transaction = await this.transactionsRepository.findById(id, userId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async updateTransaction(
    id: string,
    userId: string,
    dto: UpdateTransactionDto,
  ) {
    await this.findTransactionById(id, userId);

    if (dto.accountId) {
      const account = await this.accountsRepository.findById(
        dto.accountId,
        userId,
      );
      if (!account) {
        throw new NotFoundException('Account not found');
      }
    }

    if (dto.categoryId) {
      const category = await this.categoriesRepository.findById(
        dto.categoryId,
        userId,
      );
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    const updateData: Record<string, unknown> = {};

    if (dto.accountId) updateData.accountId = dto.accountId;
    if (dto.categoryId !== undefined) updateData.categoryId = dto.categoryId;
    if (dto.type) updateData.type = dto.type;
    if (dto.amount !== undefined) updateData.amount = dto.amount.toString();
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.notes !== undefined) updateData.notes = dto.notes;
    if (dto.transactionDate)
      updateData.transactionDate = new Date(dto.transactionDate);

    const updated = await this.transactionsRepository.update(
      id,
      userId,
      updateData,
    );
    if (!updated) {
      throw new NotFoundException('Transaction not found');
    }
    return updated;
  }

  async deleteTransaction(id: string, userId: string) {
    await this.findTransactionById(id, userId);
    const deleted = await this.transactionsRepository.delete(id, userId);
    if (!deleted) {
      throw new NotFoundException('Transaction not found');
    }
    return { success: true, message: 'Transaction deleted successfully' };
  }

  async getAccountBalance(accountId: string, userId: string) {
    const account = await this.accountsRepository.findById(accountId, userId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const balance = await this.transactionsRepository.calculateAccountBalance(
      accountId,
      userId,
    );
    return {
      accountId,
      accountName: account.name,
      currency: account.currency,
      balance,
    };
  }
}
