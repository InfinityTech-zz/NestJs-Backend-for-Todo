import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type UpdatePayload = {
  id: string;
  updateTodoDto: Prisma.TodosUpdateInput;
};

@Injectable()
export class TodoServiceService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  getHealth(): string {
    return 'Hello World! todo service';
  }

  async createUser(data: Prisma.TodosCreateInput): Promise<any> {
    console.log('data', data);
    return this.todos.create({ data: data });
  }

  async findTodosByUserId(id: string): Promise<any> {
    return this.todos.findMany({ where: { userId: id } });
  }
  async findOneTodo(todoid: string): Promise<any> {
    return this.user.findUnique({ where: { id: todoid } });
  }
  async findTodoByStatusUser(userid: string, status: any): Promise<any> {
    return this.todos.findMany({ where: { userId: userid, status: status } });
  }
  async updateOneTodo(data: UpdatePayload): Promise<any> {
    console.log('data from actual service', data);
    return this.todos.update({
      where: { id: data.id },
      data: data.updateTodoDto,
    });
  }
  async deleteOneTodo(id: string): Promise<any> {
    return this.todos.delete({ where: { id: id } });
  }
}
