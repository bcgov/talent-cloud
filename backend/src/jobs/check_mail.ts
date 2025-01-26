import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';
import { datasource } from '../database/datasource';
import { AppLogger } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    bufferLogs: true,
  });

  const logger = new AppLogger();

  try {
    const mailService = app.get(MailService);
    const mail = await mailService.checkMailStatus();
    logger.warn('Unsent Mail:');
    logger.warn(mail);

    if (!datasource.isInitialized) {
      await datasource.initialize();
    }

    const expectedMemberCount = await datasource.query(`
      select COUNT(DISTINCT(email)) from personnel p join recommitment r on r.personnel = p.id where r.status = 'PENDING'`);
    const expectedSupervisorCount = await datasource.query(
      `select COUNT(DISTINCT(supervisor_email)) from personnel p join recommitment r on r.personnel = p.id where r.status = 'MEMBER_COMMITTED'`,
    );
    logger.warn(`Expected member count: ${expectedMemberCount[0].count}`);
    logger.warn(
      `Expected supervisor count: ${expectedSupervisorCount[0].count}`,
    );

    const memberNotEmailed = await datasource.query(
      `select COUNT(DISTINCT(email)) from personnel p join recommitment r on r.personnel = p.id  where r."status" ='PENDING' and email not in (select email from mail)`,
    );
    const supervisorNotEmailed = await datasource.query(
      `select COUNT(DISTINCT(supervisor_email)) from personnel p join recommitment r on r.personnel = p.id  where r."status" ='MEMBER_COMMITTED' and supervisor_email not in (select email from mail)`,
    );

    logger.warn(`Members not emailed: ${memberNotEmailed[0].count}`);
    logger.warn(`Supervisors not emailed: ${supervisorNotEmailed[0].count}`);

    if (memberNotEmailed[0].count > 0) {
      const memberNotEmailedList = await datasource.query(
        `select DISTINCT(email) from personnel p join recommitment r on r.personnel = p.id  where r."status" ='PENDING' and email not in (select email from mail)`,
      );
      logger.error('No email record found for the following members:');
      logger.error(memberNotEmailedList.map((m) => m.email).join(', '));
    }
    if (supervisorNotEmailed[0].count > 0) {
      const supervisorNotEmailedList = await datasource.query(
        `select DISTINCT(supervisor_email) from personnel p join recommitment r on r.personnel = p.id  where r."status" ='PENDING' and supervisor_email not in (select email from mail)`,
      );
      logger.error('No email record found for the following supervisors:');
      logger.error(supervisorNotEmailedList.map((m) => m.email).join(', '));
    }
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
