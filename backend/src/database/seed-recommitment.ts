import { datasource } from './datasource';
import { PersonnelEntity } from './entities/personnel/personnel.entity';

import { RecommitmentStatus } from '../common/enums/recommitment-status.enum';
import { RecommitmentCycleEntity } from './entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from './entities/recommitment/recommitment.entity';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );
  const recommitmentRepository = datasource.getRepository(RecommitmentEntity);

  const currentDate = new Date();
  const recommitmentCycleData = new RecommitmentCycleEntity();
  recommitmentCycleData.year = currentDate.getFullYear();
  recommitmentCycleData.startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 2,
  );

  recommitmentCycleData.endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  );

  const cycle: RecommitmentCycleEntity = await recommitmentCycleRepository.save(
    recommitmentCycleRepository.create(recommitmentCycleData),
  );
  const personnelRepository = datasource.getRepository(PersonnelEntity);
  const qb = personnelRepository
    .createQueryBuilder('personnel')
    .leftJoinAndSelect('personnel.bcws', 'bcws')
    .leftJoinAndSelect('personnel.emcr', 'emcr');

  const personnel = await qb.getMany();

  personnel.forEach(async (person: PersonnelEntity) => {
    const commitment = await recommitmentRepository.save(
      recommitmentRepository.create({
        memberId: person.id,
        year: cycle['year'],
        emcr: person?.emcr ? RecommitmentStatus.PENDING : null,
        bcws: person?.bcws ? RecommitmentStatus.PENDING : null,
        memberDecisionDate: null,
        memberReasonEmcr: null,
        memberReasonBcws: null,
        supervisorIdir: null,
        supervisorDecisionDate: null,
      }),
    );
    person.recommitment = commitment;
    await personnelRepository.save(person);
  });
};

handler();
