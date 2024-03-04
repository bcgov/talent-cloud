import {
  AvailabilityType,
  AvailabilityTypeName,
  Experience,
  ExperienceName,
} from '@/common';
import type { Region } from '@/common/enums/region.enum';
import type { FunctionType, Location } from '@/pages/dashboard';
import { DashboardFilterNames } from '@/pages/dashboard';

import { AxiosPrivate } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetFilters = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [functions, setFunctions] = useState<FunctionType[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { functions, locations },
      } = await AxiosPrivate.get('/filters');
      setLocations(locations);
      setRegions(
        Array.from(new Set(locations.map((itm: Location) => itm.region))),
      );
      setFunctions(functions);
    })();
  }, []);

  const filters = {
    name: {
      name: DashboardFilterNames.NAME,
    },
    availabilityType: {
      name: DashboardFilterNames.AVAILABILITY_TYPE,
      options: [
        {
          label: AvailabilityTypeName.AVAILABLE,
          value: AvailabilityType.AVAILABLE,
        },
        {
          label: AvailabilityTypeName.UNAVAILABLE,
          value: AvailabilityType.UNAVAILABLE,
        },
        {
          label: AvailabilityTypeName.DEPLOYED,
          value: AvailabilityType.DEPLOYED,
        },
      ],
    },
    region: {
      name: DashboardFilterNames.REGION,
      options: regions,
    },
    location: {
      name: DashboardFilterNames.LOCATION,
      groupedOptions: regions.map((itm: Region) => ({
        label: itm,
        options: locations
          .filter((loc: Location) => {
            return loc.region === itm;
          })
          .flatMap((itm) => itm.locationName),
      })),
    },
    function: {
      name: DashboardFilterNames.FUNCTION,
      options: functions.map((itm: FunctionType) => itm.name),
    },
    experience: {
      name: DashboardFilterNames.EXPERIENCE,
      options: [
        {
          label: ExperienceName.INTERESTED,
          value: Experience.INTERESTED,
        },
        { label: ExperienceName.EXPERIENCED, value: Experience.EXPERIENCED },
        {
          label: ExperienceName.CHIEF_EXPERIENCED,
          value: Experience.CHIEF_EXPERIENCED,
        },
        {
          label: ExperienceName.OUTSIDE_EXPERIENCED,
          value: Experience.OUTSIDE_EXPERIENCED,
        },
      ],
    },
    availabilityDates: {
      name: 'availabilityDates',
      label: 'Availability Date Range',
      value: { from: new Date(), to: new Date() },
    },
  };
  return {
    filters,
    locations,
    regions,
    functions,
  };
};
