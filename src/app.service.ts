/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}

  getHello(): string {
    return 'Hello Nest !!!';
  }
  getTest(): string {
    return 'Test Valid !';
  }
}
