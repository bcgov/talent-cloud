import { useMenu } from '@material-tailwind/react';

import { classes } from '../filters/classes';
import { ChevronDownIcon, ChevronUpIcon } from './Icons';

export const MenuButton = () => {
  const { open } = useMenu();
  open && document.body.classList.toggle('overflow-y-hidden', open);
  return (
    <div className={classes.menu.buttonContainer}>
      {open ? (
        <button className={classes.menu.button} aria-label="close">
          <ChevronUpIcon />
        </button>
      ) : (
        <button className={classes.menu.button} aria-label="open">
          <ChevronDownIcon />
        </button>
      )}
    </div>
  );
};
