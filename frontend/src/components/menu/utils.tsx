import { Chip } from '@material-tailwind/react';

export const renderChips = (
  field: any,
  values: any,
  handleChange: (name: string, value: any) => void,
  handleClearAll: () => void,
) => {
  if (values && values?.length >= 3) {
    return (
      <Chip
        value={`${values?.length} selected`}
        color="blue-gray"
        variant="ghost"
        className="rounded-full text-sm font-bold text-info bg-infoBannerLight"
        onClose={handleClearAll}
      />
    );
  } else if (values?.length > 0 && values.length < 3) {
    return (
      <>
        {values?.map((itm: any) => (
          <Chip
            key={itm}
            value={itm}
            color="blue-gray"
            variant="ghost"
            className="rounded-full text-sm font-bold text-info bg-infoBannerLight"
            onClose={() => handleChange(field.name, itm)}
          />
        ))}
      </>
    );
  } else {
    return <span>Select {field.name}...</span>;
  }
};
