import { classes } from '../filters/classes';
import { Chip } from './Chip';

export const MenuChips = ({
  values,
  handleClose,
  handleCloseMany,
  label,
  name,
}: {
  values: any[];
  handleClose: () => void;
  handleCloseMany: (name: string) => void;
  label: string;
  name: string;
}) => (
  <>
    {values?.length ? (
      <div className={classes.menu.chipsContainer}>
        {(name === 'region' && values?.length > 2) || values?.length > 3 ? (
          <Chip
            value={`${values?.length} selected`}
            name={name}
            handleClose={()=>handleCloseMany(name)}
          />
        ) : (
          values?.map((value: any) => (
            <Chip key={value} value={value} name={name} handleClose={handleClose} />
          ))
        )}
      </div>
    ) : (
      <span className={classes.menu.placeholder}>Select {label}(s)</span>
    )}
  </>
);
