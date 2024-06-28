import { IntakeFormData } from './interface';
import {
  CreateBcwsCertificationsDTO,
  CreateBcwsPersonnelLanguagesDTO,
  CreateBcwsPersonnelRolesDTO,
  CreateBcwsPersonnelToolsDTO,
  CreatePersonnelBcwsDTO,
} from '../bcws/dto';
import {
  CertificationName,
  Experience,
  ExperienceLevel,
  LanguageLevelType,
  LanguageProficiency,
  Section,
  Status,
  ToolsProficiency,
} from '../common/enums';
import {
  CreatePersonnelEmcrDTO,
  EmcrPersonnelExperienceDTO,
} from '../emcr/dto';
import { CreatePersonnelDTO } from '../personnel';

export class BcwsAdapter extends CreatePersonnelBcwsDTO {
  private parsedTools(data: IntakeFormData): CreateBcwsPersonnelToolsDTO[] {
    //TODO prevent duplicate tools to be submitted and then remove this:
    const uniqueToolIds = Array.from(
      new Set(data?.bcws.tools?.map((itm) => itm.name.id)),
    );

    return uniqueToolIds?.map((itm) => ({
      toolId: itm,
      proficiencyLevel:
        ToolsProficiency[
          data.bcws.tools.find((tool) => tool.name.id === itm).proficiency.name
        ],
    }));
  }
  //TODO prevent duplicate tools to be submitted and then remove this:
  private parsedRoles(data: IntakeFormData): CreateBcwsPersonnelRolesDTO[] {
    const roles = Object.keys(data?.bcws.sections)
      ?.map((itm) => data?.bcws.sections[itm])
      .filter((itm) => itm?.length > 0)
      .flatMap(
        (itm) =>
          // eslint-disable-next-line
          itm?.map(
            ({
              role,
              experience,
            }: {
              role: { id: number };
              experience: ExperienceLevel;
            }) => ({
              roleId: role?.id,
              expLevel: experience,
            }),
          ),
      );

    const uniqueRoleIds = Array.from(new Set(roles?.map((itm) => itm?.roleId)));

    const uniqueRoles = uniqueRoleIds?.map(
      (itm) => roles?.find((role) => role?.roleId === itm),
    );
    return uniqueRoles;
  }

  private parseLanguages(
    data: IntakeFormData,
  ): CreateBcwsPersonnelLanguagesDTO[] {
    return Array.from(
      new Set(
        data?.bcws.languages?.map((itm) => ({
          language: itm.language,
          level:
            LanguageProficiency[
              itm.proficiency.split('.')[0] ?? itm.proficiency
            ],
          type: LanguageLevelType[itm.proficiency.split('.')[1] ?? 'BOTH'],
        })),
      ),
    );
  }

  private parsedCertifications(
    data: IntakeFormData,
  ): CreateBcwsCertificationsDTO[] {
    const parsed =
      data.bcws.certificates?.map((itm) => ({
        certificationId: itm?.id,
        expiry:
          itm?.id === 6
            ? data?.bcws.foodSafe1Expiry
            : itm?.id === 7
            ? data?.bcws.foodSafe2Expiry
            : undefined,
      })) ?? [];

    if (data.personnel.pfa === 'yes') {
      parsed.push({ certificationId: 2, expiry: undefined });
    }

    if (data.personnel.firstAidLevel) {
      if (
        CertificationName[data.personnel.firstAidLevel] ===
        CertificationName.OFA_I
      ) {
        parsed.push({
          certificationId: 8,
          expiry: data.personnel.firstAidExpiry,
        });
      } else if (
        CertificationName[data.personnel.firstAidLevel] ===
        CertificationName.OFA_II
      ) {
        parsed.push({
          certificationId: 9,
          expiry: data.personnel.firstAidExpiry,
        });
      } else if (
        CertificationName[data.personnel.firstAidLevel] ===
        CertificationName.OFA_III
      ) {
        parsed.push({
          certificationId: 10,
          expiry: data.personnel.firstAidExpiry,
        });
      }
    }
    return parsed;
  }

  constructor(data: IntakeFormData) {
    super();
    Object.assign(this, data.bcws);
    this.dateApplied = new Date();
    (this.coordinatorNotes = ''),
      (this.logisticsNotes = ''),
      (this.status = Status.PENDING),
      (this.liaisonPhoneNumber = data?.bcws.liaisonPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      )),
      (this.firstChoiceSection = Section[data.bcws.firstChoiceSection]),
      (this.secondChoiceSection =
        data.bcws.secondChoiceSection === ''
          ? undefined
          : Section[data.bcws.secondChoiceSection]),
      (this.languages = this.parseLanguages(data));
    this.roles = this.parsedRoles(data);
    this.tools = this.parsedTools(data);
    this.certifications = this.parsedCertifications(data);
    this.emergencyContactPhoneNumber =
      data.bcws.emergencyContactPhoneNumber?.replace(/[(]|-|[)]|\s/gi, '');
  }
}

export class EmcrAdapter extends CreatePersonnelEmcrDTO {
  functions(functions: {
    [key: number]: boolean;
  }): EmcrPersonnelExperienceDTO[] {
    return Object.keys(functions)
      .filter((itm) => functions[itm] === true)
      .map((itm) => ({
        functionId: parseInt(itm),
        experienceType: Experience.INTERESTED,
      }));
  }

  constructor(data: IntakeFormData) {
    super();
    const functions = this.functions(data.emcr.functions);

    Object.assign(this, data.emcr);
    this.dateApplied = new Date();
    this.trainings = [];
    this.firstAidLevel = data.personnel.firstAidLevel ?? undefined;
    this.firstAidExpiry = data.personnel.firstAidExpiry ?? undefined;
    this.psychologicalFirstAid = data.personnel.pfa === 'yes';
    this.experiences = functions ?? [];
  }
}

export class FormAdapter extends CreatePersonnelDTO {
  formId: number;
  constructor(data: IntakeFormData, formId: number) {
    super();
    this.formId = formId;
    this.emcr = new EmcrAdapter(data);
    this.bcws = new BcwsAdapter(data);
  }
}
