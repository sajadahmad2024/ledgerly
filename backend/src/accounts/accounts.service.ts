import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async createAccount(userId: string, dto: CreateAccountDto) {
    const currency = dto.currency ? dto.currency.toUpperCase() : 'INR';
    return await this.accountsRepository.create({
      userId,
      name: dto.name,
      type: dto.type,
      currency,
    });
  }

  async findAllAccounts(userId: string) {
    return await this.accountsRepository.findByUserId(userId);
  }

  async findAccountById(id: string, userId: string) {
    const account = await this.accountsRepository.findById(id, userId);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async updateAccount(id: string, userId: string, dto: UpdateAccountDto) {
    await this.findAccountById(id, userId);

    const updateData = {
      ...dto,
      ...(dto.currency ? { currency: dto.currency.toUpperCase() } : {}),
    };

    const updated = await this.accountsRepository.update(
      id,
      userId,
      updateData,
    );
    if (!updated) {
      throw new NotFoundException('Account not found');
    }
    return updated;
  }

  async archiveAccount(id: string, userId: string) {
    await this.findAccountById(id, userId);

    const archived = await this.accountsRepository.update(id, userId, {
      isArchived: true,
    });
    return archived;
  }
}
