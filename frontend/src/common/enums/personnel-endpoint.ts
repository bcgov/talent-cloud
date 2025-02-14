export enum PersonnelEndpoint {
  // used on the emcr controller to update the emcr personnel functions/experiences
  Experiences = 'experiences',

  // used on the bcws personnel controller to update the bcws personnel roles/sections
  Roles = 'roles',

  // used by member endpoint to update the skills of a personnel
  Skills = 'skills',

  // used by member endpoint to update the personnel
  Preferences = "preferences",
}
