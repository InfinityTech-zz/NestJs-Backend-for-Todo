import { Test, TestingModule } from '@nestjs/testing';
import { UserDetailsController } from './user-details.controller';
import { UserDetailsService } from './user-details.service';

describe('UserDetailsController', () => {
  let userDetailsController: UserDetailsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserDetailsController],
      providers: [UserDetailsService],
    }).compile();

    userDetailsController = app.get<UserDetailsController>(UserDetailsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userDetailsController.getHello()).toBe('Hello World!');
    });
  });
});
