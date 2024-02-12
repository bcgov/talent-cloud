import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
// TODO WIP
export class FormDTO {
  submission: SubmissionDTO;

  @IsString()
  createdBy: string;

  @IsString()
  createdAt: string;

  @IsString()
  @IsOptional()
  updatedB?: string;

  @IsString()
  updatedAt: string;
}

export class SubmissionDTO {
  @IsString()
  data: FormSubmissionDataDTO;

  @IsString()
  state: string;

  @IsString()
  _vnote?: string;
}

export class FormSubmissionDataDTO {
  @IsBoolean()
  post: boolean;

  @IsString()
  fullName: string;

  @IsString()
  jobTitle: string;

  @IsString()
  ministry: string;

  @IsString()
  lateEntry: string;

  @IsString()
  workEmail: string;

  @IsString()
  postalCode: string;

  @IsString()
  jobPosition: string;

  @IsString()
  @IsOptional()
  postalCode1?: string;

  @IsString()
  supervisorName: string;

  @IsString()
  homePhoneNumber: string;

  @IsString()
  unionMembership: string;

  @IsString()
  unitSuiteNumber: string;

  @IsString()
  workPhoneNumber: string;

  @IsString()
  @IsOptional()
  homeAddressLine1?: string;

  @IsString()
  @IsOptional()
  mobilePhoneNumber?: string;

  @IsString()
  simpleemailadvanced: string;

  @IsString()
  @IsOptional()
  officeOrWorkAddressLine1?: string;

  @IsString()
  simplephonenumberadvanced: string;

  @IsString()
  @IsOptional()
  pleaseListYourCurrentJobDuties?: string;

  @ValidateNested()
  doYouHaveYourSupervisorsApprovalToJoinTeams: SupervisorPermissionDTO;

  @IsString()
  @IsOptional()
  doYouHaveAnyDirectExperienceRelatedToEmergencyManagement?: string;

  @IsString()
  @IsOptional()
  doYouHaveAnyDirectExperienceRelatedToEmergencyManagement1?: string;

  @IsString()
  areYouCurrentlyAnActiveMemberOfTheBcWildfireServicesBcwsTeams: string;

  @IsBoolean()
  iHaveReadAndUnderstoodTheStatementsAboveIWishToProceedWithThisApplication: boolean;

  @IsArray({ each: true })
  asideFromYourHomeRegionWhatOtherRegionSYouWillBeDeployedToIfYouAreRostered: string[];

  @IsString()
  haveYouPreviouslyParticipatedInTheEmergencyManagementOrBcWildfireTeamsProgram: string;

  @IsString()
  pleaseDescribeAnyDirectExperienceYouHaveWithHazardRelatedSituationsThatWouldBeBeneficialAsATeamsMemberMaximum100Words?: string;

  @IsString()
  pleaseDescribeAnyDirectExperienceYouHaveWithHazardRelatedSituationsThatWouldBeBeneficialAsATeamsMemberMaximum100Words1?: string;
}

export class SupervisorPermissionDTO {
  @IsBoolean()
  no: boolean;
  @IsBoolean()
  yes: boolean;
}
