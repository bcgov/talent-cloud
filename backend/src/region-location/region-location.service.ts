import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmcrLocationEntity } from '../database/entities/emcr';
import { EmcrLocationRO } from '../personnel/ro/emcr';

@Injectable()
export class RegionsAndLocationsService {
  constructor(
    @InjectRepository(EmcrLocationEntity)
    private locationRepository: Repository<EmcrLocationEntity>,
  ) {}

  /**
   * Get all regions and locations
   * No query parameters for now
   * @returns {LocationsEntity[]} List of location + regions
   */
  async getRegionsAndLocations(): Promise<EmcrLocationRO[]> {
    const locations = await this.locationRepository.find({
      order: { locationName: 'ASC', region: 'ASC' },
    });
    return locations.map((loc) => loc.toResponseObject());
  }
  /**
   * Get location by name
   * @param locationName
   * @returns
   */
  async getLocationByName(locationName: string): Promise<EmcrLocationRO> {
    const location = await this.locationRepository.findOne({
      where: { locationName },
    });
    return location.toResponseObject();
  }
}
