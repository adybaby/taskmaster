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
  faCaretDown,
  faDownload,
  faBars,
  faExclamationCircle,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faLightbulb, faMap } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ICONS = {
  ALL_TAB: <FontAwesomeIcon icon={faSearch} />,
  DRIVER: <FontAwesomeIcon icon={faBullseye} />,
  ENABLER: <FontAwesomeIcon icon={faCodeBranch} />,
  INITIATIVE: <FontAwesomeIcon icon={faLightbulb} />,
  MAP: <FontAwesomeIcon icon={faMap} />,
  CHARTS: <FontAwesomeIcon icon={faChartBar} />,
  SEARCH: <FontAwesomeIcon icon={faSearch} />,
  NEW: <FontAwesomeIcon icon={faPlusCircle} />,
  FILTER: <FontAwesomeIcon size="sm" icon={faFilter} />,
  PROFILE: <FontAwesomeIcon icon={faUserCircle} />,
  INFO: <FontAwesomeIcon size="lg" icon={faInfoCircle} />,
  DOWN_ARROW: <FontAwesomeIcon icon={faCaretDown} />,
  DOWNLOAD: <FontAwesomeIcon icon={faDownload} />,
  MENU: <FontAwesomeIcon icon={faBars} />,
  ALERT: <FontAwesomeIcon icon={faExclamationCircle} />,
  BIG_ALERT: <FontAwesomeIcon size="3x" icon={faExclamationCircle} />,
  LOGIN: <FontAwesomeIcon size="3x" icon={faSignInAlt} />,
};
