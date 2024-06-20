import { Test, TestingModule } from '@nestjs/testing';
import { EmcrService } from './emcr.service';

describe('EmcrService', () => {
  let service: EmcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmcrService],
    }).compile();

    service = module.get<EmcrService>(EmcrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
