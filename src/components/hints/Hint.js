import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
  USER: 'user',
  EDIT_DRIVER: 'editDriver',
  EDIT_ENABLER: 'editEnabler',
  EDIT_INITIATIVE: 'editInitiative',
  VACANCIES: 'vacancies',
};

export const getHintText = (hintId) => {
  const hint = hints.find((h) => h.id === hintId);
  if (hint == null) {
    return [];
  }
  return hint.blocks.map((b) => b.text);
};

export const getHintTitle = (hintId) => {
  const hint = hints.find((h) => h.id === hintId);
  if (hint == null) {
    return 'Tip';
  }
  return hint.title;
};

export const Hint = ({ id, presentationVersion = false, ...props }) => {
  const classes = useStyles()();
  const currentUser = useSelector((state) => state.currentUser);
  const [hidden, setHidden] = useState();
  const [hint, setHint] = useState();

  useEffect(() => {
    setHint(hints.find((h) => h.id === id));
    setHidden(currentUser.disabledHints.includes(id));
  }, [id, currentUser]);

  const hideHint = () => {
    db.upsertUser({ id: currentUser.id, disabledHints: [...currentUser.disabledHints, id] })
      .then(() => {
        setHidden(true);
      })
      .catch((e) => {
        logger.error("Couldn't disable hint", e);
      });
  };

  const classStyles = {
    defaultVersion: {
      panel: classes.hintPanel,
      title: classes.hintTitle,
      block: classes.hintBlock,
      subTitle: classes.hintSubTitle,
      titleTextSize: variant.title,
    },
    presentationVersion: {
      panel: classes.presentHintPanel,
      title: classes.presentHintTitle,
      block: classes.presentHintBlock,
      subTitle: classes.presentHintSubTitle,
      titleTextSize: variant.allHintsTitle,
    },
  };

  const activeStyle = presentationVersion
    ? classStyles.presentationVersion
    : classStyles.defaultVersion;

  return (!presentationVersion && hidden) || hint == null ? null : (
    <div {...props}>
      <div className={activeStyle.panel}>
        <div className={activeStyle.title}>
          <Typography variant={activeStyle.titleTextSize}>
            <b>{hint.title}</b>
          </Typography>
          {presentationVersion ? null : (
            <IconButton onClick={hideHint} size="small" color="inherit" edge="start">
              <CloseIcon />
            </IconButton>
          )}
        </div>
        {hint.blocks.map((block, index) => (
          <div key={index} className={activeStyle.block}>
            {block.title == null ? null : (
              <Typography variant={variant.subTitle} className={activeStyle.subTitle}>
                {block.title}
              </Typography>
            )}
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
      </div>
    </div>
  );
};
