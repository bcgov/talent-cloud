import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { divisionsAndMinistries } from './const';
import { AvailabilityType } from './enums/availability-type.enum';
import { DriverLicense } from './enums/driver-license.enum';
import { FirstAid, Experience } from './enums/emcr';
import { Ministry } from './enums/ministry.enum';
import { Status } from './enums/status.enum';
import { UnionMembership } from './enums/union-membership.enum';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  EmcrTrainingEntity,
} from '../database/entities/emcr';
import { CreatePersonnelEmcrDTO } from '../emcr/dto';
import { CreatePersonnelDTO, LocationDTO } from '../personnel';

export const handler = (
  locations: LocationDTO[],
  functions: EmcrFunctionEntity[],
  seededTrainings: EmcrTrainingEntity[],
): {
  personnelData: CreatePersonnelDTO;
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
  const homeLocation = faker.helpers.arrayElement(locations);
  const workLocation = faker.helpers.arrayElement(locations);
  const divisionAndMinistry = faker.helpers.arrayElement(
    divisionsAndMinistries,
  );
  const emcrData: CreatePersonnelEmcrDTO = {
    dateApplied: dateApplied,
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    firstAidLevel: faker.helpers.arrayElement(Object.values(FirstAid)),
    firstAidExpiry: faker.date.past(),
    psychologicalFirstAid: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceLiving: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceWorking: faker.datatype.boolean({ probability: 0.2 }),
    peccExperience: faker.datatype.boolean({ probability: 0.4 }),
    preocExperience: faker.datatype.boolean({ probability: 0.4 }),
    emergencyExperience: faker.datatype.boolean({ probability: 0.4 }),
    approvedBySupervisor: faker.datatype.boolean({ probability: 0.8 }),
    trainings: seededTrainings,
    dateApproved:
      status !== Status.PENDING
        ? faker.date.between({
            from: dateApplied,
            to: new Date(),
          })
        : undefined,
    status: status,
    experiences:
      status !== Status.PENDING
        ? (experiences(functions) as EmcrExperienceEntity[])
        : [],
  };

  const personnelData: CreatePersonnelDTO = {
    division: divisionAndMinistry.division,
    ministry: Ministry[divisionAndMinistry.ministry],
    homeLocation: homeLocation,
    workLocation: workLocation,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    jobTitle: faker.company.catchPhrase(),
    supervisorEmail: faker.internet.email(),
    supervisorLastName: faker.person.lastName(),
    supervisorFirstName: faker.person.firstName(),
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
  return { personnelData, emcrData };
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

const experiences = (functions: EmcrFunctionEntity[]) => {
  const experiences = [];
  for (let i = 0; i < 5; i++) {
    const functionEntity: { id: number; name: string; abbreviation: string } =
      faker.helpers.arrayElement(functions);

    experiences.push({
      functionId: functionEntity.id,
      function: functionEntity,
      experienceType: faker.helpers.arrayElement(Object.values(Experience)),
    });
  }
  const uniqueFunctions = new Set(experiences.map((exp) => exp.functionId));
  const uniqueFunctionsArray = Array.from(uniqueFunctions);

  return uniqueFunctionsArray.map((uniqueId) =>
    experiences.find((exp) => exp.functionId === uniqueId),
  );
};
