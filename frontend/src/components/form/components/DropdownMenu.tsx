import type { MenuProps } from '@material-tailwind/react';
import { Menu, MenuList, MenuHandler } from '@material-tailwind/react';
import { classes } from './constants';
import { MenuButton } from './MenuButton';

export const DropdownMenu = ({
  dismiss,
  children,
  fieldName,
  values,
  onClearItem,
}: {
  dismiss: MenuProps['dismiss'];
  children: React.ReactNode;
  fieldName: string;
  values?: any[];
  onClearItem?: (name: string, value: any) => void;
}) => (
  <Menu dismiss={dismiss}>
    <MenuHandler className={classes.menu}>
      <button className={classes.menuButton}>
        <MenuButton
          fieldName={fieldName}
          values={values ?? []}
          onDismiss={onClearItem ?? undefined}
        />
      </button>
    </MenuHandler>
    <MenuList className={classes.menuList} placeholder={undefined}>
      {children}
    </MenuList>
  </Menu>
);
