import { faker } from '@faker-js/faker';
import { divisionsAndMinistries } from '../../common/const';
import { CreatePersonnelDTO } from '../../personnel';
import { DriverLicense } from '../../common/enums/driver-license.enum';
import { Ministry } from '../../common/enums/ministry.enum';
import { Status } from '../../common/enums/status.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';
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


export const createPersonnelHandler = (
  status: Status, 
  locations?: LocationEntity[],
  tools?: ToolsEntity[],
  certs?: CertificationEntity[],
): {
  personnelData: CreatePersonnelDTO;
} => {
  
  const divisionAndMinistry = faker.helpers.arrayElement(
    divisionsAndMinistries,
  );
  

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
    availability:
      status !== Status.PENDING ? (availability() as AvailabilityEntity[]) : [],
  };
  return { personnelData };
};
