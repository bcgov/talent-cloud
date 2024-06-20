import { Test, TestingModule } from '@nestjs/testing';
import { BcwsService } from '../src/bcws/bcws.service';

describe('BcwsService', () => {
  let service: BcwsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcwsService],
    }).compile();

    service = module.get<BcwsService>(BcwsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
