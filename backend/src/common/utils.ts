import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import { format } from 'date-fns';
import {
  Region,
  Ministry,
  WorkLocation,
  Experience,
  Classification,
  AvailabilityType,
  Status,
} from './enums';
import { AppModule } from '../app.module';
import { PersonnelService } from '../personnel/personnel.service';

const functions = [
  { id: 1, name: 'Operations', abbreviation: 'Ops' },
  { id: 2, name: 'Emergency Support Services', abbreviation: 'ESS' },
  { id: 3, name: 'First Nations', abbreviation: 'FN' },
  { id: 4, name: 'Finance', abbreviation: 'Fin' },
  { id: 5, name: 'Liaison', abbreviation: 'Liaison' },
  { id: 6, name: 'Logistics', abbreviation: 'Logs' },
  { id: 7, name: 'Plans', abbreviation: 'Plans' },
  { id: 8, name: 'Advanced Planning Unit', abbreviation: 'APU' },
  { id: 9, name: 'Recovery', abbreviation: 'Recovery' },
];

const regionsAndLocations = [
  {
    region: Region.VIC,
    locations: [
      WorkLocation.CAMPBELL_RIVER,
      WorkLocation.COURTENAY,
      WorkLocation.CUMBERLAND,
      WorkLocation.NANAIMO,
      WorkLocation.PORT_ALBERNI,
      WorkLocation.QUALICUM_BEACH,
      WorkLocation.UCLUELET,
    ],
  },
  {
    region: Region.CTL,
    locations: [
      WorkLocation.ENDERBY,
      WorkLocation.KAMLOOPS,
      WorkLocation.KELOWNA,
      WorkLocation.MERRITT,
      WorkLocation.SALMON_ARM,
      WorkLocation.SORRENTO,
      WorkLocation.VERNON,
    ],
  },
  {
    region: Region.HQ,
    locations: [
      WorkLocation.BRENTWOOD_BAY,
      WorkLocation.LANGFORD,
      WorkLocation.ESQUIMALT,
      WorkLocation.SAANICH,
      WorkLocation.SAANICHTON,
      WorkLocation.SIDNEY,
      WorkLocation.VICTORIA,
    ],
  },
  {
    region: Region.NEA,
    locations: [
      WorkLocation.HUNDRED_MILE_HOUSE,
      WorkLocation.HUNDRED_FIFTY_MILE_HOUSE,
      WorkLocation.DAWSON_CREEK,
      WorkLocation.FORT_NELSON,
      WorkLocation.FORT_ST_JOHN,
      WorkLocation.MACKENZIE,
      WorkLocation.PRINCE_GEORGE,
      WorkLocation.QUESNEL,
      WorkLocation.WILLIAMS_LAKE,
    ],
  },
  {
    region: Region.SWE,
    locations: [
      WorkLocation.ABBOTSFORD,
      WorkLocation.BONNINGTON_FALLS,
      WorkLocation.BURNABY,
      WorkLocation.COQUITLAM,
      WorkLocation.LANGLEY,
      WorkLocation.LILLOOET,
      WorkLocation.MAPLE_RIDGE,
      WorkLocation.NEW_WESTMINSTER,
      WorkLocation.NORTH_VANCOUVER,
      WorkLocation.RICHMOND,
      WorkLocation.SURREY,
      WorkLocation.VANCOUVER,
      WorkLocation.WHISTLER,
    ],
  },
  {
    region: Region.NWE,
    locations: [
      WorkLocation.BURNS_LAKE,
      WorkLocation.SMITHERS,
      WorkLocation.TERRACE,
    ],
  },
  {
    region: Region.SEA,
    locations: [
      WorkLocation.CASTLEGAR,
      WorkLocation.CRANBROOK,
      WorkLocation.ELKFORD,
      WorkLocation.KIMBERLY,
      WorkLocation.NELSON,
      WorkLocation.REVELSTOKE,
    ],
  },
];

export const rowData = () => {
  const regionAndLocation = faker.helpers.arrayElement(regionsAndLocations);

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.string.numeric('###-###-###'),
    secondaryPhone: faker.string.numeric('###-###-###'),
    otherPhone: faker.string.numeric('###-###-###'),
    region: regionAndLocation.region,
    workLocation: faker.helpers.arrayElement(regionAndLocation.locations),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    classification: faker.helpers.arrayElement(Object.values(Classification)),
    applicationDate: faker.date.past(),
    skillsAbilities: faker.lorem.sentence(),
    notes: faker.lorem.sentence(),
    supervisor: faker.person.firstName(),
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    status: faker.helpers.arrayElement([
      Status.ACTIVE,
      Status.INACTIVE,
      Status.NEW,
    ]),
    availability: availability(),
    experiences: experiences(),
    logisticsNotes: faker.lorem.sentence(),
    coordinatorNotes: faker.lorem.sentence(),
  };
};
const threeMonthsArray = () => {
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth() -3,
    1
  );
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
  for (let i = 0; i < 500; i++) {
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
