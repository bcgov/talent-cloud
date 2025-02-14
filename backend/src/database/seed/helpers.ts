import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import {
  ToolsProficiency,
  ExperienceLevel,
  LanguageProficiency,
  LanguageLevelType,
  AvailabilityType,
} from '../../common/enums';
import { BcwsRoleEntity } from '../entities/bcws/bcws-role.entity';
import { CertificationEntity } from '../entities/personnel/certifications.entity';
import { ToolsEntity } from '../entities/personnel/tools.entity';
import { CreatePersonnelLanguagesDTO } from '../../personnel/dto/skills/create-personnel-languages.dto';

export const threeMonthsArray = () => {
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

export const availability = () => {
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

export const createTools = (bcwsTools: ToolsEntity[]) => {
  const personnelTools = [];

  for (let i = 0; i < 5; i++) {
    const tool = faker.helpers.arrayElement(bcwsTools);

    personnelTools.push({
      tool,
      toolId: tool.id,
      proficiencyLevel: faker.helpers.arrayElement(
        Object.values(ToolsProficiency),
      ),
    });
  }
  const uniqueTools = new Set(personnelTools.map((tool) => tool.toolId));

  const uniqueToolsArray = Array.from(uniqueTools);

  return uniqueToolsArray.map((uniqueId) =>
    personnelTools.find((tool) => tool.toolId === uniqueId),
  );
};

export const createCertifications = (bcwsCerts: CertificationEntity[]) => {
  const personnelCerts = [];

  for (let i = 0; i < 2; i++) {
    const cert = faker.helpers.arrayElement(bcwsCerts);

    personnelCerts.push({
      certificationId: cert.id,
      expiry: faker.date.future(),
    });
  }
  const uniqueCerts = new Set(
    personnelCerts.map((cert) => cert.certificationId),
  );

  const uniqueCertsArray = Array.from(uniqueCerts);

  return uniqueCertsArray.map((uniqueCert) =>
    personnelCerts.find((cert) => cert.certificationId === uniqueCert),
  );
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

export const createLanguages = (): CreatePersonnelLanguagesDTO[] => {
  const personnelLang: CreatePersonnelLanguagesDTO[] = [];

  for (let i = 0; i < 2; i++) {
    personnelLang.push({
      language: faker.helpers.arrayElement([
        'Portuguese',
        'English',
        'Spanish',
      ]),
      level:
        LanguageProficiency[
          faker.helpers.arrayElement(Object.values(LanguageProficiency))
        ],
      type: LanguageLevelType[
        faker.helpers.arrayElement(Object.values(LanguageLevelType))
      ],
    });
  }
  const uniqueLang = new Set(personnelLang.map((lang) => lang.language));

  const uniqueLangArray = Array.from(uniqueLang);

  return uniqueLangArray.map((uniqueLanguge) =>
    personnelLang.find((lang) => lang.language === uniqueLanguge),
  );
};
