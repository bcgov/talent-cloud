import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../menu/constants';

export const Search = ({
  field,
  handleSearchInput,
  value,
}: {
  field: FieldInterface;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target?.value.split('')?.length >= 3 && onChange(e);
  };
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
