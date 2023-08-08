import { Injectable, Inject } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { PG_CONNECTION } from 'src/constants';
import { Client } from 'pg';
import { insert, select, update } from 'src/utils/ormMethods';

@Injectable()
export class ToDoService {
  constructor(@Inject(PG_CONNECTION) private db: Client) {}

  async create(createToDoDto: CreateToDoDto) {
    const res = await insert(this.db, 'todo', createToDoDto);
    return res.rows[0];
  }

  async findAll() {
    const res = await select<CreateToDoDto>(this.db, '*', 'todo', {
      deleted_at: null,
    });
    return res.rows.sort((a, b) => a.id - b.id);
  }

  async update(id: number, updateToDoDto: UpdateToDoDto) {
    const res = await update<CreateToDoDto[]>(this.db, 'todo', updateToDoDto, {
      id,
    });
    return res.rows[0];
  }

  async remove(id: number) {
    const res = await update(this.db, 'todo', { deleted_at: 'now()' }, { id });
    return res.rows[0];
  }
}
