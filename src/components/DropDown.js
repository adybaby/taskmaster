import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import { capitalize } from '../util/String';

export const DropDown = ({
  id,
  prompt,
  label,
  placeholder = 'Choose..',
  value,
  items,
  autoFocus = false,
  onChange,
}) => {
  const classes = useStyles()();

  return (
    <div className={classes.dropDownLayout}>
      <Typography variant="body1" className={classes.dropDownTitle}>
        {prompt}
      </Typography>
      <FormControl className={classes.dropDownControl}>
        <InputLabel id={`${id}-select-input-label`}>{label}</InputLabel>
        <Select
          autoFocus={autoFocus}
          labelId={`${id}-select-label`}
          displayEmpty
          id={`${id}-select-control`}
          value={value}
          onChange={(event) => onChange(id, event.target.value)}
        >
          <MenuItem disabled key="placeholder" value="">
            <em>{placeholder}</em>
          </MenuItem>
          {items.map((item, key) => (
            <MenuItem key={key} value={item.value}>
              {capitalize(item.label)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
