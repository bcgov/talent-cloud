import { faker } from '@faker-js/faker';
import { divisionsAndMinistries } from './const';
import { CreatePersonnelDTO } from '../personnel';
import { DriverLicense } from './enums/driver-license.enum';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { UnionMembership } from './enums/union-membership.enum';
import {
  createTools,
  createCertifications,
  createLanguages,
  availability,
} from './seed-common';
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
    languages: createLanguages(),
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
