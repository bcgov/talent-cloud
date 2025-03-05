import type { FormSection } from './types';

interface FormTab {
  description: React.ReactNode;
  label: string;
  sections?: FormSection[];
  title?: string;
  value: string;
}

export const formTabs: FormTab[] = [
  {
    label: 'Program Selection & Acknowledgement',

    sections: [],
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

    value: 'programSelection',
  },
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
            options: [
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ],
          },
        ],
      },
      {
        name: 'Supervisor and Liason Details, Travel Preferences',
        fields: [
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
      { name: 'General Emergency Management Experience', fields: [] },
      { name: 'EMCR Core Team Sections', fields: [] },
      { name: 'BCWS CORE Team Sections and Roles', fields: [] },
    ],
  },
  {
    label: 'Other Skills & Qualifications',
    value: 'skills',
    description: 'Please indicate any other skillset that you may have.',
    sections: [
      { name: 'Languages', fields: [] },
      { name: 'Tools & Software', fields: [] },
      { name: 'Certifications and Qualifications', fields: [] },
    ],
  },
  {
    label: 'Review & Submit',
    value: 'reviewAndSubmit',
    description:
      'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',

    sections: [
      {
        name: 'Program Selection & Acknowledgement',
        fields: [
          {
            name: 'programSelection',
            label: 'Program Selection',
            type: 'select',
            options: [
              { label: 'Program 1', value: 'program1' },
              { label: 'Program 2', value: 'program2' },
            ],
            required: true,
            placeholder: 'Select a program',
          },
        ],
      },
      {
        name: 'Personal & Employee Information',
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: 'First Name',
          },
        ],
      },
      {
        name: 'Experience & Section Interests',
        fields: [
          {
            name: 'General Emergency Management Experience',
            label: 'General Emergency Management Experience',
            type: 'text',
            required: true,
            placeholder: 'General Emergency Management Experience',
          },
        ],
      },
      {
        name: 'Other Skills & Qualifications',
        fields: [
          {
            name: 'Languages',
            label: 'Languages',
            type: 'text',
            required: true,
            placeholder: 'Languages',
          },
        ],
      },
    ],
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
