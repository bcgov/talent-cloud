import { datasource } from '../datasource';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';

import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';
import { RecommitmentCycleEntity } from '../entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../entities/recommitment/recommitment.entity';
import { Program } from '../../auth/interface';

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
    person.bcws && await recommitmentRepository.save(
      recommitmentRepository.create({
        memberId: person.id,
        recommitmentCycleId: cycle['year'],
        status: RecommitmentStatus.PENDING,
        memberDecisionDate: null,
        memberReason: null,
        supervisorIdir: null,
        supervisorDecisionDate: null,
        program: Program.BCWS,
      }),
    );
    person.emcr && await recommitmentRepository.save(
      recommitmentRepository.create({
        memberId: person.id,
        recommitmentCycleId: cycle['year'],
        status: RecommitmentStatus.PENDING,
        memberDecisionDate: null,
        memberReason: null,
        supervisorIdir: null,
        supervisorDecisionDate: null,
        program: Program.EMCR,
      }),
    );
    await personnelRepository.save(person);
  });
};

handler();
