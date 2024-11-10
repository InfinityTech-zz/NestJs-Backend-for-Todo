import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(@Inject('TODOS_CLIENT') private todosProxy: ClientProxy) {}

  getInfo() {
    return this.todosProxy.send('todos.healthinfo', {});
  }

  create(createTodoDto: Prisma.TodosCreateInput) {
    return this.todosProxy.send('todos.create', createTodoDto);
  }

  findAll(userid: string) {
    return this.todosProxy.send('todos.findallbyuserid', { id: userid });
  }

  findOne(id: string) {
    return this.todosProxy.send('todos.findone', { id });
  }

  findAllByStatus(userid: string, status: string) {
    return this.todosProxy.send('todos.findallbyuserstatus', {
      id: userid,
      status: status,
    });
  }

  update(id: string, updateTodoDto: Prisma.TodosUpdateInput) {
    return this.todosProxy.send('todos.update', { id, updateTodoDto });
  }

  remove(id: string) {
    return this.todosProxy.send('todos.delete', { id });
  }
}
