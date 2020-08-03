import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Divider, Button } from '@material-ui/core';
import { useStyles, typographyVariant } from '../../styles/Styles';
import hints from './hints.json';
import * as db from '../../db/Db';
import * as logger from '../../util/Logger';

const variant = typographyVariant.hint;

export const HINT_IDS = {
  HINTS: 'hints',
  INTRO: 'intro',
  DRIVERS: 'drivers',
  ENABLERS: 'enablers',
  INITIATIVES: 'initiatives',
  MAPS: 'maps',
  CHARTS: 'charts',
  FILTERS: 'filters',
};

export const Hint = ({ id, ...props }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const [hidden, setHidden] = useState();
  const [hint, setHint] = useState();

  useEffect(() => {
    setHint(hints.find((h) => h.id === id));
    setHidden(currentUser.disabledHints.includes(id));
  }, [id, currentUser]);

  const hideHint = () => {
    db.upserttUser({ id: currentUser.id, disabledHints: [...currentUser.disabledHints, id] })
      .then(() => {
        setHidden(true);
      })
      .catch((e) => {
        logger.error("Couldn't disable hint", e);
      });
  };

  return hidden || hint == null ? null : (
    <div {...props}>
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
              <img
                className={classes.hintImage}
                src={`../img/${block.img}`}
                alt={block.imgAlt}
              ></img>
            ) : null}
          </div>
        ))}
        <Divider />
        <div>
          <Button className={classes.primaryButton} onClick={hideHint}>
            HIDE HINT
          </Button>
        </div>
      </div>
    </div>
  );
};
