import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../filters/classes';
import { Filters } from '@/common';

export const Search = ({
  searchParams,
  setSearchParams,
  field,
}: {
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
  field: FieldInterface;
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      searchParams.delete(Filters.NAME);
      setSearchParams({ ...Object.fromEntries(searchParams) });
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), name: e.target.value });
    }
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
            value={searchParams.get(Filters.NAME) ?? ''}
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
