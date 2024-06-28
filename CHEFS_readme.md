# CHEFS x CORE Integration and Workflows

1. [What is CHEFS](#what-is-chefs)
2. [Prerequisitites](#prerequisites)
3. [Managing and Building the Form](#managing-and-building-the-form)
  i. [access to forms](#access-to-forms)
  ii. [managing environments](#managing-environments)
  iii. [form builder](#form-builder)
  iv. [dynamic form data](#dynamic-form-data)
  v. [custom validation logic](#custom-validation-logic)
  vi. [(future) user program validation](#(future)-user-program-validation)

5. [Integration with CORE](#integration-with-core)
    i. [event subscription](#event-subscription)
    ii. [submission json](#submission-json)  
    iii. [DTO](#dto)  


## What is CHEFS


[CHEFS](https://submit.digital.gov.bc.ca/app) is a drag and drop form builder and is part of the [Common Components](https://digital.gov.bc.ca/common-components/) collection. 
- links:
  - [technical documentation](https://developer.gov.bc.ca/docs/default/component/chefs-techdocs/About/)
  - [forms dashboard](https://submit.digital.gov.bc.ca/app)
- support:
  - Discord / TEAMS


## Prerequisites: 
- valid bc gov't IDIR to log in
- edit access to the form(s) must be given by a current developer or project manager
- access to GH repo



## Managing and Building the Form

### Access To Forms
We have three forms, one for each env. In order to access these form to make changes you will need to added by the producot owner or a developer. 

Here are the links to the form management pages:

[Dev Form](https://submit.digital.gov.bc.ca/app/form/manage?f=6fa9c20d-0f9b-48e7-a4f9-ae3efc32c649)
[Test Form](https://submit.digital.gov.bc.ca/app/form/manage?f=aad5e145-a39e-4284-ae27-b6eb9ee230d3)
[Prod Form](https://submit.digital.gov.bc.ca/app/form/manage?f=21bff2b3-0d47-4916-879c-7a108f9b55ff)

### Managing Environments
Each form has an id, an api key, an event submission url, and a webhooks token. These can be viewed/edited from the form management page. These should not be changed unless you have a specific reason to do so. Any changes you make to these values must also be updated on the specific env in our openshift secrets.

### Form Builder
Whenever a change is required on the form, dev should always be edited first. Once the changes are completed, the form json should be exported and committed to the repository. 


**click "Manage":**
![edit_custom](/gh-assets/edit_form_version.png)

### Dynamic Form Data

The drop down menu values in our form are populated from our own API, so you will not need to update these values on the form, only on the api. Whenever you have made a change to the dev form, you will export and upload that form to the test form, and then the production form. You **must** update the referenced url in each form manually.

:warning: You must edit the url to match the correct env for our dynamic field data to work properly :warning:

#### Steps:

**edit this component:**
![edit_custom](/gh-assets/field_api.png)

**click "Data" tab:**
![edit_custom](/gh-assets/edit_field_data_field2.png)

**edit "Custom Default Value":**
![edit_custom](/gh-assets/edit_custom_js.png)

**edit this url to match the env of your form:**
![edit_custom](/gh-assets/edit_field_url.png)


### Custom Validation Logic

### User Program Validation (future)
-----
## Integration with CORE
### event subscription
### submission json
### DTO

-----