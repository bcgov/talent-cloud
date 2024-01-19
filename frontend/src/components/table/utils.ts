import type { DashboardFilters } from '@/pages/dashboard';
import type { PageParams } from './interface';

export const booleanToString = (value: boolean): string => (value ? 'Yes' : 'No');
export const handleSearchParams = (
  searchParamsUrl: URLSearchParams,
  pageParams: PageParams,
  filterValues: DashboardFilters,
) => {
  searchParamsUrl.set('page', pageParams?.currentPage.toString() ?? '1');
  searchParamsUrl.set('rows', pageParams?.rowsPerPage.toString() ?? '25');

  if (pageParams?.showInactive === true) {
    searchParamsUrl.delete('active');
  } else {
    searchParamsUrl.set('active', 'true');
  }
  if (filterValues?.name) {
    searchParamsUrl.set('name', filterValues?.name);
  } else {
    searchParamsUrl.delete('name');
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
