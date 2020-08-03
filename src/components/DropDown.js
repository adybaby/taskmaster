import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem, InputBase } from '@material-ui/core';
import { useStyles } from '../styles/Styles';
import { capitalize } from '../util/String';

export const DropDown = ({
  id,
  prompt,
  label,
  value,
  items,
  placeholder = 'Choose..',
  autoFocus = false,
  onChange,
  twoLines = false,
}) => {
  const classes = useStyles()();

  return (
    <div className={twoLines ? classes.dropDownLayoutTwoLines : classes.dropDownLayout}>
      <Typography variant="body1" className={classes.dropDownTitle}>
        {prompt}
      </Typography>
      <FormControl>
        <InputLabel id={`${id}-select-input-label`}>{label}</InputLabel>
        <Select
          input={
            <InputBase
              classes={{
                input: classes.dropDownControl,
              }}
            />
          }
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
/**
 *       <Autocomplete
        style={{ minWidth: '500', marginTop: '10', marginBottom: '10' }}
        autoFocus={autoFocus}
        id={id}
        size="small"
        options={items}
        getOptionLabel={(option) => (option == null || option === '' ? '' : option.label)}
        value={value}
        renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
        onChange={onChange}
      /> */

/**
 *       <FormControl>
        <InputLabel id={`${id}-select-input-label`}>{label}</InputLabel>
        <Select
          input={<InputBase classes={{ input: classes.dropDownControl }} />}
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
      </FormControl> */
