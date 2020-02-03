/* eslint-disable indent */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import styles from '../../styles/Styles';
import { setSearchTerm, setTab, clearTaskFilters, setFilterBarVisible } from '../../actions/Tasks';
import { DEFAULT } from '../../constants/Tabs';
import ListOfLinks from '../ListOfLinks';

const useStyles = makeStyles(theme => styles(theme));

const TagsAndLinksBlock = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleTagClick = tag => {
    dispatch(setSearchTerm(tag));
    dispatch(clearTaskFilters());
    dispatch(setFilterBarVisible(false));
    dispatch(setTab(DEFAULT));
  };

  return (
    <div>
      <div className={classes.taskBody}>
        <Typography variant="h6">Tags</Typography>
        <ListOfLinks links={task.tags} handleLinkClick={handleTagClick} url="/" />
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
