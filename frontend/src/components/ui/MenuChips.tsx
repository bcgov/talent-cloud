import { classes } from '../filters/classes';
import { Chip } from './Chip';

export const MenuChips = ({
  chips,
  handleClose,
  handleCloseMany,
  placeholder,
  name,
  maxChips,
}: {
  chips: { value: any; label: string }[];
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
  placeholder: string;
  name: string;
  maxChips: number;
}) => (
  <>
    {chips?.length ? (
      <div className={classes.menu.chipsContainer}>
        {chips.length > maxChips ? (
          <Chip
            value={''}
            name={name}
            label={`${chips?.length} selected`}
            handleClose={handleCloseMany}
          />
        ) : (
          chips?.map((chip: { label: string; value: any }) => (
            <Chip
              key={chip.label}
              value={chip.value}
              name={name}
              handleClose={handleClose}
              label={chip.label}
            />
          ))
        )}
      </div>
    ) : (
      <span className={classes.menu.placeholder}>{placeholder}</span>
    )}
  </>
);
