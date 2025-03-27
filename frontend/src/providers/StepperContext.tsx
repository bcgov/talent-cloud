import type { ReactElement } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface StepContextType {
  step: number;
  disabledSteps: number[];
  errorSteps?: number[];
  completedSteps?: number[];
  handleSetStep: (step: number) => void;
  handleRemoveStepError: (step: number) => void;
  handleSetErrors: (step: number) => void;
  handleSetCompletedStep: (step: number) => void;
  handleSetDisabledSteps: (step: number[]) => void;
  handleSetCompletedSteps: (step: number[]) => void;
}

export const StepContext = createContext<StepContextType>({
  step: 0,
  disabledSteps: [5],
  handleSetStep: (_step: number) => {},
  handleRemoveStepError: (_step: number) => {},
  handleSetErrors: (_step: number) => {},
  handleSetCompletedStep: (_step: number) => {},
  handleSetDisabledSteps: (_step: number[]) => {},
  handleSetCompletedSteps: (_step: number[]) => {},
});

export const useStepContext = () => {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error('StepContext must be used within a StepProvider');
  return ctx;
};

export const StepProvider = ({ children }: { children: ReactElement }) => {
  const [disabledSteps, setDisabledSteps] = useState([5]);
  const [step, setStep] = useState<number>(0);
  const [errorSteps, setErrorSteps] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleSetDisabledSteps = (step: number[]) => {
    setDisabledSteps(step);
  };

  const handleSetStep = (step: number) => {
    setStep(step);
  };

  const handleSetCompletedStep = (step: number) => {
    if (completedSteps && completedSteps.length > 0) {
      if (!completedSteps.includes(step)) {
        setCompletedSteps([...completedSteps, step]);
      }
    } else {
      setCompletedSteps([step]);
    }
  };

  const handleSetCompletedSteps = (step: number[]) => {
    setCompletedSteps(step);
  };

  const handleSetErrors = (errorStep: number) => {
    if (errorSteps && errorSteps.length > 0) {
      if (!errorSteps.includes(errorStep)) {
        setErrorSteps([...errorSteps, errorStep]);
      }
    } else {
      setErrorSteps([errorStep]);
    }
  };

  const handleRemoveStepError = (errorStep: number) => {
    if (errorSteps && errorSteps.length > 0 && errorSteps.includes(errorStep)) {
      setErrorSteps(errorSteps.filter((step) => step !== errorStep));
    }
  };

  const value = useMemo(() => {
    return {
      step,
      handleSetStep,
      disabledSteps,
      errorSteps,
      completedSteps,
      handleRemoveStepError,
      handleSetErrors,
      handleSetCompletedStep,
      handleSetCompletedSteps,
      handleSetDisabledSteps,
    };
  }, [
    step,
    handleSetStep,
    disabledSteps,
    setCompletedSteps,
    errorSteps,
    completedSteps,
    handleRemoveStepError,
    handleSetErrors,
    handleSetCompletedStep,
    handleSetCompletedSteps,
    handleSetDisabledSteps,
  ]);

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};
