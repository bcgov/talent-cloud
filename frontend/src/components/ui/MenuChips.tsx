import { classes } from '../filters/classes';
import { Chip } from './Chip';

export const MenuChips = ({
  values,
  handleClose,
  handleCloseMany,
  placeholder,
  name,
  maxChips,
}: {
  values: any[];
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
  placeholder: string;
  name: string;
  maxChips: number;
}) => (
  <>
    {values?.length ? (
      <div className={classes.menu.chipsContainer}>
        {values.length > maxChips ? (
          <Chip
            value={`${values?.length} selected`}
            name={name}
            handleClose={handleCloseMany}
          />
        ) : (
          values?.map((value: any) => (
            <Chip key={value} value={value} name={name} handleClose={handleClose} />
          ))
        )}
      </div>
    ) : (
      <span className={classes.menu.placeholder}>{placeholder}</span>
    )}
  </>
);
