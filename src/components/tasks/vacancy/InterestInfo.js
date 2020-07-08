import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/Styles';
import { formatDateRange, equals } from '../../../util/Dates';
import { INTEREST_STATUS } from '../../../constants/common/Fields';
import { UserLink } from '../../Link';

export const InterestInfo = ({ vacancy, interest }) => {
  const classes = useStyles()();
  const users = useSelector((state) => state.users);
  const fullName = users.find((u) => u.id === interest.userId).formattedFullName;
  const exactDates =
    equals(vacancy.startDate, interest.startDate) && equals(vacancy.endDate, interest.endDate);

  return (
    <div className={classes.interestInfoContainer}>
      <div className={classes.interestInfoTitle}>
        <Typography display="inline" variant="body1">
          <b>Interest</b>
        </Typography>
      </div>
      <div>
        <UserLink userId={interest.userId} userName={fullName} variant="body1" />
        <Typography display="inline" variant="body1">
          {interest.status === INTEREST_STATUS.CONTACTING
            ? ' has asked to talk with the recruiter.'
            : ` has applied to work ${
                exactDates ? 'for the entire advertised period.' : `${formatDateRange(interest)}.`
              }`}
          {interest.comments != null && interest.comments !== '' && interest.comments !== 'None'
            ? ` Comments: ${interest.comments}`
            : null}
        </Typography>
      </div>
    </div>
  );
};
