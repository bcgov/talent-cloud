import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715368811077 implements MigrationInterface {
  name = 'InsertLocationMigration1715368811077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" DROP CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3"`,
    );

    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_4497c09d4ea63c7187360afc685"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" DROP CONSTRAINT "FK_874eebc6d744a86c688612247c5"`,
    );
    await queryRunner.query(`
    INSERT into location (region, location_name) values
        (	'NEA',	'Quesnel'),
        (	'NEA',	'Williams Lake'),
        (	'NEA',	'Alexis Creek'),
        (	'HQ',	'Victoria'),
        (	'SWE',	'Abbotsford'),
        (	'SWE',	'Vancouver'),
        (	'VIC',	'Campbell River'),
        (	'VIC',	'Duncan'),
        (	'VIC',	'Nanaimo'),
        (	'VIC',	'Parksville'),
        (	'VIC',	'Port Alberni'),
        (	'VIC',	'Sechelt'),
        (	'VIC',	'Bella Coola'),
        (	'SWE',	'Boston Bar'),
        (	'SWE',	'Chilliwack'),
        (	'SWE',	'Cultus Lake'),
        (	'NWE',	'Masset'),
        (	'SWE',	'Pemberton'),
        (	'VIC',	'Powell River'),
        (	'SWE',	'Squamish'),
        (	'CTL',	'Kamloops'),
        (	'CTL',	'Kelowna'),
        (	'CTL',	'Merritt'),
        (	'CTL',	'Penticton'),
        (	'CTL',	'Salmon Arm'),
        (	'CTL',	'Vernon'),
        (	'SWE',	'Lillooet'),
        (	'CTL',	'Clearwater'),
        (	'SWE',	'Lytton'),
        (	'CTL',	'Princeton'),
        (	'NWE',	'Burns Lake'),
        (	'NWE',	'Smithers'),
        (	'NWE',	'Terrace'),
        (	'NWE',	'Atlin'),
        (	'NWE',	'Dease Lake'),
        (	'NWE',	'Hazelton'),
        (	'NWE',	'Houston'),
        (	'NWE',	'Prince Rupert'),
        (	'NEA',	'Dawson Creek'),
        (	'NEA',	'Fort Nelson'),
        (	'NEA',	'Fort St. John'),
        (	'NEA',	'Prince George'),
        (	'NWE',	'Vanderhoof'),
        (	'CTL',	'Blue River'),
        (	'NEA',	'Chetwynd'),
        (	'NEA',	'Fort St. James'),
        (	'NEA',	'MacKenzie'),
        (	'NEA',	'Valemount'),
        (	'SEA',	'Cranbrook'),
        (	'SEA',	'Kimberley'),
        (	'SEA',	'Nelson'),
        (	'SEA',	'Castelgar'),
        (	'SEA',	'Golden'),
        (	'SEA',	'Grand Forks'),
        (	'SEA',	'Invermere'),
        (	'SEA',	'Nakusp'),
        (	'CTL',	'Enderby'),
        (	'CTL',	'Sorrento'),
        (	'HQ',	'Brentwood Bay'),
        (	'HQ',	'Esquimalt'),
        (	'HQ',	'Langford'),
        (	'HQ',	'Saanich'),
        (	'HQ',	'Saanichton'),
        (	'HQ',	'Sidney'),
        (	'NEA',	'100 Mile House'),
        (	'NEA',	'150 Mile House'),
        (	'NEA',	'Mackenzie'),
        (	'SEA',	'Bonnington Falls'),
        (	'SEA',	'Castlegar'),
        (	'SEA',	'Elkford'),
        (	'SEA',	'Revelstoke'),
        (	'SWE',	'Burnaby'),
        (	'SWE',	'Coquitlam'),
        (	'SWE',	'Langley'),
        (	'SWE',	'Maple Ridge'),
        (	'SWE',	'Mission'),
        (	'SWE',	'New Westminster'),
        (	'SWE',	'North Vancouver'),
        (	'SWE',	'Richmond'),
        (	'SWE',	'Surrey'),
        (	'SWE',	'Whistler'),
        (	'VIC',	'Courtenay'),
        (	'VIC',	'Cumberland'),
        (	'VIC',	'Mill Bay'),
        (	'VIC',	'Port McNeil'),
        (	'VIC',	'Qualicum Beach'),
        (	'VIC',	'Sooke'),
        (	'VIC',	'Ucluelet')
        ON CONFLICT DO NOTHING
        
`);
    await queryRunner.query(`UPDATE location SET fire_centre='CARIBOO' WHERE location_name=	'Quesnel'`);
    await queryRunner.query(`UPDATE location SET fire_centre='CARIBOO' WHERE location_name=	'Williams Lake'`);
    await queryRunner.query(`UPDATE location SET fire_centre='CARIBOO' WHERE location_name=	'Alexis Creek'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Victoria'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Abbotsford'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Vancouver'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Campbell River'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Duncan'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Nanaimo'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Parksville'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Port Alberni'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Sechelt'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Bella Coola'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Boston Bar'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Chilliwack'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Cultus Lake'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Masset'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Pemberton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Powell River'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Squamish'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Kamloops'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Kelowna'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Merritt'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Penticton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Salmon Arm'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Vernon'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Lillooet'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Clearwater'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Lytton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Princeton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Burns Lake'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Smithers'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Terrace'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Atlin'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Dease Lake'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Hazelton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Houston'`);
    await queryRunner.query(`UPDATE location SET fire_centre='NORTHWEST' WHERE location_name=	'Prince Rupert'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Dawson Creek'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Fort Nelson'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Fort St. John'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Prince George'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Vanderhoof'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Blue River'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Chetwynd'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Fort St. James'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'MacKenzie'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Valemount'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Cranbrook'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Kimberley'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Nelson'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Castelgar'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Golden'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Grand Forks'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Invermere'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Nakusp'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Enderby'`);
    await queryRunner.query(`UPDATE location SET fire_centre='KAMLOOPS' WHERE location_name=	'Sorrento'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Brentwood Bay'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Esquimalt'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Langford'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Saanich'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Saanichton'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Sidney'`);
    await queryRunner.query(`UPDATE location SET fire_centre='CARIBOO' WHERE location_name=	'100 Mile House'`);
    await queryRunner.query(`UPDATE location SET fire_centre='CARIBOO' WHERE location_name=	'150 Mile House'`);
    await queryRunner.query(`UPDATE location SET fire_centre='PRINCE_GEORGE' WHERE location_name=	'Mackenzie'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Bonnington Falls'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Castlegar'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Elkford'`);
    await queryRunner.query(`UPDATE location SET fire_centre='SOUTHEAST' WHERE location_name=	'Revelstoke'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Burnaby'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Coquitlam'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Langley'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Maple Ridge'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Mission'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'New Westminster'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'North Vancouver'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Richmond'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Surrey'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Whistler'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Courtenay'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Cumberland'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Mill Bay'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Port McNeil'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Qualicum Beach'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Sooke'`);
    await queryRunner.query(`UPDATE location SET fire_centre='COASTAL' WHERE location_name=	'Ucluelet'`);
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_874eebc6d744a86c688612247c5" FOREIGN KEY ("work_fire_centre") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bcws_personnel" ADD CONSTRAINT "FK_4497c09d4ea63c7187360afc685" FOREIGN KEY ("home_fire_centre") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_5778c27d09c7f415bd9ab93950f" FOREIGN KEY ("work_location", "work_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "emcr_personnel" ADD CONSTRAINT "FK_b086e30a7c5415d59f57bb85ac3" FOREIGN KEY ("home_location", "home_region") REFERENCES "location"("location_name","region") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM location WHERE location_name NOT IN (
            '100 Mile House',
             '150 Mile House',
             'Abbotsford',
             'Brentwood Bay',
             'Burnaby',
             'Burns Lake',
             'Bonnington Falls',
             'Campbell River',
             'Castlegar',
             'Cumberland',
             'Coquitlam',
             'Courtenay',
             'Cranbrook',
             'Dawson Creek',
             'Duncan',
             'Elkford',
             'Enderby',
             'Esquimalt',
             'Fort St. John',
             'Fort Nelson',
             'Kamloops',
             'Kelowna',
             'Kimberley',
             'Langford',
             'Langley',
             'Lillooet',
             'Mackenzie',
             'Maple Ridge',
             'Merritt',
             'Mill Bay',
             'Mission',
             'Nanaimo',
             'Nelson',
             'New Westminster',
             'North Vancouver',
             'Parksville',
             'Penticton',
             'Port Alberni',
             'Port McNeil',
             'Prince George',
             'Qualicum Beach',
             'Quesnel',
             'Revelstoke',
             'Richmond',
             'Saanich',
             'Saanichton',
             'Salmon Arm',
             'Sechelt',
             'Sidney',
             'Smithers',
             'Sorrento',
             'Surrey',
             'Terrace',
             'Ucluelet',
             'Vancouver',
             'Vernon',
             'Victoria',
             'Whistler',
             'Williams Lake',
             'Vanderhoof',
             'Sooke'
            )`);
    await queryRunner.query(`update location set fire_centre = null where location_name in (
            '100 Mile House',
            '150 Mile House',
            'Abbotsford',
            'Brentwood Bay',
            'Burnaby',
            'Burns Lake',
            'Bonnington Falls',
            'Campbell River',
            'Castlegar',
            'Cumberland',
            'Coquitlam',
            'Courtenay',
            'Cranbrook',
            'Dawson Creek',
            'Duncan',
            'Elkford',
            'Enderby',
            'Esquimalt',
            'Fort St. John',
            'Fort Nelson',
            'Kamloops',
            'Kelowna',
            'Kimberley',
            'Langford',
            'Langley',
            'Lillooet',
            'Mackenzie',
            'Maple Ridge',
            'Merritt',
            'Mill Bay',
            'Mission',
            'Nanaimo',
            'Nelson',
            'New Westminster',
            'North Vancouver',
            'Parksville',
            'Penticton',
            'Port Alberni',
            'Port McNeil',
            'Prince George',
            'Qualicum Beach',
            'Quesnel',
            'Revelstoke',
            'Richmond',
            'Saanich',
            'Saanichton',
            'Salmon Arm',
            'Sechelt',
            'Sidney',
            'Smithers',
            'Sorrento',
            'Surrey',
            'Terrace',
            'Ucluelet',
            'Vancouver',
            'Vernon',
            'Victoria',
            'Whistler',
            'Williams Lake',
            'Vanderhoof',
            'Sooke'
        )`);
  }
}
