import { datasource } from '../datasource';
import { BcwsPersonnelEntity } from '../entities/bcws';
import { EmcrPersonnelEntity } from '../entities/emcr';
import { RecommitmentCycleEntity } from '../entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../entities/recommitment/recommitment.entity';
import { Program } from '../../auth/interface';
import { Status } from '../../common/enums';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';

export const handler = async (startDate, endDate) => {
  console.log('seeding recommitment...');
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );
  console.log('...seeding cycle...');
  const cycle = await recommitmentCycleRepository.save(
    recommitmentCycleRepository.create({
      year: 2025,
      startDate: startDate,
      endDate: endDate,
    }),
  );
  const recommitmentRepository = datasource.getRepository(RecommitmentEntity);
  const emcrPersonnelRepository = datasource.getRepository(EmcrPersonnelEntity);
  const bcwsPersonnelRepository = datasource.getRepository(BcwsPersonnelEntity);

  const emcrPersonnelQB = emcrPersonnelRepository
    .createQueryBuilder('emcr_personnel')
    .leftJoinAndSelect('emcr_personnel.personnel', 'personnel')
    .where('status = :status', { status: Status.ACTIVE });
  const bcwsPersonnelQB = bcwsPersonnelRepository
    .createQueryBuilder('bcws_personnel')
    .leftJoinAndSelect('bcws_personnel.personnel', 'personnel')
    .where('status = :status', { status: Status.ACTIVE });

  const emcrPersonnel = await emcrPersonnelQB.getMany();
  const bcwsPersonnel = await bcwsPersonnelQB.getMany();
  console.log('...');
  console.log('...seeding emcr...');
  console.log('...');
  for (const person of emcrPersonnel) {
    await recommitmentRepository.save(
      recommitmentRepository.create({
        personnelId: person.personnel.id,
        recommitmentCycleId: cycle.year,
        status: RecommitmentStatus.PENDING,
        memberDecisionDate: null,
        supervisorIdir: null,
        supervisorDecisionDate: null,
        program: Program.EMCR,
      }),
    );
  }

  console.log('...seeding bcws...');
  console.log('...');
  for (const person of bcwsPersonnel) {
    await recommitmentRepository.save(
      recommitmentRepository.create({
        personnelId: person.personnel.id,
        recommitmentCycleId: cycle.year,
        status: RecommitmentStatus.PENDING,
        memberDecisionDate: null,
        supervisorIdir: null,
        supervisorDecisionDate: null,
        program: Program.BCWS,
      }),
    );
  }
  console.log('...seeding recommitment complete');
};
