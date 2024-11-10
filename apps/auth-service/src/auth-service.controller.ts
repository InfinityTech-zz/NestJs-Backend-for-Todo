import { Controller, Get } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}
  @MessagePattern('auth.gethealth')
  getHealth(): string {
    console.log('called');
    return this.authServiceService.getHealth();
  }

  @MessagePattern('auth.create')
  async insertUser(
    @Payload() data: Prisma.CredentialsCreateInput,
  ): Promise<any> {
    console.log('insert Auth actual service');
    return this.authServiceService.createAuth(data);
  }

  // @MessagePattern('todos.findallbyuserid')
  // async findAllTodos(@Payload() data: FindPayload): Promise<any> {
  //   console.log('Find Todo actual service');
  //   return this.authServiceService.findTodosByUserId(data.id);
  // }

  // @MessagePattern('todos.findallbyuserstatus')
  // async findTodoByStatusUser(
  //   @Payload() data: UFindByStatusPayload,
  // ): Promise<any> {
  //   console.log('Find Todo actual service');
  //   return this.authServiceService.findTodoByStatusUser(data.id, data.status);
  // }

  // @MessagePattern('todos.findone')
  // async findOneTodo(@Payload() data: FindPayload): Promise<any> {
  //   console.log('Find One Todo actual service', data);
  //   return this.authServiceService.findOneTodo(data.id);
  // }

  // @MessagePattern('todos.update')
  // async updateOneTodo(@Payload() data: UpdatePayload): Promise<any> {
  //   console.log('Update One Todo actual service', data);
  //   return this.authServiceService.updateOneTodo(data);
  // }

  // @MessagePattern('todos.delete')
  // async deleteOneTodo(@Payload() data: FindPayload): Promise<any> {
  //   console.log('Delete One Todo actual service', data);
  //   return this.authServiceService.deleteOneTodo(data.id);
  // }
}
