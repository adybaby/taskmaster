import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import hints from './hints.json';
import { updateUser } from '../../state/actions/UserActions';
import * as logger from '../../util/Logger';

const variant = typographyVariant.hint;

export const HINT_IDS = {
  INTRO: 'intro',
  DRIVERS: 'drivers',
  ENABLERS: 'enablers',
  INITIATIVES: 'initiatives',
  MAPS: 'maps',
  CHARTS: 'charts',
  FILTERS: 'filters',
};

export const Hint = ({ id }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const [hidden, setHidden] = useState(currentUser.disabledHints.includes(id));
  const dispatch = useDispatch();

  const hint = hints.find((h) => h.id === id);

  const hideHint = () => {
    dispatch(
      updateUser(
        { id: currentUser.id, disabledHints: [...currentUser.disabledHints, id] },
        () => {
          setHidden(true);
        },
        (e) => {
          logger.error("Couldn't disable hint", e);
        }
      )
    );
  };

  return hidden ? null : (
    <div className={classes.hintPanel}>
      <Typography variant={variant.title} className={classes.hintTitle}>
        {hint.title}
      </Typography>
      {hint.blocks.map((block, index) => (
        <div key={index} className={classes.hintBlock}>
          <Typography variant={variant.subTitle} className={classes.hintSubTitle}>
            {block.title}
          </Typography>
          <Typography variant={variant.body}>{block.text}</Typography>
          {block.img != null ? (
            <img className={classes.hintImage} src={`../img/${block.img}`} alt={block.imgAlt}></img>
          ) : null}
        </div>
      ))}
      <Divider />
      <div>
        <Button className={classes.hideHintButton} onClick={hideHint}>
          HIDE HINT
        </Button>
        <div className={classes.hintButtonHelp}>
          <Typography variant={variant.help}>
            (You can show hints again later by resetting them from your user profile)
          </Typography>
        </div>
      </div>
    </div>
  );
};
