import {
  MenuHandlerProps,
  MenuHandler as MuiMenuHandler,
} from '@material-tailwind/react';
import { classes } from '../filters/classes';

export const MenuHandler = (props: MenuHandlerProps) => (  <MuiMenuHandler {...props} ><div className={classes.menu.container}>{props.children}</div></MuiMenuHandler>)


