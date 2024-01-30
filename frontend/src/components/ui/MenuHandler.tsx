import type { MenuHandlerProps } from '@material-tailwind/react';
import { MenuHandler as MuiMenuHandler } from '@material-tailwind/react';
import { menuItemClass } from '../filters/classes';


export const MenuHandler = (props: MenuHandlerProps) => (
  <MuiMenuHandler {...props}>
    <div className={menuItemClass[props?.field?.name]}>
    {props.children }
    </div>
  </MuiMenuHandler>
);
