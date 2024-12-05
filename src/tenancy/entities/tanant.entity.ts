import { Column, DeepPartial, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant')
export class Tenant {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ name: 'connection_type' })
  connectionType: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'host' })
  host: string;

  @Column({ name: 'database_name' })
  database: string;

  @Column()
  port: number;

  constructor(partial: DeepPartial<Tenant>) {
    Object.assign(this, partial);
  }
}