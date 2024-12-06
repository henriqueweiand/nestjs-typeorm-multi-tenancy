import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './users.entity';
import { DatabaseService } from 'src/libs/database/database.service';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;

  constructor(
    private readonly databaseService: DatabaseService
  ) {

  }

  async createUser(user: User) {
    this.userRepository = this.databaseService.getDataSource().getRepository(User);
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    this.userRepository = this.databaseService.getDataSource().getRepository(User);
    return this.userRepository.find();
  }
}
