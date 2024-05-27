import { Chip as MuiChip, Typography } from '@material-tailwind/react';
import { classes } from '../filters/classes';

export const Chip = ({
  value,
  handleClose,
  name,
  label,
}: {
  value: string;
  handleClose: (name: string, value: string) => any;
  name: string;
  label?: string;
}) => (
  <MuiChip
    value={
      <Typography
        placeholder={undefined}
        variant="small"
        className="font-bold text-info capitalize leading-none"
      >
        {label}
      </Typography>
    }
    variant="ghost"
    className={classes.menu.chip}
    onClose={() => handleClose(name, value)}
  />
);
