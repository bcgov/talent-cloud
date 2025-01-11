import { datasource } from '../database/datasource';
import { RecommitmentCycleEntity } from '../database/entities/recommitment/recommitment-cycle.entity';
import { RecommitmentEntity } from '../database/entities/recommitment/recommitment.entity';

export const recommitmentCycleHandler = async () => {
  console.log('Seeding recommitment cycle');
  if (!datasource.isInitialized) {
    await datasource.initialize();
  }
  const recommitmentRepository = datasource.getRepository(RecommitmentEntity);
  const recommitmentCycleRepository = datasource.getRepository(
    RecommitmentCycleEntity,
  );

  if (process.env?.ENV !== 'production') {
    const qb = recommitmentRepository.createQueryBuilder('recommitment');
    await qb.delete().execute();
    await recommitmentCycleRepository.delete({ year: 2025 });
  } else {
    await recommitmentCycleRepository.save(
      recommitmentCycleRepository.create({
        startDate: '2025-01-20 17:00:00',
        endDate: '2025-02-22 02:00:00',
        year: 2025,
      }),
    );
  }
  console.log('Recommitment cycle seeded');
};
