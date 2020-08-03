import React from 'react';
import { Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/Styles';
import { formatDateRange, equals } from '../../../util/Dates';
import { INTEREST_STATUS } from '../../../constants/Constants';
import { UserLink } from '../../Link';
import { formatUserName } from '../../../util/Users';

export const InterestInfo = ({ vacancy, interest }) => {
  const classes = useStyles()();
  const fullName = formatUserName(interest.user);
  const exactDates =
    equals(vacancy.startDate, interest.startDate) && equals(vacancy.endDate, interest.endDate);

  const getStatusDescription = () => {
    const application = (
      <>
        <UserLink userId={interest.userId} userName={fullName} variant="body1" />
        <Typography display="inline" variant="body1">
          {interest.status === INTEREST_STATUS.CONTACTING
            ? ' has asked to talk with the recruiter.'
            : ` has applied to work ${
                exactDates ? 'for the entire advertised period.' : `${formatDateRange(interest)}.`
              }`}
          {interest.comments != null && interest.comments !== ''
            ? ` Comments: ${interest.comments}`
            : null}
        </Typography>
      </>
    );
    switch (interest.status) {
      case INTEREST_STATUS.ACCEPTED:
        return (
          <>
            {application}
            <Typography variant="body1">The application has been accepted</Typography>
          </>
        );
      case INTEREST_STATUS.DECLINED:
        return (
          <>
            {application}
            <Typography variant="body1">The application has been declined</Typography>
          </>
        );
      default:
        return application;
    }
  };

  return (
    <div className={classes.interestInfoContainer}>
      <div className={classes.interestInfoTitle}>
        <Typography display="inline" variant="body1">
          <b>Interest</b>
        </Typography>
      </div>
      <div>{getStatusDescription()}</div>
    </div>
  );
};
