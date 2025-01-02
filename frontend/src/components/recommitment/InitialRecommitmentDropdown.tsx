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
  return (
    <div className="px-6 flex-grow">
      <p className="text-sm font-bold pb-1 pl-1">
        Do you want to return to both EMCR and BCWS CORE Team as a member for the
        upcoming 2025 year?
      </p>
      <Select value={initialValue} onChange={handleChange} label="Select an option">
        <Option value="yes">Yes</Option>
        {program === Program.ALL && <Option value="emcr">Yes, to EMCR only</Option>}
        {program === Program.ALL && <Option value="bcws">Yes, to BCWS only</Option>}
        <Option value="no">No, I am not returning to either this year</Option>
      </Select>
    </div>
  );
};
