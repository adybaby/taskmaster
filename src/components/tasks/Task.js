import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Button, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS, TASK_TYPE } from '../../constants/Constants';
import { AtAGlance } from './AtAGlance';
import { Vacancy } from './Vacancy';

const variant = typographyVariant.task;

export const Task = () => {
  const classes = useStyles()();
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

  const handleTabChange = () => {
    // eslint-disable-next-line no-alert
    window.alert('TBD');
  };

  return task === null ? null : (
    <>
      <div className={classes.mainTabBar}>
        <Tabs value={'READ'} indicatorColor="primary" onChange={handleTabChange}>
          <Tab value={'READ'} className={classes.tab} label={<div>Read</div>} />
          <Tab value={'EDIT'} className={classes.tab} label={<div>Edit</div>} />
        </Tabs>
      </div>

      <div className={classes.taskHeading}>
        <Typography variant={variant.heading}>
          <b>{task.title}</b>
        </Typography>
        <Button
          value="showTaskInfoButton"
          classes={{ root: classes.taskInfoButton }}
          onClick={() => setInfoVisible(!infoVisible)}
          data-selected={String(infoVisible)}
        >
          {ICONS.INFO}
        </Button>
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

        {task.type === TASK_TYPE.INITIATIVE ? (
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
            <div className={`${classes.taskSectionBody} ${classes.vacancySection}`}>
              {task.vacancies.map((vacancy, index) => (
                <Vacancy key={index} vacancy={vacancy} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
