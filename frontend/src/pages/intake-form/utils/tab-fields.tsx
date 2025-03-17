// common
import { Ministry, Program } from '@/common';
import {
  BcwsTravelPreference,
  EmcrTravelPreference,
} from '@/common/enums/travel-preference.enum';
import { SectionName } from '@/common/enums/sections.enum';
import { SelectField } from '../fields/SelectField';
import { ProgramPage } from '../pages/Program/Program';
import { PersonalDetails } from '../pages/PersonalDetails';
import { DatePicker } from '@/components';
import { Skills } from '../pages/Skills';

import { Review } from '../pages/Review';
import { RadioGroupField } from '../fields/RadioGroupField';
import { TextField } from '../fields/TextField';
import { CheckboxGroupField } from '../fields/CheckBoxGroupField';
import { FieldGroup } from '../components/FieldGroup';
import { Experiences } from '../pages/Experiences';
import { IntakeFormTab } from '../constants/enums';
import type { FormTab, FormSection } from '../constants/types';
import { Complete } from '../pages/Complete';

export const formTabs: FormTab[] = [
  {
    label: 'Program Selection & Acknowledgement',
    component: () => <ProgramPage />,
    value: IntakeFormTab.Program,
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
    component: ({ sections }: { sections: FormSection[] }) => (
      <PersonalDetails sections={sections} />
    ),
    sections: [
      {
        name: 'Personal Details',
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'First Name',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'Last Name',
          },
          {
            name: 'primaryPhone',
            label: 'Primary Phone Number',
            type: 'tel',
            component: TextField,
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'secondaryPhone',
            label: 'Secondary Phone Number',
            type: 'tel',
            component: TextField,
            required: false,
            placeholder: '000-000-0000',
          },
          {
            name: 'homeLocation',
            label: 'Home Location',
            type: 'select',
            component: SelectField,
            required: true,
            placeholder: 'Select an option',

            options: [],
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
            component: TextField,
            required: true,
            placeholder: 'Policy Analyst',
          },
          {
            name: 'employeeId',
            label: 'BC Government Employee Number',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: '123456',

            helper: 'This is your 6-digit employee number.',
          },
          {
            name: 'email',
            label: 'BC Government Email',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'johnsmith@gov.bc.ca',
          },
          {
            name: 'workPhone',
            label: 'Work Phone Number',
            type: 'tel',
            component: TextField,
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'ministry',
            label: 'Ministry',
            type: 'select',
            component: SelectField,
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
            component: TextField,
            required: true,
            placeholder: 'Water, Fisheries and Coast Division',
            helper: 'Full division name, no acronyms.',
          },
          {
            name: 'paylistId',
            label: 'Pay List (Dept ID)',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: '123-4567',

            helper: 'You can find this information on your paystub.',
          },
          {
            name: 'purchaseCardHolder',
            label: 'Purchase Card Holder',
            type: 'select',
            component: SelectField,
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
            name: 'infoSupervisorEMCR',
            label: 'About supervisor',
            type: 'infoBox',
            component: TextField,
            required: false,
            placeholder: '',
            program: Program.EMCR,
            content: (
              <p>
                We will notify your supervisor about the outcome of your application.
                If there is a change in your position or supervisor at any point, you
                must update this information and obtain your new supervisor’s
                approval to participate.
              </p>
            ),
          },
          {
            name: 'infoSupervisorBCWS',
            label: 'About supervisor and liaison',
            type: 'infoBox',
            component: TextField,
            required: false,
            placeholder: '',
            program: Program.BCWS,
            content: (
              <>
                <p>
                  We will notify your supervisor about the outcome of your
                  application. If there is a change in your position or supervisor at
                  any point, you must update this information and obtain your new
                  supervisor’s approval to participate.
                </p>
                <br />
                <br />
                <p>
                  Liaison information is required for BCWS CORE Team applicants and
                  is applicable only if you belong to any of the following: 1)
                  Ministry of Forests, 2) Ministry of Water, Land and Resource
                  Stewardship, 3) The Recreation Sites and Trails, and the BC Parks
                  division under Ministry of Environment.{' '}
                </p>
                <br />
                <p>
                  Please reach out to your supervisor about who your liaison is.{' '}
                </p>
              </>
            ),
          },
          {
            name: 'supervisorFirstName',
            label: 'Supervisor First Name',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'John',
          },
          {
            name: 'supervisorLastName',
            label: 'Supervisor Last Name',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'supervisorEmail',
            label: 'Supervisor Email',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'supervisorPhone',
            label: 'Supervisor Phone Number',
            type: 'text',
            component: TextField,
            required: false,
            placeholder: '000-000-0000',
          },
          {
            name: 'liaisonUnknownCheckbox',
            label: '',
            type: 'checkbox-group',
            component: CheckboxGroupField,
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
            component: TextField,
            required: false,
            placeholder: 'John',
            program: Program.BCWS,
          },
          {
            name: 'liaisonLastName',
            label: 'Liaison Last Name',
            type: 'text',
            component: TextField,
            required: false,
            placeholder: 'Smith',
            program: Program.BCWS,
          },
          {
            name: 'liaisonEmail',
            label: 'Liaison Email',
            type: 'text',
            component: TextField,
            required: false,
            placeholder: 'johnsmith@gov.bc.ca',
            program: Program.BCWS,
          },
          {
            name: 'liaisonPhoneNumber',
            label: 'Liaison Phone Number',
            type: 'tel',
            component: TextField,
            required: false,
            placeholder: '000-000-0000',
            program: Program.BCWS,
          },
          {
            name: 'infoTravelPreferences',
            label: 'Travel Preferences',
            type: 'infoBox',
            component: TextField,
            required: false,
            program: Program.ALL,
            content: (
              <>
                <p>
                  If you are unwilling to travel to activation sites outside of your
                  home location, your deployment opportunities may be limited.
                  Deployment flexibility could also vary by role, with some requiring
                  on-site presence. New CORE Team members may need to undergo on-site
                  training.
                </p>
                <br />
                <p>
                  You can always change your travel preferences in your dashboard
                  once you become a member.
                </p>
              </>
            ),
          },
          {
            name: 'travelPreferenceBcws',
            label: 'BCWS Travel Preferences (for deployment)',
            type: 'select',
            component: SelectField,
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
            component: SelectField,
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
            component: TextField,
            required: true,
            placeholder: 'John',
          },
          {
            name: 'emergencyLastName',
            label: 'Emergency Contact Last Name',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'Smith',
          },
          {
            name: 'emergencyPhone',
            label: 'Emergency Contact Phone Number',
            type: 'tel',
            component: TextField,
            required: true,
            placeholder: '000-000-0000',
          },
          {
            name: 'emergencyRelationship',
            label: 'Emergency Contact Relationship',
            type: 'text',
            component: TextField,
            required: true,
            placeholder: 'Friend',
          },
        ],
      },
    ],
  },
  {
    label: 'Experience & Section Interests',
    component: ({ sections }: { sections: FormSection[] }) => (
      <Experiences sections={sections} />
    ),
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
            component: RadioGroupField,
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
            component: RadioGroupField,
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
            component: RadioGroupField,
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
            component: RadioGroupField,
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
            component: SelectField,
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'secondChoiceFunction',
            label: 'Second Choice Function',
            type: 'select',
            component: SelectField,
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'thirdChoiceFunction',
            label: 'Third Choice Function',
            type: 'select',
            component: SelectField,
            required: true,
            placeholder: 'Select an option',
            program: Program.EMCR,
            options: [],
          },
          {
            name: 'functions',
            label:
              'Please select ALL the sections that you are interested in, if you were to be deployed.',
            labelHelper:
              'Your selections must include your first choice. For your EMCR CORE Team application, you must select AT LEAST one section.',
            type: 'checkbox-group',
            component: CheckboxGroupField,
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
            component: SelectField,
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
            component: SelectField,
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
            component: SelectField,
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
            component: FieldGroup,
            required: true,
            fields: Object.values(SectionName).map((itm) => ({
              name: itm,
              label: `${itm} Roles`,
              type: 'multiselect',
              component: SelectField,
              required: false,
              placeholder: '',
            })),
          },
        ],
      },
    ],
  },
  {
    component: ({ sections }: { sections: FormSection[] }) => (
      <Skills sections={sections} />
    ),
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
            component: FieldGroup,
            fields: [
              {
                name: 'language',
                label: 'Language',
                colspan: 2,
                type: 'text',
                component: TextField,
                required: true,
                placeholder: 'Enter a language',
              },
              {
                name: 'languageProficiency',
                label: 'Language Proficiency',
                colspan: 2,
                type: 'select',
                component: SelectField,

                required: true,
                placeholder: 'Select Proficieny Level',
                options: [],
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
            component: FieldGroup,
            label: '',
            colspan: 2,
            fields: [
              {
                name: 'tool',
                colspan: 2,
                label: 'Tool Name',
                type: 'select',
                component: SelectField,
                required: true,
                placeholder: 'Select an option',
                options: [],
              },
              {
                name: 'toolProficiency',
                label: 'Tool Proficiency',
                type: 'select',
                component: SelectField,
                colspan: 2,
                required: true,
                placeholder: 'Select an option',
                options: [],
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
            component: FieldGroup,
            fields: [
              {
                name: 'certificate',
                label: 'Certification Name',
                type: 'select',
                component: SelectField,
                required: true,
                placeholder: 'Select an option',
                options: [],
              },
              {
                name: 'expiry',
                label: 'Certificate Expiry',
                type: 'date',
                component: DatePicker,
                required: false,
                placeholder: 'Select a date',
              },
            ],
          },
          // TODO Add this back in
          // {
          //   name: 'driversLicense',
          //   label: 'Driver License',
          //   type: 'multiselect',
          //   component: SelectField,
          //   required: false,
          //   placeholder: 'Select an option',
          //   options: Object.keys(DriverLicense).map((key) => ({
          //     label: DriverLicenseName[key as keyof typeof DriverLicenseName],
          //     value: key,
          //   })),
          // },
        ],
      },
    ],
  },
  {
    component: () => <Review />,
    label: 'Review & Submit',
    value: IntakeFormTab.Review,
    description:
      'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',
  },
  {
    component: () => <Complete />,
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
