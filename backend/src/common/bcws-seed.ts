import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { divisionsAndMinistries } from './const';
import { AvailabilityType } from './enums/availability-type.enum';
import {
  ExperienceLevel,
  LanguageLevelType,
  LanguageProficiency,
  ToolsProficiency,
} from './enums/bcws';
import { DriverLicense } from './enums/driver-license.enum';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { UnionMembership } from './enums/union-membership.enum';
import { CreateBcwsPersonnelLanguagesDTO } from '../bcws/dto';
import { CreatePersonnelBcwsDTO } from '../bcws/dto/create-bcws-personnel.dto';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { BcwsCertificationEntity } from '../database/entities/bcws/bcws-certifications.entity';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { BcwsToolsEntity } from '../database/entities/bcws/bcws-tools.entity';
import { LocationEntity } from '../database/entities/emcr';
import { CreatePersonnelDTO } from '../personnel';

export const handler = (
  locations: LocationEntity[],
  roles: BcwsRoleEntity[],
  tools: BcwsToolsEntity[],
  certs: BcwsCertificationEntity[],
): {
  personnelData: CreatePersonnelDTO;
  bcwsData: CreatePersonnelBcwsDTO;
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
  const personnelRoles = createRoles(roles);
  const firstChoiceSection = roles.find(
    (r) => r.id === personnelRoles[0].roleId,
  )?.section;
  const secondRoleSection = roles.find((r) => r.id === personnelRoles[1].roleId)
    ?.section;
  let secondChoiceSection = undefined;
  if (secondRoleSection !== firstChoiceSection) {
    secondChoiceSection = secondRoleSection;
  }

  const bcwsData: CreatePersonnelBcwsDTO = {
    dateApplied: dateApplied,
    dateApproved:
      status !== Status.PENDING
        ? faker.date.between({
            from: dateApplied,
            to: new Date(),
          })
        : undefined,
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    approvedBySupervisor: faker.datatype.boolean({ probability: 0.8 }),
    employeeId: faker.string.numeric('######'),
    paylistId: faker.string.numeric('########'),
    status: status,
    purchaseCardHolder: faker.datatype.boolean({ probability: 0.4 }),
    liaisonFirstName: faker.person.firstName(),
    liaisonLastName: faker.person.lastName(),
    liaisonPhoneNumber: faker.string.numeric('##########'),
    liaisonEmail: faker.internet.email(),
    willingnessStatement: faker.datatype.boolean({ probability: 0.4 }),
    firstChoiceSection,
    secondChoiceSection,
    parQ: faker.datatype.boolean({ probability: 0.4 }),
    respectfulWorkplacePolicy: faker.datatype.boolean({ probability: 0.4 }),
    orientation: faker.datatype.boolean({ probability: 0.4 }),
    tools: createTools(tools),
    certifications: createCertifications(certs),
    roles: personnelRoles,
    languages: Array.from(new Set(createLanguages())),
    emergencyContactFirstName: faker.person.firstName(),
    emergencyContactLastName: faker.person.lastName(),
    emergencyContactPhoneNumber: faker.string.numeric('##########'),
    emergencyContactRelationship: faker.lorem.word(),
  };

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
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    driverLicense: Array.from(
      new Set([
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
        faker.helpers.arrayElement(Object.values(DriverLicense)),
      ]),
    ),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    availability:
      status !== Status.PENDING ? (availability() as AvailabilityEntity[]) : [],
  };
  return { personnelData, bcwsData };
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

export const createTools = (bcwsTools: BcwsToolsEntity[]) => {
  const personnelTools = [];

  for (let i = 0; i < 5; i++) {
    const tool = faker.helpers.arrayElement(bcwsTools);

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

export const createCertifications = (bcwsCerts: BcwsCertificationEntity[]) => {
  const personnelCerts = [];

  for (let i = 0; i < 2; i++) {
    const cert = faker.helpers.arrayElement(bcwsCerts);

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

export const createRoles = (bcwsRoles: BcwsRoleEntity[]) => {
  const personnelRoles = [];

  for (let i = 0; i < 5; i++) {
    const role = faker.helpers.arrayElement(bcwsRoles);

    personnelRoles.push({
      roleId: role.id,
      expLevel: faker.helpers.arrayElement(Object.values(ExperienceLevel)),
    });
  }
  const uniqueRoles = new Set(personnelRoles.map((role) => role.roleId));

  const uniqueRolesArray = Array.from(uniqueRoles);

  return uniqueRolesArray.map((uniqueRole) =>
    personnelRoles.find((role) => role.roleId === uniqueRole),
  );
};

export const createLanguages = (): CreateBcwsPersonnelLanguagesDTO[] => {
  const personnelLang: CreateBcwsPersonnelLanguagesDTO[] = [];

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
