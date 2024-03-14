import type { MenuListProps } from '@material-tailwind/react';
import { MenuList as MuiMenuList } from '@material-tailwind/react';

export const MenuList = (props: MenuListProps) => (
  <MuiMenuList className={'w-auto'} placeholder={undefined}>
    {props.children}
  </MuiMenuList>
);
