import { Controller } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

type FindPayload = {
  id: string;
};

type UpdatePayload = {
  id: string;
  updateUserDto: Prisma.UserUpdateInput;
};

@Controller()
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @MessagePattern('user.healthinfo')
  getHealth(): string {
    console.log('called');
    return this.userDetailsService.getHealth();
  }

  @MessagePattern('user.create')
  async insertUser(@Payload() data: Prisma.UserCreateInput): Promise<any> {
    console.log('insert User actual service');
    return this.userDetailsService.createUser(data);
  }

  @MessagePattern('user.findall')
  async findAllUser(): Promise<any> {
    console.log('Find User actual service');
    return this.userDetailsService.findUser();
  }

  @MessagePattern('user.findOne')
  async findOneUser(@Payload() data: FindPayload): Promise<any> {
    console.log('Find One User actual service', data);
    return this.userDetailsService.findOneUser(data.id);
  }

  @MessagePattern('user.update')
  async updateOneUser(@Payload() data: UpdatePayload): Promise<any> {
    console.log('Update One User actual service', data);
    return this.userDetailsService.updateOneUser(data);
  }

  @MessagePattern('user.delete')
  async deleteUser(@Payload() data: FindPayload): Promise<any> {
    console.log('Delete One User actual service', data);
    return this.userDetailsService.deleteOneUser(data.id);
  }

  @MessagePattern('user.getuseridbyemail')
  async getUserIdByEmail(@Payload() data: any): Promise<any> {
    console.log('Fetch User by email actual service', data);
    return this.userDetailsService.getUserIdByEmail(data.email);
  }
}
