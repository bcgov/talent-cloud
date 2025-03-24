// common
import {
  DriverLicense,
  DriverLicenseName,
  Ministry,
  MinistryName,
  Program,
  UnionMembership,
} from '@/common';
import {
  BcwsTravelPreference,
  EmcrTravelPreference,
  TravelPreferenceText,
} from '@/common/enums/travel-preference.enum';
import { Section, SectionName } from '@/common/enums/sections.enum';
import { SelectField } from '../fields/SelectField';
import { ProgramPage } from '../pages/Program/Program';
import { PersonalDetails } from '../pages/PersonalDetails';
import { DateField } from '../fields/DateField';
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
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { Modal, ModalGridItem } from '../components/Modal';
import { bcws, emcr } from '@/components/profile/sections-roles/roles';
import { Accordion } from '../components/Accordion';
import { CheckboxField } from '../fields/CheckboxField';
import { MultiSelectField } from '../fields/MultiSelectField';
import { ToolsProficiency, ToolsProficiencyName } from '@/common/enums/tools.enum';
import {
  LanguageProficiency,
  LanguageProficiencyName,
} from '@/common/enums/language.enum';

const emcrSectionsInterest = (
  <div className="my-8">
    <p className="text-xl font-bold mb-2">EMCR Section(s) Interest</p>
    <Banner
      title={''}
      content={
        <>
          <p className="text-info text-sm pb-2">
            For your EMCR CORE Team application, you only need to indicate the
            following:
          </p>
          <ul className="list-disc list-inside text-info text-sm font-normal">
            <li>
              Your general experiences in emergency management (e.g, past experience
              outside emergency events, etc.)
            </li>
            <li>Your ranking of and interest in EMCR CORE Team section(s)</li>
          </ul>
        </>
      }
      type={BannerType.INFO}
    />
  </div>
);

const bcwsSectionsInterest = (
  <div className="my-8">
    <p className="text-xl font-bold mb-2">BCWS Section(s) and Role(s) Interest</p>
    <Banner
      title={''}
      content={
        <>
          <p className="text-info text-sm pb-2">
            For your BCWS CORE Team application, you must indicate the following:
          </p>
          <ul className="list-disc list-inside text-info text-sm font-normal">
            <li>
              Your ranking of BCWS CORE Team sections that you wish to be deployed in
              the most
            </li>
            <li>Section role(s) that you are interested in for deployment</li>
          </ul>
        </>
      }
      type={BannerType.INFO}
    />
  </div>
);

// Roles & Interests Descriptions
const emcrDefinitionsModalGridContainer = (
  <div className="grid grid-cols-6 mt-4 gap-y-4">
    {emcr.map((itm, index: number) => (
      <ModalGridItem key={index} {...itm} />
    ))}
  </div>
);
const emcrDefinitionsModalButton = (
  <a className="text-[#1A5A96] underline cursor-pointer text-sm">
    Learn more about EMCR CORE Team sections
  </a>
);
const bcwsDefinitionsModalGridContainer = (
  <div className="flex flex-col mt-4 gap-y-4">
    {bcws.map((sec, index: number) => (
      <Accordion title={sec.section} key={index}>
        {
          <div className="grid grid-cols-6 gap-y-4">
            {sec.roles.map((rol, rolIndex: number) => (
              <ModalGridItem {...rol} titleStyle="!font-normal" key={rolIndex} />
            ))}
          </div>
        }
      </Accordion>
    ))}
  </div>
);
const bcwsDefinitionsModalButton = (
  <a className="text-[#1A5A96] underline cursor-pointer text-sm">
    Learn more about BCWS CORE Team sections
  </a>
);
const bcwsRolesFields = Object.values(Section).map((itm) => ({
  name: itm,
  label: `${SectionName[itm]} Roles`,
  type: 'multiselect',
  component: MultiSelectField,
  required: false,
  colSpan: 2,
  placeholder: 'Select option(s)',
  options: [],
}));
const programTab = {
  label: 'Program Selection & Acknowledgement',
  component: () => <ProgramPage />,
  value: IntakeFormTab.Program,
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
};
const PersonalDetailsTab = {
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
          name: 'primaryPhoneNumber',
          label: 'Primary Phone Number',
          type: 'tel',
          component: TextField,
          required: true,
          placeholder: '000-000-0000',
        },
        {
          name: 'secondaryPhoneNumber',
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
          colSpan: 2,
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
          disabled: true,
          component: TextField,
          required: true,
          placeholder: 'johnsmith@gov.bc.ca',
        },
        {
          name: 'workPhoneNumber',
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
            label: MinistryName[itm],
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
          name: 'unionMembership',
          label: 'Union Membership',
          type: 'select',
          component: SelectField,
          required: true,
          options: Object.values(UnionMembership).map((itm) => ({
            label: itm,
            value: itm,
          })),
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
            <p className="text-info text-sm">
              We will notify your supervisor about the outcome of your application.
              If there is a change in your position or supervisor at any point, you
              must update this information and obtain your new supervisor’s approval
              to participate.
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
              <p className="text-info text-sm">
                We will notify your supervisor about the outcome of your application.
                If there is a change in your position or supervisor at any point, you
                must update this information and obtain your new supervisor’s
                approval to participate.
              </p>
              <br />
              <br />
              <p className="text-info text-sm">
                Liaison information is required for BCWS CORE Team applicants and is
                applicable only if you belong to any of the following: 1) Ministry of
                Forests, 2) Ministry of Water, Land and Resource Stewardship, 3) The
                Recreation Sites and Trails, and the BC Parks division under Ministry
                of Environment.{' '}
              </p>
              <br />
              <p className="text-info text-sm">
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
          name: 'supervisorPhoneNumber',
          label: 'Supervisor Phone Number',
          type: 'tel',
          component: TextField,
          required: false,
          placeholder: '000-000-0000',
        },
        {
          name: 'liaisonUnknown',
          label: '',
          type: 'checkbox',
          component: CheckboxField,
          required: false,
          placeholder: 'I am unsure who my liaison is',
          program: Program.BCWS,
          colSpan: 2,
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
              <p className="text-info text-sm">
                If you are unwilling to travel to activation sites outside of your
                home location, your deployment opportunities may be limited.
                Deployment flexibility could also vary by role, with some requiring
                on-site presence. New CORE Team members may need to undergo on-site
                training.
              </p>
              <br />
              <p className="text-info text-sm">
                You can always change your travel preferences in your dashboard once
                you become a member.
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
            label: TravelPreferenceText[itm],
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
            label: TravelPreferenceText[itm],
            value: itm,
          })),
        },
      ],
    },
    {
      name: 'Emergency Contact Details',
      fields: [
        {
          name: 'emergencyContactFirstName',
          label: 'Emergency Contact First Name',
          type: 'text',
          component: TextField,
          required: true,
          placeholder: 'John',
        },
        {
          name: 'emergencyContactLastName',
          label: 'Emergency Contact Last Name',
          type: 'text',
          component: TextField,
          required: true,
          placeholder: 'Smith',
        },
        {
          name: 'emergencyContactPhoneNumber',
          label: 'Emergency Contact Phone Number',
          type: 'tel',
          component: TextField,
          required: true,
          placeholder: '000-000-0000',
        },
        {
          name: 'emergencyContactRelationship',
          label: 'Emergency Contact Relationship',
          type: 'text',
          component: TextField,
          required: true,
          placeholder: 'Friend',
        },
      ],
    },
  ],
};
const ExperiencesTab = {
  label: 'Experience & Section Interests',
  component: ({ sections }: { sections: FormSection[] }) => (
    <Experiences sections={sections} />
  ),
  description: '',
  value: IntakeFormTab.Experiences,
  sections: [
    {
      program: Program.EMCR,
      name: 'General Emergency Management Experience',
      fields: [
        {
          name: 'emergencyExperienceHeader',
          label: '',
          type: 'componentBox',
          component: () => (
            <p className="text-sm">
              Please answer the following questions regarding your{' '}
              <span className="font-bold">
                emergency management related experiences
              </span>
              .
            </p>
          ),
        },
        {
          name: 'emergencyExperience',
          label: (
            <span className="font-normal">
              Do you have any direct experience related to emergency management?
            </span>
          ),
          type: 'radio-group',
          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
          required: true,
          colSpan: 2,
          component: RadioGroupField,
        },
        {
          name: 'preocExperience',
          label: (
            <span className="font-normal">
              Do you have any experience working in a Provincial Regional Emergency
              Operation Centre (PREOC)?
            </span>
          ),
          type: 'radio-group',

          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
          required: true,
          colSpan: 2,
          component: RadioGroupField,
        },
        {
          name: 'peccExperience',
          label: (
            <span className="font-normal">
              Do you have any experience working in a Provincial Emergency
              Coordination Centre (PECC)?
            </span>
          ),
          type: 'radio-group',

          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
          required: true,
          colSpan: 2,
          component: RadioGroupField,
        },
        {
          name: 'firstNationsExperience',
          label: (
            <span className="font-normal">
              Do you have any direct experience working with Indigenous communities
              (e.g., living or working in a Reserve, working directly with Indigenous
              communities, etc.)?
            </span>
          ),
          type: 'radio-group',
          options: [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
          ],
          required: true,
          colSpan: 2,
          component: RadioGroupField,
        },
      ],
      header: emcrSectionsInterest,
    },
    {
      program: Program.EMCR,
      name: 'EMCR Core Team Sections',
      fields: [
        {
          name: 'emcCoreTeamSectionsHeader',
          label: '',
          type: 'componentBox',
          component: () => (
            <>
              <p className="text-sm">
                Please select your top three EMCR CORE Team sections that you would
                like to be deployed in.{' '}
              </p>
              <Modal
                modalButton={emcrDefinitionsModalButton}
                contentHeader="EMCR CORE Team Section Definitions"
                gridHeader="EMCR sections consist of the following:"
                gridContainer={emcrDefinitionsModalGridContainer}
              />
            </>
          ),
        },
        {
          name: 'firstChoiceFunction',
          label: 'First Choice',
          type: 'select',
          component: SelectField,
          required: true,
          placeholder: 'Select an option',
          program: Program.EMCR,
          options: [],
        },
        {
          name: 'secondChoiceFunction',
          label: 'Second Choice',
          type: 'select',
          component: SelectField,
          required: false,
          placeholder: 'Select an option',
          program: Program.EMCR,
          options: [],
        },
        {
          name: 'thirdChoiceFunction',
          label: 'Third Choice',
          type: 'select',
          component: SelectField,
          required: false,
          placeholder: 'Select an option',
          program: Program.EMCR,
          options: [],
        },
        {
          name: 'emcrDivider',
          label: '',
          type: 'componentBox',
          component: () => (
            <hr className="mt-6 mb-4 h-0.5 border-t-0 bg-[#cfcfcf]" />
          ),
        },
        {
          name: 'functions',
          label: (
            <div>
              <div className="text-black text-sm font-normal">
                {
                  'Please select ALL the sections that you are interested in, if you were to be deployed.'
                }
              </div>
              <div className=" pb-8">
                <span className="text-xs font-normal text-gray-700">
                  {
                    'Your selections must include your first choice. For your EMCR CORE Team application, you must select AT LEAST one section.'
                  }
                </span>
              </div>
            </div>
          ),
          type: 'checkbox-group',
          component: CheckboxGroupField,
          required: false,
          placeholder: '',
          program: Program.EMCR,
          colSpan: 2,
          options: [],
        },
      ],
    },
    {
      program: Program.BCWS,
      name: 'BCWS CORE Team Sections and Roles',
      header: bcwsSectionsInterest,
      fields: [
        {
          name: 'bcwsCoreTeamSectionsHeader',
          label: '',
          type: 'componentBox',
          component: () => (
            <>
              <p className="text-sm">
                Please select your top three BCWS CORE Team sections that you would
                like to be deployed in.
              </p>
              <Modal
                modalButton={bcwsDefinitionsModalButton}
                contentHeader="BCWS CORE Team Section & Role Definitions"
                gridHeader="BCWS sections consist of the following. Please expand each sections to view their respective roles."
                gridContainer={bcwsDefinitionsModalGridContainer}
              />
            </>
          ),
        },
        {
          name: 'firstChoiceSection',
          label: 'First Choice Section',
          type: 'select',
          component: SelectField,
          required: true,
          placeholder: 'Select an option',
          program: Program.BCWS,
          options: [],
        },
        {
          name: 'secondChoiceSection',
          label: 'Second Choice Section',
          type: 'select',
          component: SelectField,
          required: false,
          placeholder: 'Select an option',
          program: Program.BCWS,
          options: [],
        },
        {
          name: 'thirdChoiceSection',
          label: 'Third Choice Section',
          type: 'select',
          component: SelectField,
          required: false,
          placeholder: 'Select an option',
          program: Program.BCWS,
          options: [],
        },
        {
          name: 'bcwsDivider',
          label: '',
          type: 'componentBox',
          component: () => (
            <hr className="mt-6 mb-2 h-0.5 border-t-0 bg-[#cfcfcf]" />
          ),
        },
        {
          name: 'roles',
          colSpan: 2,
          label: (
            <div>
              <div className="text-black text-sm font-normal">
                For each section below, please indicate any role(s) that you are
                interested in for deployment.
              </div>
              <div className=" pb-8">
                <span className="text-xs font-normal text-gray-700">
                  You must select AT LEAST ONE role under your FIRST choice.
                </span>
              </div>
            </div>
          ),
          type: 'infoBox',
        },
        ...bcwsRolesFields,
      ],
    },
  ],
};

const SkillsTab = {
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
          helper:
            'Please enter your language(s) and select the proficiency level for each.',
          type: 'field-group',
          component: FieldGroup,
          nestedFields: [
            {
              name: 'language',
              label: 'Language',
              colSpan: 2,
              type: 'text',
              component: TextField,
              required: false,
              placeholder: 'Enter a language',
            },
            {
              name: 'languageProficiency',
              label: 'Proficiency Level',
              colSpan: 2,
              type: 'select',
              component: SelectField,
              required: true,
              placeholder: 'Select Proficieny Level',
              options: Object.values(LanguageProficiency).map((itm) => ({
                label: LanguageProficiencyName[itm],
                value: itm,
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
          component: FieldGroup,
          label: '',
          helper:
            'Please select tools/software and indicate your proficiency level for each.',
          colSpan: 2,
          nestedFields: [
            {
              name: 'tool',
              colSpan: 2,
              label: 'Tool/Software',
              type: 'select',
              component: SelectField,
              required: true,
              placeholder: 'Select an option',
              options: [],
            },
            {
              name: 'toolProficiency',
              label: 'Proficiency Level',
              type: 'select',
              component: SelectField,
              colSpan: 2,
              required: true,
              placeholder: 'Select an option',
              options: Object.values(ToolsProficiency).map((itm) => ({
                label: ToolsProficiencyName[itm],
                value: itm,
              })),
            },
          ],
        },
      ],
    },

    {
      name: 'Certifications & Qualifications',
      fields: [
        {
          name: 'certifications',
          label: '',
          helper:
            'Please indicate any certifications that you have and their expiry date (if applicable).',
          type: 'field-group',
          component: FieldGroup,
          nestedFields: [
            {
              name: 'certification',
              label: 'Certification Name',
              type: 'select',
              component: SelectField,
              required: false,
              placeholder: 'Select an option',
              options: [],
            },
            {
              name: 'expiry',
              label: (
                <>
                  Certificate Expiry
                  <span className="text-sm text-gray-700 font-normal pl-2">
                    (if applicable)
                  </span>
                </>
              ),
              type: 'date',
              component: DateField,
              required: false,
              placeholder: 'Select a date',
            },
          ],
        },
        // TODO
        {
          name: 'driverLicense',
          label: 'Driver License',
          type: 'multiselect',
          component: MultiSelectField,
          required: false,
          colSpan: 2,
          placeholder: 'Select an option',
          options: Object.keys(DriverLicense).map((key) => ({
            label: DriverLicenseName[key as keyof typeof DriverLicenseName],
            value: key,
          })),
        },
      ],
    },
  ],
};
const CompleteTab = {
  component: () => <Complete />,
  label: 'Complete',
  title: 'Thank you for your application!',
  value: IntakeFormTab.Complete,
  description: (
    <div className="flex flex-col gap-12">
      <div>
        <p>
          Thank you for submitting your application to join CORE Team. Our team will
          be reviewing your application soon.
        </p>
        <br />
        <p>
          A CORE Team coordinator may reach out to you in the next 7 to 10 working
          days via email to further assess your experience and deployment readiness.
          Our response time may vary depending on ongoing operational tasks such as
          responding to emergency and wildfire across the province.
        </p>
        <br />
        <p>Please be aware that duplicate submissions will NOT be considered.</p>
      </div>
      <div>
        <Banner
          title={
            'Please remember to email your proof of supervisor approval and all other required documents relevant to the program stream(s) you applied for.'
          }
          content={
            <div className="grid grid-cols-2 mt-4 gap-2">
              <div className="col-span-1">
                <p className="font-bold text-sm text-[#003366]">
                  EMCR CORE Team program stream
                </p>
                <ul className="list-disc list-inside text-info text-sm font-normal">
                  <li>
                    <a
                      href="https://www2.gov.bc.ca/gov/content/careers-myhr/forms-tools/all-employees"
                      target="_blank"
                      className="text-linkBlue hover:underline"
                      rel="noreferrer"
                    >
                      Incident Command System (ICS) Training
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-sm text-[#003366]">
                  BCWS CORE Team program stream
                </p>
                <ul className="list-disc list-inside text-info text-sm font-normal">
                  <li>
                    <a
                      href="https://www.for.gov.bc.ca/ftp/HPR/gov_internal/!publish/BCWS%20Intranet/Staff%20Development/Wildfire%20TEAMS%20Orientation%20-%20Storyline%20output/story.html"
                      target="_blank"
                      className="text-linkBlue hover:underline"
                      rel="noreferrer"
                    >
                      “Intro to CORE”
                    </a>{' '}
                    online orientation
                  </li>
                  <li>
                    <a
                      href="https://intranet.gov.bc.ca/assets/intranet/bcws-intranet/wildfire-teams/documents/2024_willingness_statement_-_in_progress.pdf"
                      target="_blank"
                      className="text-linkBlue hover:underline"
                      rel="noreferrer"
                    >
                      Willingness Statement{' '}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.for.gov.bc.ca/ftp/hpr/gov_internal/!Publish/wmb/TEAMS/PARQ.pdf"
                      target="_blank"
                      className="text-linkBlue hover:underline"
                      rel="noreferrer"
                    >
                      PAR-Q+ form
                    </a>{' '}
                    (please download this form for completion)
                  </li>
                </ul>
              </div>
              <div className="col-span-1">
                <p className="text-sm">
                  Submit to{' '}
                  <a
                    href="mailto:EMCR.CORETeam@gov.bc.ca"
                    className="text-linkBlue hover:underline"
                  >
                    EMCR.CORETeam@gov.bc.ca
                  </a>
                  .
                </p>
              </div>
              <div className="col-span-1">
                <p className="text-sm">
                  Submit to your Fire Centre’s email.{' '}
                  <a
                    href="https://intranet.gov.bc.ca/bcws/core-team"
                    target="_blank"
                    className="text-linkBlue hover:underline"
                    rel="noreferrer"
                  >
                    Find my Fire Centre
                  </a>
                </p>
              </div>
            </div>
          }
          type={BannerType.INFO}
        />
      </div>
    </div>
  ),
};

const ReviewTab = {
  component: (props: any) => <Review {...props} />,
  label: 'Review & Submit',
  value: IntakeFormTab.Review,
  description:
    'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',
  sections: [
    {
      name: PersonalDetailsTab.label,
      segments: PersonalDetailsTab.sections.map((itm) => ({
        ...itm,
        label: itm.name,
        fields: itm.fields.filter((field) => field.type !== 'infoBox'),
      })),
    },

    {
      name: ExperiencesTab.label,
      segments: [
        {
          name: 'General Emergency Management Experience',
          fields: ExperiencesTab.sections[0].fields.filter((itm) =>
            [
              'emergencyExperience',
              'firstNationsExperience',
              'preocExperience',
              'peccExperience',
            ].includes(itm.name),
          ),
          program: Program.EMCR,
        },
        {
          name: 'EMCR CORE Team Sections',
          fields: [
            ...ExperiencesTab.sections[1].fields.filter((itm) =>
              [
                'firstChoiceFunction',
                'secondChoiceFunction',
                'thirdChoiceFunction',
              ].includes(itm.name),
            ),
            {
              colSpan: 3,
              helperText:
                'Please select ALL the section(s) that you are interested in, if you were to be deployed. ',
              name: 'functions',
              program: Program.EMCR,
            },
          ],
          program: Program.EMCR,
        },

        {
          program: Program.BCWS,
          name: 'BCWS CORE Team Sections and Roles',
          fields: ExperiencesTab.sections[2].fields.filter((itm) =>
            [
              'firstChoiceSection',
              'secondChoiceSection',
              'thirdChoiceSection',
              'PLANNING',

              'LOGISTICS',
              'FINANCE_ADMIN',
              'OPERATIONS',
              'COMMAND',
              'AVIATION',
            ].includes(itm.name),
          ),
        },
      ],
    },
    {
      name: SkillsTab.label,
      segments: [
        { name: 'Languages', fields: SkillsTab.sections[0].fields },
        { name: 'Tools', fields: SkillsTab.sections[1].fields },
        { name: 'Certifications', fields: SkillsTab.sections[2].fields },
      ],
    },
  ],
};

export const formTabs: FormTab[] = [
  programTab,
  PersonalDetailsTab,
  ExperiencesTab,
  SkillsTab,
  ReviewTab,
  CompleteTab,
];
