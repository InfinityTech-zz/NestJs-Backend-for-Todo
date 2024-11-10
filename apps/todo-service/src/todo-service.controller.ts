import { Controller } from '@nestjs/common';
import { TodoServiceService } from './todo-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

type FindPayload = {
  id: string;
};

type UpdatePayload = {
  id: string;
  updateTodoDto: Prisma.TodosUpdateInput;
};

type UFindByStatusPayload = {
  id: string;
  status: string;
};

@Controller()
export class TodoServiceController {
  constructor(private readonly todoServiceService: TodoServiceService) {}

  @MessagePattern('todos.healthinfo')
  getHealth(): string {
    console.log('called');
    return this.todoServiceService.getHealth();
  }

  @MessagePattern('todos.create')
  async insertUser(@Payload() data: Prisma.TodosCreateInput): Promise<any> {
    console.log('insert Todos actual service');
    return this.todoServiceService.createUser(data);
  }

  @MessagePattern('todos.findallbyuserid')
  async findAllTodos(@Payload() data: FindPayload): Promise<any> {
    console.log('Find Todo actual service');
    return this.todoServiceService.findTodosByUserId(data.id);
  }

  @MessagePattern('todos.findallbyuserstatus')
  async findTodoByStatusUser(
    @Payload() data: UFindByStatusPayload,
  ): Promise<any> {
    console.log('Find Todo actual service');
    return this.todoServiceService.findTodoByStatusUser(data.id, data.status);
  }

  @MessagePattern('todos.findone')
  async findOneTodo(@Payload() data: FindPayload): Promise<any> {
    console.log('Find One Todo actual service', data);
    return this.todoServiceService.findOneTodo(data.id);
  }

  @MessagePattern('todos.update')
  async updateOneTodo(@Payload() data: UpdatePayload): Promise<any> {
    console.log('Update One Todo actual service', data);
    return this.todoServiceService.updateOneTodo(data);
  }

  @MessagePattern('todos.delete')
  async deleteOneTodo(@Payload() data: FindPayload): Promise<any> {
    console.log('Delete One Todo actual service', data);
    return this.todoServiceService.deleteOneTodo(data.id);
  }
}
