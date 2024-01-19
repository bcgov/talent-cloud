import { faker } from '@faker-js/faker';
import {
  ClassificationName,
  Region,
  Ministry,
  FunctionNameAbbrv,
  WorkLocation,
  Status,
  Experience,
} from './enums';

export const rowData = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    primaryPhone: faker.phone.number(),
    secondaryPhone: faker.phone.number(),
    otherPhone: faker.phone.number(),
    region: faker.helpers.arrayElement(Object.values(Region)),
    workLocation: faker.helpers.arrayElement(Object.values(WorkLocation)),
    ministry: faker.helpers.arrayElement(Object.values(Ministry)),
    classification: faker.helpers.arrayElement(
      Object.values(ClassificationName),
    ),
    applicationDate: faker.date.past(),
    skillsAbilities: faker.lorem.sentence(),
    notes: faker.lorem.sentence(),
    supervisor: faker.person.firstName(),
    active: faker.datatype.boolean({ probability: 0.8 })
      ? Status.Active
      : Status.Inactive,
    remoteOnly: faker.datatype.boolean({ probability: 0.4 }),
    willingToTravel: faker.datatype.boolean({ probability: 0.8 }),
    experiences: experiences(),
  };
};

const experiences = () => {
  const num = Math.floor(Math.random() * 5);
  const experiences = [];
  for (let i = 0; i < num; i++) {
    experiences.push({
      function: faker.helpers.arrayElement(Object.values(FunctionNameAbbrv)),
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

console.log(generateData())