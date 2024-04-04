
import { UnionMembership, AvailabilityType, Experience, Ministry, Region, Status } from "../common/enums";
import { LocationEntity } from "./entities/location.entity";
import { FunctionEntity } from "./entities/function.entity";
import { ExperienceEntity } from "./entities/personnel-function-experience.entity";
import { AvailabilityEntity } from "./entities/availability.entity";
import { CreatePersonnelDTO } from "src/personnel/dto/create-personnel.dto";


export const personnel: CreatePersonnelDTO[] = [
    {
        status: Status.ACTIVE,
        "firstName": "Brandyn",
        "lastName": "Bartell",
        "email": "Kacie25@hotmail.com",
        "primaryPhone": "8939179531",
        "secondaryPhone": "4462570360",
        "workPhone": "3859589684",
        "homeLocation": {
            "id": 29,
            "locationName": "Merritt",
            "region": Region["CTL"]
        } as LocationEntity,
        "workLocation": {
            "id": 29,
            "locationName": "Merritt",
            "region": Region["CTL"]
        } as LocationEntity,
        "ministry": Ministry["WLRS"],
        "unionMembership": UnionMembership["EXCLUDED"],
        "applicationDate": "2024-01-10T23:31:03.689Z",
        "skillsAbilities": "Adipiscor adicio crux adsum carcer cometes. Pecco atrocitas arbustum charisma amor absum taceo somnus alius taedium. Acerbitas repudiandae curvo tabgo spero thymbra absorbeo contego.",
        "coordinatorNotes": "Succedo pauci cogo.",
        "logisticsNotes": "Temperantia tempore mollitia. Asper aegrotatio dolorum ultra. Vir non acceptus.",
        "supervisorFirstName": "Damon",
        "supervisorLastName": "Mraz",
        "supervisorEmail": "Ernestina73@yahoo.com",
        "firstAidLevel": "Level 2: Occupational First Aid",
        "firstAidExpiry": "2024-03-15",
        "driverLicense": "CLASS_3",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": true,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Digitized empowering data-warehouse",
        "dateJoined": "2024-01-13T13:01:23.962Z",
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 9,
                    "name": "Recovery",
                    "abbreviation": "Recovery",

                } as FunctionEntity,
                "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 5,
                    "name": "Liaison",
                    "abbreviation": "Liaison",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 4,
                    "name": "Finance",
                    "abbreviation": "Fin",

                } as FunctionEntity,
                "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity
        ],
        "availability": [] as AvailabilityEntity[],
        trainings: []
    },
    {
        status: Status.ACTIVE, trainings: [],
        "firstName": "Zachary",
        "lastName": "Bartoletti",
        "email": "Briana75@hotmail.com",
        "primaryPhone": "8529416283",
        "secondaryPhone": "3297392700",
        "workPhone": "7523110457",
        "homeLocation": {
            "id": 23,
            "locationName": "Kimberley",
            "region": Region["SEA"]
        } as LocationEntity,
        "workLocation": {"id": 29,
        "locationName": "Merritt",
        "region": Region["CTL"]} as LocationEntity,
        "ministry": Ministry["AG"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-11-09T15:27:18.401Z",
        "skillsAbilities": "Tredecim volutabrum via termes comedo volutabrum. Bellum torrens cubitum et. Appositus delectus stabilis vita astrum.",
        "coordinatorNotes": "Condico eaque clamo condico cicuta adhuc uxor patria.",
        "logisticsNotes": "Clamo vereor trepide adopto pauci vulnero defetiscor canto repudiandae. Absque apto attero sui denique ullam. Adipiscor consuasor alter temeritas defungo cui statim reprehenderit.",
        "supervisorFirstName": "Harry",
        "supervisorLastName": "Rohan",
        "supervisorEmail": "Maegan.Upton@yahoo.com",
        "firstAidLevel": "Level 1: Emergency First Aid for Industry",
        "firstAidExpiry": "2024-01-10",
        "driverLicense": "CLASS_5",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": true,
        "emergencyExperience": false,
        "jobTitle": "Open-architected static knowledge base",


        "dateJoined": "2024-02-09T07:22:14.686Z",
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 3,
                    "name": "First Nations",
                    "abbreviation": "FN",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 8,
                    "name": "Advanced Planning Unit",
                    "abbreviation": "APU",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 5,
                    "name": "Liaison",
                    "abbreviation": "Liaison",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 10,
                    "name": "Deputy Director",
                    "abbreviation": "DDir",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 4,
                    "name": "Finance",
                    "abbreviation": "Fin"
                } as FunctionEntity,

                "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.ACTIVE, trainings: [],
        "firstName": "Heather",
        "lastName": "Botsford",
        "email": "Blake_Stamm-Steuber12@hotmail.com",
        "primaryPhone": "5600351973",
        "secondaryPhone": "8409072412",
        "workPhone": "5929269241",
        "homeLocation": {
            "id": 16,
            "locationName": "Elkford",
            "region": Region["SEA"]
        } as LocationEntity,
        "workLocation": {"id": 23,
        "locationName": "Kimberley",
        "region": Region["SEA"]} as LocationEntity,
        "ministry": Ministry["ENV"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-05-09T12:10:52.866Z",
        "skillsAbilities": "Vociferor laudantium benigne ars teneo torrens. Ara suppono damno synagoga. Amoveo ars impedit.",
        "coordinatorNotes": "Termes cunabula depulso canonicus nisi.",
        "logisticsNotes": "Accendo tonsor iure dedecor quo spero vinco aperio. Demulceo creber est concido comburo repellendus strenuus bestia via utrum. Distinctio earum vinitor civis barba tredecim aequus.",
        "supervisorFirstName": "Elliot",
        "supervisorLastName": "Swaniawski",
        "supervisorEmail": "Cristina_Hirthe41@yahoo.com",
        "firstAidLevel": "Level 2: Occupational First Aid",
        "firstAidExpiry": "2024-01-30",
        "driverLicense": "CLASS_2",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": true,
        "jobTitle": "Down-sized asynchronous benchmark",


        "dateJoined": "2024-01-04T07:49:41.764Z",
        "remoteOnly": false,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 9,
                    "name": "Recovery",
                    "abbreviation": "Recovery",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 8,
                    "name": "Advanced Planning Unit",
                    "abbreviation": "APU",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 7,
                    "name": "Planning",
                    "abbreviation": "Plans",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS"
                } as FunctionEntity

                , "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING, 
        trainings: [],
        "firstName": "Liana",
        "lastName": "Brown",
        "email": "Dillon.OHara@gmail.com",
        "primaryPhone": "3880637094",
        "secondaryPhone": "3279445206",
        "workPhone": "6382495637",
        "homeLocation": {
            "id": 40,
            "locationName": "Prince George",
            "region": Region["NEA"]
        } as LocationEntity,
        "workLocation": {"id": 16,
        "locationName": "Elkford",
        "region": Region["SEA"]} as LocationEntity,
        "ministry": Ministry["EMCR"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2023-04-24T05:48:44.117Z",
        "skillsAbilities": "Celebrer modi ait. Ager somniculosus amet trans somnus solum. Teres attonbitus verbera iste triduana curiositas sursum.",
        "coordinatorNotes": "Varius quam coruscus attero.",
        "logisticsNotes": "Coniuratio abscido catena cupio. A thorax sto. Cuius bellum aspicio addo vae terebro accendo comitatus stella.",
        "supervisorFirstName": "Fatima",
        "supervisorLastName": "Howell",
        "supervisorEmail": "Lauryn63@yahoo.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2023-05-11",
        "driverLicense": "CLASS_3",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": true,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Organized needs-based toolset",


        "dateJoined": "2024-03-20T17:45:49.747Z",
        "remoteOnly": false,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 10,
                    "name": "Deputy Director",
                    "abbreviation": "DDir",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 3,
                    "name": "First Nations",
                    "abbreviation": "FN",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 7,
                    "name": "Planning",
                    "abbreviation": "Plans",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs"
                } as FunctionEntity

                , "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING, trainings: [],
        "firstName": "Percy",
        "lastName": "Buckridge",
        "email": "Mylene_Morissette@hotmail.com",
        "primaryPhone": "5847361071",
        "secondaryPhone": "3663208367",
        "workPhone": "3422536265",
        "homeLocation": {
            "id": 35,
            "locationName": "North Vancouver",
            "region": Region["SWE"]
        } as LocationEntity,
        "workLocation": {"id": 40,
        "locationName": "Prince George",
        "region": Region["NEA"]} as LocationEntity,
        "ministry": Ministry["FOR"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2024-01-02T01:27:06.078Z",
        "skillsAbilities": "Depraedor ante tamquam. Una quo reiciendis sophismata terror conforto somniculosus coaegresco cunctatio sono. Ipsam theca porro anser vilicus corpus alius.",
        "coordinatorNotes": "Calco capio trepide approbo unus similique quidem amplitudo.",
        "logisticsNotes": "Torqueo viridis aliquid. Eaque tempora brevis corrumpo tremo accusator acer ancilla damnatio. Autem stipes umerus uredo theatrum baiulus.",
        "supervisorFirstName": "Brooke",
        "supervisorLastName": "Ward",
        "supervisorEmail": "Breanne17@gmail.com",
        "firstAidLevel": "Level 1: Standard First Aid for Industry",
        "firstAidExpiry": "2023-05-31",
        "driverLicense": "CLASS_4",
        "psychologicalFirstAid": true,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": true,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Public-key tangible info-mediaries",


        "dateJoined": "2024-02-21T22:10:47.298Z",
        "remoteOnly": false,
        "willingToTravel": true,
        "experiences": [
            
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 1,
                    "name": "Operations",
                    "abbreviation": "Ops"
                } as FunctionEntity

                , "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING,
        trainings: [],
        "firstName": "Alanis",
        "lastName": "Barton",
        "email": "Otho_Olson@hotmail.com",
        "primaryPhone": "0210476197",
        "secondaryPhone": "7901392479",
        "workPhone": "7469424252",
        "homeLocation": {
            "id": 58,
            "locationName": "Whistler",
            "region": Region["SWE"]
        } as LocationEntity,
        "workLocation": {"id": 35,
        "locationName": "North Vancouver",
        "region": Region["SWE"]} as LocationEntity,
        "ministry": Ministry["WLRS"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-09-17T14:59:24.929Z",
        "skillsAbilities": "Spectaculum suus odio timidus thalassinus pax dolorum. Fuga cognomen verus aqua. Vulgo utrimque iure vulnus.",
        "coordinatorNotes": "Ambulo sortitus tenax deserunt ago stips ver voro adduco libero.",
        "logisticsNotes": "Statim cubitum porro conatus sit. Corporis universe sit velum vulpes. Vulgivagus speculum quibusdam baiulus uterque supellex congregatio defessus coniuratio tametsi.",
        "supervisorFirstName": "Citlalli",
        "supervisorLastName": "Ebert-Schuster",
        "supervisorEmail": "Stacey.Thompson@gmail.com",
        "firstAidLevel": "Level 1: Emergency First Aid for Industry",
        "firstAidExpiry": "2024-02-03",
        "driverLicense": "LL2",
        "psychologicalFirstAid": true,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Cross-group client-driven encryption",
        "dateJoined": null,
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [{
            function: {
                "id": 5,
                "name": "Liaison",
                "abbreviation": "Liaison",

            } as FunctionEntity, "experienceType": Experience["INTERESTED"]
        } as ExperienceEntity,
        {
            function: {
                "id": 3,
                "name": "First Nations",
                "abbreviation": "FN",

            } as FunctionEntity, "experienceType": Experience["INTERESTED"]
        } as ExperienceEntity],
        availability: [] as AvailabilityEntity[],
    },
    
    {
        status: Status.INACTIVE,
        trainings: [],
        "firstName": "Esta",
        "lastName": "Paucek",
        "email": "Nikko92@hotmail.com",
        "primaryPhone": "4589472927",
        "secondaryPhone": "8190085112",
        "workPhone": "9685539627",
        "homeLocation": {
            "id": 10,
            "locationName": "Cumberland",
            "region": Region["VIC"]
        } as LocationEntity,
        "workLocation": {"id": 58,
        "locationName": "Whistler",
        "region": Region["SWE"]} as LocationEntity,
        "ministry": Ministry["HLTH"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-06-06T16:22:48.575Z",
        "skillsAbilities": "Antea autem civitas trucido eaque apto tondeo tubineus abundans. Abscido vacuus vitium bonus aspicio vado voluptate necessitatibus volutabrum. Sapiente spiculum auxilium dolore tamquam vinum aureus repellendus usque sursum.",
        "coordinatorNotes": "Tondeo cubicularis angelus tamen desino amplexus officia ceno aurum.",
        "logisticsNotes": "Creo compono auditor vinum. Degusto amoveo cresco tendo tener sonitus tutamen circumvenio summa adulescens. Testimonium abeo quos defaeco incidunt aureus.",
        "supervisorFirstName": "Pasquale",
        "supervisorLastName": "Rolfson",
        "supervisorEmail": "Anastasia48@hotmail.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2023-12-03",
        "driverLicense": "CLASS_2",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": true,
        "preocExperience": false,
        "emergencyExperience": true,
        "jobTitle": "Profound disintermediate concept",


        "dateJoined": "2023-11-21T10:39:58.190Z",
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 3,
                    "name": "First Nations",
                    "abbreviation": "FN",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 4,
                    "name": "Finance",
                    "abbreviation": "Fin",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 9,
                    "name": "Recovery",
                    "abbreviation": "Recovery"
                } as FunctionEntity,

                "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.INACTIVE,
        trainings: [],
        "firstName": "Hayden",
        "lastName": "Pouros",
        "email": "Anthony.Hintz@gmail.com",
        "primaryPhone": "1209243030",
        "secondaryPhone": "4998662264",
        "workPhone": "6542825199",
        "homeLocation": {
            "id": 59,
            "locationName": "Williams Lake",
            "region": Region["NEA"]
        } as LocationEntity,
        "workLocation": {"id": 10,
        "locationName": "Cumberland",
        "region": Region["VIC"]} as LocationEntity,
        "ministry": Ministry["MUNI"],
        "unionMembership": UnionMembership["EXCLUDED"],
        "applicationDate": "2024-03-15T12:32:41.148Z",
        "skillsAbilities": "Coaegresco dedico acceptus talio. Tam quam subito aperiam cultellus una custodia. Tametsi impedit ipsum solium audio.",
        "coordinatorNotes": "Perferendis attero sequi voveo sollers.",
        "logisticsNotes": "Expedita coruscus uberrime illo conculco copiose deprecator vae. Deduco victus caute adopto similique adficio desino aro paulatim quae. Tergo attonbitus confugo.",
        "supervisorFirstName": "Lexus",
        "supervisorLastName": "Koch",
        "supervisorEmail": "Esther_Ebert29@hotmail.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2024-03-10",
        "driverLicense": "LL2",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": true,
        "firstNationExperienceWorking": false,
        "peccExperience": true,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Monitored encompassing paradigm",
        "dateJoined": "2024-03-31T05:11:36.594Z",
        "remoteOnly": false,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 3,
                    "name": "First Nations",
                    "abbreviation": "FN",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 5,
                    "name": "Liaison",
                    "abbreviation": "Liaison",

                } as FunctionEntity, "experienceType": Experience["INTERESTED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 10,
                    "name": "Deputy Director",
                    "abbreviation": "DDir",
                } as FunctionEntity,

                "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[],
    },

    {
        status: Status.INACTIVE,
        trainings: [],
        "firstName": "Roberto",
        "lastName": "Quitzon",
        "email": "Winfield.Rogahn@yahoo.com",
        "primaryPhone": "3195542339",
        "secondaryPhone": "9905209730",
        "workPhone": "3100550523",
        "homeLocation": {
            "id": 26,
            "locationName": "Lillooet",
            "region": Region["SWE"]
        } as LocationEntity,
        "workLocation": {"id": 59,
        "locationName": "Williams Lake",
        "region": Region["NEA"]} as LocationEntity,
        "ministry": Ministry["PSSG"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-11-15T20:57:00.322Z",
        "skillsAbilities": "Commodi clamo damnatio conventus clarus. Timor torqueo defungo conscendo amitto amicitia talio blanditiis suadeo. Contigo maxime adversus cras crustulum tantillus balbus.",
        "coordinatorNotes": "Thymum ars vespillo distinctio.",
        "logisticsNotes": "Depraedor perferendis certus vito solus. Sulum conqueror ventosus. Suffoco spes inventore aeger agnitio.",
        "supervisorFirstName": "Eduardo",
        "supervisorLastName": "Frami",
        "supervisorEmail": "Imani87@hotmail.com",
        "firstAidLevel": "Level 1: Emergency First Aid for Industry",
        "firstAidExpiry": "2023-12-04",
        "driverLicense": "CLASS_3",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Automated attitude-oriented benchmark",
        "dateJoined": "2024-03-29T23:06:39.747Z",
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [
            {
                function: {
                    "id": 3,
                    "name": "First Nations",
                    "abbreviation": "FN",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 5,
                    "name": "Liaison",
                    "abbreviation": "Liaison",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 4,
                    "name": "Finance",
                    "abbreviation": "Fin",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 10,
                    "name": "Deputy Director",
                    "abbreviation": "DDir",
                } as FunctionEntity

                , "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [] as AvailabilityEntity[]
    }]
