import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { ToDoModule } from './to-do/to-do.module';

@Module({
  imports: [UserModule, DbModule, EntrepriseModule, ToDoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
