/*
NOTE: this is not strictly an enumeration but is kept in the enums/ecmr folder
for convenience, this const is used to assign human-readable headers to CSV output
using preassigned key-value pairings

Any future adjustments to the CSV output data will require adding the appropriate
header replacements to this const (with getRawMany(), all field names are generated
based on their respective DB table/column (or TypeORM alias) name regardless of joins;
for instance, personnel.first_name becomes 'personnel_first_name').  Note also that
any additional columns added to existing tables also need to be accounted for here
due to the way TypeORM handles joins
*/

export const EmcrCsvHeaders = [
  { field: 'emcr_personnel_date_approved', title: 'Date Approved' },
  { field: 'emcr_personnel_date_applied', title: 'Date Applied' },
  {
    field: 'emcr_personnel_approved_by_supervisor',
    title: 'Approved by Supervisor',
  },
  {
    field: 'emcr_personnel_first_choice_section',
    title: 'First Choice Section',
  },
  {
    field: 'emcr_personnel_second_choice_section',
    title: 'Second Choice Section',
  },
  {
    field: 'emcr_personnel_third_choice_section',
    title: 'Third Choice Section',
  },
  {
    field: 'emcr_personnel_coordinator_notes',
    title: 'EMCR Coordinator Notes',
  },
  { field: 'emcr_personnel_logistics_notes', title: 'EMCR Logistics Notes' },
  { field: 'emcr_personnel_status', title: 'Status' },
  {
    field: 'emcr_personnel_first_nation_exp',
    title: 'First Nations Experience',
  },
  { field: 'emcr_personnel_travel_preference', title: 'Travel Preference' },
  {
    field: 'emcr_personnel_emergency_exp',
    title: 'Emergency Support Services Experience',
  },
  { field: 'emcr_personnel_pecc_exp', title: 'PECC Experience' },
  { field: 'emcr_personnel_preoc_exp', title: 'PREOC Experience' },
  { field: 'personnel_created_at', title: 'Date Created' },
  { field: 'personnel_updated_at', title: 'Date Updated' },
  { field: 'personnel_first_name', title: 'First Name' },
  { field: 'personnel_last_name', title: 'Last Name' },
  { field: 'personnel_primary_phone', title: 'Primary Phone' },
  { field: 'personnel_secondary_phone', title: 'Secondary Phone' },
  { field: 'personnel_other_phone', title: 'Other Phone' },
  { field: 'personnel_email', title: 'Email' },
  { field: 'personnel_supervisor_first_name', title: 'Supervisor First Name' },
  { field: 'personnel_supervisor_last_name', title: 'Supervisor Last Name' },
  { field: 'personnel_supervisor_email', title: 'Supervisor Email' },
  { field: 'personnel_supervisor_phone', title: 'Supervisor Phone' },
  { field: 'personnel_union_membership', title: 'Union Membership' },
  { field: 'personnel_intake_form_id', title: 'Intake Form ID' },
  { field: 'personnel_driver_licenses', title: 'Driving Licenses' },
  { field: 'personnel_jobTitle', title: 'Job Title' },
  { field: 'personnel_ministry', title: 'Ministry' },
  { field: 'personnel_division', title: 'Division' },
  {
    field: 'personnel_emergency_contact_first_name',
    title: 'Emergency Contact First Name',
  },
  {
    field: 'personnel_emergency_contact_last_name',
    title: 'Emergency Contact Last Name',
  },
  {
    field: 'personnel_emergency_contact_phone_number',
    title: 'Emergency Contact Phone',
  },
  {
    field: 'personnel_emergency_contact_relationship',
    title: 'Emergency Contact Relationship',
  },
  { field: 'personnel_employee_id', title: 'Employee ID Number' },
  { field: 'personnel_paylist_id', title: 'Paylist ID Number' },
  {
    field: 'personnel_availability_confirmed_until',
    title: 'Availability Confirmed Until',
  },
  {
    field: 'personnel_availability_confirmed_on',
    title: 'Availability Confirmed Date',
  },
  {
    field: 'personnel_chips_last_ping',
    title: 'CHIPS - Last Ping',
  },
  {
    field: 'personnel_chips_last_action_date',
    title: 'CHIPS - Last Action Date',
  },
  {
    field: 'personnel_chips_profile_missing',
    title: 'CHIPS - Profile Missing',
  },
  {
    field: 'personnel_chips_last_updated_properties',
    title: 'CHIPS - Last Updated Properties',
  },
  {
    field: 'personnel_chips_issues',
    title: 'CHIPS - Issues',
  },
  {
    field: 'personnel_chips_training_data',
    title: 'CHIPS - Training Data',
  },
  { field: 'home_loc_location_name', title: 'Home Location Name' },
  { field: 'home_loc_region', title: 'Home Region' },
  { field: 'work_loc_location_name', title: 'Work Location Name' },
  { field: 'work_loc_region', title: 'Work Region' },
  { field: 'recommitment_personnel', title: 'Recommitment - Personnel ID' },
  { field: 'recommitment_year', title: 'Recommitment Year' },
  { field: 'recommitment_program', title: 'Recommitment Program' },
  { field: 'recommitment_status', title: 'Recommitment Status' },
  {
    field: 'recommitment_member_decision_date',
    title: 'Member Recommitment Decision Date',
  },
  { field: 'recommitment_member_reason', title: 'Member Recommitment Reason' },
  { field: 'recommitment_supervisor_idir', title: 'Supervisor Email' },
  {
    field: 'recommitment_supervisor_decision_date',
    title: 'Supervisor Recommitment Decision Date',
  },
  {
    field: 'recommitment_supervisor_reason',
    title: 'Supervisor Recommitment Reason',
  },
  { field: 'last_deployed', title: 'Last Deployed Date' },
];
