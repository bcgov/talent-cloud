import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMenu } from '@material-tailwind/react';

import { classes } from '../filters/classes';

export const MenuButton = () => {
  const { open } = useMenu();

  return (
    <div className={classes.menu.buttonContainer}>
      {open ? (
        <button className={classes.menu.button}>
          <ChevronUpIcon className="h-8 w-5 fill-[#606060]" />
        </button>
      ) : (
        <button className={classes.menu.button}>
          <ChevronDownIcon className="h-8 w-5 fill-[#606060]"/>
        </button>
      )}
    </div>
  );
};
