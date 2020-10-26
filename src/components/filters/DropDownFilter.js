import React, { useState, cloneElement } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { useStyles, typographyVariant } from '../../styles/Styles';
import { ICONS } from '../../constants/Constants';
import { FilterSummary } from './FilterSummary';

export const DropDownFilter = ({ filter, params, ...props }) => {
  const classes = useStyles()();
  const variant = typographyVariant.filters;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popOverId = open ? 'select-popover' : undefined;

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const filterOn = String(
    JSON.stringify(params) !== JSON.stringify(filter.defaultParams) && !filter.isSortFilter()
  );

  return (
    <div>
      <Button
        data-filter-on={filterOn}
        classes={{ root: classes.selectButton }}
        aria-describedby={popOverId}
        onClick={openMenu}
        focusRipple={false}
      >
        <FilterSummary
          data-filter-on={filterOn}
          forControl={filter}
          variant={variant.filterButton}
          icon={ICONS.DOWN_ARROW}
        />
      </Button>
      <Popover
        id={popOverId}
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div>{cloneElement(props.children, { filter, params, closeMenu })}</div>
      </Popover>
    </div>
  );
};
