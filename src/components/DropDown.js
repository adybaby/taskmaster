/* eslint-disable react/display-name */
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  Chip,
  Button,
} from '@material-ui/core';
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
  onAdd,
  onDelete,
  twoLines = false,
  multiple = false,
  ...divStyleProps
}) => {
  const classes = useStyles()();
  if (id == null) {
    return 'Cannot render DropDown: id cannot be null';
  }
  if (items == null) {
    return `Cannot render DropDown with id "${id}": items cannot be null`;
  }
  if (multiple && !(items instanceof Array)) {
    return `Cannot render DropDown with id "${id}": items must be an array if multiple is set to true`;
  }
  if (onChange == null && (onAdd == null || onDelete == null)) {
    return `Cannot render DropDown with id "${id}": either onChange or onAdd and onDelete must be provided`;
  }
  let deleteCallback = onDelete;
  let addCallback = onAdd;
  if (deleteCallback == null) {
    deleteCallback = onChange;
  }
  if (addCallback == null) {
    addCallback = onChange;
  }

  const selectProps = {
    input: (
      <InputBase
        classes={{
          input: classes.dropDownControl,
        }}
      />
    ),
    autoFocus,
    labelId: `${id}-select-label`,
    displayEmpty: true,
    multiple,
    id: `${id}-select-control`,
    value,
    children: [
      <MenuItem disabled key="placeholder" value="">
        <em>{placeholder}</em>
      </MenuItem>,
    ],
  };

  if (multiple) {
    selectProps.renderValue = (selected) => (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {selected == null
          ? null
          : selected.map((selectedItem) => (
              <Fragment key={selectedItem}>
                <Chip
                  style={{ margin: 4 }}
                  key={selectedItem}
                  size="small"
                  label={
                    items.find((item) => item.value === selectedItem) != null
                      ? items.find((item) => item.value === selectedItem).label
                      : `No label found for ${selectedItem}`
                  }
                  onDelete={() => {
                    deleteCallback(
                      id,
                      selected.filter((s) => s !== selectedItem),
                      selectedItem
                    );
                  }}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                  className={classes.chip}
                />
              </Fragment>
            ))}
      </div>
    );
    selectProps.children.push([
      ...items.map((item, key) => (
        <div key={key} style={{ display: 'flex' }}>
          <Button
            fullWidth
            style={{
              justifyContent: 'left',
              paddingLeft: 14,
              background: value.indexOf(item.value) > -1 ? 'darkGrey' : 'inherited',
              borderRadius: 0,
            }}
            onClick={() => {
              if (value.indexOf(item.value) > -1) {
                deleteCallback(
                  id,
                  value.filter((v) => v !== item.value),
                  item.value
                );
              } else {
                addCallback(id, [...value, item.value], item.value);
              }
            }}
          >
            {capitalize(item.label)}
          </Button>
        </div>
      )),
    ]);
  } else {
    selectProps.onChange = (event) => onChange(id, event.target.value);
    selectProps.children.push([
      ...items.map((item, key) => (
        <MenuItem key={key} value={item.value}>
          {capitalize(item.label)}
        </MenuItem>
      )),
    ]);
  }

  return (
    <div
      className={twoLines ? classes.dropDownLayoutTwoLines : classes.dropDownLayout}
      {...divStyleProps}
    >
      {prompt == null ? null : (
        <Typography variant="body1" className={classes.dropDownTitle}>
          {prompt}
        </Typography>
      )}
      <FormControl>
        <InputLabel id={`${id}-select-input-label`}>{label}</InputLabel>
        <Select {...selectProps} />
      </FormControl>
    </div>
  );
};
