import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/solid';
import type { MemberProfile } from '@/common';
import { ButtonTypes, Program } from '@/common';
import { useEffect, useState } from 'react';
import { Button } from '../ui';
import type { SupervisorInformation } from './';
import {
  Assertions,
  InitialRecommitmentDropdown,
  reasonDefinitions,
  SupervisorForm,
  UnableToJoin,
} from './';
import { ParQBase } from './parq';
import { QUESTIONS as PARQ_FOLLOWUP_QUESTIONS } from './parq/ParQFollowUp';
import { fillInAndDownloadParQ } from '@/utils';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';
import { Transition } from '@headlessui/react';
import { Banner } from '../ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

interface RecommitmentFormProps {
  program?: Program;
  personnel: MemberProfile;
  onClose: () => void;
}

const StepIndicator = ({ currentStep, totalSteps = 3 }: StepIndicatorProps) => {
  return (
    <div className="w-full px-8 pt-2 py-12">
      {/* Step counter */}
      <div className="flex justify-end mb-4">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Step indicator bars */}
      <div className="flex gap-2">
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              index > currentStep
                ? 'bg-defaultGray' // completed step
                : 'bg-primaryBlue'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const RecommitmentFormBase = ({
  program,
  personnel,
  onClose,
}: RecommitmentFormProps) => {
  const { updateRecommitment } = useRecommitmentCycle();
  const [numSteps, setNumSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentParQStep, setCurrentParQStep] = useState(0);
  const [recommitmentAnswer, setRecommitmentAnswer] = useState<string>();
  const [supervisorInformation, setSupervisorInformation] =
    useState<SupervisorInformation>({
      firstName: personnel.supervisorFirstName,
      lastName: personnel.supervisorLastName,
      email: personnel.supervisorEmail,
      phone: personnel.supervisorPhone,
    });
  const [parqGeneralAnswers, setParqGeneralAnswers] = useState<
    Record<string, boolean | null>
  >({});
  const [parqFollowUpAnswers, setParqFollowUpAnswers] = useState<
    Record<string, boolean | null>
  >({});
  const [parqDeclaration, setParqDeclaration] = useState<{
    fullName: string;
    dateSigned: string;
    witnessName: string;
  }>({
    fullName: '',
    dateSigned: '',
    witnessName: '',
  });
  const [parQDownloaded, setParQDownloaded] = useState(false);

  const [unableToJoinReasons, setUnableToJoinReasons] = useState<{
    [key in Program]?: { selectedReasons: string[]; otherReason: string };
  }>({});
  const [assertionsChecked, setAssertionsChecked] = useState<boolean>(false);

  const isDeclarationComplete = (): boolean => {
    const { fullName, dateSigned, witnessName } = parqDeclaration;
    return Boolean(
      fullName?.trim() &&
        !isNaN(new Date(dateSigned?.trim()).getTime()) &&
        witnessName?.trim(),
    );
  };

  const getSteps = () => {
    switch (recommitmentAnswer) {
      case 'yes-both':
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <ParQBase
            currentPage={currentParQStep}
            onGeneralAnswersChange={setParqGeneralAnswers}
            onFollowUpAnswersChange={setParqFollowUpAnswers}
            onDeclarationChange={setParqDeclaration}
            key="parq"
          />,
          <SupervisorForm
            initialData={supervisorInformation}
            onUpdate={setSupervisorInformation}
            key="supervisor"
          />,
          <Assertions
            program={Program.ALL}
            onUpdate={setAssertionsChecked}
            key="assertions"
          />,
        ];
      case 'emcr-only': // Rejecting BCWS as BOTH
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <UnableToJoin
            program={Program.BCWS}
            onUpdate={setUnableToJoinReasons}
            key="unable"
          />,
          <SupervisorForm
            initialData={supervisorInformation}
            onUpdate={setSupervisorInformation}
            key="supervisor"
          />,
          <Assertions
            program={Program.EMCR}
            onUpdate={setAssertionsChecked}
            key="assertions"
          />,
        ];
      case 'bcws-only': // Rejecting EMCR as BOTH
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <UnableToJoin
            program={Program.EMCR}
            onUpdate={setUnableToJoinReasons}
            key="unable"
          />,
          <ParQBase
            currentPage={currentParQStep}
            onGeneralAnswersChange={setParqGeneralAnswers}
            onFollowUpAnswersChange={setParqFollowUpAnswers}
            onDeclarationChange={setParqDeclaration}
            key="parq"
          />,
          <SupervisorForm
            initialData={supervisorInformation}
            onUpdate={setSupervisorInformation}
            key="supervisor"
          />,
          <Assertions
            program={Program.BCWS}
            onUpdate={setAssertionsChecked}
            key="assertions"
          />,
        ];
      case 'yes-emcr': // No programs rejected
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <SupervisorForm
            initialData={supervisorInformation}
            onUpdate={setSupervisorInformation}
            key="supervisor"
          />,
          <Assertions
            program={Program.EMCR}
            onUpdate={setAssertionsChecked}
            key="assertions"
          />,
        ];
      case 'yes-bcws': // No programs rejected
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <ParQBase
            currentPage={currentParQStep}
            onGeneralAnswersChange={setParqGeneralAnswers}
            onFollowUpAnswersChange={setParqFollowUpAnswers}
            onDeclarationChange={setParqDeclaration}
            key="parq"
          />,
          <SupervisorForm
            initialData={supervisorInformation}
            onUpdate={setSupervisorInformation}
            key="supervisor"
          />,
          <Assertions
            program={Program.BCWS}
            onUpdate={setAssertionsChecked}
            key="assertions"
          />,
        ];
      case 'no':
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
          <UnableToJoin
            program={program ?? Program.ALL}
            onUpdate={setUnableToJoinReasons}
            key="unable"
          />,
        ];
      default:
        return [
          <InitialRecommitmentDropdown
            program={program}
            initialValue={recommitmentAnswer}
            handleChange={setRecommitmentAnswer}
            key="initial"
          />,
        ];
    }
  };

  const steps = getSteps();
  const currentComponent = steps[currentStep];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    setNumSteps(getSteps().length);
  }, [recommitmentAnswer]);

  const handleSubmitRecommitment = async () => {
    const currentYear = new Date().getFullYear();

    const getReasons = (program: Program) => {
      const selectedReasons = (unableToJoinReasons[program]?.selectedReasons || [])
        .map((r) => reasonDefinitions[r as keyof typeof reasonDefinitions])
        .filter((r) => !!r);
      if (unableToJoinReasons[program]?.otherReason) {
        return [...selectedReasons, unableToJoinReasons[program]?.otherReason].join(
          '; ',
        );
      }
      return selectedReasons.join('; ');
    };

    const createDecision = (
      status: RecommitmentStatus,
      programType: Program,
      includeReason = false,
    ) => ({
      status,
      year: currentYear,
      program: programType,
      ...(includeReason && { memberReason: getReasons(programType) }),
    });

    const decisionMap = {
      'yes-both': {
        bcws: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.BCWS),
        emcr: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.EMCR),
      },
      'emcr-only': {
        bcws: createDecision(RecommitmentStatus.MEMBER_DENIED, Program.BCWS, true),
        emcr: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.EMCR),
      },
      'bcws-only': {
        bcws: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.BCWS),
        emcr: createDecision(RecommitmentStatus.MEMBER_DENIED, Program.EMCR, true),
      },
      'yes-bcws': {
        bcws: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.BCWS),
      },
      'yes-emcr': {
        emcr: createDecision(RecommitmentStatus.MEMBER_COMMITTED, Program.EMCR),
      },
      no: {
        ...(program !== Program.EMCR && {
          bcws: createDecision(RecommitmentStatus.MEMBER_DENIED, Program.BCWS, true),
        }),
        ...(program !== Program.BCWS && {
          emcr: createDecision(RecommitmentStatus.MEMBER_DENIED, Program.EMCR, true),
        }),
      },
    };

    const decision =
      decisionMap[recommitmentAnswer as keyof typeof decisionMap] || {};
    const res = await updateRecommitment(personnel.id, {
      ...decision,
      ...(recommitmentAnswer !== 'no' && { supervisorInformation }),
    });
    if (res.error) {
      setErrorMessage(res.error.message);
    } else {
      onClose();
    }
  };
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleNext = () => {
    const currentComponentType = currentComponent.type;

    // Check if current component is ParQBase
    if (currentComponentType === ParQBase) {
      if (currentParQStep < 3) {
        if (
          currentParQStep === 1 &&
          !Object.values(parqGeneralAnswers).includes(true)
        ) {
          setCurrentParQStep(currentParQStep + 2);
        } else {
          setCurrentParQStep(currentParQStep + 1);
        }
        return;
      }
    }

    if (
      currentComponentType === Assertions ||
      (currentComponentType === UnableToJoin && recommitmentAnswer === 'no')
    ) {
      setButtonLoading(true);
      handleSubmitRecommitment();
    }

    // If not ParQ or ParQ is complete, move to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      // Reset ParQ step when moving to a different component
      setCurrentParQStep(0);
    }
  };

  const handleBack = () => {
    const currentComponentType = currentComponent.type;

    // Check if current component is ParQBase
    if (currentComponentType === ParQBase && currentParQStep > 0) {
      // If we're on ParQ step 3 and there were no "yes" answers in general questions
      // skip step 2 (follow-up) and go back to step 1 (general)
      if (
        currentParQStep === 3 &&
        !Object.values(parqGeneralAnswers).includes(true)
      ) {
        setCurrentParQStep(1);
      } else {
        setCurrentParQStep(currentParQStep - 1);
      }
      return;
    }

    // If not ParQ or ParQ is at first step, move to previous component
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      // Reset ParQ step when moving to a different component
      setCurrentParQStep(0);
    }
  };

  const nextClickable = (): boolean => {
    const currentComponentType = currentComponent.type;

    if (currentComponentType === InitialRecommitmentDropdown) {
      return recommitmentAnswer !== undefined;
    }

    if (currentComponentType === UnableToJoin) {
      const programs = Object.keys(unableToJoinReasons);
      if (programs.length === 0) {
        return false;
      }
      for (const program of programs) {
        if (
          (unableToJoinReasons[program as Program]?.selectedReasons || []).length ===
          0
        ) {
          return false;
        }
        if (
          (unableToJoinReasons[program as Program]?.selectedReasons || []).includes(
            'other',
          ) &&
          !unableToJoinReasons[program as Program]?.otherReason?.trim()
        ) {
          return false;
        }
      }
      return true;
    }

    if (currentComponentType === ParQBase) {
      // For ParQ General, ensure all 7 questions have been answered
      if (currentParQStep === 1) {
        return (
          Object.values(parqGeneralAnswers).length === 7 &&
          !Object.values(parqGeneralAnswers).includes(null)
        );
      } else if (currentParQStep === 2) {
        // For ParQ Follow-up, check if all visible questions are answered
        const requiredAnswers = new Set<string>();

        // Add all main questions
        PARQ_FOLLOWUP_QUESTIONS.forEach((q) => {
          requiredAnswers.add(q.id);

          // If main question is answered Yes, add its follow-up questions
          if (parqFollowUpAnswers[q.id] === true && q.followUps) {
            q.followUps.forEach((f) => requiredAnswers.add(f.id));
          }
        });

        // Check if all required questions have non-null answers
        return Array.from(requiredAnswers).every(
          (id) =>
            parqFollowUpAnswers[id] !== null &&
            parqFollowUpAnswers[id] !== undefined,
        );
      } else if (currentParQStep === 3) {
        return isDeclarationComplete() && parQDownloaded;
      }
    }

    // For SupervisorForm, require first name, last name, and email
    if (currentComponentType === SupervisorForm) {
      const { firstName, lastName, email, phone } = supervisorInformation;
      const isValidEmail = /^[^\s@]+@gov.bc.ca+$/.test(email);
      const isValidPhone = phone && phone !== '' ?  /(\d{3})(\d{3})(\d{4})/.test(phone) : true
      return Boolean(
        firstName?.trim() && lastName?.trim() && email?.trim() && isValidEmail && isValidPhone,
      );
    }

    if (currentComponentType === Assertions) {
      // Check if all assertions are checked
      return assertionsChecked;
    }

    return true;
  };

  const getButtonText = () => {
    const currentComponentType = currentComponent.type;
    if (
      currentComponentType === Assertions ||
      (currentComponentType === UnableToJoin && recommitmentAnswer === 'no')
    ) {
      return 'Submit Decision';
    }
    if (currentComponentType === ParQBase && currentParQStep === 3) {
      return 'Complete and Proceed';
    }
    return 'Next';
  };

  const downloadParQ = () => {
    fillInAndDownloadParQ({
      general: parqGeneralAnswers,
      followUps: parqFollowUpAnswers,
      fullName: parqDeclaration.fullName,
      dateSigned: parqDeclaration.dateSigned,
      witnessName: parqDeclaration.witnessName,
    });
    setParQDownloaded(true);
  };

  return (
    <>
      <div className="w-full py-8 min-h-[500px] flex flex-col">
        <StepIndicator currentStep={currentStep} totalSteps={numSteps} />
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-blue-800 hover:text-defaultGray underline px-8 mb-4"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Previous
          </button>
        )}

        {currentComponent}
        <Transition
        show={errorMessage !== null}
        appear={true}
        enter="ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div>
          {errorMessage && (
            <Banner
              title={'Error'}
              content={errorMessage}
              type={BannerType.ERROR}
              onClose={() => {
                setErrorMessage(null);
                onClose();
              }}
            />
          )}
        </div>
      </Transition>

        <div className="flex flex-row space-x-6 pt-4 justify-end px-8 border-t-2 border-defaultGray">
          <Button
            variant={ButtonTypes.PRIMARY}
            type="button"
            onClick={onClose}
            text="Cancel"
          />

          {currentComponent.type === ParQBase && currentParQStep === 3 && (
            <Button
              variant={ButtonTypes.PRIMARY}
              type="button"
              onClick={downloadParQ}
              text="Download Response"
              disabled={!isDeclarationComplete()}
              textIcon={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
            />
          )}
          <Button
            variant={ButtonTypes.TERTIARY}
            loading={buttonLoading}
            text={getButtonText()}
            type="button"
            onClick={handleNext}
            disabled={!nextClickable()}
          />
        </div>
      </div>
      
    </>
  );
};
