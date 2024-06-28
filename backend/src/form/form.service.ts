import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { FormAdapter } from './adapter';
import { CreateFormDTO } from './form.dto';
import { FormSubmissionEventPayload, IntakeFormData } from './interface';
import { FormSubmissionDTO } from './submission.dto';
import { BcwsService } from '../bcws/bcws.service';
import { Form } from '../database/entities/form.entity';
import { EmcrService } from '../emcr/emcr.service';
import { AppLogger } from '../logger/logger.service';

import { PersonnelService } from '../personnel/personnel.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepo: Repository<Form>,
    @Inject(PersonnelService) private personnelService: PersonnelService,
    @Inject(BcwsService) private bcwsService: BcwsService,
    @Inject(EmcrService) private emcrService: EmcrService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FormService.name);
  }
  /**
   * process form submission event payload
   * @param eventPayload
   */
  public async processEventPayload(
    eventPayload: FormSubmissionEventPayload,
  ): Promise<Form> {
    const { submissionId, formId, subscriptionEvent } = eventPayload;

    this.logger.log(`Event: ${subscriptionEvent}`);

    if (subscriptionEvent === 'eventSubmission') {
      this.logger.log(`Requesting form data from submission event`);
      this.logger.log(`Submission ID: ${submissionId}`);
      this.logger.log(`Form ID: ${formId}`);

      const requestFormData: FormSubmissionDTO = await axios.get(
        `${process.env.CHEFS_API}/app/api/v1/submissions/${submissionId}`,
        {
          auth: {
            username: `${formId}`,
            password: `${process.env.CHEFS_API_KEY}`,
          },
        },
      );

      this.logger.log(`Received form data from submission event`);

      if (requestFormData.data.submission.draft === true) {
        this.logger.error(`Error saving form data: Draft submission received`);
        throw new BadRequestException(`Draft submission received`);
      }

      const form =
        requestFormData &&
        (await this.processFormData({
          submissionId: requestFormData.data.submission.id,
          formId: formId,
          data: requestFormData.data.submission.submission.data,
        }));
      return form;
    }
  }
  //TODO PROD: unique constraint on email address
  /**
   * Create a new form entity, and passes the form id and submission id to createPersonnel function
   * @param submission
   */
  async processFormData(submission: CreateFormDTO): Promise<Form> {
    this.logger.log(
      `Parsing form data for: ${submission.data.personnel?.program} program(s)`,
    );

    const form = await this.saveForm(submission);
    this.logger.log(`Form data saved successfully. Form id: ${form.id}`);

    const personnelId = await this.createPersonnelEntities(
      submission.data,
      form.id,
    );

    this.logger.log(
      `Personnel entities created successfully. Personnel id: ${personnelId}`,
    );
    return form;
  }
  /**
   * Saves the form id and submission id
   * @param data
   * @returns
   */
  async saveForm(data: CreateFormDTO): Promise<Form> {
    try {
      return await this.formRepo.save(this.formRepo.create(data));
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
      throw new BadRequestException(e);
    }
  }
  /**
   * Creates a new personnel entity from the form
   * @param data
   * @param form
   * @returns
   */
  async createPersonnelEntities(
    data: IntakeFormData,
    formId: number,
  ): Promise<string> {
    const { personnel, emcr, bcws } = new FormAdapter(data, formId);

    if (data.personnel.program === 'BOTH' && !emcr && !bcws) {
      this.logger.error(
        `Error saving form data: Both programs selected but no data found for either program`,
      );
      throw new BadRequestException(
        `Both programs selected but no data found for either program`,
      );
    } else if (data.personnel.program === 'EMCR' && !emcr) {
      this.logger.error(
        `Error saving form data: EMCR program selected but no data found for EMCR program`,
      );
      throw new BadRequestException(
        `EMCR program selected but no data found for EMCR program`,
      );
    } else if (data.personnel.program === 'BCWS' && !bcws) {
      this.logger.error(
        `Error saving form data: BCWS program selected but no data found for BCWS program`,
      );
      throw new BadRequestException(
        `BCWS program selected but no data found for BCWS program`,
      );
    }

    try {
      const person = await this.personnelService.createOnePerson(personnel);
      emcr && (await this.emcrService.createEmcerPersonnel(emcr, person.id));
      bcws && (await this.bcwsService.createBcwsPersonnel(bcws, person.id));

      return person.id;
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
      throw new BadRequestException(e);
    }
  }
}
