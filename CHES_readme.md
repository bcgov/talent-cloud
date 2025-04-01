
# CHEFS x CORE Integration 

## Overview

[CHES](https://digital.gov.bc.ca/bcgov-common-components/common-hosted-email-service/) is part of the BC Gov common components collection. It is used throughout this application for generating and sending various email templates.

## How we are using CHES: 

The MailService is responsible for managing email-related operations, including generating email templates, sending emails, and tracking their status. 

We use nunjucks for templates which can  be found in the views and views/test directories.  Changes made to these files will require a rebuild during local development. 

All requests made to CHES API require an authentication token. 

*Key Features:*
Email Status Tracking: Tracks the status of sent emails and updates the database for completed emails.
Dynamic Email Templates: Uses nunjucks to generate email templates with placeholders for dynamic content.
Duplicate Filtering: Prevents duplicate emails by filtering out recently sent emails.
Error Handling: Logs errors for invalid email addresses and API failures.
Batch Processing: Groups emails into batches and saves transaction details in the database.

*Use Cases*
Sending automated notifications to members or supervisors.
Generating and sending email templates with dynamic content.
Tracking the status of sent emails and handling retries for incomplete ones.
Filtering out duplicate or invalid emails before sending.
This service is designed to handle email operations efficiently, ensuring reliability and traceability through logging and database records.

*Methods:*
1. checkMailStatus()
Purpose: Checks the status of sent emails and updates the database for completed emails.
Steps:
Retrieves an authentication token using getToken().
Fetches incomplete emails from the database.
Queries the CHES API for the status of each email transaction (txId).
Updates the database for emails marked as "completed" by the CHES API.
Returns: A list of emails that are still incomplete.

2. getToken()
Purpose: Retrieves an authentication token from the CHES Auth API.
Steps:
Encodes client credentials (CHES_CLIENT_ID and CHES_CLIENT_SECRET).
Sends a POST request to the CHES Auth API to obtain a token.
Logs success or failure.
Returns: The access_token required for CHES API requests.

3. generateTemplate()
Purpose: Generates an email template with dynamic content.
Parameters:
tag: Email tag (e.g., MEMBER_DECLINED).
templateType: Type of template (e.g., MEMBER or SUPERVISOR).
records: List of records containing email recipients and context data.
endDate: End date for the email content.
program: Optional program type (e.g., EMCR or BCWS).
ministry: Ministry name (default: 'ALL').
Steps:
Uses nunjucks to render the email body with placeholders and dynamic values.
Maps records to create email contexts (recipients, tags, and dynamic content).
Returns: A MailDto object containing the email subject, body, and contexts.

4. checkForSentMail()
Purpose: Filters out emails that have already been sent recently (within the last 6 days).
Parameters:
contexts: List of email contexts to be sent.
templateType: Type of email template.
Steps:
Queries the database for emails matching the provided contexts and template type.
Filters out emails that were sent within the last 6 days.
Logs the number of filtered and remaining emails.
Returns: A filtered list of email contexts.

5. sendMail()
Purpose: Sends emails using the CHES API.
Parameters:
mail: A MailDto object containing email data.
templateType: Type of email template.
Steps:
Validates email addresses and filters out invalid or null recipients.
Filters out emails that have already been sent recently using checkForSentMail().
Sends the email batch to the CHES API.
Logs the response and saves email and batch records to the database.
Handles invalid emails by saving them as unsent records.
Returns: The response from the CHES API.



## Environment Variables:

For local devlopment, use the dev environment variables. These can be found in the openshift secrets.

- CHES_API: _api url - env specific_
- CHES_AUTH_APIL: _api auth url - env specifc_
- CHES_CLIENT_ID: _CHES client id - env specific_
- CHES_CLIENT_SECRET: _CHES client secret - env specific_


## Useful Links:

- [CHES](https://digital.gov.bc.ca/bcgov-common-components/common-hosted-email-service/)
-  [CHES Wiki](https://github.com/bcgov/common-service-showcase/wiki)
- [CHES Showcase](https://bcgov.github.io/common-service-showcase/services/ches.html)
  

