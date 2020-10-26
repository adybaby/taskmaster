import React, { useState, useEffect, useRef, createRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, Drawer, Button, Tooltip } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { HINT_IDS, Hint, getHintTitle } from './Hint';
import { ICONS } from '../../constants/common/Icons';

const variant = typographyVariant.hint;

export const AllHints = () => {
  const classes = useStyles()();
  const [highlightedHint, setHighlightedHint] = useState(Object.values(HINT_IDS)[0]);
  const [hintSelectDrawerVisible, setHintSelectDrawerVisible] = useState(false);
  const hintIds = Object.values(HINT_IDS);
  const refs = useRef({});

  for (let index = 0; index < hintIds.length; index++) {
    refs.current[hintIds[index]] = createRef();
  }

  const onHintTitleClicked = (hintId) => {
    setHighlightedHint(hintId);
  };

  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    if (refs != null && refs.current[highlightedHint] != null) {
      scrollToRef(refs.current[highlightedHint]);
    }
  }, [highlightedHint]);

  const hintsList = () =>
    hintIds.map((hintId) => (
      <ListItem
        button
        key={hintId}
        selected={hintId === highlightedHint}
        onClick={() => onHintTitleClicked(hintId)}
      >
        <Typography className={classes.chartListItem} noWrap={true}>
          {getHintTitle(hintId)}
        </Typography>
      </ListItem>
    ));

  const permanentMenu = () => (
    <div className={classes.allHintsMenuSideBar}>
      <List component="nav" aria-label="charts list navigation">
        {hintsList()}
      </List>
    </div>
  );

  const hintSelectDrawer = () => (
    <Drawer
      variant="temporary"
      open={hintSelectDrawerVisible}
      onClose={() => setHintSelectDrawerVisible(false)}
      onClick={() => setHintSelectDrawerVisible(false)}
    >
      <div className={classes.drawerBody}>
        {hintsList()}
        <div className={classes.drawerControls}>
          <Button
            color="primary"
            onClick={() => setHintSelectDrawerVisible(false)}
            fullWidth
            classes={{ root: classes.closeDrawerButton }}
          >
            Close
          </Button>
        </div>
      </div>
    </Drawer>
  );

  const hintSelectButton = () => (
    <Tooltip title="Select hint">
      <Button
        className={classes.chartSelectButton}
        onClick={() => setHintSelectDrawerVisible(true)}
      >
        {ICONS.MENU}
      </Button>
    </Tooltip>
  );

  return (
    <>
      {hintSelectDrawer()}
      <div className={classes.allHintsHeading}>
        {hintSelectButton()}
        <Typography variant={variant.allHintsHeading}>
          <b>Hints</b>
        </Typography>
      </div>
      <div className={classes.allHintsLayoutContainer}>
        {permanentMenu()}
        <div className={classes.allHintsBody}>
          {hintIds.map((hintId) => (
            <div key={hintId} ref={refs.current[hintId]}>
              <Hint id={hintId} presentationVersion className={classes.userHint} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
