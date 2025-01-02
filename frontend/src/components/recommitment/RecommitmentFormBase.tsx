import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import type { MemberProfile } from '@/common';
import { ButtonTypes, Program } from '@/common';
import { useEffect, useState } from 'react';
import { Button } from '../ui';
import {
  Assertions,
  InitialRecommitmentDropdown,
  SupervisorForm,
  UnableToJoin,
} from './';
import { ParQBase } from './parq';
import { QUESTIONS as PARQ_FOLLOWUP_QUESTIONS } from './parq/ParQFollowUp';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

interface RecommitmentFormProps {
  program: Program.BCWS | Program.EMCR | Program.ALL;
  personnel: MemberProfile;
  onCancel: () => void;
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
  onCancel,
}: RecommitmentFormProps) => {
  const [numSteps, setNumSteps] = useState(3);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentParQStep, setCurrentParQStep] = useState(0);
  const [recommitmentAnswer, setRecommitmentAnswer] = useState<string>();
  const [supervisorInformation, setSupervisorInformation] = useState<any>({
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
  const [unableToJoinReasons, setUnableToJoinReasons] = useState<{
    selectedReasons: string[];
    otherReason: string;
  }>({
    selectedReasons: [],
    otherReason: '',
  });
  const [assertionsChecked, setAssertionsChecked] = useState<boolean>(false);

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
            program={Program.ALL}
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

  useEffect(() => {
    setNumSteps(getSteps().length);
  }, [recommitmentAnswer]);

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

    // For InitialRecommitmentDropdown, require a selection
    if (currentComponentType === InitialRecommitmentDropdown) {
      return recommitmentAnswer !== undefined;
    }

    // For UnableToJoin, require at least one reason selected and other reason text if 'other' is selected
    if (currentComponentType === UnableToJoin) {
      const hasSelectedReasons = unableToJoinReasons.selectedReasons.length > 0;
      const needsOtherReason = unableToJoinReasons.selectedReasons.includes('other');

      if (!hasSelectedReasons) {
        return false;
      }

      if (needsOtherReason && !unableToJoinReasons.otherReason.trim()) {
        return false;
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
      }
    }

    // For SupervisorForm, require first name, last name, and email
    if (currentComponentType === SupervisorForm) {
      const { firstName, lastName, email } = supervisorInformation;
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      return Boolean(
        firstName.trim() && lastName.trim() && email.trim() && isValidEmail,
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
    return currentComponentType === Assertions ? 'Submit Decision' : 'Next';
  };

  return (
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

      <div className="flex flex-row space-x-6 pt-4 justify-end px-8 border-t-2 border-defaultGray">
        <Button
          variant={ButtonTypes.PRIMARY}
          type="button"
          onClick={onCancel}
          text="Cancel"
        />
        <Button
          variant={ButtonTypes.TERTIARY}
          text={getButtonText()}
          type="button"
          onClick={handleNext}
          disabled={!nextClickable()}
        />
      </div>
    </div>
  );
};
