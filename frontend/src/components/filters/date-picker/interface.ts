import type { CaptionProps, DateRange } from 'react-day-picker';

export interface CustomCaptionProps extends CaptionProps {
  hideResetButton?: boolean;
  onChange: (range: DateRange | undefined) => void;
}

export interface SelectorProps {
  displayMonth: Date;
  goToMonth: (date: Date) => void;
}
