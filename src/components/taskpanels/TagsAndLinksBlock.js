import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import styles from '../../styles/Styles';
import TagsList from '../lists/TagsList';

const useStyles = makeStyles(theme => styles(theme));

const TagsAndLinksBlock = ({ task }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.taskBody}>
        <Typography variant="h6">Tags</Typography>
        <TagsList tags={task.tags} />
      </div>
      <div className={classes.taskBody}>
        <Typography variant="h6">External Related Links</Typography>
        {task.relatedLinks.map(relatedLink => (
          <div key={relatedLink}>
            <Link
              style={{ marginRight: 5, textDecoration: 'underline' }}
              value={relatedLink}
              href={relatedLink}
            >
              {relatedLink}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsAndLinksBlock;
