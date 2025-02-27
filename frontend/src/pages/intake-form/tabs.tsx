import { Complete } from './pages/Complete';
import { ExperienceRoles } from './pages/ExperienceRoles';
import { PersonalInfo } from './pages/PersonalInfo';
import { ProgramSelection } from './pages/ProgramSelection';
import { ReviewAndSubmit } from './pages/ReviewAndSubmit';
import { Skills } from './pages/Skills';

export const formTabs = [
  {
    label: 'Program Selection & Acknowledgement',
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
    children: <ProgramSelection />,
  },
  {
    label: 'Personal & Employee Information',
    description:
      'Please provide your most up-to-date personal and employment details.',
    value: 'personalInfo',
    children: <PersonalInfo />,
  },
  {
    label: 'Experience and Section Interests',
    description:
      'The EMCR and BCWS CORE Team program streams operate very differently with distinct sections and/or roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.',
    value: 'experienceRoles',
    children: <ExperienceRoles />,
  },
  {
    label: 'Other Skills & Qualifications',
    value: 'skills',
    description: 'Please indicate any other skillset that you may have.',
    children: <Skills />,
  },
  {
    label: 'Review and Submit',
    value: 'reviewAndSubmit',
    description:
      'Please take a moment to review the information you have provided, then click “Submit” below to finalize your application.',
    children: <ReviewAndSubmit />,
  },
  {
    label: 'Complete',
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
    children: <Complete />,
  },
];
