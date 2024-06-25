import {
  AvailabilityType,
  AvailabilityTypeName,
  Experience,
  ExperienceName,
  RegionName,
} from '@/common';
import type { Region } from '@/common/enums/region.enum';
import type { BcwsRoleInterface, FunctionType, Location, SectionType } from '@/pages/dashboard';
import { DashboardFilterNames } from '@/pages/dashboard';
import { useEffect, useMemo, useState } from 'react';
import { useAxios } from './useAxios';
import { Route } from '@/providers';
import type { FireCentre } from '@/common/enums/firecentre.enum';
import { FireCentreName } from '@/common/enums/firecentre.enum';
import type { Section } from '@/common/enums/sections.enum';
import { SectionName } from '@/common/enums/sections.enum';
import type { FieldInterface } from '@/components';

export const useProgramFieldData = (route?: Route) => {
  const [bcwsRoles, setBcwsRoles] = useState<BcwsRoleInterface[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [fireCentre, setFireCentre] = useState<FireCentre[]>([]);
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const { AxiosPrivate } = useAxios();

  const sortRegion = (reg: Region[]) => {
    return reg.sort((a: Region, b: Region) => a.localeCompare(b));
  };

  const sortFireCentre = (centre: FireCentre[]) => {
    return centre.sort((a: FireCentre, b: FireCentre) => a.localeCompare(b));
  };

  const setBcwsData = (data: { roles: BcwsRoleInterface[];locations: []; sections: SectionType[] }) => {
    setLocations(data.locations);
    const reg = Array.from(
      new Set(data.locations.map((itm: Location) => itm.fireCentre)),
    ) as FireCentre[];
    setFireCentre(sortFireCentre(reg));
    setBcwsRoles(data.roles);
    setSections(data.sections);
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
      const res = route && (await AxiosPrivate.get(`/program-field-data`));
      res && route === Route.EMCR
        ? setEmcrData(res.data)
        : res && setBcwsData(res.data);
    })();
  }, [route]);

  const filters: { [key: string]: FieldInterface } = useMemo(() => {
    return {
      name: {
        name: DashboardFilterNames.NAME,
      },
      fireCentre: {
        name: DashboardFilterNames.FIRE_CENTRE,
        options: fireCentre.map((itm) => ({
          label: FireCentreName[itm],
          value: itm,
        })),
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
                label: FireCentreName[itm],
                value: itm,
                options: locations
                  .filter((loc: Location) => {
                    return loc.fireCentre === itm;
                  })
                  .flatMap((itm) => itm.locationName),
              }))
            : regions.map((itm: Region) => ({
                label: itm,
                value: itm,
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
        label: 'Function & Experience Level',
        options: functions.map((itm: FunctionType) => ({
          label: itm.name,
          value: itm.name,
        })),
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
        options: Object.keys(sections).map((itm) => ({
          label: SectionName[itm as Section],
          value: itm,
        })),
        label: 'Select section and role',
      },
      role: {
        name: DashboardFilterNames.ROLE,
        label: '',
        options: Object.keys(sections).map((itm) =>
          Object.values(sections[itm as keyof typeof sections]).map((role) => ({
            label: role.name,
            value: role.enumName,
          })),
        ),
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
  }, [locations, regions, fireCentre, sections, functions]);

  return {
    functions,
    bcwsRoles,
    filters,
    locations,
    regions,
    fireCentre,
    sections,
  };
};
