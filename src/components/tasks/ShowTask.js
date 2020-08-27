import React, { useState } from 'react';
import { Divider, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { ShowAtAGlance } from './ShowAtAGlance';
import { TaskVacancies } from './vacancy/TaskVacancies';

const variant = typographyVariant.task;

export const ShowTask = ({ task, onChangedVacancy, onErrorChangingVacancy }) => {
  const classes = useStyles()();
  const [infoVisible, setInfoVisible] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);

  const makeField = (heading, value) => (
    <>
      <Typography className={classes.taskSectionHeading} variant={variant.heading}>
        {heading}
      </Typography>
      <Divider />
      <Typography className={classes.taskSectionBody} variant={variant.body}>
        {value}
      </Typography>
    </>
  );

  const makeInitiativeFields = () => (
    <>
      {makeField('Hypotheses', task.hypotheses)}
      {makeField('Successful If', task.successfulIf)}
      {makeField('Approach', task.approach)}
      <TaskVacancies
        task={task}
        currentUser={currentUser}
        onChanged={onChangedVacancy}
        onError={(e) => onErrorChangingVacancy(e)}
      />
    </>
  );

  return (
    <>
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
        {infoVisible ? <ShowAtAGlance task={task} /> : null}
        {makeField('Summary', task.shortDescription)}
        {makeField('Outline', task.moreInformation)}
        {task.type === 'INITIATIVE' ? makeInitiativeFields() : null}
      </div>
    </>
  );
};
