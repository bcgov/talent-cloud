import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { divisionsAndMinistries } from './const';
import { CreatePersonnelDTO } from '../personnel';

import { AvailabilityType } from './enums/availability-type.enum';
import {
  LanguageLevelType,
  LanguageProficiency,
  ToolsProficiency,
} from './enums/bcws';
import { DriverLicense } from './enums/driver-license.enum';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { UnionMembership } from './enums/union-membership.enum';
import { CreatePersonnelBcwsDTO } from '../bcws/dto/create-bcws-personnel.dto';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import {
  EmcrFunctionEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { LocationEntity } from '../database/entities/location.entity';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';
import { createBCWShandler } from '../database/seed-bcws-partial';
import { createEMCRhandler } from '../database/seed-emcr-partial';
import { CreatePersonnelEmcrDTO } from '../emcr/dto';
import { CreatePersonnelLanguagesDTO } from '../personnel/dto/create-personnel-languages.dto';

export const handler = (
  locations?: LocationEntity[],
  tools?: ToolsEntity[],
  certs?: CertificationEntity[],
  roles?: BcwsRoleEntity[],
  functions?: EmcrFunctionEntity[],
  trainings?: EmcrTrainingEntity[],
): {
  personnelData: CreatePersonnelDTO;
  bcwsData: CreatePersonnelBcwsDTO;
  emcrData: CreatePersonnelEmcrDTO;
} => {
  const status =
    Status[
      faker.helpers.arrayElement([
        Status.ACTIVE,
        Status.INACTIVE,
        Status.PENDING,
      ])
    ];

  const dateApplied = faker.date.past();
  const divisionAndMinistry = faker.helpers.arrayElement(
    divisionsAndMinistries,
  );
  const { emcrData } = createEMCRhandler(
    functions,
    trainings,
    status,
    dateApplied,
  );
  const { bcwsData } = createBCWShandler(roles, status, dateApplied);

  const personnelData: CreatePersonnelDTO = {
    homeLocation: faker.helpers.arrayElement(locations),
    workLocation: faker.helpers.arrayElement(locations),
    firstName: faker.person.firstName(),
    division: divisionAndMinistry.division,
    ministry: Ministry[divisionAndMinistry.ministry],
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    jobTitle: faker.company.buzzNoun(),
    supervisorEmail: faker.internet.email(),
    supervisorLastName: faker.person.lastName(),
    supervisorFirstName: faker.person.firstName(),
    supervisorPhone: faker.string.numeric('##########'),
    tools: createTools(tools),
    certifications: createCertifications(certs),
    languages: [],
    emergencyContactFirstName: faker.person.firstName(),
    emergencyContactLastName: faker.person.lastName(),
    emergencyContactPhoneNumber: faker.string.numeric('##########'),
    emergencyContactRelationship: faker.lorem.word(),
    driverLicense: Array.from(
      new Set([
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
      ]),
    ),
    availability:
      status !== Status.PENDING ? (availability() as AvailabilityEntity[]) : [],
  };
  return { personnelData, bcwsData, emcrData };
};

const threeMonthsArray = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
  const sevenMonthsFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 7,
    0,
  );
  const dates = [];
  for (let i = startDate; i < sevenMonthsFromNow; i.setDate(i.getDate() + 1)) {
    dates.push(new Date(i));
  }
  return dates;
};

const availability = () => {
  const availabilities = [];
  const dates = threeMonthsArray();

  dates.forEach((date, index) => {
    const randomInterval = Math.floor(Math.random() * 10);

    const sliceOfTime = dates.splice(index, randomInterval + index - 1);

    const availabilityType = faker.helpers.arrayElement(
      Object.values(AvailabilityType),
    );

    const deploymentCode =
      availabilityType === AvailabilityType.DEPLOYED
        ? faker.string.alphanumeric(6)
        : '';

    sliceOfTime.forEach((date) => {
      availabilities.push({
        date: format(date, 'yyyy-MM-dd'),
        availabilityType,
        deploymentCode,
      });
    });
  });

  return availabilities;
};

export const createLanguages = (): CreatePersonnelLanguagesDTO[] => {
  const personnelLang: CreatePersonnelLanguagesDTO[] = [];

  for (let i = 0; i < 2; i++) {
    personnelLang.push({
      language: faker.helpers.arrayElement([
        'Portuguese',
        'English',
        'Spanish',
      ]),
      level:
        LanguageProficiency[
          faker.helpers.arrayElement(Object.values(LanguageProficiency))
        ],
      type: LanguageLevelType[
        faker.helpers.arrayElement(Object.values(LanguageLevelType))
      ],
    });
  }
  const uniqueLang = new Set(personnelLang.map((lang) => lang.language));

  const uniqueLangArray = Array.from(uniqueLang);

  return uniqueLangArray.map((uniqueLanguge) =>
    personnelLang.find((lang) => lang.language === uniqueLanguge),
  );
};

export const createTools = (tools: ToolsEntity[]) => {
  const personnelTools = [];

  for (let i = 0; i < 5; i++) {
    const tool = faker.helpers.arrayElement(tools);

    personnelTools.push({
      tool,
      toolId: tool.id,
      proficiencyLevel: faker.helpers.arrayElement(
        Object.values(ToolsProficiency),
      ),
    });
  }
  const uniqueTools = new Set(personnelTools.map((tool) => tool.toolId));

  const uniqueToolsArray = Array.from(uniqueTools);

  return uniqueToolsArray.map((uniqueId) =>
    personnelTools.find((tool) => tool.toolId === uniqueId),
  );
};

export const createCertifications = (certs: CertificationEntity[]) => {
  const personnelCerts = [];

  for (let i = 0; i < 2; i++) {
    const cert = faker.helpers.arrayElement(certs);

    personnelCerts.push({
      certificationId: cert.id,
      expiry: faker.date.future(),
    });
  }
  const uniqueCerts = new Set(
    personnelCerts.map((cert) => cert.certificationId),
  );

  const uniqueCertsArray = Array.from(uniqueCerts);

  return uniqueCertsArray.map((uniqueCert) =>
    personnelCerts.find((cert) => cert.certificationId === uniqueCert),
  );
};
