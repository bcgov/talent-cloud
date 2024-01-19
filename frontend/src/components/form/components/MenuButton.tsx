import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMenu } from '@material-tailwind/react';
import { Chip } from '@/components/table/header/Chip';

export const MenuButton = ({
  fieldName,
  values,
  onDismiss,
}: {
  fieldName: string;
  values: any[];
  onDismiss?: (name: string, value: any) => void;
}) => {
  const { open } = useMenu();

  const renderComponent = () => {
    if (values.length === 0) {
      return <span>Select {fieldName}...</span>;
    } else if (values && values?.length >= 3) {
      return (
        <Chip
          value={`${values.length} selected`}
          name={fieldName}
          onDismiss={onDismiss}
        />
      );
    } else {
      return (
        <>
          {values?.map((itm) => (
            <Chip key={itm} name={fieldName} value={itm} onDismiss={onDismiss} />
          ))}
        </>
      );
    }
  };
  return (
    <span className="text-gray-600 text-sm text-left flex flex-row items-center justify-between w-full">
      <div className="flex flex-row items-center justify-start">
        {renderComponent()}
        <div className="relative">
          {open ? (
            <ChevronUpIcon className="h-5 w-5 text-dark" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-dark" />
          )}
        </div>
      </div>
    </span>
  );
};
