import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import type { FieldInterface } from '../interface';
import { inputStyles } from '@/styles/fieldStyles';

export const Search = ({
  field,
  onChange,
}: {
  field: FieldInterface;
  onChange: (e: any) => void;
}) => {
  return (
    <>
      <div className="relative">
        <span className="absolute inset-y-5 right-2 flex items-center justify-end ">
          <MagnifyingGlassIcon className="h-8 w-7 text-gray-500" />
        </span>
      </div>

      <input
        name={field.name}
        type={field.type}
        className={inputStyles}
        onChange={onChange}
      />
    </>
  );
};
