import { personnel } from './data';
import { datasource } from './datasource';
import { BcwsPersonnelEntity } from './entities/bcws';
import { BcwsCertificationEntity } from './entities/bcws/bcws-certifications.entity';
import { BcwsLocationEntity } from './entities/bcws/bcws-location.entity';
import { BcwsRoleEntity } from './entities/bcws/bcws-role.entity';
import { BcwsToolsEntity } from './entities/bcws/bcws-tools.entity';
import { DivisionEntity } from './entities/division.entity';
import {
  EmcrFunctionEntity,
  LocationEntity,
  EmcrPersonnelEntity,
  EmcrTrainingEntity,
} from './entities/emcr';
import { PersonnelEntity } from './entities/personnel.entity';
import {
  bcwsLocationsSql,
  certsSql,
  divisionsSql,
  functionSql,
  insertTrainingSql,
  locationSql,
  rolesSql,
  toolsSql,
} from './queries';
import { handler as dataHandler } from '../common/utils';
import { CreatePersonnelEmcrDTO } from '../personnel/dto/emcr';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  const cicd = process.env.ENV === 'ci';

  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const personnelRepo = datasource.getRepository(PersonnelEntity);

  const locationRepo = datasource.getRepository(LocationEntity);
  const functionRepo = datasource.getRepository(EmcrFunctionEntity);
  const emcrPersonnelRepo = datasource.getRepository(EmcrPersonnelEntity);
  const emcrTrainingRepo = datasource.getRepository(EmcrTrainingEntity);

  const bcwsFireCentreRepo = datasource.getRepository(BcwsLocationEntity);
  const bcwsPersonnelRepo = datasource.getRepository(BcwsPersonnelEntity);
  const bcwsToolsRepo = datasource.getRepository(BcwsToolsEntity);
  const bcwsCertificationsRepo = datasource.getRepository(
    BcwsCertificationEntity,
  );
  const bcwsDivisionsRepo = datasource.getRepository(DivisionEntity);
  const bcwsRolesRepo = datasource.getRepository(BcwsRoleEntity);

  try {
    const seedDivisions = await bcwsDivisionsRepo.find();
    const seededLocations = await locationRepo.find();
    const seededFunctions = await functionRepo.find();
    const seededTrainings = await emcrTrainingRepo.find();

    const seededBcwsFireCentre = await bcwsFireCentreRepo.find();
    const seededBcwsTools = await bcwsToolsRepo.find();
    const seededBcwsCertifications = await bcwsCertificationsRepo.find();
    const seededBcwsRoles = await bcwsRolesRepo.find();
    if (seedDivisions.length === 0) {
      await datasource.query(divisionsSql);
    }
    if (seededBcwsFireCentre.length === 0) {
      await datasource.query(bcwsLocationsSql);
    }
    if (seededBcwsTools.length === 0) {
      await datasource.query(toolsSql);
    }
    if (seededBcwsCertifications.length === 0) {
      await datasource.query(certsSql);
    }
    if (seededBcwsRoles.length === 0) {
      await datasource.query(rolesSql);
    }
    if (seededLocations.length === 0) {
      await datasource.query(locationSql);
    }
    if (seededFunctions.length === 0) {
      await datasource.query(functionSql);
    }
    if (seededTrainings.length === 0) {
      await datasource.query(insertTrainingSql);
    }
    console.log('Seeding Data...');

    if (cicd) {
      // await datasource.query(testSql);
      await Promise.all(
        personnel.map(async (person) => {
          const emcr: CreatePersonnelEmcrDTO = person.emcr;
          delete person.emcr;
          const personEntity = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(person)),
          );

          emcr.personnelId = personEntity.id;
          await emcrPersonnelRepo.save(new EmcrPersonnelEntity(emcr));
        }),
      );
    } else if (!cicd) {
      const data = dataHandler(
        seededLocations,
        seededFunctions,
        seededBcwsFireCentre,
        seededBcwsRoles,
        seededBcwsTools,
        seededBcwsCertifications,
        seedDivisions,
      );

      await Promise.all(
        data.map(async (personnel) => {
          const { personnelData, emcrData, bcwsData } = personnel;

          const emcr = new EmcrPersonnelEntity(emcrData);
          const bcws = new BcwsPersonnelEntity(bcwsData);

          const person = await personnelRepo.save(
            personnelRepo.create(new PersonnelEntity(personnelData)),
          );

          bcws.personnelId = person.id;
          emcr.personnelId = person.id;
          bcws.tools.forEach((tool) => (tool.personnelId = person.id));
          bcws.roles.forEach((role) => (role.personnelId = person.id));
          bcws.certifications.forEach((cert) => (cert.personnelId = person.id));
          bcws.languages.forEach((lang) => (lang.personnelId = person.id));
          await emcrPersonnelRepo.save(emcr);
          await bcwsPersonnelRepo.save(bcws);
        }),
      );
    }

    console.log('...complete...');

    await datasource.destroy();
    return 'success';
  } catch (e) {
    console.log(e);
    console.log('Seeder failed.');
    return 'failure';
  }
};

handler();
