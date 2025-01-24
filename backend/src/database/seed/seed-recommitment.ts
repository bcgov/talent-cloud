import { datasource } from '../datasource';
import { PersonnelEntity } from '../entities/personnel/personnel.entity';
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
  const personnelRepository = datasource.getRepository(PersonnelEntity);

  const emcrPersonnelQB = personnelRepository.createQueryBuilder('personnel');
  emcrPersonnelQB
    .leftJoinAndSelect('personnel.emcr', 'emcr')
    .where('status = :status', { status: Status.ACTIVE });

  const bcwsPersonnelQB = personnelRepository.createQueryBuilder('personnel');
  bcwsPersonnelQB
    .leftJoinAndSelect('personnel.bcws', 'bcws')
    .where('status = :status', { status: Status.ACTIVE });

  const emcrPersonnel = await emcrPersonnelQB.getMany();
  const bcwsPersonnel = await bcwsPersonnelQB.getMany();
  console.log('...');
  console.log('...seeding emcr...');
  console.log('...');
  for (const person of emcrPersonnel) {
    await recommitmentRepository.save(
      recommitmentRepository.create({
        personnelId: person.id,
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
        personnelId: person.id,
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
