// common
import { StatusLabels, StatusNames } from '@/common';
import {
  RecommitmentStatus,
  RecommitmentStatusFilterLabel,
} from '@/common/enums/recommitment-status';

/**
 * offsetTimezoneDate
 * We tend to deal with dates as strings, but since the database stores them as dates as UTC, this helper function
 * helps us offset those dates to match (loosely) timezones. This keeps dates consistent.
 * This isn't exact science, and could be improved further
 * @param dateString
 * @returns
 */
export const offsetTimezoneDate = (dateString: string): Date => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  const newDate = new Date(date.getTime() + offset);
  return newDate;
};

export const datePST = (date: Date, short?: boolean): string => {
  if (short)
    return new Date(date).toLocaleString('PST', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  return new Date(date).toLocaleString('PST', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export const formatPhone = (value?: string): string | undefined => {
  if (value?.split('').length)
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  else return undefined;
};

export const getLabelFromValue = (
  options: [{ value: string; label: string }],
  value: string,
) => {
  for (const option of options) {
    if (option.value === value) {
      return option.label;
    }
  }
  return '';
};

export const getKeyByValue = (value: string, e: Object) => {
  const indexOf = Object.values(e).indexOf(value);

  return Object.keys(e)[indexOf];
};

export const getStatusLabel = (name: string) => {
  return StatusLabels[getKeyByValue(name, StatusNames)];
};

export const getRecommitmentStatusFilterLabel = (labelKey: string) => {
  for (const entry of Object.entries(RecommitmentStatusFilterLabel)) {
    const key = entry[0];
    const value = entry[1];
    if (labelKey === key) {
      return value;
    }
  }
  return labelKey;
};

export const getRecommitmentStatus = (name: string) => {
  const labelKey = getKeyByValue(name, RecommitmentStatusFilterLabel);

  for (const entry of Object.entries(RecommitmentStatus)) {
    const key = entry[0];
    const value = entry[1];
    if (labelKey === key) {
      return value;
    }
  }

  return labelKey;
};
