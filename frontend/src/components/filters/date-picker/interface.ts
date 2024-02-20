import type { CaptionProps, DateRange } from 'react-day-picker';

export interface CustomCaptionProps extends CaptionProps {
  onChange: (range: DateRange | undefined) => void;
}

export interface SelectorProps {
  displayMonth: Date;
  goToMonth: (date: Date) => void;
}
