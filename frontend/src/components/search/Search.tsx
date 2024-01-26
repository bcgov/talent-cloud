import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../filters/classes';

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
        Search By Name
        <div className="absolute w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 absolute inset-y-5 right-4" />
          <input
            color="gray"
            className={[classes.menu.container, classes.menu.input].join(', ')}
            name={field.name}
            value={value}
            type="text"
            placeholder="First or Last Name"
            onChange={handleSearchInput}
          />
        </div>
      </label>
    </div>
  );
};
