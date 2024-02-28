import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from '../database/entities/location.entity';

@Injectable()
export class RegionsAndLocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}
  
  /**
   * Get all regions and locations
   * No query parameters for now
   * @returns {LocationsEntity[]} List of location + regions
   */
  async getRegionsAndLocations(){
    return {
      locations: await this.locationRepository.find({order: {region: 'ASC', locationName: 'ASC'}}),
    }
  }
}
