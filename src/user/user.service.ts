/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';

interface Entity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IUser extends Entity {
  name: string;
  age: number;
}

interface Company extends Entity {
  director: IUser;
  subDirector: Entity;
}

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto) {
    this.users.push({ id: this.users.length + 1, ...createUserDto });
    return this.users[this.users.length - 1];
  }

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    return this.users.find((user) => user.id === id);
  } /*

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }*/

  remove(id: number) {
    return `User ${id} as been removed`;
  }

  private users: IUser[] = [
    {
      id: 1,
      name: 'Jack',
      age: 29,
    },
    {
      id: 2,
      name: 'Mathéo',
      age: 19,
    },
    {
      id: 3,
      name: 'Robert',
      age: 72,
    },
  ];
}
