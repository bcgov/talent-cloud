import { faker } from '@faker-js/faker';
import {
  EmcrExperienceEntity,
  EmcrFunctionEntity,
  EmcrTrainingEntity,
} from '../entities/emcr';
import { Experience, FirstAid, Status } from '../../common/enums';
import { TravelPreference } from '../../common/enums/travel-preference.enum';
import { CreatePersonnelEmcrDTO } from '../../emcr/dto';

export const createEMCRhandler = (
  functions: EmcrFunctionEntity[],
  trainings: EmcrTrainingEntity[],
  dateApplied: Date,
): {
  emcrData: CreatePersonnelEmcrDTO;
} => {
  const status = faker.helpers.arrayElement(Object.values(Status)); //

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
    trainings: trainings,
    dateApproved:
      status !== Status.PENDING
        ? faker.date.between({
            from: dateApplied,
            to: new Date(),
          })
        : undefined,
    status: status,
    experiences: experiences(functions) as EmcrExperienceEntity[],
    travelPreference: faker.helpers.arrayElement([
      TravelPreference.REMOTE_ONLY,
      TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
      TravelPreference.WILLING_TO_TRAVEL_REGION,
      TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    ]),
  };

  return { emcrData };
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
