import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService, IUser } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
    if (isNaN(id)) {
      throw new Error('invalid user id');
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    return user;
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const userIsUpdated = await this.userService.update(id, updateUserDto);
    if (!userIsUpdated) {
      return `User ${id} not found`;
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      throw new Error('invalid user id');
    }

    const userDeleted = await this.userService.remove(id);
    if (!userDeleted) {
      throw new Error(`User ${id} not found`);
    }
    return userDeleted;
  }
}
