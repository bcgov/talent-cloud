import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { FormSubmissionDataDTO, SubmissionDTO } from './intake-form.dto';
import { FormSubmissionEventPayload } from './interface';

@Injectable()
export class FormService {
  constructor() {}

  public async processEventPayload(eventPayload: FormSubmissionEventPayload) {
    const { submissionId, formId } = eventPayload;

    const requestFormData = await axios.get(
      `${process.env.CHEFS_API}/app/api/v1/submissions/${submissionId}`,
      {
        auth: {
          username: `${formId}`,
          password: `${process.env.CHEFS_API_KEY}`,
        },
      },
    );

    const submissionData: SubmissionDTO =
      requestFormData.data.submission.submission;
    requestFormData && this.processFormData(submissionData);
  }

  async processFormData(submission: SubmissionDTO) {
    const data: FormSubmissionDataDTO = submission.data;
    console.log(data);

    //     const created = await Promise.all(await this.personnelService.createPersonnel([personnel]))
    //     console.log(created)
  }
}