/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { Client } from 'pg';
//import { UpdateUserDto } from './dto/update-user.dto';

interface Entity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IUser extends Entity {
  name: string;
  password: number;
}

@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private db: Client) {}

  createUser(createUserDto: CreateUserDto) {
    // const
    return createUserDto;
  }

  async findAll(): Promise<IUser[]> {
    const res = await this.db.query<IUser>('SELECT * FROM users;');
    return res.rows;
  }

  async findOne(id: number): Promise<IUser> {
    const res = await this.db.query<IUser>('SELECT * FROM users WHERE id=$1', [
      id,
    ]);
    return res.rows[0];
  } /*

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }*/

  remove(id: number) {
    return `User ${id} as been removed`;
  }
}
