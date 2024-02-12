import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { menuItemClass } from '../filters/classes';

export const Search = ({
  field,
  handleSearchInput,
  value,
}: {
  field: FieldInterface;
  value: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative w-full">
      <label>
        Search by Name
        <div className="absolute w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 absolute inset-y-5 right-4" />
          <input
            color="#828282"
            className={menuItemClass[field.name]}
            name={field.name}
            value={value}
            type="text"
            placeholder={'Search for a member by name'}
            onChange={handleSearchInput}
          />
        </div>
      </label>
    </div>
  );
};
