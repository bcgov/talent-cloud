import { Injectable } from '@nestjs/common';

@Injectable()
export class BcwsService {
  async getApprovedApplicants() {
    return ['123456'];
  }
}
