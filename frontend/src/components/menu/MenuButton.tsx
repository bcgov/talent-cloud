import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMenu } from '@material-tailwind/react';

import { classes } from './constants';

export const MenuButton = () => {
  const { open } = useMenu();

  return (
    <>
      {open ? (
        <button className={classes.menu.button}>
          <ChevronUpIcon className="h-5 w-5 text-dark" />
        </button>
      ) : (
        <button className={classes.menu.button}>
          <ChevronDownIcon className="h-5 w-5 text-dark" />
        </button>
      )}
    </>
  );
};
