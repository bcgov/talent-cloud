import { Test, TestingModule } from '@nestjs/testing';
import { EmcrController } from '../src/emcr/emcr.controller';

describe('EmcrController', () => {
  let controller: EmcrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmcrController],
    }).compile();

    controller = module.get<EmcrController>(EmcrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
