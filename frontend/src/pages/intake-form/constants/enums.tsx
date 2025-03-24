export enum Expectations {
  EXPECTATIONS = 'expectations',
  ORIENTATION = 'Orientation',
  WILLINGNESS_STATEMENT = 'Willingness Statement',
  PARQ = 'ParQ',
  APPROVED_BY_SUPERVISOR = 'Approved By Supervisor',
}

export const expectationsBoth = [
  {
    label: (
      <span>
        As a CORE Team applicant, I understand the expectations and commitments for
        both programs as indicated in the instructions above.
      </span>
    ),

    value: Expectations.EXPECTATIONS,
    required: true,
  },
  {
    label: (
      <span>
        I confirm that I have requested approval from my supervisor to participate in
        both programs.
      </span>
    ),
    value: Expectations.APPROVED_BY_SUPERVISOR,
    required: true,
  },
  {
    label: (
      <span>
        I understand that I must complete the relevant training courses to
        participate in each program (“ICS Training Course” for EMCR CORE Team, and
        “Intro to CORE” Online Orientation for BCWS CORE Team).
      </span>
    ),
    value: Expectations.ORIENTATION,
    required: true,
  },
  {
    label: (
      <span>
        As a BCWS CORE Team applicant, I confirm that I have read and understood the{' '}
        <a
          href="https://intranet.gov.bc.ca/assets/intranet/bcws-intranet/wildfire-teams/documents/willingness_statement_-_last_updated_feb_2025.pdf"
          target="_blank"
          className="text-linkBlue underline"
          rel="noreferrer"
        >
          Willingness Statement
        </a>{' '}
        and wish to participate.
      </span>
    ),
    value: Expectations.WILLINGNESS_STATEMENT,
    required: true,
  },
  {
    label: (
      <span>
        As a BCWS CORE Team applicant, I understand that I must complete and sign the{' '}
        <span className="font-bold">PAR-Q+</span> and have this form submitted to my
        regional contact.
      </span>
    ),
    value: Expectations.PARQ,
    required: true,
  },
];

export const expectationsBcws = [
  {
    label: (
      <span>
        As a BCWS CORE Team applicant, I understand the expectations and commitments
        for program as indicated in the instructions above.
      </span>
    ),
    value: Expectations.EXPECTATIONS,
    required: true,
  },
  {
    label: (
      <span>
        I confirm that I have requested approval from my supervisor to participate in
        the program.
      </span>
    ),
    value: Expectations.APPROVED_BY_SUPERVISOR,
    required: true,
  },
  {
    label: (
      <span>
        I confirm that I have completed the Intro to CORE online orientation course.
      </span>
    ),
    value: Expectations.ORIENTATION,
    required: true,
  },
  {
    label: (
      <span>
        I confirm that I have read and understood the{' '}
        <a
          href="https://intranet.gov.bc.ca/assets/intranet/bcws-intranet/wildfire-teams/documents/willingness_statement_-_last_updated_feb_2025.pdf"
          target="_blank"
          className="text-linkBlue underline"
          rel="noreferrer"
        >
          Willingness Statement
        </a>{' '}
        and wish to participate.
      </span>
    ),
    value: Expectations.WILLINGNESS_STATEMENT,
    required: true,
  },
  {
    label: (
      <span>
        I understand that I must complete and sign the{' '}
        <span className="font-bold">PAR-Q+</span> and have this form submitted to my
        regional contact.
      </span>
    ),
    value: Expectations.PARQ,
    required: true,
  },
];

export const expectationsEmcr = [
  {
    label: (
      <span>
        As an EMCR CORE Team applicant, I understand the expectations and commitments
        for program as indicated in the instructions above.
      </span>
    ),
    value: Expectations.EXPECTATIONS,
    required: true,
  },
  {
    label: (
      <span>
        I confirm that I have requested approval from my supervisor, and I understand
        that I must complete the ICS training course to participate in the program.
      </span>
    ),
    value: Expectations.APPROVED_BY_SUPERVISOR,
    required: true,
  },
];

export enum IntakeFormTab {
  Program = 'programSelection',
  PersonalDetails = 'personalDetails',
  Experiences = 'experiences',
  Skills = 'skills',
  Review = 'review',
  Complete = 'complete',
}
