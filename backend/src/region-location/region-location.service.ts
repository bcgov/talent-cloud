import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationRO } from './region-location.ro';
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
  async getRegionsAndLocations(): Promise<LocationRO[]> {
    const locations = await this.locationRepository.find({
      order: { locationName: 'ASC', region: 'ASC' },
    });
    return locations.map((loc) => loc.toResponseObject());
  }
}
