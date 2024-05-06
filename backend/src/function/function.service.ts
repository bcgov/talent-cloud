import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmcrFunctionEntity } from '../database/entities/emcr/emcr-function.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(EmcrFunctionEntity)
    private functionRepository: Repository<EmcrFunctionEntity>,
  ) {}

  /**
   * Get all functions
   * No query parameters for now
   * @returns {EmcrFunctionEntity[]} List of functions
   */
  async getFunctions(): Promise<EmcrFunctionEntity[]> {
    return this.functionRepository.find();
  }
}
