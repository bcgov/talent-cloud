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
      <div className="relative border-gray-200">
        <div className="absolute inset-y-0 right-2 border-l border-gray-300 my-1">
          <MagnifyingGlassIcon className="h-8 w-8 text-dark pl-1 py-1" />
        </div>

        <input
          name={field.name}
          type={field.type}
          className={inputStyles + ' pr-12'}
          onChange={(e) => onChange({ name: e.target.name, value: e.target.value })}
        />
      </div>
    </>
  );
};
