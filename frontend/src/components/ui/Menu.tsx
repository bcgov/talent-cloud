import type { MenuProps } from '@material-tailwind/react';
import { Menu as MuiMenu } from '@material-tailwind/react';

export const Menu = (props: MenuProps) => (
  <MuiMenu
    placement={props.placement}
    open={props.open}
    handler={props.handler}
    allowHover={props.allowHover}
    offset={props.offset}
    dismiss={props.dismiss}
  >
    {props.children}
  </MuiMenu>
);
