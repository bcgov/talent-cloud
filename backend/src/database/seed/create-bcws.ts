import { faker } from '@faker-js/faker';
import { CreatePersonnelBcwsDTO } from '../../bcws/dto/create-bcws-personnel.dto';
import { Status, ExperienceLevel } from '../../common/enums';
import { TravelPreference } from '../../common/enums/travel-preference.enum';
import { BcwsRoleEntity } from '../entities/bcws/bcws-role.entity';

export const createBCWShandler = (
  roles: BcwsRoleEntity[],
  status: Status,
  dateApplied: Date,
): {
  bcwsData: CreatePersonnelBcwsDTO;
} => {
  const personnelRoles = createRoles(roles);
  const firstChoiceSection = roles.find(
    (r) => r.id === personnelRoles[0].roleId,
  )?.section;
  const secondRoleSection = roles.find((r) => r.id === personnelRoles[1].roleId)
    ?.section;
  let secondChoiceSection = undefined;
  if (secondRoleSection !== firstChoiceSection) {
    secondChoiceSection = secondRoleSection;
  }

  const bcwsData: CreatePersonnelBcwsDTO = {
    dateApplied: dateApplied,
    dateApproved:
      status !== Status.PENDING
        ? faker.date.between({
            from: dateApplied,
            to: new Date(),
          })
        : undefined,
    logisticsNotes: faker.lorem.paragraph(),
    coordinatorNotes: faker.lorem.sentence(),
    approvedBySupervisor: faker.datatype.boolean({ probability: 0.8 }),
    status: status,
    purchaseCardHolder: faker.datatype.boolean({ probability: 0.4 }),
    liaisonFirstName: faker.person.firstName(),
    liaisonLastName: faker.person.lastName(),
    liaisonPhoneNumber: faker.string.numeric('##########'),
    liaisonEmail: faker.internet.email(),
    willingnessStatement: faker.datatype.boolean({ probability: 0.4 }),
    firstChoiceSection,
    secondChoiceSection,
    parQ: faker.datatype.boolean({ probability: 0.4 }),
    respectfulWorkplacePolicy: faker.datatype.boolean({ probability: 0.4 }),
    orientation: faker.datatype.boolean({ probability: 0.4 }),
    roles: personnelRoles,
    travelPreference: faker.helpers.arrayElement([
      TravelPreference.REMOTE_ONLY,
      TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
      TravelPreference.WILLING_TO_TRAVEL_FIRE_ZONE,
      TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE,
      TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    ]),
  };
  return { bcwsData };
};

export const createRoles = (bcwsRoles: BcwsRoleEntity[]) => {
  const personnelRoles = [];

  for (let i = 0; i < 5; i++) {
    const role = faker.helpers.arrayElement(bcwsRoles);

    personnelRoles.push({
      roleId: role.id,
      expLevel: faker.helpers.arrayElement(Object.values(ExperienceLevel)),
    });
  }
  const uniqueRoles = new Set(personnelRoles.map((role) => role.roleId));

  const uniqueRolesArray = Array.from(uniqueRoles);

  return uniqueRolesArray.map((uniqueRole) =>
    personnelRoles.find((role) => role.roleId === uniqueRole),
  );
};
