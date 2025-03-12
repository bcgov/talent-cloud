// common
import { DriverLicense, DriverLicenseName, Ministry, Program } from '@/common';

// types
import type { FormFields, FormSection } from './types';
import {
  LanguageProficiency,
  LanguageProficiencyName,
} from '@/common/enums/language.enum';
import { ToolsProficiency, ToolsProficiencyName } from '@/common/enums/tools.enum';

import type * as Yup from 'yup';

import {
  BcwsTravelPreference,
  EmcrTravelPreference,
} from '@/common/enums/travel-preference.enum';
import { SectionName } from '@/common/enums/sections.enum';

export enum Expectations {
  expectations = 'expectations',
  approvedBySupervisor = 'approvedBySupervisor',
  orientation = 'orientation',
  willingnessStatement = 'willingnessStatement',
  parQ = 'parQ',
}
export enum ExpectationsBcws {
  orientation = 'orientation',
  willingnessStatement = 'willingnessStatement',
  parQ = 'parQ',
}
export enum ExpectationsEmcr {
  expectations = 'expectations',
  approvedBySupervisor = 'approvedBySupervisor',
}

export interface FormTab {
  description: React.ReactNode;
  schema?: Yup.AnyObject;
  label: string;
  sections?: FormSection[];
  title?: string;
  value: string;
  fields?: FormFields[];
  errors?: string[];
}

export interface IntakeFormTabs {
  programSelection: FormTab;
  personalDetails: FormTab;
  experiences: FormTab;
  skills: FormTab;
  review: FormTab;
  complete: FormTab;
}

export enum IntakeFormTab {
  Program = 'programSelection',
  PersonalDetails = 'personalDetails',
  Experiences = 'experiences',
  Skills = 'skills',
  Review = 'review',
  Complete = 'complete',
}

export type FormTabKeyValue = {
  [key in IntakeFormTab]: FormTab;
};

export const formTabs: FormTab[] = [
  {
    label: 'Program Selection & Acknowledgement',

    value: IntakeFormTab.Program,
    errors: ['program', 'acknowledgement'],
    fields: [
      {
        name: 'programCommitment',
        label: 'Program Commitment',
        type: 'accordion',
        required: false,
        placeholder: '',
        component: (
          <>
            <p>
              Approval into both streams does not guarantee deployment. If you
              received a deployment request, you may be required to be prepared for
              deployment on short notice and potentially for extended periods. This
              may involve travelling to an activation that's located anywhere in the
              province, and spending time away from family and other personal
              obligations. However, if you have any personal or work commitments that
              you must attend at the time of a deployment, you can choose to turn
              down a deployment opportunity.
            </p>
            <br />
            <p>
              You are expected to have a high level of adaptability, commitment, and
              professionalism in all of your endeavours for both EMCR and BCWS CORE
              Team.
            </p>
          </>
        ),
      },
      {
        name: 'applicationRequirements',
        label: 'Application Requirements',
        type: 'accordion',
        required: false,
        placeholder: '',
        component: (
          <>
            <p>
              To ensure a smooth application process, please make sure you complete
              and submit the following requirements relevant to the program(s) you
              are applying to (you can click on the following links to learn more or
              access the document):
            </p>
            <br />

            <p className="font-bold">EMCR Requirements</p>
            <div className="py-4 px-4">
              <ul className="list-disc list-inside text-darkGrey text-base font-normal">
                <li>Supervisor Approval for EMCR</li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                  >
                    Incident Command System (ICS) Training
                  </a>
                </li>
              </ul>
            </div>
            <br />
            <p className="font-bold">BCWS Requirements</p>
            <div className="py-4 px-4">
              <ul className="list-disc list-inside text-darkGrey text-base font-normal">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                  >
                    Supervisor Approval for BCWS
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                  >
                    Intro to CORE Online Orientation (Video)
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                  >
                    Willingness Statement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                  >
                    Physical Activity Readiness Questionnaire for Everyone (PAR-Q+)
                  </a>
                  <span>*</span>
                </li>
              </ul>
            </div>
            <br />
            <br />
            <p>
              *Please make sure you have completed, signed and submitted your BCWS
              PAR-Q+ to your Wildfire regional contact after submitting this
              application.
            </p>
            <br />
            <p>
              <span className="font-bold">
                Don’t know which Fire Centre email to submit your documents to?
              </span>{' '}
              You can find your corresponding Fire Centre based on your home location
              at{' '}
              <a href="#" target="_blank" className="text-linkBlue hover:underline">
                Where is my closest Fire Centre?
              </a>
              .
            </p>
          </>
        ),
      },
      {
        name: 'whatToExpectDuringDeployment',
        label: 'What to expect during deployment',
        type: 'accordion',
        required: false,
        placeholder: '',
        component: (
          <>
            <p>
              You may be asked to do multiple deployments as required by the event.
              However, you may accept or decline a request depending on your own
              availability, vacation leave, and/or regular work commitments.
            </p>
            <br />
            <br />
            <p className="font-bold">
              Deployment Timeframes for each program stream:
            </p>
            <div className="py-4 px-4">
              <ul className="list-disc list-inside text-darkGrey text-base font-normal">
                <li>
                  <span className="font-bold">EMCR CORE Team:</span> You can be
                  deployed for up{' '}
                  <span className="font-bold">to 10 consecutive days</span>, followed
                  by a 
                  <span className="font-bold">
                    mandatory two-day rest period
                  </span>{' '}
                   before potential redeployment.
                </li>
                <li>
                  <span className="font-bold">BCWS CORE Team:</span> You can be
                  deployed for 
                  <span className="font-bold">up to 14 consecutive days</span> at a
                  time (including travel duration).
                </li>
              </ul>
            </div>
          </>
        ),
      },
      {
        name: 'programText',
        label: '',
        type: 'componentBox',
        component: (
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">CORE Team Program (Stream) Selection</p>
            <p className="subtext">
              Please select your program choice and acknowledge the statements that
              will appear below.<span className="text-red-400">*</span> (Required)
            </p>
          </div>
        ),
      },
      {
        name: 'program',
        label: '',
        type: 'radio-group',
        options: [
          {
            label: (
              <span className="font-normal">
                I am only applying for the{' '}
                <span className="font-bold">EMCR CORE Team program stream.</span>
              </span>
            ),
            value: Program.EMCR,
          },
          {
            label: (
              <span className="font-normal">
                I am only applying for the{' '}
                <span className="font-bold">BCWS CORE Team program stream.</span>
              </span>
            ),
            value: Program.BCWS,
          },
          {
            label: (
              <span className="font-normal">
                I am applying for{' '}
                <span className="font-bold">both CORE Team program streams.</span>
              </span>
            ),
            value: Program.ALL,
          },
        ],
        required: true,
        placeholder: 'Select a program',
        style: '!mt-2',
      },
      {
        name: 'acknowledgement',
        label: '',
        type: 'checkbox-group',
        required: false,
        options: [],
      },
    ],

    description: (
      <>
        <p>
          As a prospective member of the Coordinated Operation Response in
          Emergencies (CORE) Team program, it is crucial that you acknowledge and
          understand the commitments involved for the{' '}
          <strong>Emergency Management and Climate Readiness (EMCR)</strong> and the{' '}
          <strong>BC Wildfire Service (BCWS)</strong> CORE Team program streams.
        </p>
        <br></br>
        <p>
          Before proceeding, please carefully read the details of each stream and
          their application instructions below, make your stream choice, and then
          check off the acknowledgement statements that will appear below.{' '}
        </p>
      </>
    ),
  },

  {
    label: 'Personal & Employee Information',
    description:
      'Please provide your most up-to-date personal and employment details.',
    value: IntakeFormTab.PersonalDetails,
    errors: [
      'firstName',
      'lastName',
      'primaryPhone',
      'secondaryPhone',
      'homeLocation',
      'jobTitle',
      'employeeId',
      'email',
      'workPhone',
      'ministry',
      'division',
      'paylistId',
      'purchaseCardHolder',
      'supervisorFirstName',
      'supervisorLastName',
      'supervisorEmail',
      'supervisorPhone',
      'liaisonUnknownCheckbox',
      'liaisonFirstName',
      'liaisonLastName',
      'liaisonEmail',
      'liaisonPhoneNumber',
      'travelPreferenceBcws',
      'travelPreferenceEmcr',
      'emergencyContactFirstName',
      'emergencyContactLastName',
      'emergencyContactPhone',
      'emergencyContactRelationship',
    ],
    sections: [
      {
        name: 'Personal Details',
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: 'First Name',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            placeholder: 'Last Name',
          },
          {
            name: 'primaryPhone',
            label: 'Primary Phone Number',
            type: 'tel',
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'secondaryPhone',
            label: 'Secondary Phone Number',
            type: 'tel',
            required: false,
            placeholder: '000-000-0000',
          },
          {
            name: 'homeLocation',
            label: 'Home Location',
            type: 'select',
            required: true,
            placeholder: 'Select an option',

            options: [
              { label: 'Vancouver', value: 'vancouver' },
              { label: 'Victoria', value: 'victoria' },
              { label: 'Kamloops', value: 'kamloops' },
            ],
            helper:
              'Your home location will help us determine which region and/or fire centre you belong to. If your home location is not listed, please select the nearest location to your place of residence.',
            colspan: 2,
          },
        ],
      },
      {
        name: 'Employment Details',
        fields: [
          {
            name: 'jobTitle',
            label: 'Job Title',
            type: 'text',
            required: true,
            placeholder: 'Policy Analyst',
          },
          {
            name: 'employeeId',
            label: 'BC Government Employee Number',
            type: 'text',
            required: true,
            placeholder: '123456',

            helper: 'This is your 6-digit employee number.',
          },
          {
            name: 'email',
            label: 'BC Government Email',
            type: 'text',
            required: true,
            placeholder: 'johnsmith@gov.bc.ca',
          },
          {
            name: 'workPhone',
            label: 'Work Phone Number',
            type: 'tel',
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'ministry',
            label: 'Ministry',
            type: 'select',
            required: true,
            placeholder: 'Select an option',

            options: Object.values(Ministry).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
          {
            name: 'division',
            label: 'Division',
            type: 'text',
            required: true,
            placeholder: 'Water, Fisheries and Coast Division',
            helper: 'Full division name, no acronyms.',
          },
          {
            name: 'paylistId',
            label: 'Pay List (Dept ID)',
            type: 'text',
            required: true,
            placeholder: '123-4567',

            helper: 'You can find this information on your paystub.',
          },
          {
            name: 'purchaseCardHolder',
            label: 'Purchase Card Holder',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
          },
        ],
      },
      {
        name: 'Supervisor and Liason Details, Travel Preferences',
        fields: [
          {
            name: 'Title',
            label: 'Info',
            type: 'infoBox',
            required: false,
            placeholder: '',
          },
          {
            name: 'supervisorFirstName',
            label: 'Supervisor First Name',
            type: 'text',
            required: true,
            placeholder: 'John',
          },
          {
            name: 'supervisorLastName',
            label: 'Supervisor Last Name',
            type: 'text',
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'supervisorEmail',
            label: 'Supervisor Email',
            type: 'text',
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'supervisorPhone',
            label: 'Supervisor Phone Number',
            type: 'text',
            required: false,
            placeholder: '000-000-0000',
          },
          {
            name: 'liaisonUnknownCheckbox',
            label: 'I am unsure who my liaison is',
            type: 'checkbox',
            required: false,
            placeholder: '',
            program: Program.BCWS,
            colspan: 2,
            options: [
              {
                label: 'I am unsure who my liaison is',
                value: 'false',
                name: 'liaisonUnknown',
              },
            ],
          },
          {
            name: 'liaisonFirstName',
            label: 'Liaison First Name',
            type: 'text',
            required: false,
            placeholder: 'John',
            program: Program.BCWS,
          },
          {
            name: 'liaisonLastName',
            label: 'Liaison Last Name',
            type: 'text',
            required: false,
            placeholder: 'Smith',
            program: Program.BCWS,
          },
          {
            name: 'liaisonEmail',
            label: 'Liaison Email',
            type: 'text',
            required: false,
            placeholder: 'johnsmith@gov.bc.ca',
            program: Program.BCWS,
          },
          {
            name: 'liaisonPhoneNumber',
            label: 'Liaison Phone Number',
            type: 'tel',
            required: false,
            placeholder: '000-000-0000',
            program: Program.BCWS,
          },
          {
            name: 'travelPreferenceBcws',
            label: 'BCWS Travel Preferences (for deployment)',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: Object.values(BcwsTravelPreference).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
          {
            name: 'travelPreferenceEmcr',
            label: 'EMCR Travel Preferences (for deployment)',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: Object.values(EmcrTravelPreference).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
        ],
      },
      {
        name: 'Emergency Contact Details',
        fields: [
          {
            name: 'emergencyFirstName',
            label: 'Emergency Contact First Name',
            type: 'text',
            required: true,
            placeholder: 'John',
          },
          {
            name: 'emergencyLastName',
            label: 'Emergency Contact Last Name',
            type: 'text',
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'emergencyPhone',
            label: 'Emergency Contact Phone Number',
            type: 'tel',
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'emergencyRelationship',
            label: 'Emergency Contact Relationship',
            type: 'text',
            required: true,
            placeholder: 'Friend',
          },
        ],
      },
    ],
  },
  {
    label: 'Experience & Section Interests',
    errors: [
      'emergencyExperience',
      'preocExperience',
      'peccExperience',
      'firstNationsWorking',
      'firstChoiceFunction',
      'secondChoiceFunction',
      'thirdChoiceFunction',
      'functions',
      'firstChoiceSection',
      'secondChoiceSection',
      'thirdChoiceSection',
      'roles',
    ],
    description:
      'The EMCR and BCWS CORE Team program streams operate very differently with distinct sections and/or roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.',
    value: IntakeFormTab.Experiences,
    sections: [
      {
        program: Program.EMCR,
        name: 'General Emergency Management Experience',
        fields: [
          {
            name: 'emergencyExperience',
            label:
              'Do you have any direct experience related to emergency management?',
            type: 'radio-group',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
            required: true,
            colspan: 2,
          },
          {
            name: 'preocExperience',
            label:
              'Do you have any experience working in a Provincial Regional Emergency Operation Centre (PREOC)?',
            type: 'radio-group',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
            required: true,
            colspan: 2,
          },
          {
            name: 'peccExperience',
            label:
              'Do you have any experience working in a Provincial Emergency Coordination Centre (PECC)?',
            type: 'radio-group',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
            required: true,
            colspan: 2,
          },
          {
            name: 'firstNationsWorking',
            label:
              'Do you have any direct experience working with Indigenous communities (e.g., living or working in a Reserve, working directly with Indigenous communities, etc.)?',
            type: 'radio-group',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
            required: true,
            colspan: 2,
          },
        ],
      },
      {
        program: Program.EMCR,
        name: 'EMCR Core Team Sections',
        fields: [
          {
            name: 'firstChoiceFunction',
            label: 'First Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'secondChoiceFunction',
            label: 'Second Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'thirdChoiceFunction',
            label: 'Third Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'functions',
            label:
              'Please select ALL the sections that you are interested in, if you were to be deployed.',
            helper:
              'Your selections must include your first choice. For your EMCR CORE Team application, you must select AT LEAST one section.',
            type: 'checkbox-group',
            required: false,
            placeholder: '',
            program: Program.EMCR,
            colspan: 2,
            options: [],
          },
        ],
      },
      {
        program: Program.BCWS,
        name: 'BCWS CORE Team Sections and Roles',
        fields: [
          {
            name: 'firstChoiceSection',
            label: 'First Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: Object.values(SectionName).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
          {
            name: 'secondChoiceSection',
            label: 'Second Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: Object.values(SectionName).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
          {
            name: 'thirdChoiceSection',
            label: 'Third Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: Object.values(SectionName).map((itm) => ({
              label: itm,
              value: itm,
            })),
          },
          {
            name: 'roles',
            label:
              'For each section below, please indicate any role(s) that you are interested in for deployment.',
            helper: 'You must select AT LEAST ONE role under your FIRST choice.',
            type: 'field-group',
            required: true,
            fields: Object.values(SectionName).map((itm) => ({
              name: itm,
              label: `${itm} Roles`,
              type: 'multiselect',
              required: false,
              placeholder: '',
            })),
          },
        ],
      },
    ],
  },
  {
    label: 'Other Skills & Qualifications',
    value: IntakeFormTab.Skills,
    errors: ['languages', 'tools', 'certifications', 'driversLicense'],
    description: 'Please indicate any other skillset that you may have.',
    sections: [
      {
        name: 'Languages',
        fields: [
          {
            name: 'languages',
            label: '',
            type: 'field-group',
            fields: [
              {
                name: 'language',
                label: 'Language',
                colspan: 2,
                type: 'text',
                required: true,
                placeholder: 'Enter a language',
              },
              {
                name: 'languageProficiency',
                label: 'Language Proficiency',
                colspan: 2,
                type: 'select',
                required: true,
                placeholder: 'Select Proficieny Level',
                options: Object.keys(LanguageProficiency).map((key) => ({
                  label:
                    LanguageProficiencyName[
                      key as keyof typeof LanguageProficiencyName
                    ],
                  value: key,
                })),
              },
            ],
          },
        ],
      },
      {
        name: 'Tools & Software',
        fields: [
          {
            name: 'tools',
            type: 'field-group',
            label: '',
            colspan: 2,
            fields: [
              {
                name: 'tool',
                colspan: 2,
                label: 'Tool Name',
                type: 'select',
                required: true,
                placeholder: 'Select an option',
                options: [],
              },
              {
                name: 'toolProficiency',
                label: 'Tool Proficiency',
                type: 'select',
                colspan: 2,
                required: true,
                placeholder: 'Select an option',
                options: Object.keys(ToolsProficiency).map((key) => ({
                  label:
                    ToolsProficiencyName[key as keyof typeof ToolsProficiencyName],
                  value: key,
                })),
              },
            ],
          },
        ],
      },

      {
        name: 'Certificates',
        fields: [
          {
            name: 'certifications',
            label: '',
            type: 'field-group',
            fields: [
              {
                name: 'certificate',
                label: 'Certification Name',
                type: 'select',
                required: true,
                placeholder: 'Select an option',
                options: [],
              },
              {
                name: 'expiry',
                label: 'Certificate Expiry',
                type: 'date',
                required: false,
                placeholder: 'Select a date',
              },
            ],
          },
          {
            name: 'driversLicense',
            label: 'Driver License',
            type: 'select',
            required: false,
            placeholder: 'Select an option',
            options: Object.keys(DriverLicense).map((key) => ({
              label: DriverLicenseName[key as keyof typeof DriverLicenseName],
              value: key,
            })),
          },
        ],
      },
    ],
  },
  {
    label: 'Review & Submit',
    value: IntakeFormTab.Review,
    description:
      'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',
  },
  {
    label: 'Complete',
    title: 'Thank you for your application!',
    value: IntakeFormTab.Complete,
    description: (
      <>
        <p>
          Thank you for submitting your application to join CORE Team. Our team will
          be reviewing your application soon.
        </p>
        <br></br>
        <p>
          A CORE Team coordinator may reach out to you in the next 7 to 10 working
          days via email to further assess your experience and deployment readiness.
          Our response time may vary depending on ongoing operational tasks such as
          responding to emergency and wildfire across the province.
        </p>
      </>
    ),
  },
];
