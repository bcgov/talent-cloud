import { faker } from '@faker-js/faker';
import { NestFactory } from '@nestjs/core';
import {
  Region,
  Ministry,
  FunctionName,
  WorkLocation,
  Experience,
  Classification,
} from './enums';
import { AppModule } from '../app.module';
import { PersonnelService } from '../personnel/personnel.service';

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
  const num = Math.floor(Math.random() * 10);
  const experiences = [];
  for (let i = 0; i < num; i++) {
    experiences.push({
      function: faker.helpers.arrayElement(Object.values(FunctionName)),
      experience: faker.helpers.arrayElement(Object.values(Experience)),
    });
  }
  return experiences;
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
  console.log(data);
  return await personnelService.createPersonnel(data);
};

console.log(handler());
