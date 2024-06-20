import { Test, TestingModule } from '@nestjs/testing';
import { EmcrService } from '../src/emcr/emcr.service';

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
