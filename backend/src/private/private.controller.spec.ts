import { Test, TestingModule } from '@nestjs/testing';
import { PrivateController } from './private.controller';

describe('PrivateController', () => {
  let controller: PrivateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateController],
    }).compile();

    controller = module.get<PrivateController>(PrivateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
