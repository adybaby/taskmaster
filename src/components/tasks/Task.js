import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Divider, Button, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { AtAGlance } from './AtAGlance';
import { Vacancy } from './Vacancy';

const variant = typographyVariant.task;

export const Task = () => {
  const classes = useStyles()();
  const { id } = useParams();
  const [infoVisible, setInfoVisible] = useState(true);
  const task = useSelector((state) => state.tasks).find((t) => t.id === id);
  const vacancies = useSelector((state) => state.vacancies).filter(
    (vacancy) => vacancy.taskId === id
  );

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

        {task.type === 'INITIATIVE' ? (
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
              {vacancies.map((vacancy, index) => (
                <Vacancy key={index} vacancy={vacancy} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
