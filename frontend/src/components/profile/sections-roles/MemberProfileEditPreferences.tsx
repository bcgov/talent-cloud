import type {
  BcwsPersonnelRoleInterface,
  BcwsRoleInterface,
  ExperienceInterface,
  FunctionType,
  Member,
} from '@/common';
import { ButtonTypes, Experience } from '@/common';
import { ExperienceLevel, Section } from '@/common/enums/sections.enum';
import { Button, DialogUI } from '@/components';
import { QuestionIcon } from '@/components/ui/Icons';
import { PersonnelEndpoint } from '@/common/enums/personnel-endpoint';
import { useState } from 'react';
import { FunctionChanges } from './FunctionSelect';
import { RoleChanges } from './RoleSelect';
import { MemberProfileEditFunctions } from './MemberProfileEditFunctions';
import { MemberProfileEditRoles } from './MemberProfileEditRoles';
import RolesAndFunctionsDescriptionsTabs from './RolesGuide';

export const MemberProfileEditPreferences = ({
  bcws,
  emcr,
  handleClose,
  handleSave,
}: {
  bcws?: {
    allRoles: BcwsRoleInterface[];
    originalRoles: BcwsPersonnelRoleInterface[];
    sectionChoices: {
      firstChoiceSection?: Section;
      secondChoiceSection?: Section;
      thirdChoiceSection?: Section;
    };
  };
  emcr?: {
    allFunctions: FunctionType[];
    originalExperiences: ExperienceInterface[];
    sectionChoices: {
      firstChoiceSection?: string;
      secondChoiceSection?: string;
      thirdChoiceSection?: string;
    };
  };
  handleClose: () => void;
  handleSave: (personnel: Member, endpoint?: string) => Promise<void>;
}) => {
  const [rolesToSave, setRolesToSave] = useState<RoleChanges>({
    firstChoiceSection: bcws?.sectionChoices?.firstChoiceSection,
    secondChoiceSection: bcws?.sectionChoices?.secondChoiceSection,
    thirdChoiceSection: bcws?.sectionChoices?.thirdChoiceSection,
    roles: [],
  });
  const [functionsToSave, setFunctionsToSave] = useState<FunctionChanges>({
    firstChoiceSection: emcr?.sectionChoices.firstChoiceSection,
    secondChoiceSection: emcr?.sectionChoices.secondChoiceSection,
    thirdChoiceSection: emcr?.sectionChoices.thirdChoiceSection,
    functions: [],
  });
  const onSave = async () => {
    const personnelUpdate: any = {};

    if (bcws) {
      const newRoles = rolesToSave.roles.filter(
        (cr) => !bcws.originalRoles.map((or) => or.id).includes(cr.id),
      );
      const rolesExcludingRemoved = bcws.originalRoles
        .filter((or) => rolesToSave.roles.map((cr) => cr.id).includes(or.id))
        .map((r) => ({
          roleId: r.id,
          expLevel: r.expLevel,
        }));
      const updateRoles = [
        ...newRoles.map((r) => ({
          roleId: r.id,
          expLevel: ExperienceLevel.INTERESTED,
        })),
        ...rolesExcludingRemoved,
      ];
      personnelUpdate.bcws = {
        firstChoiceSection:
          Section[rolesToSave.firstChoiceSection as keyof typeof Section] || null,
        secondChoiceSection:
          Section[rolesToSave.secondChoiceSection as keyof typeof Section] || null,
        thirdChoiceSection:
          Section[rolesToSave.thirdChoiceSection as keyof typeof Section] || null,
        roles: updateRoles,
      };
    }

    if (emcr) {
      const newFunctions = functionsToSave.functions.filter(
        (cf) =>
          !emcr.originalExperiences.map((oe) => oe.function.id).includes(cf.id),
      );
      const functionsExcludingRemoved = emcr.originalExperiences
        .filter((oe) => functionsToSave.functions.map((cf) => cf.id).includes(oe.id))
        .map((f) => ({
          id: f.id,
          function: f.function,
          experienceType: f.experienceType,
        }));
      const updateFunctions = [
        ...newFunctions.map((f) => ({
          id: f.id,
          functionName: f.name,
          experienceType: Experience.INTERESTED,
        })),
        ...functionsExcludingRemoved,
      ];
      personnelUpdate.emcr = {
        firstChoiceSection: functionsToSave.firstChoiceSection,
        secondChoiceSection: functionsToSave.secondChoiceSection,
        thirdChoiceSection: functionsToSave.thirdChoiceSection,
        experiences: updateFunctions,
      };
      if (personnelUpdate.emcr.firstChoiceSection === '') {
        delete personnelUpdate.emcr.firstChoiceSection;
      }
      if (personnelUpdate.emcr.secondChoiceSection === '') {
        delete personnelUpdate.emcr.secondChoiceSection;
      }
      if (personnelUpdate.emcr.thirdChoiceSection === '') {
        delete personnelUpdate.emcr.thirdChoiceSection;
      }
    }

    if (Object.keys(personnelUpdate).length) {
      handleSave(personnelUpdate, PersonnelEndpoint.Preferences);
    }
    handleClose();
  };

  const [openRoles, setOpenRoles] = useState(false);
  const showRoles = () => {
    setOpenRoles(!openRoles);
  };

  return (
    <>
      <div className="pb-6">
        <div className="pt-6 px-12">
          <div className="flex flex-row items-center justify-start space-x-2">
            <QuestionIcon />
            <button
              onClick={showRoles}
              className="text-info cursor-pointer underline"
            >
              See Section Definitions
            </button>
          </div>
        </div>

        {emcr && (
          <div className="pt-6 px-12">
            <h2 className="text-xl font-bold text-gray-900">EMCR</h2>
          </div>
        )}
        {emcr && (
          <MemberProfileEditFunctions
            allFunctions={emcr.allFunctions}
            originalExperiences={emcr.originalExperiences}
            sectionChoices={emcr.sectionChoices}
            handleChange={setFunctionsToSave}
          />
        )}
        {bcws && emcr && (
          <div className="pt-6 px-12 border-t-2 mt-6 border-defaultGray"></div>
        )}
        {bcws && (
          <div className="pt-6 px-12">
            <h2 className="text-xl font-bold text-gray-900">BCWS</h2>
          </div>
        )}

        {bcws && (
          <MemberProfileEditRoles
            allRoles={bcws.allRoles}
            originalRoles={bcws.originalRoles}
            sectionChoices={bcws.sectionChoices}
            handleChange={setRolesToSave}
          />
        )}
        <div className="flex flex-row content-end pt-6 px-6 border-t-4 justify-end gap-2">
          <Button
            variant={ButtonTypes.PRIMARY}
            type="button"
            onClick={handleClose}
            text="Cancel"
          />
          <Button variant={ButtonTypes.TERTIARY} text="Save" onClick={onSave} />
        </div>
      </div>

      <DialogUI
        open={openRoles}
        onClose={showRoles}
        handleOpen={showRoles}
        title={
          bcws && !emcr
            ? 'BCWS Role Definitions'
            : emcr && !bcws
              ? 'EMCR Section'
              : 'EMCR Section, BCWS Role Definitions'
        }
        style="w-full max-w-3xl h-full"
      >
        <div>
          <RolesAndFunctionsDescriptionsTabs
            bcws={bcws !== undefined}
            emcr={emcr !== undefined}
          />
        </div>
      </DialogUI>
    </>
  );
};
