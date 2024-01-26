import { Chip as MuiChip, Typography } from '@material-tailwind/react';

export const Chip = ({
  value,
  handleClose,
}: {
  value: string;
  handleClose?: () => any;
}) => (
  <MuiChip
    value={
      <Typography
        placeholder={undefined}
        variant="small"
        className="font-bold text-info capitalize leading-none"
      >
        {value}
      </Typography>
    }
    variant="ghost"
    className="rounded-full text-sm font-bold text-info bg-infoBannerLight text-transform-none"
    onClose={handleClose}
  />
);
