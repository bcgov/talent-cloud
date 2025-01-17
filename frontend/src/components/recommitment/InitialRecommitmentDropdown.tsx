import { Select, Option } from '@material-tailwind/react';
import { Program } from '@/common';

export const InitialRecommitmentDropdown = ({
  initialValue,
  program,
  handleChange,
}: {
  initialValue?: string;
  program: Program;
  handleChange: (v: string | undefined) => void;
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
      <p className="text-sm font-bold pb-1 pl-1">{getText()}</p>
      <Select value={initialValue} onChange={handleChange} label="Select an option">
        {getOptions().map((o) => (
          <Option value={o.value} key={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
      {initialValue && !['yes-emcr', 'yes-bcws', 'yes-both'].includes(initialValue) && 
        <p className="text-xs text-gray-600 pb-1 pt-4 pl-1">You must provide a reason for declining recommitment to each program in the next step.</p>
      }
    </div>
  );
};
