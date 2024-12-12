import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '..';
import { classes } from '../filters/classes';

export const Search = ({
  searchValue,
  setSearchValue,
  field,
  handleChange,
  handleClose,
}: {
  searchValue: string;
  field: FieldInterface;
  setSearchValue: (value: string) => void;
  handleChange: (name: string, value: string) => void;
  handleClose: (name: string) => void;
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      handleClose(e.target.name);
    } else {
      setTimeout(() => handleChange(e.target.name, e.target.value), 1000);
    }
  };

  return (
    <div className="relative w-full">
      <label>
        Search by Name
        <div className="absolute w-full text-dark-600 placeholder:text-dark-600">
          <MagnifyingGlassIcon className="h-6 w-6 text-dark-600 absolute inset-y-4 right-4" />
          <input
            id={field.name}
            autoComplete="name"
            value={searchValue}
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
