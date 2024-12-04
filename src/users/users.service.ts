import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DatabaseService } from '../database/database.service';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;

  constructor(
    private readonly databaseService: DatabaseService
  ) {

  }

  async createUser(user: User) {
    this.userRepository = this.databaseService.getDatabase().getRepository(User);
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    this.userRepository = this.databaseService.getDatabase().getRepository(User);
    return this.userRepository.find();
  }
}
