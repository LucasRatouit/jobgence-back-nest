import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Client } from 'pg';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { insert, select, update } from 'src/utils/ormMethods';
import { IUser } from 'src/user/user.service';
import { entrepriseSerializer } from './utils';

@Injectable()
export class EntrepriseService {
  constructor(@Inject(PG_CONNECTION) private db: Client) {}

  async create(createEntrepriseDto: CreateEntrepriseDto) {
    const res = await insert(this.db, 'entreprises', createEntrepriseDto);
    return res.rows[0];
  }

  async findAll() {
    const res = await select(this.db, entrepriseSerializer(), 'entreprises', {
      deleted_at: null,
    });
    return res.rows;
  }

  async findOne(id: number) {
    const res = await select(this.db, '*', 'entreprises', {
      id,
      deleted_at: null,
    });
    return res.rows[0];
  }

  async update(id: number, updateEntrepriseDto: UpdateEntrepriseDto) {
    const res = await update<IUser>(
      this.db,
      'entreprises',
      updateEntrepriseDto,
      {
        id,
      },
      entrepriseSerializer(),
    );
    return res.rows[0];
  }

  async remove(id: number) {
    const res = await update<IUser>(
      this.db,
      'entreprises',
      { deleted_at: 'now()' },
      {
        id,
      },
      entrepriseSerializer(),
    );
    return res.rows[0];
  }
}
