import { Chip as MuiChip } from '@material-tailwind/react';
import { useState } from 'react';

export const Chip = ({
  name,
  value,
  onDismiss,
}: {
  name: string;
  value: string;
  onDismiss?: (name: string, value: any) => void;
}) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    onDismiss && onDismiss(name, value);
  };
  return (
    <MuiChip
      size="sm"
      color="blue-gray"
      variant="ghost"
      className="rounded-full text-sm font-bold text-info bg-infoBannerLight"
      open={open}
      value={value}
      onClose={handleClose}
    />
  );
};
