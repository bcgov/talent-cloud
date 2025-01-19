import { Program } from '@/common';
import { useEffect, useState } from 'react';

interface Reason {
  id: string;
  text: string;
}
export interface SupervisorInformation {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const reasonDefinitions = {
  commitments: 'Work commitments from base position',
  leave: 'Extended leave',
};

const REASONS: Reason[] = [
  { id: 'commitments', text: 'Work commitments from base position' },
  { id: 'leave', text: 'Extended leave (e.g. Annual, Sickness, Maternity, etc.)' },
  { id: 'other', text: 'Other reasons' },
];
interface UnableToJoinProps {
  program: string;
  onUpdate: (data: {
    [key in Program]?: { selectedReasons: string[]; otherReason: string };
  }) => void;
}

export const UnableToJoin = ({ program, onUpdate }: UnableToJoinProps) => {
  const programs = program === Program.ALL ? [Program.BCWS, Program.EMCR] : [program];
  const [reasons, setReasons] = useState<{
    [key in Program]?: {
      selectedReasons: string[];
      otherReason: string;
    }
  }>({});

  useEffect(() => {
    onUpdate(reasons);
  }, [reasons]);

  const handleCheckboxChange = (program: Program, reasonId: string) => {
    setReasons((prev) => {
      const programPreviousReasons = prev[program]?.selectedReasons || [];
      const newReasons = programPreviousReasons.includes(reasonId)
        ? programPreviousReasons.filter((id) => id !== reasonId)
        : [...programPreviousReasons, reasonId];

      const otherReason = reasonId === 'other' && programPreviousReasons.includes(reasonId) ?
        '' :
        prev[program]?.otherReason || '';

      return {
        ...prev,
        [program]: {
          selectedReasons: newReasons,
          otherReason,
        },
      };
    });
  };

  const handleOtherReasonChange = (program: Program, newOtherReason: string) => {
    setReasons((prev) => {
      const programPreviousReasons = prev[program]?.selectedReasons || [];
      return {
        ...prev,
        [program]: {
          ...prev[program],
          otherReason: newOtherReason,
        },
      }
    });
  };

  return (
    <div className="px-8 min-h-[500px]">
      {programs.map(program => (
        <div className="py-2">
          <h6 className="text-sm font-semibold mb-4">
            I am unable to join {program.toUpperCase()} because:
          </h6>

          <div className="space-y-4">
            {REASONS.map((reason) => (
              <div key={`${program}-${reason.id}`}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${program}-${reason.id}`}
                    checked={(reasons[program as Program]?.selectedReasons || []).includes(reason.id)}
                    onChange={() => handleCheckboxChange(program as Program, reason.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`${program}-${reason.id}`}
                    className="ml-3 text-sm font-medium text-gray-700"
                  >
                    {reason.text}
                  </label>
                </div>

                {reason.id === 'other' && (reasons[program as Program]?.selectedReasons || []).includes('other') && (
                  <div className="mt-6 ml-7">
                    <p className="text-sm font-semibold pb-2">Please provide details for &quot;Other reasons&quot;.<span className="text-red-900">*</span></p>
                    <textarea
                      id={`${program}-otherReason`}
                      value={reasons[program as Program]?.otherReason || ''}
                      onChange={(e) => handleOtherReasonChange(program as Program, e.target.value)}
                      placeholder="Add a comment"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
