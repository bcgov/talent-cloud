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
import { FirstAid } from './enums/first-aid.enum';
import { DriverLicense } from './enums/driver-license.enum';

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
  { id: 0, region: 'NEA', locationName: '100 Mile House' },
  { id: 1, region: 'NEA', locationName: '150 Mile House' },
  { id: 2, region: 'SWE', locationName: 'Abbotsford' },
  { id: 3, region: 'HQ', locationName: 'Brentwood Bay' },
  { id: 4, region: 'SWE', locationName: 'Burnaby' },
  { id: 5, region: 'NWE', locationName: 'Burns Lake' },
  { id: 6, region: 'SWE', locationName: 'Bonnington Falls' },
  { id: 7, region: 'VIC', locationName: 'Campbell River' },
  { id: 8, region: 'SEA', locationName: 'Castlegar' },
  { id: 9, region: 'VIC', locationName: 'Cumberland' },
  { id: 10, region: 'SWE', locationName: 'Coquitlam' },
  { id: 11, region: 'VIC', locationName: 'Courtenay' },
  { id: 12, region: 'SEA', locationName: 'Cranbrook' },
  { id: 13, region: 'NEA', locationName: 'Dawson Creek' },
  { id: 14, region: 'VIC', locationName: 'Duncan' },
  { id: 15, region: 'SEA', locationName: 'Elkford' },
  { id: 16, region: 'CTL', locationName: 'Enderby' },
  { id: 17, region: 'HQ', locationName: 'Esquimalt' },
  { id: 18, region: 'NEA', locationName: 'Fort St. John' },
  { id: 19, region: 'NEA', locationName: 'Fort Nelson' },
  { id: 20, region: 'CTL', locationName: 'Kamloops' },
  { id: 21, region: 'CTL', locationName: 'Kelowna' },
  { id: 22, region: 'SEA', locationName: 'Kimberley' },
  { id: 23, region: 'HQ', locationName: 'Langford' },
  { id: 24, region: 'SWE', locationName: 'Langley' },
  { id: 25, region: 'SWE', locationName: 'Lillooet' },
  { id: 26, region: 'NEA', locationName: 'Mackenzie' },
  { id: 27, region: 'SWE', locationName: 'Maple Ridge' },
  { id: 28, region: 'CTL', locationName: 'Merritt' },
  { id: 29, region: 'VIC', locationName: 'Mill Bay' },
  { id: 30, region: 'SWE', locationName: 'Mission' },
  { id: 31, region: 'VIC', locationName: 'Nanaimo' },
  { id: 32, region: 'SEA', locationName: 'Nelson' },
  { id: 33, region: 'SWE', locationName: 'New Westminster' },
  { id: 34, region: 'SWE', locationName: 'North Vancouver' },
  { id: 35, region: 'VIC', locationName: 'Parksville' },
  { id: 36, region: 'CTL', locationName: 'Penticton' },
  { id: 37, region: 'VIC', locationName: 'Port Alberni' },
  { id: 38, region: 'VIC', locationName: 'Port McNeil' },
  { id: 39, region: 'NEA', locationName: 'Prince George' },
  { id: 40, region: 'VIC', locationName: 'Qualicum Beach' },
  { id: 41, region: 'NEA', locationName: 'Quesnel' },
  { id: 42, region: 'SEA', locationName: 'Revelstoke' },
  { id: 43, region: 'SWE', locationName: 'Richmond' },
  { id: 44, region: 'HQ', locationName: 'Saanich' },
  { id: 45, region: 'HQ', locationName: 'Saanichton' },
  { id: 46, region: 'CTL', locationName: 'Salmon Arm' },
  { id: 47, region: 'VIC', locationName: 'Sechelt' },
  { id: 48, region: 'HQ', locationName: 'Sidney' },
  { id: 49, region: 'NWE', locationName: 'Smithers' },
  { id: 50, region: 'CTL', locationName: 'Sorrento' },
  { id: 51, region: 'SWE', locationName: 'Surrey' },
  { id: 52, region: 'NWE', locationName: 'Terrace' },
  { id: 53, region: 'VIC', locationName: 'Ucluelet' },
  { id: 54, region: 'SWE', locationName: 'Vancouver' },
  { id: 55, region: 'CTL', locationName: 'Vernon' },
  { id: 56, region: 'HQ', locationName: 'Victoria' },
  { id: 57, region: 'SWE', locationName: 'Whistler' },
  { id: 58, region: 'NEA', locationName: 'Williams Lake' },
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
