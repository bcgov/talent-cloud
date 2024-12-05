import { faker } from '@faker-js/faker';
import { divisionsAndMinistries } from './const';
import { DriverLicense } from './enums/driver-license.enum';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { UnionMembership } from './enums/union-membership.enum';
import {
  availability,
  createCertifications,
  createLanguages,
  createRoles,
  createTools,
} from './seed-common';
import { CreatePersonnelBcwsDTO } from '../bcws/dto/create-bcws-personnel.dto';
import { BcwsRoleEntity } from '../database/entities/bcws/bcws-role.entity';
import { LocationEntity } from '../database/entities/location.entity';
import { CreatePersonnelDTO } from '../personnel';
import { TravelPreference } from './enums/travel-preference.enum';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { CertificationEntity } from '../database/entities/personnel/certifications.entity';
import { ToolsEntity } from '../database/entities/personnel/tools.entity';

export const handler = (
  locations: LocationEntity[],
  roles: BcwsRoleEntity[],
  tools: ToolsEntity[],
  certs: CertificationEntity[],
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
    roles: personnelRoles,
    travelPreference: faker.helpers.arrayElement([
      TravelPreference.REMOTE_ONLY,
      TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
      TravelPreference.WILLING_TO_TRAVEL_FIRE_ZONE,
      TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE,
      TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    ]),
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
    employeeId: faker.string.numeric('######'),
    paylistId: faker.string.numeric('########'),
    tools: createTools(tools),
    certifications: createCertifications(certs),
    languages: Array.from(new Set(createLanguages())),
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
  return { personnelData, bcwsData };
};
