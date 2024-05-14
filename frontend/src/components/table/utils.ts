import type { DashboardFilters } from '@/pages/dashboard';
import { format } from 'date-fns';

export const booleanToString = (value: boolean): string => (value ? 'Yes' : 'No');
export const handleSearchParams = (
  searchParamsUrl: URLSearchParams,
  filterValues: DashboardFilters,
) => {
  searchParamsUrl.set('page', filterValues?.currentPage.toString() ?? '1');
  searchParamsUrl.set('rows', filterValues?.rowsPerPage.toString() ?? '25');
  if (filterValues?.availabilityDates.from) {
    searchParamsUrl.set(
      'availabilityFromDate',
      format(filterValues?.availabilityDates?.from ?? new Date(), 'yyyy-MM-dd'),
    );
  }
  if (filterValues?.availabilityDates.to) {
    searchParamsUrl.set(
      'availabilityToDate',
      format(filterValues?.availabilityDates?.to ?? new Date(), 'yyyy-MM-dd'),
    );
  }
  if (!filterValues?.availabilityDates.from) {
    searchParamsUrl.delete('availabilityFromDate');
  }
  if (!filterValues?.availabilityDates.to) {
    searchParamsUrl.delete('availabilityToDate');
  }
  if (filterValues?.name) {
    searchParamsUrl.set('name', filterValues?.name);
  } else {
    searchParamsUrl.delete('name');
  }
  if (filterValues?.availabilityType) {
    searchParamsUrl.set('availabilityType', filterValues.availabilityType);
  } else {
    searchParamsUrl.delete('availabilityType');
  }
  if (filterValues?.region?.length) {
    searchParamsUrl.set('region', filterValues?.region?.join(', '));
  } else {
    searchParamsUrl.delete('region');
  }

  if (filterValues.fireCentre?.length) {
    searchParamsUrl.set('fireCentre', filterValues.fireCentre.join(', '));
  } else {
    searchParamsUrl.delete('fireCentre');
  }

  if (filterValues?.location?.length) {
    searchParamsUrl.set('location', filterValues?.location?.join(', '));
  } else {
    searchParamsUrl.delete('location');
  }

  if (filterValues?.function) {
    searchParamsUrl.set('function', filterValues.function);
  } else {
    searchParamsUrl.delete('function');
  }
  if (filterValues?.experience) {
    searchParamsUrl.set('experience', filterValues.experience);
  } else {
    searchParamsUrl.delete('experience');
  }
  if (filterValues.role) {
    searchParamsUrl.set('role', filterValues.role);
  }

  if (filterValues?.status) {
    searchParamsUrl.set('status', filterValues.status);
  } else {
    searchParamsUrl.delete('status');
  }
};
