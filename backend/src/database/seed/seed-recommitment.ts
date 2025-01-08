import { datasource } from '../datasource';

import { BcwsPersonnelEntity } from '../entities/bcws';
import { EmcrPersonnelEntity } from '../entities/emcr';
import { RecommitmentCycleEntity } from '../entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../entities/recommitment/recommitment.entity';
import { Program } from '../../auth/interface';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';
import { datePST } from '../../common/helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }

  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );

  const recommitmentRepository = datasource.getRepository(RecommitmentEntity);
  const startDate = new Date(datePST(new Date()));
  await recommitmentCycleRepository.save(recommitmentCycleRepository.create(new RecommitmentCycleEntity(startDate, new Date(), new Date().getFullYear()) ));


  const bcwsPersonnelRepository = datasource.getRepository(BcwsPersonnelEntity);
  const emcrPersonnelRepository = datasource.getRepository(EmcrPersonnelEntity);

  const bcwsPersonnelRepositoryQB =
    bcwsPersonnelRepository.createQueryBuilder('bcwsPersonnel');
  const emcrPersonnelRepositoryQB =
    emcrPersonnelRepository.createQueryBuilder('emcrPersonnel');
  const bcwsPersonnel = await bcwsPersonnelRepositoryQB.getMany();
  const emcrPersonnel = await emcrPersonnelRepositoryQB.getMany();

  emcrPersonnel.forEach(async (person: EmcrPersonnelEntity) => {
    const emcrRecommitment = recommitmentRepository.create({
      personnelId: person.personnelId,
      recommitmentCycleId: new Date().getFullYear(),
      status: RecommitmentStatus.PENDING,
      memberDecisionDate: null,
      memberReason: null,
      supervisorIdir: null,
      supervisorDecisionDate: null,
      program: Program.EMCR,
    });
    await recommitmentRepository.save(emcrRecommitment);
  });
  bcwsPersonnel.forEach(async (person: BcwsPersonnelEntity) => {
    const bcwsRecommitment = recommitmentRepository.create({
      personnelId: person.personnelId,
      recommitmentCycleId: new Date().getFullYear(),
      status: RecommitmentStatus.PENDING,
      memberDecisionDate: null,
      memberReason: null,
      supervisorIdir: null,
      supervisorDecisionDate: null,
      program: Program.BCWS,
    });
    await recommitmentRepository.save(bcwsRecommitment);
  });
};

handler();
