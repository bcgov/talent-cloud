import {
  AvailabilityType,
  AvailabilityTypeName,
  Experience,
  ExperienceName,
  RegionName,
} from '@/common';
import type { Region } from '@/common/enums/region.enum';
import type {
  DivisionType,
  FunctionType,
  Location,
  SectionType,
} from '@/pages/dashboard';
import { DashboardFilterNames } from '@/pages/dashboard';
import { useEffect, useState } from 'react';
import { useAxios } from './useAxios';
import { useRole } from './useRole';
import { Route } from '@/providers';
import type { FireCentre } from '@/common/enums/firecentre.enum';
import { FireCentreName } from '@/common/enums/firecentre.enum';

export const useGetFilters = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [fireCentre, setFireCentre] = useState<FireCentre[]>([]);
  const [divisions, setDivisions] = useState<DivisionType[]>([]);
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const { route } = useRole();
  const { AxiosPrivate } = useAxios();

  const sortRegion = (reg: Region[]) => {
    return reg.sort((a: Region, b: Region) => a.localeCompare(b));
  };

  const sortFireCentre = (centre: FireCentre[]) => {
    return centre.sort((a: FireCentre, b: FireCentre) => a.localeCompare(b));
  };

  const setBcwsData = (data: {
    locations: [];
    functions: SectionType[];
    divisions: DivisionType[];
  }) => {
    setLocations(data.locations);
    const reg = Array.from(
      new Set(data.locations.map((itm: Location) => itm.fireCentre)),
    ) as FireCentre[];
    setFireCentre(sortFireCentre(reg));
    setDivisions(data.divisions);
    setSections(data.functions);
  };

  const setEmcrData = (data: { locations: []; functions: FunctionType[] }) => {
    setLocations(data.locations);
    const reg = Array.from(
      new Set(data.locations.map((itm: Location) => itm.region)),
    ) as Region[];
    setRegions(sortRegion(reg));
    setFunctions(data.functions);
  };

  useEffect(() => {
    (async () => {
      const { data } = await AxiosPrivate.get(`/${route}/filters`);
      route === Route.EMCR ? setEmcrData(data) : setBcwsData(data);
    })();
  }, [AxiosPrivate, route]);

  const filters = {
    name: {
      name: DashboardFilterNames.NAME,
    },
    fireCentre: {
      name: DashboardFilterNames.FIRE_CENTRE,
      options: fireCentre.map((itm) => ({ label: FireCentreName[itm], value: itm })),
      placeholder: 'Select fire centre(s)',
    },
    region: {
      name: DashboardFilterNames.REGION,
      options: regions.map((itm) => ({ label: RegionName[itm], value: itm })),
      placeholder: 'Select region(s)',
    },
    location: {
      name: DashboardFilterNames.LOCATION,
      placeholder: 'Select home location(s)',
      groupedOptions:
        route === Route.BCWS
          ? fireCentre.map((itm: FireCentre) => ({
              label: itm,
              options: locations
                .filter((loc: Location) => {
                  return loc.fireCentre === itm;
                })
                .flatMap((itm) => itm.locationName),
            }))
          : regions.map((itm: Region) => ({
              label: itm,
              options: locations
                .filter((loc: Location) => {
                  return loc.region === itm;
                })
                .flatMap((itm) => itm.locationName),
            })),
    },
    function: {
      placeholder: 'Select function and experience levels',
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
    section: {
      name: DashboardFilterNames.SECTION,
      options: Object.keys(sections),
      label: 'Select section and role',
    },
    role: {
      name: DashboardFilterNames.ROLE,
      label: '',
      options: sections,
    },

    availabilityType: {
      placeholder: 'Select availability type',
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
    availabilityDates: {
      name: 'availabilityDates',
      label: 'Availability Date Range',
      value: { from: '', to: '' },
    },
  };
  return {
    filters,
    locations,
    regions,
    fireCentre,
    divisions,
    functions,
  };
};
