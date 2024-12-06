import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() request: { email: string; password: string }) {
    console.log('request', request);
    return this.usersService.createUser(
      new User({
        email: request.email,
        password: request.password
      }),
    );
  }

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }
}
