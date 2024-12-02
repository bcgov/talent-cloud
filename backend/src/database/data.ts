import { EmcrExperienceEntity, EmcrFunctionEntity } from './entities/emcr';
import { LocationEntity } from './entities/location.entity';
import { Experience, Region } from '../common/enums/emcr';
import { Ministry } from '../common/enums/ministry.enum';
import { Status } from '../common/enums/status.enum';
import { TravelPreference } from '../common/enums/travel-preference.enum';
import { UnionMembership } from '../common/enums/union-membership.enum';
import { CreatePersonnelDTO } from '../personnel/dto/create-personnel.dto';
import { AvailabilityEntity } from './entities/personnel/availability.entity';
import { DriverLicense } from '../common/enums/driver-license.enum';

export const personnel: CreatePersonnelDTO[] = [
  {
    firstName: 'Brandyn',
    ministry: Ministry.AF,
    lastName: 'Bartell',
    email: 'Kacie25@hotmail.com',
    primaryPhone: '8939179531',
    secondaryPhone: '4462570360',
    workPhone: '3859589684',

    unionMembership: UnionMembership['EXCLUDED'],
    supervisorFirstName: 'Damon',
    supervisorLastName: 'Mraz',
    supervisorEmail: 'Ernestina73@yahoo.com',
    homeLocation: {
      id: 29,
      locationName: 'Merritt',
      region: Region['CTL'],
    } as LocationEntity,
    workLocation: {
      id: 29,
      locationName: 'Merritt',
      region: Region['CTL'],
    } as LocationEntity,
    driverLicense: [DriverLicense['CLASS_3']],
    emcr: {
      trainings: [],
      status: Status.ACTIVE,

      dateApplied: new Date(2024, 1, 10),
      coordinatorNotes: 'Succedo pauci cogo.',
      logisticsNotes:
        'Temperantia tempore mollitia. Asper aegrotatio dolorum ultra. Vir non acceptus.',
      firstAidLevel: 'Level 2: Occupational First Aid',
      firstAidExpiry: new Date('2024-03-15'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: true,
      firstNationExperienceWorking: false,
      peccExperience: false,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date('2024-01-13T13:01:23.962Z'),
      experiences: [
        {
          function: {
            id: 9,
            name: 'Recovery',
            abbreviation: 'Recovery',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 5,
            name: 'Liaison',
            abbreviation: 'Liaison',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 4,
            name: 'Finance',
            abbreviation: 'Fin',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    },
    jobTitle: 'Digitized empowering data-warehouse',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Zachary',
    ministry: Ministry.AF,
    lastName: 'Bartoletti',
    email: 'Briana75@hotmail.com',
    primaryPhone: '8529416283',
    secondaryPhone: '3297392700',
    workPhone: '7523110457',

    supervisorFirstName: 'Harry',

    supervisorLastName: 'Rohan',
    supervisorEmail: 'Maegan.Upton@yahoo.com',
    unionMembership: UnionMembership['PEA'],

    driverLicense: [DriverLicense['CLASS_3']],

    homeLocation: {
      id: 23,
      locationName: 'Kimberley',
      region: Region['SEA'],
    } as LocationEntity,
    workLocation: {
      id: 29,
      locationName: 'Merritt',
      region: Region['CTL'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      dateApplied: new Date(2023, 11, 9),
      status: Status.ACTIVE,

      coordinatorNotes: 'Condico eaque clamo condico cicuta adhuc uxor patria.',
      logisticsNotes:
        'Clamo vereor trepide adopto pauci vulnero defetiscor canto repudiandae. Absque apto attero sui denique ullam. Adipiscor consuasor alter temeritas defungo cui statim reprehenderit.',
      firstAidLevel: 'Level 1: Emergency First Aid for Industry',
      firstAidExpiry: new Date('2024-01-10'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: false,
      peccExperience: false,
      preocExperience: true,
      emergencyExperience: false,
      dateApproved: new Date('2024-02-09T07:22:14.686Z'),
      experiences: [
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 8,
            name: 'Advanced Planning Unit',
            abbreviation: 'APU',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 5,
            name: 'Liaison',
            abbreviation: 'Liaison',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 10,
            name: 'Deputy Director',
            abbreviation: 'DDir',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 4,
            name: 'Finance',
            abbreviation: 'Fin',
          } as EmcrFunctionEntity,

          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
    },

    jobTitle: 'Open-architected static knowledge base',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Heather',
    ministry: Ministry.AF,
    lastName: 'Botsford',
    email: 'Blake_Stamm-Steuber12@hotmail.com',
    primaryPhone: '5600351973',
    secondaryPhone: '8409072412',
    workPhone: '5929269241',
    supervisorFirstName: 'Elliot',

    supervisorLastName: 'Swaniawski',
    supervisorEmail: 'Cristina_Hirthe41@yahoo.com',

    homeLocation: {
      id: 16,
      locationName: 'Elkford',
      region: Region['SEA'],
    } as LocationEntity,
    workLocation: {
      id: 23,
      locationName: 'Kimberley',
      region: Region['SEA'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      coordinatorNotes: 'Termes cunabula depulso canonicus nisi.',
      dateApplied: new Date(2023, 5, 9),
      status: Status.ACTIVE,

      dateApproved: new Date('2024-01-04T07:49:41.764Z'),
      logisticsNotes:
        'Accendo tonsor iure dedecor quo spero vinco aperio. Demulceo creber est concido comburo repellendus strenuus ',
      firstAidLevel: 'Level 2: Occupational First Aid',
      firstAidExpiry: new Date('2024-01-30'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: false,
      peccExperience: false,
      preocExperience: false,
      emergencyExperience: true,
      experiences: [
        {
          function: {
            id: 9,
            name: 'Recovery',
            abbreviation: 'Recovery',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 8,
            name: 'Advanced Planning Unit',
            abbreviation: 'APU',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 7,
            name: 'Planning',
            abbreviation: 'Plans',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 2,
            name: 'Emergency Support Services',
            abbreviation: 'ESS',
          } as EmcrFunctionEntity,

          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_REGION,
    },
    driverLicense: [DriverLicense['CLASS_3']],

    unionMembership: UnionMembership['PEA'],

    jobTitle: 'Down-sized asynchronous benchmark',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Liana',
    ministry: Ministry.AF,
    lastName: 'Brown',
    email: 'Dillon.OHara@gmail.com',
    primaryPhone: '3880637094',
    secondaryPhone: '3279445206',
    workPhone: '6382495637',

    supervisorFirstName: 'Fatima',

    supervisorLastName: 'Howell',
    supervisorEmail: 'Lauryn63@yahoo.com',

    unionMembership: UnionMembership['BCGEU'],
    driverLicense: [DriverLicense['CLASS_3']],
    homeLocation: {
      id: 40,
      locationName: 'Prince George',
      region: Region['NEA'],
    } as LocationEntity,
    workLocation: {
      id: 16,
      locationName: 'Elkford',
      region: Region['SEA'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      status: Status.PENDING,
      dateApplied: new Date(2023, 4, 24),

      coordinatorNotes: 'Varius quam coruscus attero.',
      logisticsNotes:
        'Coniuratio abscido catena cupio. A thorax sto. Cuius bellum aspicio addo vae terebro accendo comitatus stella.',
      firstAidLevel: 'Level 3: Occupational First Aid',
      firstAidExpiry: new Date(new Date(2023, 5, 11)),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: true,
      firstNationExperienceWorking: false,
      peccExperience: false,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date('2024-03-20T17:45:49.747Z'),
      experiences: [
        {
          function: {
            id: 10,
            name: 'Deputy Director',
            abbreviation: 'DDir',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 2,
            name: 'Emergency Support Services',
            abbreviation: 'ESS',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 7,
            name: 'Planning',
            abbreviation: 'Plans',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,

          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.REMOTE_ONLY,
    },

    jobTitle: 'Organized needs-based toolset',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Percy',
    ministry: Ministry.AF,
    lastName: 'Buckridge',
    email: 'Mylene_Morissette@hotmail.com',
    primaryPhone: '5847361071',
    secondaryPhone: '3663208367',
    workPhone: '3422536265',

    supervisorFirstName: 'Brooke',

    supervisorLastName: 'Ward',
    supervisorEmail: 'Breanne17@gmail.com',

    unionMembership: UnionMembership['BCGEU'],

    homeLocation: {
      id: 35,
      locationName: 'North Vancouver',
      region: Region['SWE'],
    } as LocationEntity,
    workLocation: {
      id: 40,
      locationName: 'Prince George',
      region: Region['NEA'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      dateApplied: new Date(2024, 1, 2),
      status: Status.PENDING,

      coordinatorNotes:
        'Calco capio trepide approbo unus similique quidem amplitudo.',
      logisticsNotes:
        'Torqueo viridis aliquid. Eaque tempora brevis corrumpo tremo accusator acer ancilla damnatio. Autem stipes umerus uredo theatrum baiulus.',
      firstAidLevel: 'Level 1: Standard First Aid for Industry',
      firstAidExpiry: new Date('2023-05-31'),

      psychologicalFirstAid: true,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: true,
      peccExperience: true,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date('2024-02-21T22:10:47.298Z'),
      experiences: [
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 1,
            name: 'Operations',
            abbreviation: 'Ops',
          } as EmcrFunctionEntity,

          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    },
    driverLicense: [DriverLicense['CLASS_3']],

    jobTitle: 'Public-key tangible info-mediaries',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Alanis',
    ministry: Ministry.AF,
    lastName: 'Barton',
    email: 'Otho_Olson@hotmail.com',
    primaryPhone: '0210476197',
    secondaryPhone: '7901392479',
    workPhone: '7469424252',

    supervisorFirstName: 'Citlalli',

    supervisorLastName: 'Ebert-Schuster',
    supervisorEmail: 'Stacey.Thompson@gmail.com',
    homeLocation: {
      id: 58,
      locationName: 'Whistler',
      region: Region['SWE'],
    } as LocationEntity,
    workLocation: {
      id: 35,
      locationName: 'North Vancouver',
      region: Region['SWE'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      status: Status.PENDING,
      dateApplied: new Date(2023, 9, 17),

      coordinatorNotes:
        'Ambulo sortitus tenax deserunt ago stips ver voro adduco libero.',
      logisticsNotes:
        'Statim cubitum porro conatus sit. Corporis universe sit velum vulpes. Vulgivagus speculum quibusdam baiulus uterque supellex congregatio defessus coniuratio tametsi.',
      firstAidLevel: 'Level 1: Emergency First Aid for Industry',
      firstAidExpiry: new Date('2024-02-03'),

      psychologicalFirstAid: true,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: false,
      peccExperience: false,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date(null),
      experiences: [
        {
          function: {
            id: 5,
            name: 'Liaison',
            abbreviation: 'Liaison',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION,
    },
    driverLicense: [DriverLicense['CLASS_3']],

    unionMembership: UnionMembership['PEA'],
    jobTitle: 'Cross-group client-driven encryption',

    availability: [] as AvailabilityEntity[],
  },

  {
    firstName: 'Esta',
    ministry: Ministry.AF,
    lastName: 'Paucek',
    email: 'Nikko92@hotmail.com',
    primaryPhone: '4589472927',
    secondaryPhone: '8190085112',
    workPhone: '9685539627',

    supervisorFirstName: 'Pasquale',

    supervisorLastName: 'Rolfson',
    supervisorEmail: 'Anastasia48@hotmail.com',
    homeLocation: {
      id: 10,
      locationName: 'Cumberland',
      region: Region['VIC'],
    } as LocationEntity,
    workLocation: {
      id: 58,
      locationName: 'Whistler',
      region: Region['SWE'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      status: Status.INACTIVE,
      dateApplied: new Date(2023, 6, 6),

      coordinatorNotes:
        'Tondeo cubicularis angelus tamen desino amplexus officia ceno aurum.',
      logisticsNotes:
        'Creo compono auditor vinum. Degusto amoveo cresco tendo tener sonitus tutamen circumvenio summa adulescens. Testimonium abeo quos defaeco incidunt aureus.',
      firstAidLevel: 'Level 3: Occupational First Aid',
      firstAidExpiry: new Date('2023-12-03'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: true,
      peccExperience: true,
      preocExperience: false,
      emergencyExperience: true,
      dateApproved: new Date('2023-11-21T10:39:58.190Z'),
      experiences: [
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 4,
            name: 'Finance',
            abbreviation: 'Fin',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 9,
            name: 'Recovery',
            abbreviation: 'Recovery',
          } as EmcrFunctionEntity,

          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_ANYWHERE,
    },
    driverLicense: [DriverLicense['CLASS_3']],

    unionMembership: UnionMembership['PEA'],

    jobTitle: 'Profound disintermediate concept',

    availability: [] as AvailabilityEntity[],
  },
  {
    firstName: 'Hayden',
    ministry: Ministry.AF,
    lastName: 'Pouros',
    email: 'Anthony.Hintz@gmail.com',
    primaryPhone: '1209243030',
    secondaryPhone: '4998662264',
    workPhone: '6542825199',

    supervisorFirstName: 'Lexus',

    supervisorLastName: 'Koch',
    supervisorEmail: 'Esther_Ebert29@hotmail.com',

    unionMembership: UnionMembership['EXCLUDED'],
    driverLicense: [DriverLicense['CLASS_3']],
    homeLocation: {
      id: 59,
      locationName: 'Williams Lake',
      region: Region['NEA'],
    } as LocationEntity,
    workLocation: {
      id: 10,
      locationName: 'Cumberland',
      region: Region['VIC'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      status: Status.INACTIVE,
      dateApplied: new Date(2024, 3, 15),

      coordinatorNotes: 'Perferendis attero sequi voveo sollers.',
      logisticsNotes:
        'Expedita coruscus uberrime illo conculco copiose deprecator vae. Deduco victus caute adopto similique adficio desino aro paulatim quae. Tergo attonbitus confugo.',
      firstAidLevel: 'Level 3: Occupational First Aid',
      firstAidExpiry: new Date('2024-03-10'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: true,
      firstNationExperienceWorking: false,
      peccExperience: true,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date('2024-03-31T05:11:36.594Z'),
      experiences: [
        {
          function: {
            id: 6,
            name: 'Logistics',
            abbreviation: 'Logs',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 2,
            name: 'Emergency Support Services',
            abbreviation: 'ESS',
          } as EmcrFunctionEntity,
          experienceType: Experience['OUTSIDE_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 5,
            name: 'Liaison',
            abbreviation: 'Liaison',
          } as EmcrFunctionEntity,
          experienceType: Experience['INTERESTED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 10,
            name: 'Deputy Director',
            abbreviation: 'DDir',
          } as EmcrFunctionEntity,

          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.REMOTE_ONLY,
    },
    jobTitle: 'Monitored encompassing paradigm',

    availability: [] as AvailabilityEntity[],
  },

  {
    firstName: 'Roberto',
    ministry: Ministry.AF,
    lastName: 'Quitzon',
    email: 'Winfield.Rogahn@yahoo.com',
    primaryPhone: '3195542339',
    secondaryPhone: '9905209730',
    workPhone: '3100550523',

    supervisorFirstName: 'Eduardo',

    supervisorLastName: 'Frami',
    supervisorEmail: 'Imani87@hotmail.com',
    homeLocation: {
      id: 26,
      locationName: 'Lillooet',
      region: Region['SWE'],
    } as LocationEntity,
    workLocation: {
      id: 59,
      locationName: 'Williams Lake',
      region: Region['NEA'],
    } as LocationEntity,
    emcr: {
      trainings: [],
      status: Status.INACTIVE,
      dateApplied: new Date(2023, 11, 15),

      coordinatorNotes: 'Thymum ars vespillo distinctio.',
      logisticsNotes:
        'Depraedor perferendis certus vito solus. Sulum conqueror ventosus. Suffoco spes inventore aeger agnitio.',
      firstAidLevel: 'Level 1: Emergency First Aid for Industry',
      firstAidExpiry: new Date('2023-12-04'),

      psychologicalFirstAid: false,
      firstNationExperienceLiving: false,
      firstNationExperienceWorking: true,
      peccExperience: false,
      preocExperience: false,
      emergencyExperience: false,
      dateApproved: new Date('2024-03-29T23:06:39.747Z'),
      experiences: [
        {
          function: {
            id: 3,
            name: 'First Nations',
            abbreviation: 'FN',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 5,
            name: 'Liaison',
            abbreviation: 'Liaison',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 2,
            name: 'Emergency Support Services',
            abbreviation: 'ESS',
          } as EmcrFunctionEntity,
          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 4,
            name: 'Finance',
            abbreviation: 'Fin',
          } as EmcrFunctionEntity,
          experienceType: Experience['EXPERIENCED'],
        } as EmcrExperienceEntity,
        {
          function: {
            id: 10,
            name: 'Deputy Director',
            abbreviation: 'DDir',
          } as EmcrFunctionEntity,

          experienceType: Experience['CHIEF_EXPERIENCED'],
        } as EmcrExperienceEntity,
      ],
      travelPreference: TravelPreference.WILLING_TO_TRAVEL_UNKNOWN,
    },
    driverLicense: [DriverLicense['CLASS_3']],

    unionMembership: UnionMembership['PEA'],
    jobTitle: 'Automated attitude-oriented benchmark',

    availability: [] as AvailabilityEntity[],
  },
];
