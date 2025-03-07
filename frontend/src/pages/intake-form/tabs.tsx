import { DriverLicense, DriverLicenseName, Program } from '@/common';
import type { FormFields, FormSection } from './types';
import {
  LanguageProficiency,
  LanguageProficiencyName,
} from '@/common/enums/language.enum';
import { ToolsProficiency, ToolsProficiencyName } from '@/common/enums/tools.enum';

export interface FormTab {
  description: React.ReactNode;
  label: string;
  sections?: FormSection[];
  title?: string;
  value: string;
  fields?: FormFields[];
}
export const programTab = {
  label: 'Program Selection & Acknowledgement',

  fields: [
    {
      name: 'program',
      label: 'Program Selection',
      type: 'radio',
      options: [
        { label: 'Both', value: Program.ALL },
        { label: 'EMCR', value: Program.EMCR },
        { label: 'BCWS', value: Program.BCWS },
      ],
      required: true,
      placeholder: 'Select a program',
    },
  ],

  description: (
    <>
      <p>
        As a prospective member of the Coordinated Operation Response in Emergencies
        (CORE) Team program, it is crucial that you acknowledge and understand the
        commitments involved for the{' '}
        <strong>Emergency Management and Climate Readiness (EMCR)</strong> and the{' '}
        <strong>BC Wildfire Service (BCWS)</strong> CORE Team program streams.
      </p>
      <br></br>
      <p>
        Before proceeding, please carefully read the details of each stream and their
        application instructions below, make your stream choice, and then check off
        the acknowledgement statements that will appear below.{' '}
      </p>
    </>
  ),

  value: 'program',
};

export const formTabs: FormTab[] = [
  {
    label: 'Personal & Employee Information',
    description:
      'Please provide your most up-to-date personal and employment details.',
    value: 'personalInfo',

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

            options: [
              { label: 'Finance', value: 'fin' },
              { label: 'Forestry', value: 'for' },
            ],
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
            name: 'liaisonFirstName',
            label: 'Liaison First Name',
            type: 'text',
            required: true,
            placeholder: 'Enter First Name',
            program: Program.BCWS,
          },
          {
            name: 'liaisonLastName',
            label: 'liaison Last Name',
            type: 'text',
            required: true,
            placeholder: 'Enter Last Name',
            program: Program.BCWS,
          },
          {
            name: 'liaisonEmail',
            label: 'liaison Email',
            type: 'text',
            required: true,
            placeholder: 'Enter Email',
            program: Program.BCWS,
          },
          {
            name: 'liaisonPhone',
            label: 'liaison Phone Number',
            type: 'text',
            required: false,
            placeholder: '000-000-0000',
            program: Program.BCWS,
          },
        ],
      },
      { name: 'Emergency Contact Details', fields: [] },
    ],
  },
  {
    label: 'Experience & Section Interests',

    description:
      'The EMCR and BCWS CORE Team program streams operate very differently with distinct sections and/or roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.',
    value: 'experienceRoles',

    sections: [
      {
        program: Program.EMCR,
        name: 'General Emergency Management Experience',
        fields: [],
      },
      {
        program: Program.EMCR,
        name: 'EMCR Core Team Sections',
        fields: [
          {
            name: 'emcr.firstChoiceFunction',
            label: 'First Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'emcr.secondChoiceFunction',
            label: 'Second Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'emcr.thirdChoiceFunction',
            label: 'Third Choice Function',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'emcr.functions',
            label: 'Emcr Function Experiences',
            type: 'checkbox-group',
            required: true,
            options: [],
          },
        ],
      },
      {
        program: Program.BCWS,
        name: 'BCWS CORE Team Sections and Roles',
        fields: [
          {
            name: 'bcws.firstChoiceSection',
            label: 'First Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: [],
          },
          {
            name: 'bcws.secondChoiceSection',
            label: 'Second Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: [],
          },
          {
            name: 'bcws.thirdChoiceSection',
            label: 'Third Choice Section',
            type: 'select',
            required: true,
            placeholder: 'Select an option',
            program: Program.BCWS,
            options: [],
          },
          {
            name: 'bcws.roles',
            label: 'BCWS Roles',
            type: 'checkbox-group',
            required: true,
            options: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Other Skills & Qualifications',
    value: 'skills',
    description: 'Please indicate any other skillset that you may have.',
    sections: [
      {
        name: 'Languages',
        fields: [
          {
            name: 'languages',
            label: 'Languages',
            type: 'text',
            required: false,
            placeholder: 'Enter a language',
          },
          {
            name: 'languageProficiency',
            label: 'Language Proficiency',
            type: 'select',
            required: false,
            options: Object.keys(LanguageProficiency).map((key) => ({
              label:
                LanguageProficiencyName[key as keyof typeof LanguageProficiencyName],
              value: key,
            })),
          },
        ],
      },
      {
        name: 'Tools & Software',
        fields: [
          {
            name: 'tools',
            label: 'Tools & Software',
            type: 'select',
            required: false,
            placeholder: 'Select an option',
            options: [],
          },
          {
            name: 'toolProficiency',
            label: 'Tool Proficiency',
            type: 'select',
            required: false,
            placeholder: 'Select an option',
            options: Object.keys(ToolsProficiency).map((key) => ({
              label: ToolsProficiencyName[key as keyof typeof ToolsProficiencyName],
              value: key,
            })),
          },
        ],
      },
      {
        name: 'Certificates',
        fields: [
          {
            name: 'certificates',
            label: 'Certificates',
            type: 'select',
            required: false,
            placeholder: 'Select an option',
            options: [],
          },
          {
            name: 'certificateExpiry',
            label: 'Certificate Expiry',
            type: 'date',
            required: false,
            placeholder: 'Select a date',
          },
          {
            name: 'driverLicense',
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
    value: 'reviewAndSubmit',
    description:
      'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',
  },
  {
    label: 'Complete',
    title: 'Thank you for your application!',
    value: 'complete',
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
