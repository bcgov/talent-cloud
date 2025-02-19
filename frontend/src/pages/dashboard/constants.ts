export const statusDescriptions = {
  sectionOne: {
    headers: ['Status', 'Definition'],
    rows: [
      {
        title: 'Active',
        description:
          'Members who are actively participating in CORE; deployable for the current year.',
      },
      {
        title: 'Inactive',
        description:
          'Members who are currently not participating in CORE; not deployable for the current year. Consists of both “temporarily inactive” (e.g., due to annual leave, maternity leave, short-term hiatus from the program, etc.) and “permanently inactive” (e.g., retired, removed from the program, etc.) members. *Permanently inactive members are greyed out.',
      },
      {
        title: 'Pending Approval',
        description:
          'CORE applicants whose application is currently under review by program staff and has not yet been approved for membership.',
      },
    ],
  },
  sectionTwo: {
    headers: ['Label/Filter', 'Type', 'Description'],
    rows: [
      {
        title: '"NEW"',
        type: 'Active',
        description: 'New members approved into CORE, the tag will last for 5 days.',
      },
      {
        title: '"RECOMMITTED"',
        type: 'Active',
        description:
          'Members who are active CORE participants for the current year AND will also be returning as active members for the upcoming year. This label will disappear when the recommitment period ends.',
      },
      {
        title: '"MISSED DEADLINE"',
        type: 'Inactive',
        description:
          'Members who turned inactive due to missing the recommitment deadline.',
      },
      {
        title: '"NOT RETURNING"',
        type: 'Inactive',
        description:
          'Members who declined recommitment. Not deployable for the upcoming year unless they discuss reattempting recommitment with their coordinator.',
      },
    ],
  },
};
