import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { FormSubmissionEventPayload } from './interface';
import { Form } from '../database/entities/form.entity';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepo: Repository<Form>,
    private readonly logger: AppLogger,
  ) {}

  /**
   * process form submission event payload
   * @param eventPayload
   */
  public async processEventPayload(eventPayload: FormSubmissionEventPayload) {
    this.logger.log(
      `${this.processEventPayload.name}, Submission ID: ${eventPayload.submissionId}, form ID: ${eventPayload.formId}`,
    );
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
    this.logger.log(`Received form data from submission event`);
    const submissionData: Partial<Form> =
      requestFormData.data.submission.submission;
    requestFormData &&
      this.processFormData({ submissionId, formId, data: submissionData });
  }

  //TODO deterimine if the submission ID of an edited form is the same as the original form
  // If yes, check submission ID prior to saving form data, if submission id exits, update the original entry, otherwise, save a new entry
  // If no, then create a spike to detrmine how to handle form updates/resubmitted forms for the same applicant
  // Do we need a way to ensure that applicants can only submit a form once? Can we log idir or use email as a unique identifier?
  async processFormData(submission: Partial<Form>) {
    try {
      await this.formRepo.save(this.formRepo.create(submission));
      this.logger.log(`Form data saved successfully`);
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
    }
    this.logger.log(`Form data saved successfully`);
    return {
      message: 'Form data saved successfully',
      status: 201,
    };
  }
}
