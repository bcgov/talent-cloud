import { MigrationExecutor } from 'typeorm';
import {datasource} from './datasource';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async () => {
  console.log('Starting migrations...');

  try {
    if (!datasource.isInitialized) {
      await datasource.initialize();
    }

    const migrationExecutor = new MigrationExecutor(datasource, datasource.createQueryRunner());

    const executed = await migrationExecutor.getExecutedMigrations();
    const pending = await migrationExecutor.getPendingMigrations();

    console.log('---> executed:');
    console.log(executed.map((mig) => mig.name));

    console.log('---> pending:');
    console.log(pending.map((mig) => mig.name));

    const run = await migrationExecutor.executePendingMigrations();

    console.log('---> ran now:');
    console.log(run.map((mig) => mig.name));

    console.log('Migration complete.');

    await datasource.destroy();
    return 'success';
  } catch (e) {
    console.log(e);
    console.log('Migration failure.');
    return 'failure';
  }
};

console.log(handler());