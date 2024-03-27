import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { FunctionEntity } from 'src/database/entities/function.entity';
import { LocationEntity } from 'src/database/entities/location.entity';
import {
  Ministry,
  Experience,
  UnionMembership,
  AvailabilityType,
  Status,
} from './enums';
import { DriverLicense } from './enums/driver-license.enum';
import { FirstAid } from './enums/first-aid.enum';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { ExperienceEntity } from '../database/entities/personnel-function-experience.entity';

export const rowData = (
  locations: LocationEntity[],
  functions: FunctionEntity[],
) => {
  const status =
    Status[
      faker.helpers.arrayElement([
        Status.ACTIVE,
        Status.INACTIVE,
        Status.PENDING,
      ])
    ];
  const applicationDate = faker.date.past();

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateJoined:
      status !== Status.PENDING
        ? faker.date.between({
            from: applicationDate,
            to: format(new Date(), 'yyyy-MM-dd'),
          })
        : undefined,
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    workLocation: faker.helpers.arrayElement(locations),
    homeLocation: faker.helpers.arrayElement(locations),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    applicationDate: applicationDate,
    skillsAbilities: faker.lorem.paragraph(),
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    firstAidLevel: faker.helpers.arrayElement(Object.values(FirstAid)),
    firstAidExpiry: faker.date.past(),
    driverLicense: [faker.helpers.arrayElement(Object.values(DriverLicense))],
    psychologicalFirstAid: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceLiving: faker.datatype.boolean({ probability: 0.2 }),
    firstNationExperienceWorking: faker.datatype.boolean({ probability: 0.2 }),
    peccExperience: faker.datatype.boolean({ probability: 0.4 }),
    preocExperience: faker.datatype.boolean({ probability: 0.4 }),
    emergencyExperience: faker.datatype.boolean({ probability: 0.4 }),
    jobTitle: faker.company.catchPhrase(),
    supervisorEmail: faker.internet.email(),
    supervisorLastName: faker.person.lastName(),
    supervisorFirstName: faker.person.firstName(),
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    status: status,
    availability:
      status !== Status.PENDING ? (availability() as AvailabilityEntity[]) : [],
    experiences:
      status !== Status.PENDING
        ? (experiences(functions) as ExperienceEntity[])
        : [],
  };
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

const experiences = (functions: FunctionEntity[]) => {
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

export const handler = (
  locations: LocationEntity[],
  functions: FunctionEntity[],
) => {
  const people = [];
  for (let i = 0; i < 200; i++) {
    people.push(rowData(locations, functions));
  }
  return people;
};
