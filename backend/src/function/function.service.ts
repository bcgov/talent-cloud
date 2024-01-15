import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionEntity } from '../database/entities/function.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(FunctionEntity)
    private functionRepository: Repository<FunctionEntity>,
  ) {}
  
  /**
   * Get all functions
   * No query parameters for now
   * @returns {FunctionEntity[]} List of functions
   */
  async getFunctions(): Promise<FunctionEntity[]> {
    return this.functionRepository.find();
  }
}
