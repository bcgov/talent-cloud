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
  handleClose: (name: string, value: any) => void;
  handleCloseMany: () => void;
  label: string;
  name: string;
}) => (
  <>
    {values?.length ? (
      <div className={classes.menu.chipsContainer}>
        {(name === 'region' && values?.length > 2) || values?.length > 3 ? (
          <Chip
            value={`${values?.length} selected`}
            handleClose={() => handleCloseMany()}
          />
        ) : (
          values?.map((value: any) => (
            <Chip
              key={value}
              value={value}
              handleClose={() => handleClose(name, value)}
            />
          ))
        )}
      </div>
    ) : (
      <span className={classes.menu.placeholder}>Select {label}(s)</span>
    )}
  </>
);
