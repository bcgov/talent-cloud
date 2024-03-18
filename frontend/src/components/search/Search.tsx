import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../filters/classes';

export const Search = ({
  field,
  handleSearchInput,
  value,
}: {
  field: FieldInterface;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => {
  return (
    <div className="relative w-full">
      <label>
        Search by Name
        <div className="absolute w-full text-defaultGray placeholder:text-defaultGray">
          <MagnifyingGlassIcon className="h-6 w-6 text-defaultGray absolute inset-y-4 right-4" />
          <input
            autoComplete="name"
            value={value}
            type="text"
            className={classes.menu.container}
            name={field.name}
            placeholder={'Search for a member by name'}
            onChange={handleSearchInput}
          />
        </div>
      </label>
    </div>
  );
};
