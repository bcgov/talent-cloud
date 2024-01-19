import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '../interface';
import { inputStyles } from '@/styles/fieldStyles';

export const Search = ({
  field,
  onChange,
}: {
  field: FieldInterface;
  onChange: (name: string, value: any) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target?.value.split('')?.length === 0 && onChange(field.name, e.target.value);
    e.target?.value.split('')?.length >= 3 && onChange(field.name, e.target.value);
  };
  return (
    <label>
      Search By Name
      <div className="relative border-gray-200">
        <div className="absolute inset-y-0 right-2 border-l border-gray-300 my-1">
          <MagnifyingGlassIcon className="h-8 w-8 text-dark pl-1 py-1" />
        </div>

        <input
          name={field.name}
          type="text"
          className={inputStyles + ' pr-12'}
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
