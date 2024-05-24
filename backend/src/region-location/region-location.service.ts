import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationRO } from './region-location.ro';
import { LocationEntity } from '../database/entities/location.entity';
import { DivisionEntity } from '../database/entities/division.entity';
import { DivisionRO } from '../personnel/ro/bcws/division.ro';

@Injectable()
export class RegionsAndLocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
    @InjectRepository(DivisionEntity)
    private divisionRepository: Repository<DivisionEntity>,
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
  /**
   * Get location by name
   * @param locationName
   * @returns
   */
  async getLocationByName(locationName: string): Promise<LocationRO> {
    const location = await this.locationRepository.findOne({
      where: { locationName },
    });
    return location.toResponseObject();
  }

  /**
   * Get list of divisions 
   * @returns division and ministry
   */
  async getDivisions(): Promise<DivisionRO[]> {
    const divisions = await this.divisionRepository.find();
    return divisions.map(itm => itm.toResponseObject());
  }
}
