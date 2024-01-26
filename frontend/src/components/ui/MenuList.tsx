import type { MenuListProps } from '@material-tailwind/react';
import { MenuList as MuiMenuList } from '@material-tailwind/react';

const getClass = (name?: string) => {
  if (name === 'region') {
    return 'w-96 md:w-36 lg:w-52';
  } else if (name === 'function') {
    return 'w-96 md:w-[700px] lg:w-72 xl:w-96';
  } else if (name === 'location') {
    return 'p-4 lg:w-[875px] -ml-24';
  } else {
    return;
  }
};
export const MenuList = (props: MenuListProps) => (
  <MuiMenuList className={getClass(props.className)} placeholder={undefined}>
    {props.children}
  </MuiMenuList>
);
