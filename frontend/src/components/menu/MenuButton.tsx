import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMenu } from '@material-tailwind/react';

import { classes } from './constants';

export const MenuButton = () => {
  const { open } = useMenu();

  return (
    <>
      {open ? (
        <button className={classes.menuButton}>
          <ChevronUpIcon className="h-5 w-5 text-dark" />
        </button>
      ) : (
        <button className={classes.menuButton}>
          <ChevronDownIcon className="h-5 w-5 text-dark" />
        </button>
      )}
    </>
  );
};
