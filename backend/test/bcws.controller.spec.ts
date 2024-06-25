import { Test, TestingModule } from '@nestjs/testing';
import { BcwsController } from '../src/bcws/bcws.controller';

describe('BcwsController', () => {
  let controller: BcwsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BcwsController],
    }).compile();

    controller = module.get<BcwsController>(BcwsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
