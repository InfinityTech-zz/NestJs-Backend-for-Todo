import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class AuthServiceService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  getHealth(): string {
    return 'Hello World from Auth Servicve !';
  }
  async createAuth(data: Prisma.CredentialsCreateInput): Promise<any> {
    console.log('data', data);
    return this.credentials.create({ data: data });
  }
}
