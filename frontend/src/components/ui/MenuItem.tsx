import type { MenuItemProps } from '@material-tailwind/react';
import { MenuItem as MuiMenuItem } from '@material-tailwind/react';


export const MenuItem = (props: MenuItemProps) => (
  <MuiMenuItem placeholder={undefined}>{props.children}</MuiMenuItem>
);
