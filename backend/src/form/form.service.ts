import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { FormSubmissionDataDTO, SubmissionDTO } from './form.dto';
import { Form } from './form.entity';
import { FormSubmissionEventPayload } from './interface';

@Injectable()
export class FormService {
  constructor(@InjectRepository(Form) private formRepo: Repository<Form>) {}
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
    return await this.formRepo.save(this.formRepo.create({ data }));
  }
}
