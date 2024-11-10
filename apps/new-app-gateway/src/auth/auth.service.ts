import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type UserDetails = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_CLIENT') private authProxy: ClientProxy,
    @Inject('USER_CLIENT') private userProxy: ClientProxy,
  ) {}

  getHealth() {
    return this.authProxy.send('auth.gethealth', {});
  }
  async create(createAuthDto: UserDetails) {
    const userid = this.userProxy.send('user.getuseridbyemail', {
      email: createAuthDto.email,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let userFoundid: any;
    userid.subscribe({
      next: async (data) => {
        console.log('acual data', data);
        userFoundid = data.id;
      },
      error: (e) => console.error(e),
      complete: () => console.log('complete'),
    });
    const saltOrRounds = 10;
    const password = createAuthDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return this.authProxy.send('auth.create', {
      userid: userFoundid,
      password: hash,
    });
    // userid.subscribe((data) => console.log(data));
    //console.log('userid', userid);
    //return this.authProxy.send('auth.create', createAuthDto);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
