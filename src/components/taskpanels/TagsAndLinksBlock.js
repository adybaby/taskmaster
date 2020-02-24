import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TagsList from '../lists/TagsList';

const TagsAndLinksBlock = ({ task }) => {
  return (
    <>
      <Typography variant="h6">Tags</Typography>
      <TagsList tags={task.tags} variant="caption" />
      <br /> <br />
      <Typography variant="h6">External Related Links</Typography>
      <Typography variant="body1">
        {task.relatedLinks.map(relatedLink => (
          <Link
            key={relatedLink}
            style={{ marginRight: 5, textDecoration: 'underline' }}
            value={relatedLink}
            href={relatedLink}
          >
            {relatedLink}
          </Link>
        ))}
      </Typography>
    </>
  );
};

export default TagsAndLinksBlock;
