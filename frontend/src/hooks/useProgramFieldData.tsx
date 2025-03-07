import {
  AvailabilityType,
  AvailabilityTypeName,
  Experience,
  ExperienceName,
  Program,
  RegionName,
} from '@/common';
import type { Region } from '@/common/enums/region.enum';
import type {
  BcwsRoleInterface,
  Certification,
  FunctionType,
  Location,
  SectionType,
} from '@/common';
import { Filters } from '@/common';
import { useEffect, useMemo, useState } from 'react';
import { useAxios } from './useAxios';
import { FireCentre } from '@/common/enums/firecentre.enum';
import { FireCentreName } from '@/common/enums/firecentre.enum';
import type { Section } from '@/common/enums/sections.enum';
import { SectionName } from '@/common/enums/sections.enum';
import type { FieldInterface } from '@/components';
import type { Tools, ToolsName } from '@/common/enums/tools.enum';

export const useProgramFieldData = (program?: Program) => {
  const [bcwsRoles, setBcwsRoles] = useState<BcwsRoleInterface[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [fireCentre, setFireCentre] = useState<FireCentre[]>([]);
  const [functions, setFunctions] = useState<FunctionType[]>([]);
  const [tools, setTools] = useState<
    { name: Tools; fullName: ToolsName; id: number }[]
  >([]);
  const [certificates, setCertificates] = useState<Certification[]>([]);

  const { AxiosPrivate } = useAxios();

  const sortRegion = (reg: Region[]) => {
    return reg.sort((a: Region, b: Region) => a.localeCompare(b));
  };

  const sortFireCentre = (centre: FireCentre[]) => {
    return centre.sort((a: FireCentre, b: FireCentre) => a.localeCompare(b));
  };

  const setBcwsData = (data: {
    roles: BcwsRoleInterface[];
    locations: [];
    sections: SectionType[];
  }) => {
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
      const res = program && (await AxiosPrivate.get(`/field/data`));
      if (res) {
        if (program === Program.EMCR) {
          setEmcrData(res.data);
        } else if (program === Program.BCWS) {
          setBcwsData(res.data);
        } else if (program === Program.ALL) {
          setEmcrData(res.data);
          setBcwsData(res.data);
        }

        res.data.tools && setTools(res.data.tools);
        res.data.certs && setCertificates(res.data.certs);
      }
    })();
  }, [program]);

  const fields: { [key: string]: FieldInterface } = useMemo(() => {
    return {
      name: {
        name: Filters.NAME,
      },
      fireCentre: {
        name: Filters.FIRE_CENTRE,
        options: fireCentre.map((itm) => ({
          label: FireCentreName[itm],
          value: FireCentre[itm],
        })),
        placeholder: 'Select fire centre(s)',
      },
      region: {
        name: Filters.REGION,
        options: regions.map((itm) => ({ label: RegionName[itm], value: itm })),
        placeholder: 'Select region(s)',
      },
      location: {
        name: Filters.LOCATION,
        placeholder: 'Select home location(s)',
        groupedOptions:
          program === Program.BCWS
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
        name: Filters.FUNCTION,
        label: 'Function & Experience Level',
        options: functions.map((itm: FunctionType) => ({
          label: itm.name,
          value: itm.name,
        })),
      },
      experience: {
        name: Filters.EXPERIENCE,
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
        name: Filters.SECTION,
        options: Object.keys(sections).map((itm) => ({
          label: SectionName[itm as Section],
          value: itm,
        })),
        label: 'Select section and role',
      },
      role: {
        name: Filters.ROLE,
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
        name: Filters.AVAILABILITY_TYPE,
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
    fields,
    locations,
    regions,
    fireCentre,
    sections,
    tools,
    certificates,
  };
};
