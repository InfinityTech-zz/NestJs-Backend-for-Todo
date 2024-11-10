import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

type UpdatePayload = {
  id: string;
  updateUserDto: Prisma.UserUpdateInput;
};

@Injectable()
export class UserDetailsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  getHealth(): string {
    return 'Hello User Service!hghggh123456';
  }
  async createUser(data: any): Promise<any> {
    console.log(data);
    return this.user.create({ data: data });
  }
  async findUser(): Promise<any> {
    return this.user.findMany();
  }
  async findOneUser(dataid: string): Promise<any> {
    return this.user.findUnique({ where: { id: dataid } });
  }
  async updateOneUser(data: UpdatePayload): Promise<any> {
    return this.user.update({
      where: { id: data.id },
      data: data.updateUserDto,
    });
  }
  async deleteOneUser(id: string): Promise<any> {
    return this.user.delete({ where: { id: id } });
  }
  async getUserIdByEmail(email: string): Promise<any> {
    return this.user.findUnique({ where: { email: email } });
  }
}
