import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMenu } from '@material-tailwind/react';

import { classes } from '../filters/classes';

export const MenuButton = () => {
  const { open } = useMenu();

  return (
    <div className={classes.menu.buttonContainer}>
      {open ? (
        <button className={classes.menu.button} aria-label="close">
          <ChevronUpIcon className="h-8 w-5 text-icon" />
        </button>
      ) : (
        <button className={classes.menu.button} aria-label="open">
          <ChevronDownIcon className="h-8 w-5 text-icon" />
        </button>
      )}
    </div>
  );
};
