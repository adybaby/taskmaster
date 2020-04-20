import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import * as TASK_TYPES from '../../data/fields/Type';
import { INFO as INFO_ICON } from '../../Icons';
import { AtAGlance } from './AtAGlance';
import { styles, typographyVariant } from '../../styles/Styles';

const useStyles = makeStyles(styles);
const variant = typographyVariant.task;

export const Task = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [infoVisible, setInfoVisible] = useState(true);

  useEffect(() => {
    if (task === null || task.id !== id) {
      setTask(tasks.filter((tsk) => tsk.id === id)[0]);
    }
  }, [dispatch, id, task, tasks]);

  return task === null ? null : (
    <>
      <div className={classes.taskHeading}>
        <Typography variant={variant.heading}>
          <b>{task.title}</b>
        </Typography>
        <ToggleButton
          value="showTaskInfoButton"
          className={classes.taskInfoButton}
          onClick={() => setInfoVisible(!infoVisible)}
          selected={infoVisible}
        >
          {INFO_ICON}
        </ToggleButton>
      </div>
      <div className={classes.taskContent}>
        {infoVisible ? <AtAGlance task={task} /> : null}
        <Typography className={classes.taskSectionHeading} variant={variant.heading}>
          Outline
        </Typography>
        <Divider />
        <Typography className={classes.taskSectionBody} variant={variant.body}>
          {task.moreInformation}
        </Typography>

        {task.type === TASK_TYPES.INITIATIVE ? (
          <>
            <Typography className={classes.taskSectionHeading} variant={variant.heading}>
              Hypotheses
            </Typography>
            <Divider />
            <Typography className={classes.taskSectionBody} variant={variant.body}>
              {task.hypotheses}
            </Typography>
            <Typography className={classes.taskSectionHeading} variant={variant.heading}>
              Successful If
            </Typography>
            <Divider />
            <Typography className={classes.taskSectionBody} variant={variant.body}>
              {task.successfulIf}
            </Typography>
            <Typography className={classes.taskSectionHeading} variant={variant.heading}>
              Approach
            </Typography>
            <Divider />
            <Typography className={classes.taskSectionBody} variant={variant.body}>
              {task.approach}
            </Typography>
            <Typography className={classes.taskSectionHeading} variant={variant.heading}>
              Vacancies
            </Typography>
            <Divider />
            <Typography className={classes.taskSectionBody} variant={variant.body}>
              TBD
            </Typography>
          </>
        ) : null}
      </div>
    </>
  );
};
