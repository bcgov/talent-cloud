import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import { format } from 'date-fns';
import {
  Ministry,
  Experience,
  UnionMembership,
  AvailabilityType,
  Status,
} from './enums';
import { DriverLicense } from './enums/driver-license.enum';
import { FirstAid } from './enums/first-aid.enum';
import { AppModule } from '../app.module';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { ExperienceEntity } from '../database/entities/personnel-function-experience.entity';
import { PersonnelService } from '../personnel/personnel.service';

const functions = [
  { id: 1, name: 'Operations', abbreviation: 'Ops' },
  { id: 2, name: 'Emergency Support Services', abbreviation: 'ESS' },
  { id: 3, name: 'First Nations', abbreviation: 'FN' },
  { id: 4, name: 'Finance', abbreviation: 'Fin' },
  { id: 5, name: 'Liaison', abbreviation: 'Liaison' },
  { id: 6, name: 'Logistics', abbreviation: 'Logs' },
  { id: 7, name: 'Planning', abbreviation: 'Plans' },
  { id: 8, name: 'Advanced Planning Unit', abbreviation: 'APU' },
  { id: 9, name: 'Recovery', abbreviation: 'Recovery' },
  { id: 10, name: 'Deputy Director', abbreviation: 'DDir' },
];

const regionsAndLocations = [
  { id: 1, locationName: '100 Mile House', region: 'NEA' },
  { id: 2, locationName: '150 Mile House', region: 'NEA' },
  { id: 3, locationName: 'Abbotsford', region: 'SWE' },
  { id: 4, locationName: 'Brentwood Bay', region: 'HQ' },
  { id: 5, locationName: 'Burnaby', region: 'SWE' },
  { id: 6, locationName: 'Burns Lake', region: 'NWE' },
  { id: 7, locationName: 'Bonnington Falls', region: 'SEA' },
  { id: 8, locationName: 'Campbell River', region: 'VIC' },
  { id: 9, locationName: 'Castlegar', region: 'SEA' },
  { id: 10, locationName: 'Cumberland', region: 'VIC' },
  { id: 11, locationName: 'Coquitlam', region: 'SWE' },
  { id: 12, locationName: 'Courtenay', region: 'VIC' },
  { id: 13, locationName: 'Cranbrook', region: 'SEA' },
  { id: 14, locationName: 'Dawson Creek', region: 'NEA' },
  { id: 15, locationName: 'Duncan', region: 'VIC' },
  { id: 16, locationName: 'Elkford', region: 'SEA' },
  { id: 17, locationName: 'Enderby', region: 'CTL' },
  { id: 18, locationName: 'Esquimalt', region: 'HQ' },
  { id: 19, locationName: 'Fort St. John', region: 'NEA' },
  { id: 20, locationName: 'Fort Nelson', region: 'NEA' },
  { id: 21, locationName: 'Kamloops', region: 'CTL' },
  { id: 22, locationName: 'Kelowna', region: 'CTL' },
  { id: 23, locationName: 'Kimberley', region: 'SEA' },
  { id: 24, locationName: 'Langford', region: 'HQ' },
  { id: 25, locationName: 'Langley', region: 'SWE' },
  { id: 26, locationName: 'Lillooet', region: 'SWE' },
  { id: 27, locationName: 'Mackenzie', region: 'NEA' },
  { id: 28, locationName: 'Maple Ridge', region: 'SWE' },
  { id: 29, locationName: 'Merritt', region: 'CTL' },
  { id: 30, locationName: 'Mill Bay', region: 'VIC' },
  { id: 31, locationName: 'Mission', region: 'SWE' },
  { id: 32, locationName: 'Nanaimo', region: 'VIC' },
  { id: 33, locationName: 'Nelson', region: 'SEA' },
  { id: 34, locationName: 'New Westminster', region: 'SWE' },
  { id: 35, locationName: 'North Vancouver', region: 'SWE' },
  { id: 36, locationName: 'Parksville', region: 'VIC' },
  { id: 37, locationName: 'Penticton', region: 'CTL' },
  { id: 38, locationName: 'Port Alberni', region: 'VIC' },
  { id: 39, locationName: 'Port McNeil', region: 'VIC' },
  { id: 40, locationName: 'Prince George', region: 'NEA' },
  { id: 41, locationName: 'Qualicum Beach', region: 'VIC' },
  { id: 42, locationName: 'Quesnel', region: 'NEA' },
  { id: 43, locationName: 'Revelstoke', region: 'SEA' },
  { id: 44, locationName: 'Richmond', region: 'SWE' },
  { id: 45, locationName: 'Saanich', region: 'HQ' },
  { id: 46, locationName: 'Saanichton', region: 'HQ' },
  { id: 47, locationName: 'Salmon Arm', region: 'CTL' },
  { id: 48, locationName: 'Sechelt', region: 'VIC' },
  { id: 49, locationName: 'Sidney', region: 'HQ' },
  { id: 50, locationName: 'Smithers', region: 'NWE' },
  { id: 51, locationName: 'Sorrento', region: 'CTL' },
  { id: 52, locationName: 'Surrey', region: 'SWE' },
  { id: 53, locationName: 'Terrace', region: 'NWE' },
  { id: 54, locationName: 'Ucluelet', region: 'VIC' },
  { id: 55, locationName: 'Vancouver', region: 'SWE' },
  { id: 56, locationName: 'Vernon', region: 'CTL' },
  { id: 57, locationName: 'Victoria', region: 'HQ' },
  { id: 58, locationName: 'Whistler', region: 'SWE' },
  { id: 59, locationName: 'Williams Lake', region: 'NEA' },
  { id: 60, locationName: 'Vanderhoof', region: 'NWE' },
  { id: 61, locationName: 'Sooke', region: 'VIC' },
];

export const rowData = () => {
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
    workLocation: faker.helpers.arrayElement(regionsAndLocations),
    homeLocation: faker.helpers.arrayElement(regionsAndLocations),
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
      status !== Status.PENDING ? (experiences() as ExperienceEntity[]) : [],
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

const experiences = () => {
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

const generateData = () => {
  const people = [];
  for (let i = 0; i < 200; i++) {
    people.push(rowData());
  }
  return people;
};

export const handler = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const data = generateData();

  const personnelService = app.get(PersonnelService);

  return await personnelService.createPersonnel(data);
};

handler();
