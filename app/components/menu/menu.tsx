import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { AppContext } from "@/app/page-context";
import styles from "./menu.module.css";

export interface MenuOption {
  key: string,
  value: string
}

const DrawerComponent = ({MenuOptions}: { MenuOptions: MenuOption[] }) => {
  const { openDrawer, handleToggleDrawer } = useContext(AppContext);
  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleToggleDrawer}>
        <List>
          {MenuOptions.map(option => (
            <a href={`#${option.key}`} key={option.key}>
              <ListItem button onClick={handleToggleDrawer}>
                <span className={styles.menuItem}>
                    {option.value} 
                </span>
              </ListItem>
            </a>
          ))}
        </List>
    </Drawer>
  );
};

export default DrawerComponent;