import React, { useState } from 'react';
import { Button, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import * as logger from '../../util/Logger';
import * as db from '../../db/Db';
import { YesNoDialog } from '../YesNoDialog';

export const DeleteTaskDialog = ({ taskId, onDeleted, onError }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = (confirmed) => {
    if (confirmed) {
      db.deleteTask(taskId)
        .then((deletedTask) => {
          logger.debug('Deleted task: ', deletedTask);
          enqueueSnackbar('Task Deleted.', { variant: 'success' });
          onDeleted();
        })
        .catch((e) => onError(`Could not delete task. ${e}`));
    }
    setConfirmOpen(false);
  };

  if (taskId == null) return null;

  return (
    <>
      <Button
        color="primary"
        style={{ padding: '20px' }}
        onClick={() => {
          setConfirmOpen(true);
        }}
      >
        DELETE TASK
      </Button>
      <Divider />
      <YesNoDialog
        title="Do you want to delete this task? This will also delete any associated vacancies, interests, and contribution links."
        yesLabel="DELETE"
        noLabel="CANCEL"
        handleClose={handleClose}
        open={confirmOpen}
      />
    </>
  );
};
