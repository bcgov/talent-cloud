/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ChipsResponse {
  actionDate: Date; // Date last updated
  apptStatus: string; // Type of employment - Regular, Auxilary or ABC
  apptStatusCode: string; // Short form of Appt Status. Not expected to be used.
  // baseHourlyRT?: string;
  basePosition?: string; // If a person is in a Temporary Assignment, their base position will show up here.
  basePositionTitle?: string;
  // baseSupervisor?: string;
  // baseSupervisorEmail?: string;
  // baseSupervisorEmplId?: string;
  businessPhone?: string;
  businessUnit: string; // PeopleSoft Business Unit Code
  businessUnitDescription: string; // PeoplSoft
  // cellPhone?: string;
  // currentHourlyRT: number;
  currentPositionNumber: string;
  currentPositionTitle: string;
  // currentReportsTo?: string; // Position number of supervisor
  currentSupervisorName?: string;
  currentSupervisorEmail?: string;
  // currentSupervisorEmplId: string;
  deptId: string; // Paylist
  deptIdDescr: string;
  emplRcd: number; // 0 or 1, tracking for multiple positions
  emplStatus: string; // Active, Leave, Terminated, etc.
  emplId: string; // Government ID
  employeeGroup: string; // BCGEU, etc.
  // futureReturnDate?: Date;
  // grade: string; // Pay grade
  groupType: string; // Based on the function code of a position, this indicates the group type or Component they belong to
  hireDate: Date;
  homeCity: string; // Home city - freeform text
  homeEmail: string;
  homePhone: string;
  inBasePosition: string; // Yes, No, or No Base Position
  lastHireDate: Date; // Last hire date
  // layoffLeaveStopPayReason?: string;
  // layoffLeaveStopPayStartDate?: Date;
  levelOne: string; // Level in organization in increasing granularity
  levelTwo: string; // Likely will be what corresponds to Position
  levelThree: string;
  mainPhone?: string;
  name: string; // Full name, comma separated
  organization: string; // Ministry, potentially does not correspond with our enums
  // otherPhone?: string;
  // salAdminPlan: string; // Employee’s pay Salary Admin Plan
  // stdHours: number; // Standard hours
  // step: number; // Step in the pay grid
  workCity: string; // Work city - freeform text
  workEmail: string; // Capitalized, likely
  workPhone?: string;
}

export interface ChipsTrainingResponse {
  courseId: string; // Course ID, e.g. ITEM-652
  courseTitle: string; // Title, e.g. IM 117 Information Management
  employeeRecord: number; // 0 or 1
  employeeId: string; // Employee ID attached
  completedDate: Date;
}

export function mapToChipsResponse(data: any): ChipsResponse {
  return {
    actionDate: new Date(data.Action_Date),
    apptStatus: data.Appt_Status,
    apptStatusCode: data.Appt_Status_Code,
    basePosition: data.Base_Position,
    basePositionTitle: data.Base_Position_Title,
    businessPhone: data.Business_Phone,
    businessUnit: data.Business_Unit,
    businessUnitDescription: data.Business_Unit_Description,
    currentPositionNumber: data.Current_Position_Number,
    currentPositionTitle: data.Current_Position_Title,
    currentSupervisorName: data.Current_Supervisor,
    currentSupervisorEmail: data.Current_Supervisor_Email,
    deptId: data.Dept_ID,
    deptIdDescr: data.DEPTID_DESCR,
    emplRcd: data.EMPL_RCD,
    emplStatus: data.Empl_Status,
    emplId: data.EMPLID,
    employeeGroup: data.Employee_Group,
    groupType: data.Group_Type,
    hireDate: new Date(data.Hire_Date),
    homeCity: data.Home_City,
    homeEmail: data.Home_Email,
    homePhone: data.Home_Phone,
    inBasePosition: data.In_Base_Position,
    lastHireDate: new Date(data.Last_Hire_Date),
    levelOne: data.Level1,
    levelTwo: data.Level2,
    levelThree: data.Level3,
    mainPhone: data.Main_Phone,
    name: data.Name,
    organization: data.Organization,
    workCity: data.Work_City,
    workEmail: data.Work_Email,
    workPhone: data.Work_Phone,
  };
}

export function mapToChipsTrainingResponse(data: any): ChipsTrainingResponse {
  return {
    courseId: data.COURSE,
    courseTitle: data.COURSE_TITLE,
    employeeRecord: data.EMPL_RCD,
    employeeId: data.EMPLID,
    completedDate: data.LM_COMPL_DT,
  };
}
