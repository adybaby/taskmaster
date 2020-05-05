import { URLS as PKG_URLS } from './common/Urls';
import { DB_STATUS as PKG_DB_STATUS } from './common/DbStatus';
import { ICONS as PKG_ICONS } from './common/Icons';
import { TABS as PKG_TABS, DEFAULT_TAB as PKG_DEFAULT_TAB } from './common/Tabs';
import { CONTRIBUTES_TO as PKG_CONTRIBUTES_TO } from './field/ContributesTo';
import { COST as PKG_COST } from './field/Cost';
import { TASK_TYPE as PKG_TASK_TYPE } from './field/TaskType';
import { VACANCY as PKG_VACANCY } from './field/Vacancy';
import { FILTER_IDS as PKG_FILTER_IDS } from './filter/FilterIds';
import {
  RESOURCE_CHART_DEFINITIONS as PKG_RESOURCE_CHART_DEFINITIONS,
  CHART_TYPES as PKG_CHART_TYPES,
  DEFAULT_CHART as PKG_DEFAULT_CHART,
  getResourceChartDefinition as pkgGetResourceChartDefinition,
} from './chart/ResourceChartDefinitions';
import { ACTION_TYPES as PKG_ACTION_TYPES } from './common/ActionTypes';

export const URLS = PKG_URLS;
export const DB_STATUS = PKG_DB_STATUS;
export const ICONS = PKG_ICONS;
export const TABS = PKG_TABS;
export const DEFAULT_TAB = PKG_DEFAULT_TAB;
export const ACTION_TYPES = PKG_ACTION_TYPES;

export const CONTRIBUTES_TO = PKG_CONTRIBUTES_TO;
export const COST = PKG_COST;
export const TASK_TYPE = PKG_TASK_TYPE;
export const VACANCY = PKG_VACANCY;

export const FILTER_IDS = PKG_FILTER_IDS;

export const RESOURCE_CHART_DEFINITIONS = PKG_RESOURCE_CHART_DEFINITIONS;
export const CHART_TYPES = PKG_CHART_TYPES;
export const DEFAULT_CHART = PKG_DEFAULT_CHART;
export const getResourceChartDefinition = pkgGetResourceChartDefinition;
