import { Chip as MuiChip, Typography } from '@material-tailwind/react';
import { classes } from '../filters/classes';

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
    className={classes.menu.chip}
    onClose={handleClose}
  />
);
