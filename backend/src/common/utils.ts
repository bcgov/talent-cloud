import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import {
  Region,
  Ministry,
  WorkLocation,
  Experience,
  Classification,
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
export const rowData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.phone.number('###-###-###'),
    secondaryPhone: faker.phone.number('###-###-###'),
    otherPhone: faker.phone.number('###-###-###'),
    region: faker.helpers.arrayElement(Object.values(Region)),
    workLocation: faker.helpers.arrayElement(Object.values(WorkLocation)),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    classification: faker.helpers.arrayElement(Object.values(Classification)),
    applicationDate: faker.date.past(),
    skillsAbilities: faker.lorem.sentence(),
    notes: faker.lorem.sentence(),
    supervisor: faker.person.firstName(),
    active: faker.datatype.boolean({ probability: 0.8 }),
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    experiences: experiences(),
  };
};

const experiences = () => {
  const num = Math.floor(Math.random() * 9);
  const experiences = [];
  for (let i = 0; i < num; i++) {
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
  for (let i = 0; i < 100; i++) {
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
