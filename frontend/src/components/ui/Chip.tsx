import { Chip as MuiChip, Typography } from '@material-tailwind/react';
import { classes } from '../filters/classes';

export const Chip = ({
  value,
  name,
  handleClose,

}: {
  value: string;
  name: string;
  handleClose: (name:string, value:string) => any;
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
    onClose={()=> handleClose(name, value)}
  />
);
