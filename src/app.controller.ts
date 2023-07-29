import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }

  /*@Get('/user')
  getUser(): string[] {
    return this.appService.findUsersByName();
  }*/
}
