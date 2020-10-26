import React from 'react';
import { Drawer, Button } from '@material-ui/core';
import { useStyles } from '../../styles/Styles';

export const SideDrawer = ({ content, ...props }) => {
  const classes = useStyles()();

  return (
    <Drawer variant="temporary" {...props}>
      <div className={classes.drawerBody}>
        {content}
        <div className={classes.drawerControls}>
          <Button
            color="primary"
            onClick={props.onClose}
            fullWidth
            classes={{ root: classes.closeDrawerButton }}
          >
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
