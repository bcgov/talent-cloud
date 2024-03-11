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
  { id: 7, name: 'Planning', abbreviation: 'Planning' },
  { id: 8, name: 'Advanced Planning Unit', abbreviation: 'APU' },
  { id: 9, name: 'Recovery', abbreviation: 'Recovery' },
  { id: 10, name: 'Deputy Director', abbreviation: 'Deputy Director' },
];

const regionsAndLocations = [
  { id: 0, locationName: '100 Mile House', region: 'NEA' },
  { id: 1, locationName: '150 Mile House', region: 'NEA' },
  { id: 2, locationName: 'Abbotsford', region: 'SWE' },
  { id: 3, locationName: 'Brentwood Bay', region: 'HQ' },
  { id: 4, locationName: 'Burnaby', region: 'SWE' },
  { id: 5, locationName: 'Burns Lake', region: 'NWE' },
  { id: 6, locationName: 'Bonnington Falls', region: 'SWE' },
  { id: 7, locationName: 'Campbell River', region: 'VIC' },
  { id: 8, locationName: 'Castlegar', region: 'SEA' },
  { id: 9, locationName: 'Cumberland', region: 'VIC' },
  { id: 10, locationName: 'Coquitlam', region: 'SWE' },
  { id: 11, locationName: 'Courtenay', region: 'VIC' },
  { id: 12, locationName: 'Cranbrook', region: 'SEA' },
  { id: 13, locationName: 'Dawson Creek', region: 'NEA' },
  { id: 14, locationName: 'Elkford', region: 'SEA' },
  { id: 15, locationName: 'Enderby', region: 'CTL' },
  { id: 16, locationName: 'Esquimalt', region: 'HQ' },
  { id: 17, locationName: 'Fort St. John', region: 'NEA' },
  { id: 18, locationName: 'Fort Nelson', region: 'NEA' },
  { id: 19, locationName: 'Kamloops', region: 'CTL' },
  { id: 20, locationName: 'Kelowna', region: 'CTL' },
  { id: 21, locationName: 'Kimberly', region: 'SEA' },
  { id: 22, locationName: 'Langford', region: 'HQ' },
  { id: 23, locationName: 'Langley', region: 'SWE' },
  { id: 24, locationName: 'Lillooet', region: 'SWE' },
  { id: 25, locationName: 'Mackenzie', region: 'NEA' },
  { id: 26, locationName: 'Maple Ridge', region: 'SWE' },
  { id: 27, locationName: 'Merritt', region: 'CTL' },
  { id: 28, locationName: 'Nanaimo', region: 'VIC' },
  { id: 29, locationName: 'Nelson', region: 'SEA' },
  { id: 30, locationName: 'New Westminster', region: 'SWE' },
  { id: 31, locationName: 'North Vancouver', region: 'SWE' },
  { id: 32, locationName: 'Port Alberni', region: 'VIC' },
  { id: 33, locationName: 'Prince George', region: 'NEA' },
  { id: 34, locationName: 'Qualicum Beach', region: 'VIC' },
  { id: 35, locationName: 'Quesnel', region: 'NEA' },
  { id: 36, locationName: 'Revelstoke', region: 'SEA' },
  { id: 37, locationName: 'Richmond', region: 'SWE' },
  { id: 38, locationName: 'Saanich', region: 'HQ' },
  { id: 39, locationName: 'Saanichton', region: 'HQ' },
  { id: 40, locationName: 'Salmon Arm', region: 'CTL' },
  { id: 41, locationName: 'Sidney', region: 'HQ' },
  { id: 42, locationName: 'Smithers', region: 'NWE' },
  { id: 43, locationName: 'Sorrento', region: 'CTL' },
  { id: 44, locationName: 'Surrey', region: 'SWE' },
  { id: 45, locationName: 'Terrace', region: 'NWE' },
  { id: 46, locationName: 'Ucluelet', region: 'VIC' },
  { id: 47, locationName: 'Vancouver', region: 'SWE' },
  { id: 48, locationName: 'Victoria', region: 'HQ' },
  { id: 49, locationName: 'Vernon', region: 'CTL' },
  { id: 50, locationName: 'Whistler', region: 'SWE' },
  { id: 51, locationName: 'Williams Lake', region: 'NEA' },
];

export const rowData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateJoined: faker.date.past(),
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('##########'),
    secondaryPhone: faker.string.numeric('##########'),
    workPhone: faker.string.numeric('##########'),
    workLocation: faker.helpers.arrayElement(regionsAndLocations),
    homeLocation: faker.helpers.arrayElement(regionsAndLocations),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    unionMembership: faker.helpers.arrayElement(Object.values(UnionMembership)),
    applicationDate: faker.date.past(),
    skillsAbilities: faker.lorem.paragraph(),
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    supervisor: faker.person.firstName(),
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    status:
      Status[
        faker.helpers.arrayElement([
          Status.ACTIVE,
          Status.INACTIVE,
          Status.PENDING,
        ])
      ],
    availability: availability() as AvailabilityEntity[],
    experiences: experiences() as ExperienceEntity[],
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

export const generateData = () => {
  const people = [];
  for (let i = 0; i < 200; i++) {
    people.push(rowData());
  }
  return people;
};

const handler = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const data = generateData();

  const personnelService = app.get(PersonnelService);

  return await personnelService.createPersonnel(data);
};

console.log(handler());
