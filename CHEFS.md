# CHEFS - Common Hosted Form Integration

In order to receive new TEAMS applications we are using [CHEFS](https://github.com/bcgov/common-hosted-form-service/wiki/CHEFS-Components). This readme describes the workflow for creating and submitting forms, and the data retrieval process between our API and CHEFS. Steps:- Form Creation: [here](https://submit.digital.gov.bc.ca/). Login with IDIR is required. In order to access the current TEAMS intake form, you must be added to the form  by the current form owner. 

<!-- TODO -->

- Users will go to <LINK TBD> to submit the form.

- When a form is submitted, a CHEFS will send a notification to our API using an authenticated (with token) webhook.

- The notification event contains the form Id and Submission Id.

- Upon receipt of this event we will send a GET request with a Basic Authentication header with the form Id as the username and our CHEFS_API_KEY as the password to `https://submit.digital.gov.bc.ca/app/api/v1/submissions/${submissionId}`.

- Upon successfully receiving the form data, the system creates a new personnel entity in the database and associates it with the form submission id.

- After a user receives a success response when submitting their form, the data retrieval process occurs and relies on three separate API requests before inserting the data into our own database. To ensure that all forms successfully submitted to our own API successfully retrieved CHEFS, we have a daily CRON job that requests the submission IDs of all forms submitted to CHEFS. It then compares these IDs with those stored in our database. If we are missing a submission ID, we will make a request for this missing data.