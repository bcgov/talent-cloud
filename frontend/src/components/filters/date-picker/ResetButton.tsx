import type { DateRange } from 'react-day-picker';

interface ResetProps {
  reset?: () => void;
}

export const ResetButton = ({
  reset}: ResetProps) => (
  <button
    className="text-sm  pl-2 text-left py-4 underline  text-info"
    onClick={reset}
  >
    Reset
  </button>
);
