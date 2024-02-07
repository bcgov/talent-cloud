export interface FormSubmissionEventPayload {
  formId: string;
  formVersion: string;
  subscriptionEvent: string;
  submissionId: string;
}

export interface FormSubmissionEvent {
  secret: string;
  payload: FormSubmissionEventPayload;
}
