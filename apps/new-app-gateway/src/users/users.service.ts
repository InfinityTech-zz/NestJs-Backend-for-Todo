import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_CLIENT') private userProxy: ClientProxy) {}

  getInfo() {
    console.log('client Service');
    return this.userProxy.send('user.healthinfo', {});
  }

  create(createUserDto: Prisma.UserCreateInput) {
    return this.userProxy.send('user.create', createUserDto);
  }

  findAll() {
    return this.userProxy.send('user.findall', {});
  }

  findOne(id: string) {
    console.log('id', id);
    return this.userProxy.send('user.findOne', { id });
  }

  update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    console.log('updateUserDto', updateUserDto);
    return this.userProxy.send('user.update', { id, updateUserDto });
  }

  remove(id: string) {
    return this.userProxy.send('user.delete', { id });
  }
}
