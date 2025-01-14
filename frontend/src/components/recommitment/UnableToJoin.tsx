import { Program } from '@/common';
import { useState } from 'react';

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
  { id: 'leave', text: 'Extended leave' },
  { id: 'other', text: 'Other reasons' },
];

interface UnableToJoinProps {
  program: string;
  onUpdate: (data: { selectedReasons: string[]; otherReason: string }) => void;
}

export const UnableToJoin = ({ program, onUpdate }: UnableToJoinProps) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState('');

  const handleCheckboxChange = (reasonId: string) => {
    setSelectedReasons((prev) => {
      const newReasons = prev.includes(reasonId)
        ? prev.filter((id) => id !== reasonId)
        : [...prev, reasonId];

      // If unchecking 'other', clear the textarea
      if (reasonId === 'other' && prev.includes(reasonId)) {
        setOtherReason('');
        onUpdate({ selectedReasons: newReasons, otherReason: '' });
      } else {
        onUpdate({ selectedReasons: newReasons, otherReason });
      }

      return newReasons;
    });
  };

  const handleOtherReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newOtherReason = e.target.value;
    setOtherReason(newOtherReason);
    onUpdate({ selectedReasons, otherReason: newOtherReason });
  };

  return (
    <div className="px-8 min-h-[500px]">
      <h6 className="text-sm font-semibold mb-4">
        I am unable to join
        {program !== Program.ALL ? ` ${program.toUpperCase()} ` : ' '}this year
        because:
      </h6>

      <div className="space-y-4">
        {REASONS.map((reason) => (
          <div key={reason.id}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id={reason.id}
                checked={selectedReasons.includes(reason.id)}
                onChange={() => handleCheckboxChange(reason.id)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={reason.id}
                className="ml-3 text-sm font-medium text-gray-700"
              >
                {reason.text}
              </label>
            </div>

            {reason.id === 'other' && selectedReasons.includes('other') && (
              <div className="mt-2 ml-7">
                <textarea
                  id="otherReason"
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  placeholder="Please specify..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
