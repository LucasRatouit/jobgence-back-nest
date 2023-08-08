/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Client } from 'pg';
import { insert, select, update } from 'src/utils/ormMethods';
import { usersSerializer } from './utils';

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

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const res = await insert<IUser>(this.db, 'users', createUserDto);
    return res.rows[0];
  }

  async findAll(): Promise<IUser[]> {
    // const res = await this.db.query<IUser>(
    //   'SELECT * FROM users WHERE deleted_at=null;',
    // );
    const res = await select<IUser>(this.db, ['*'], 'users', {
      deleted_at: null,
    });
    return res.rows;
  }

  async findOne(id: number): Promise<IUser> {
    const res = await select<IUser>(this.db, ['*'], 'users', {
      id,
      deleted_at: null,
    });
    if (!res.rowCount) {
      return res.rowCount[0];
    }

    return res.rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const res = await update(
      this.db,
      'users',
      updateUserDto,
      { id },
      usersSerializer(),
    );
    return res.rows[0];
  }

  async remove(id: number) {
    const res = await update(
      this.db,
      'users',
      { deleted_at: 'now()' },
      { id },
      usersSerializer(),
    );
    return res.rows[0];
  }
}
