import { faker } from '@faker-js/faker';
import {
  createTools,
  createCertifications,
  createLanguages,
  availability,
} from './helpers';
import { LocationEntity } from '../entities/location.entity';
import { AvailabilityEntity } from '../entities/personnel/availability.entity';
import { CertificationEntity } from '../entities/personnel/certifications.entity';
import { ToolsEntity } from '../entities/personnel/tools.entity';
import { divisionsAndMinistries } from '../../common/const';
import { DriverLicense } from '../../common/enums/driver-license.enum';
import { Ministry } from '../../common/enums/ministry.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { CreatePersonnelDTO } from '../../personnel';

export const createPersonnelHandler = (
  locations?: LocationEntity[],
  tools?: ToolsEntity[],
  certs?: CertificationEntity[],
): {
  personnelData: CreatePersonnelDTO;
} => {
  const divisionAndMinistry = faker.helpers.arrayElement(
    divisionsAndMinistries,
  );

  const lastName = faker.person.lastName();
  const firstName = faker.person.firstName();
  const supervisorFirstName = faker.person.firstName();
  const supervisorLastName = faker.person.lastName();

  const personnelData: CreatePersonnelDTO = {
    homeLocation: faker.helpers.arrayElement(locations),
    workLocation: faker.helpers.arrayElement(locations),
    firstName: firstName,
    division: divisionAndMinistry.division,
    ministry: Ministry[divisionAndMinistry.ministry],
    lastName: lastName,
    email: `${firstName}.${lastName}@yopmail.com`,
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    jobTitle: faker.company.buzzNoun(),
    supervisorEmail: `${supervisorFirstName}.${supervisorLastName}@yopmail.com`,
    supervisorLastName: supervisorLastName,
    supervisorFirstName: supervisorFirstName,
    supervisorPhone: faker.string.numeric('##########'),
    employeeId: faker.string.numeric('######'),
    paylistId: faker.string.numeric('########'),
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
    availability: availability() as AvailabilityEntity[],
  };
  return { personnelData };
};
