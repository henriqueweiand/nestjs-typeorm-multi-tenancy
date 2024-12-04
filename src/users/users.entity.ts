import { Entity, PrimaryGeneratedColumn, Column, Unique, DeepPartial } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor(partial: DeepPartial<User>) {
    Object.assign(this, partial);
  }
}