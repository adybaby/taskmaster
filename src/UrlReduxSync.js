/* eslint-disable no-unused-vars */
import ReduxQuerySync from './util/ReduxQuerySync';
import { store } from './state/Store';
import { setFilterBarVisible } from './state/actions/FilterBarVisibleActions';
import { setCurrentTab } from './state/actions/CurrentTabActions';
import { setSelectedChart } from './state/actions/SelectedChartActions';
import { setAllFilterParams } from './state/actions/FilterParamActions';
import { TABS, DEFAULT_CHART, getResourceChartDefinition } from './constants/Constants';
import { formatUrlDate, ukToUs } from './util/Dates';

/**
 * ?QUERY&QUERY&QUERY..
 *
 * QUERY:
 * paramId=PARAMS
 *
 * PARAMS:
 * -filterBarVisible
 * bar=1|0
 * -currentTab
 * tab=tabId
 *-selectedChart
 * chart=chartId
 *
 * -filterParams (where "," is %2C in the URL)
 * FILTER_QUERY,FILTER_QUERY,FILTER_QUERY..
 *
 * FILTER_QUERY:
 * filterId~PARAM_VALUES
 *
 * PARAM_VALUES:
 * -boolean
 * 1|0
 * -text
 * textValue
 * -custom date range (where "#" is %23 in the URL)
 * CUSTOM_DATES#MM_DD_YYYY#MM_DD_YYYY
 * valId__val
 *
 * */

const TabParam = {
  selector: (state) => state.currentTab,
  action: (currentTab) => setCurrentTab(currentTab),
  valueToString(tab) {
    return tab == null ? TABS.all.id : tab.id;
  },

  stringToValue(strTab) {
    return strTab == null ? TABS.all : TABS[strTab];
  },
  defaultValue: TABS.all,
};

const FilterBarParam = {
  selector: (state) => state.filterBarVisible,
  action: (visible) => setFilterBarVisible(visible),
  valueToString(bar) {
    return bar ? '1' : '0';
  },

  stringToValue(strBar) {
    return strBar === '1';
  },
  defaultValue: false,
};

const ChartParam = {
  selector: (state) => state.selectedChart,
  action: (selectedChart) => setSelectedChart(selectedChart),
  valueToString(chart) {
    return chart == null ? DEFAULT_CHART.id : chart.id;
  },

  stringToValue(strChart) {
    return strChart == null ? DEFAULT_CHART : getResourceChartDefinition(strChart);
  },
  defaultValue: DEFAULT_CHART,
};

const encodeParam = (params) => {
  if (params == null) {
    return [];
  }
  // only checkbox params have multiple values without a specified ID
  if (params.length > 0 && params[0].id != null) {
    return params.map((param) => [param.id, param.checked].join('__'));
  }
  // only custom date params have 3 values and an ID
  if (params.length !== 3) {
    return params;
  }
  // it can only be a custom date param now
  return [
    params[0],
    params[1] == null ? null : formatUrlDate(params[1]),
    params[2] == null ? null : formatUrlDate(params[2]),
  ];
};

const decodeParam = (paramStrs) => {
  if (paramStrs == null) {
    return [];
  }
  let params = paramStrs;
  if (paramStrs.length > 1 && params[0].includes('__')) {
    params = paramStrs.map((param) => {
      const values = param.split('__');
      return { id: values[0], checked: values[1] === 'true' };
    });
  } else if (paramStrs.length === 3) {
    params = [
      paramStrs[0],
      params[1] == null ? null : new Date(ukToUs(paramStrs[1])),
      params[1] == null ? null : new Date(ukToUs(paramStrs[2])),
    ];
  }
  return params;
};

const FilterParams = {
  selector: (state) => state.filterParams,
  action: (params) => setAllFilterParams(params),
  valueToString: (filterParams) =>
    filterParams
      .map((filterParam) => `${filterParam.id}~${encodeParam(filterParam.params).join('#')}`)
      .join(','),
  stringToValue: (strFilterParams) => {
    if (strFilterParams == null || strFilterParams === '') return [];
    const filterParams = strFilterParams.split(',');
    return filterParams.map((filterParam) => {
      const [id, paramsStr] = filterParam.split('~');
      return { id, params: decodeParam(paramsStr.split('#')) };
    });
  },
  defaultValue: [],
};

export const syncReduxAndUrl = () =>
  ReduxQuerySync({
    store,
    params: {
      bar: FilterBarParam,
      tab: TabParam,
      chart: ChartParam,
      filters: FilterParams,
    },
    initialTruth: 'location',
  });
