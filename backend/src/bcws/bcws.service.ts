import { Inject, Injectable } from "@nestjs/common";
import { PersonnelService } from "src/personnel/personnel.service";

@Injectable()
export class BcwsService {
  constructor(
    @Inject(PersonnelService) private readonly personnelService: PersonnelService
  ){}
  async getApprovedApplicants(){
    return await this.personnelService.getApprovedBcwsApplicants()
  }
}