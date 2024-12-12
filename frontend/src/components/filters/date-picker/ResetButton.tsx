import type { DateRange } from 'react-day-picker';

interface ResetProps {
  onChange: (range: DateRange | undefined) => void;
  goToMonth: (date: Date) => void;
  reset?: () => void;
}
export const ResetButton = (props: ResetProps) => (
  <button
    aria-label="reset date filter"
    className="text-sm  pl-2 text-left py-4 underline  text-blue-800"
    onClick={() => {
      props.reset && props.reset();
      props.onChange({ from: undefined, to: undefined });
      props.goToMonth(new Date());
    }}
  >
    Reset
  </button>
);
