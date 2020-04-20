import React from 'react';
import {
  faSearch,
  faBullseye,
  faCodeBranch,
  faChartBar,
  faFilter,
  faPlusCircle,
  faUserCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ALL_TAB = <FontAwesomeIcon icon={faSearch} />;
export const DRIVER = <FontAwesomeIcon icon={faBullseye} />;
export const ENABLER = <FontAwesomeIcon icon={faCodeBranch} />;
export const INITIATIVE = <FontAwesomeIcon icon={faLightbulb} />;
export const MAP = <FontAwesomeIcon icon={faMap} />;
export const CHARTS = <FontAwesomeIcon icon={faChartBar} />;
export const SEARCH = <FontAwesomeIcon icon={faSearch} />;
export const NEW = <FontAwesomeIcon icon={faPlusCircle} />;
export const FILTER = <FontAwesomeIcon size="sm" icon={faFilter} />;
export const PROFILE = <FontAwesomeIcon icon={faUserCircle} />;
export const INFO = <FontAwesomeIcon size="lg" icon={faInfoCircle} />;
