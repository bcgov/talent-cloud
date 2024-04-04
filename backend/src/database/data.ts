
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
        "workLocation": {} as LocationEntity,
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
        "availability":
            [
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-08",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-13",
                    "deploymentCode": "cSPal4"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-14",
                    "deploymentCode": "cSPal4"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-15",
                    "deploymentCode": "cSPal4"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-16",
                    "deploymentCode": "cSPal4"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-17",
                    "deploymentCode": "cSPal4"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-19",
                    "deploymentCode": "recail"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-20",
                    "deploymentCode": "recail"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-21",
                    "deploymentCode": "recail"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-01-22",
                    "deploymentCode": "recail"
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-26",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-29",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-30",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-01-31",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-08",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-09",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-20",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-21",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-22",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-23",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-02-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-02-29",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-03-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-09",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-10",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-11",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-12",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-13",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-14",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-15",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-16",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-17",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-18",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-19",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-20",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-21",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-22",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-23",
                    "deploymentCode": "5RkHuf"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-25",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-26",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-27",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-28",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-29",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-30",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-03-31",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-01",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-02",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-03",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-04",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-05",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-06",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-07",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-08",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-09",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-04-10",
                    "deploymentCode": "qYmv72"
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-14",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-20",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-21",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-22",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-23",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-26",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-04-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-04-30",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-08",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-09",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-14",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-05-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-18",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-19",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-20",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-21",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-22",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-23",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-24",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-25",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-26",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-27",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-28",
                    "deploymentCode": "aGONQn"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-30",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-05-31",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-01",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-02",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-03",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-04",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-05",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-06",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-07",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-08",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-09",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-10",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-11",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-12",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-13",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-14",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-06-15",
                    "deploymentCode": "y7piZD"
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-20",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-21",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-22",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-23",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-26",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-29",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-06-30",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-07-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-08",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-09",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-14",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["AVAILABLE"],
                    "date": "2024-07-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-21",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-22",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-23",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-24",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-25",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-26",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-27",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-28",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-29",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-30",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-07-31",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-01",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-02",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-03",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-04",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-05",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-06",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-07",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-08",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-09",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-10",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-11",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-12",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-08-13",
                    "deploymentCode": "fSH9T5"
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-20",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-21",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-22",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-23",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-26",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-29",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-30",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-08-31",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-09",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-14",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-15",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-16",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-17",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-18",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-19",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-20",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-21",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-22",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-23",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-24",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["UNAVAILABLE"],
                    "date": "2024-09-25",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-09-27",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-09-28",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-09-29",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-09-30",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-01",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-02",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-03",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-04",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-05",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-06",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-07",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-08",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-09",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-10",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-11",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-12",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-13",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["NOT_INDICATED"],
                    "date": "2024-10-14",
                    "deploymentCode": ""
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-16",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-17",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-18",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-19",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-20",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-21",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-22",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-23",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-24",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-25",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-26",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-27",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-28",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-29",
                    "deploymentCode": "0kRMpM"
                },
                {
                    "availabilityType": AvailabilityType["DEPLOYED"],
                    "date": "2024-10-30",
                    "deploymentCode": "0kRMpM"
                }


            ] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
    },
    {
        status: Status.ACTIVE, trainings: [],
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
        "workLocation": {} as LocationEntity,
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

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 7,
                    "name": "Planning",
                    "abbreviation": "Plans",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs"
                } as FunctionEntity

                , "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
    },
    {
        status: Status.ACTIVE, trainings: [],
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
        "workLocation": {} as LocationEntity,
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

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 6,
                    "name": "Logistics",
                    "abbreviation": "Logs",

                } as FunctionEntity, "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 1,
                    "name": "Operations",
                    "abbreviation": "Ops"
                } as FunctionEntity

                , "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        "experiences": [],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING,
        trainings: [],
        "firstName": "Elva",
        "lastName": "Barton",
        "email": "Torrey_Stamm@yahoo.com",
        "primaryPhone": "3568221114",
        "secondaryPhone": "2569514579",
        "workPhone": "3090403103",
        "homeLocation": {
            "id": 38,
            "locationName": "Port Alberni",
            "region": Region["VIC"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["IRR"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2023-10-21T10:14:51.865Z",
        "skillsAbilities": "Tripudio reprehenderit tracto ante. Velut deprimo trans delectus utor. Congregatio tabgo solum.",
        "coordinatorNotes": "Adfectus venia ventus.",
        "logisticsNotes": "Volup vomica anser conicio. Optio alter confugo. Vacuus somniculosus catena veritatis esse sollicito.",
        "supervisorFirstName": "Ashleigh",
        "supervisorLastName": "Schuster",
        "supervisorEmail": "Izabella51@gmail.com",
        "firstAidLevel": "N/A",
        "firstAidExpiry": "2024-03-05",
        "driverLicense": "CLASS_5",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": true,
        "preocExperience": true,
        "emergencyExperience": true,
        "jobTitle": "Reduced uniform frame",


        "dateJoined": null,
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING,
        trainings: [],
        "firstName": "Esta",
        "lastName": "Barton",
        "email": "Dolores.Leffler@hotmail.com",
        "primaryPhone": "0337294207",
        "secondaryPhone": "1314884128",
        "workPhone": "4436711184",
        "homeLocation": {
            "id": 14,
            "locationName": "Dawson Creek",
            "region": Region["NEA"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["HLTH"],
        "unionMembership": UnionMembership["PEA"],
        "applicationDate": "2024-02-08T22:45:03.602Z",
        "skillsAbilities": "Credo vociferor tamisium damno. Censura averto alioqui utpote admoneo. Verumtamen depopulo coma.",
        "coordinatorNotes": "Bonus ago vereor cibo capto.",
        "logisticsNotes": "Careo addo quo adstringo depopulo aureus vester. Consectetur adipiscor tui attero corpus careo delinquo super somnus acerbitas. Tamdiu dedico conicio arguo suffragium vociferor deludo bellicus.",
        "supervisorFirstName": "Chet",
        "supervisorLastName": "Kassulke",
        "supervisorEmail": "Dagmar.Pacocha72@hotmail.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2023-07-14",
        "driverLicense": "N",
        "psychologicalFirstAid": true,
        "firstNationExperienceLiving": true,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": false,
        "emergencyExperience": true,
        "jobTitle": "Virtual regional Region[access",
        "dateJoined": null,
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING,
        trainings: [],
        "firstName": "Cali",
        "lastName": "Bayer",
        "email": "Hans55@gmail.com",
        "primaryPhone": "3039873001",
        "secondaryPhone": "2918644502",
        "workPhone": "2184223286",
        "homeLocation": {
            "id": 51,
            "locationName": "Sorrento",
            "region": Region["CTL"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["HLTH"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2024-02-23T10:34:35.741Z",
        "skillsAbilities": "Theatrum spero suffoco solitudo supplanto sublime curriculum verto. Vere contabesco animadverto aveho desolo. Subnecto aiunt appello quas versus stillicidium tremo deorsum territo.",
        "coordinatorNotes": "Dicta crinis amiculum turpis saepe adiuvo aufero cribro suffragium.",
        "logisticsNotes": "Natus tabella succedo depulso adstringo venio cenaculum asper voluntarius. Universe advoco vado thymum terreo adnuo sophismata vir acies veritas. Blanditiis provident curo voluptatum delectus terminatio conventus supellex.",
        "supervisorFirstName": "Everett",
        "supervisorLastName": "Mayert",
        "supervisorEmail": "Emmitt_McGlynn@gmail.com",
        "firstAidLevel": "Level 1: Emergency First Aid for Industry",
        "firstAidExpiry": "2023-07-12",
        "driverLicense": "N",
        "psychologicalFirstAid": true,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": true,
        "preocExperience": true,
        "emergencyExperience": false,
        "jobTitle": "Versatile user-facing firmware",


        "dateJoined": null,
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.PENDING,
        trainings: [],
        "firstName": "Tyreek",
        "lastName": "Becker-Lemke",
        "email": "Rigoberto27@hotmail.com",
        "primaryPhone": "1354372082",
        "secondaryPhone": "3740798151",
        "workPhone": "4606578006",
        "homeLocation": {
            "id": 30,
            "locationName": "Mill Bay",
            "region": Region["VIC"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["AGRI"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2023-11-14T05:56:51.192Z",
        "skillsAbilities": "Vado absque adfectus aestivus illo. Ceno cedo commodo repellendus tutamen derideo patria amo. Quidem terebro confugo.",
        "coordinatorNotes": "Iure adnuo carus earum tempore trucido urbanus uredo.",
        "logisticsNotes": "Crustulum curtus verbera natus condico. Tenus cernuus considero suscipit dens decumbo sonitus aeternus balbus compono. Sono aggero decipio valens dolore deleniti tabernus caput.",
        "supervisorFirstName": "Carlo",
        "supervisorLastName": "Flatley",
        "supervisorEmail": "Delphine.Ullrich29@hotmail.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2024-02-19",
        "driverLicense": "NONE",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": true,
        "peccExperience": true,
        "preocExperience": true,
        "emergencyExperience": false,
        "jobTitle": "Mandatory coherent core",


        "dateJoined": null,
        "remoteOnly": true,
        "willingToTravel": true,
        "experiences": [],
        availability: [] as AvailabilityEntity[],
    },
    {
        status: Status.INACTIVE,
        trainings: [],
        "firstName": "Cleveland",
        "lastName": "Ondricka",
        "email": "Wilbert_OKeefe37@gmail.com",
        "primaryPhone": "9642689868",
        "secondaryPhone": "4572426326",
        "workPhone": "5466656368",
        "homeLocation": {
            "id": 45,
            "locationName": "Saanich",
            "region": Region["HQ"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["FIN"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2024-02-03T11:53:23.880Z",
        "skillsAbilities": "Benevolentia abeo colo cubitum cervus tres blanditiis. Amplitudo tempore omnis. Adsum speciosus vulgus vicinus.",
        "coordinatorNotes": "Volubilis terra argumentum teneo acceptus atrocitas comes comburo vergo cavus.",
        "logisticsNotes": "Vae arceo velum minus. Terga commodo decor consuasor aurum ascisco sint. Voluptas vester demens casso animus.",
        "supervisorFirstName": "Roxane",
        "supervisorLastName": "Halvorson",
        "supervisorEmail": "Brannon90@hotmail.com",
        "firstAidLevel": "Level 3: Occupational First Aid",
        "firstAidExpiry": "2023-05-31",
        "driverLicense": "N",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": false,
        "peccExperience": true,
        "preocExperience": false,
        "emergencyExperience": false,
        "jobTitle": "Realigned client-server database",


        "dateJoined": "2024-02-05T03:34:43.352Z",
        "remoteOnly": true,
        "willingToTravel": false,
        "experiences": [
            {
                function: {
                    "id": 4,
                    "name": "Finance",
                    "abbreviation": "Fin",

                } as FunctionEntity, "experienceType": Experience["EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 7,
                    "name": "Planning",
                    "abbreviation": "Plans",

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS"
                } as FunctionEntity,

                "experienceType": Experience["CHIEF_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
    },
    {
        status: Status.INACTIVE,
        trainings: [],
        "firstName": "Naomi",
        "lastName": "Ondricka",
        "email": "Merritt86@yahoo.com",
        "primaryPhone": "0339964268",
        "secondaryPhone": "5932534763",
        "workPhone": "8820096869",
        "homeLocation": {
            "id": 28,
            "locationName": "Maple Ridge",
            "region": Region["SWE"]
        } as LocationEntity,
        "workLocation": {} as LocationEntity,
        "ministry": Ministry["WLRS"],
        "unionMembership": UnionMembership["BCGEU"],
        "applicationDate": "2023-10-18T14:37:03.020Z",
        "skillsAbilities": "Defluo aliquam utrimque stipes inventore. Occaecati aspicio utique placeat advoco nulla ventus curiositas corrigo. Trucido hic vaco volup totam.",
        "coordinatorNotes": "Defessus deputo suspendo sonitus velociter.",
        "logisticsNotes": "Adulatio acsi tempore. Nobis enim bellicus confido subito asper denego. Absum consectetur vulgaris versus volo qui.",
        "supervisorFirstName": "Adolf",
        "supervisorLastName": "Parker",
        "supervisorEmail": "Nikki.Turcotte@yahoo.com",
        "firstAidLevel": "N/A",
        "firstAidExpiry": "2024-03-06",
        "driverLicense": "CLASS_5",
        "psychologicalFirstAid": false,
        "firstNationExperienceLiving": false,
        "firstNationExperienceWorking": false,
        "peccExperience": false,
        "preocExperience": true,
        "emergencyExperience": false,
        "jobTitle": "Optional content-based superstructure",


        "dateJoined": "2024-01-24T08:16:35.848Z",
        "remoteOnly": true,
        "willingToTravel": false,
        "experiences": [
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

                } as FunctionEntity, "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity,
            {
                function: {
                    "id": 2,
                    "name": "Emergency Support Services",
                    "abbreviation": "ESS"
                } as FunctionEntity,

                "experienceType": Experience["OUTSIDE_EXPERIENCED"]
            } as ExperienceEntity
        ],
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-30",
                "deploymentCode": "0kRMpM"
            }


        ] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            }] as AvailabilityEntity[],
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
        "workLocation": {} as LocationEntity,
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
        availability: [
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-13",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-14",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-15",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-16",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-17",
                "deploymentCode": "cSPal4"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-19",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-20",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-21",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-01-22",
                "deploymentCode": "recail"
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-01-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-02-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-02-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-03-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-09",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-10",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-11",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-12",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-13",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-14",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-15",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-16",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-17",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-18",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-19",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-20",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-21",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-22",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-23",
                "deploymentCode": "5RkHuf"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-25",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-26",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-27",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-28",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-29",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-30",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-03-31",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-01",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-02",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-03",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-04",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-05",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-06",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-07",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-08",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-09",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-04-10",
                "deploymentCode": "qYmv72"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-04-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-04-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-05-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-18",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-19",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-20",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-21",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-22",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-23",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-24",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-25",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-26",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-27",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-28",
                "deploymentCode": "aGONQn"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-30",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-05-31",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-01",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-02",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-03",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-04",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-05",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-06",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-07",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-08",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-09",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-10",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-11",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-12",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-13",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-14",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-06-15",
                "deploymentCode": "y7piZD"
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-06-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-07-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["AVAILABLE"],
                "date": "2024-07-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-21",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-22",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-23",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-24",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-25",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-26",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-27",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-28",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-29",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-30",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-07-31",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-01",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-02",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-03",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-04",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-05",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-06",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-07",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-08",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-09",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-10",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-11",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-12",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-08-13",
                "deploymentCode": "fSH9T5"
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-26",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-08-31",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-15",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-16",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-17",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-18",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-19",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-20",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-21",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-22",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-23",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-24",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["UNAVAILABLE"],
                "date": "2024-09-25",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-27",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-28",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-29",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-09-30",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-01",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-02",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-03",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-04",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-05",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-06",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-07",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-08",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-09",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-10",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-11",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-12",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-13",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["NOT_INDICATED"],
                "date": "2024-10-14",
                "deploymentCode": ""
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-16",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-17",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-18",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-19",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-20",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-21",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-22",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-23",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-24",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-25",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-26",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-27",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-28",
                "deploymentCode": "0kRMpM"
            },
            {
                "availabilityType": AvailabilityType["DEPLOYED"],
                "date": "2024-10-29",
                "deploymentCode": "0kRMpM"
            }
        ] as AvailabilityEntity[]
    }]
