import { Chip as MuiChip } from '@material-tailwind/react';

export const Chip = ({
  value,
  onChange,
}: {
  value: string;
  onChange: () => void;
}) => (
  <MuiChip
    value={value}
    color="blue-gray"
    variant="ghost"
    className="rounded-full text-sm font-bold text-info bg-infoBannerLight"
    onClose={onChange}
  />
);
