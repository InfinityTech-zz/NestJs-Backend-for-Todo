import { Module } from '@nestjs/common';
import { UserDetailsController } from './user-details.controller';
import { UserDetailsService } from './user-details.service';
@Module({
  imports: [],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
})
export class UserDetailsModule {}
