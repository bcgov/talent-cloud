import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../menu/constants';

export const Search = ({
  field,
  onChange,
}: {
  field: FieldInterface;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target?.value.split('')?.length >= 3 && onChange(e);
  };
  return (
    <label>
      Search By Name
      <div className="relative border-gray-200">
        <div className="absolute inset-y-1 right-2 border-l border-gray-300 my-1">
          <MagnifyingGlassIcon className="h-8 w-8 text-gray-600 pl-1 py-1" />
        </div>

        <input
          name={field.name}
          type="text"
          placeholder="Search by name"
          className={classes.menu.container}
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
