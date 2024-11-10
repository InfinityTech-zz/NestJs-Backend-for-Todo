import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [
    ClientsModule.register([
      {
        name: 'TODOS_CLIENT',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
})
export class TodosModule {}
