import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { typographyVariant } from '../../../styles/Styles';

const variant = typographyVariant.datesDialog;

export const dialogBase = (
  unit,
  dialogBody,
  fromNotValid,
  toNotValid,
  datesOutOfOrder,
  bothDatesBlank,
  open,
  handleClose,
  handleOk,
  classes,
  other
) => (
  <Dialog
    open={open}
    onClose={() => handleClose(null, null)}
    onEscapeKeyDown={() => handleClose(null, null)}
    {...other}
  >
    <DialogTitle id="date picker title">Filter By {unit}s</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Enter the {unit} range to filter by. You can leave either field blank to ignore those
        fields.
      </DialogContentText>
      {dialogBody}
      {fromNotValid ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>
            The first {unit} is not a valid {unit}.
          </Typography>
        </div>
      ) : null}
      {toNotValid ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>
            The second {unit} is not a valid {unit}.
          </Typography>
        </div>
      ) : null}
      {datesOutOfOrder ? (
        <div className={classes.datesDialogErrorMsg}>
          <Typography variant={variant.error}>
            The first {unit} should be before or the same as the last {unit}.
          </Typography>
        </div>
      ) : null}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose(null, null)}>Cancel</Button>
      <Button
        disabled={fromNotValid || toNotValid || datesOutOfOrder || bothDatesBlank}
        onClick={handleOk}
        color="primary"
      >
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
