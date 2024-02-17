import type { DashboardFilters } from '@/pages/dashboard';


export const booleanToString = (value: boolean): string => (value ? 'Yes' : 'No');
export const handleSearchParams = (
  searchParamsUrl: URLSearchParams,
  filterValues: {[key:string]: unknown},
) => {
  searchParamsUrl.set('page', filterValues?.currentPage.toString() ?? '1');
  searchParamsUrl.set('rows', filterValues?.rowsPerPage.toString() ?? '25');

  if (filterValues?.showInactive === false) {
    searchParamsUrl.delete('showInactive');
  } else {
    searchParamsUrl.set('showInactive', 'true');
  }
  if (filterValues?.name) {
    searchParamsUrl.set('name', filterValues?.name);
  } else {
    searchParamsUrl.delete('name');
  }
  if (filterValues?.availabilityStatus) {
    searchParamsUrl.set('availabilityStatus', filterValues.availabilityStatus);
  } else {
    searchParamsUrl.delete('availabilityStatus');
  }
  if (filterValues?.region?.length) {
    searchParamsUrl.set('region', filterValues?.region?.join(', '));
  } else {
    searchParamsUrl.delete('region');
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
};
