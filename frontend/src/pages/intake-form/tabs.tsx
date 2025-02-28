import type { FormSection } from './types';

interface FormTab {
  label: string;
  sections?: FormSection[];
  description: React.ReactNode;
  value: string;
  title?: string;
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
            options: [],
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
            placeholder: 'Last Name',
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'Email',
          },
        ],
      },
      { name: 'Employment Details', fields: [] },
      { name: 'Supervisor and Liason Details, Travel Preferences', fields: [] },
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
            options: ['Program 1', 'Program 2', 'Program 3'],
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
