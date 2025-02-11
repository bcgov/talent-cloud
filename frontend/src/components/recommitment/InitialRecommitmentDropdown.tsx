import { SingleSelect } from '../filters/SingleSelect';
import { Program } from '@/common';

export const InitialRecommitmentDropdown = ({
  handleChange,
  initialValue,
  program,
}: {
  handleChange: (v: string | undefined) => void;
  initialValue?: string;
  program?: Program;
}) => {
  const getText = () => {
    if (program === Program.ALL) {
      return 'Do you want to return to both EMCR and BCWS CORE Team as a member for the upcoming 2025 year?';
    } else if (program === Program.BCWS) {
      return 'Do you want to return to the BCWS CORE Team as a member for the upcoming 2025 year?';
    } else {
      return 'Do you want to return to the EMCR CORE Team as a member for the upcoming 2025 year?';
    }
  };

  const getWarningText = () => {
    if (initialValue === 'no') {
      if (program === Program.ALL) {
        return 'You must provide a reason for declining recommitment to each program in the next step.';
      } else {
        return `You must provide a reason for declining recommitment to the ${program?.toUpperCase()} program in the next step.`;
      }
    } else {
      return `You must provide a reason for declining recommitment to the ${initialValue === 'bcws-only' ? 'EMCR' : 'BCWS'} program in the next step.`;
    }
  };

  const EMCR_ONLY_OPTIONS = [
    { value: 'yes-emcr', label: 'Yes' },
    { value: 'no', label: `No, I am not returning this year` },
  ];

  const BCWS_ONLY_OPTIONS = [
    { value: 'yes-bcws', label: 'Yes' },
    { value: 'no', label: `No, I am not returning this year` },
  ];

  const ALL_OPTIONS = [
    { value: 'yes-both', label: 'Yes' },
    { value: 'emcr-only', label: 'Yes, to EMCR only' },
    { value: 'bcws-only', label: 'Yes, to BCWS only' },
    { value: 'no', label: `No, I am not returning to either this year` },
  ];

  const getOptions = () => {
    switch (program) {
      case Program.ALL:
        return ALL_OPTIONS;
      case Program.EMCR:
        return EMCR_ONLY_OPTIONS;
      case Program.BCWS:
        return BCWS_ONLY_OPTIONS;
      default:
        return [];
    }
  };

  return (
    <div className="px-6 flex-grow">
      <p className="text-sm font-bold pb-1 pl-1">
        {getText()} <span className="text-red-300">*</span>
      </p>
      <div className="flex-grow">
        <SingleSelect
          field={{ name: 'singleSelect', options: getOptions() }}
          handleChange={handleChange}
          openColor="skyline"
          placeholder={'Select an option'}
          value={initialValue}
        />
      </div>

      {initialValue &&
        !['yes-emcr', 'yes-bcws', 'yes-both'].includes(initialValue) && (
          <p className="text-xs text-gray-600 pb-1 pt-4 pl-1">{getWarningText()}</p>
        )}
    </div>
  );
};
