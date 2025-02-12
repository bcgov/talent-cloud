import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../filters/classes';
import { debounce } from 'lodash';
import { Filters } from '@/common';

export const Search = ({
  searchParams,
  setSearchParams,
  field,
  handleChangeSearch,
  searchInputValue,
}: {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
  field: FieldInterface;
  handleChangeSearch: (value: string) => void;
  searchInputValue: string;
}) => {
  const sendRequest = (value: string) => {
    if (value === '') {
      searchParams.delete(Filters.NAME);
      setSearchParams({ ...Object.fromEntries(searchParams) });
    } else {
      searchParams.set(Filters.NAME, value);
      setSearchParams({ ...Object.fromEntries(searchParams) });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearch(e.target.value);
    debounce(sendRequest, 500)(e.target.value);
  };
  return (
    <div className="relative w-full">
      <label>
        Search by Name
        <div className="absolute w-full text-defaultGray placeholder:text-defaultGray">
          <MagnifyingGlassIcon className="h-6 w-6 text-defaultGray absolute inset-y-4 right-4" />
          <input
            id={field.name}
            autoComplete="name"
            value={searchInputValue}
            type="text"
            className={classes.menu.container}
            name={field.name}
            placeholder={'Search for a member by name'}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
};
