import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { menuItemClass } from '../filters/classes';

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
        <div className="absolute w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-[#828282] absolute inset-y-5 right-4" />
          <input
            value={value}
            className={menuItemClass[field.name]}
            name={field.name}
            type="text"
            placeholder={'Search for a member by name'}
            onChange={handleSearchInput}
          />
        </div>
      </label>
    </div>
  );
};
