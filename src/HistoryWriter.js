/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, withQueryParams, BooleanParam } from 'use-query-params';
import { TABS, DEFAULT_CHART, getResourceChartDefinition } from './constants/Constants';
import { getUserSelectedFilters } from './state/selectors/FilterSelector';
import { formatUrlDate, ukToUs } from './util/Dates';
import { setFiltersParams } from './state/actions/FilterParamActions';
import { setSelectedChart } from './state/actions/SelectedChartActions';
import { setCurrentTab } from './state/actions/CurrentTabActions';
import { setFilterBarVisible } from './state/actions/FilterBarVisibleActions';

export const TabParam = {
  encode(tab) {
    return tab != null && tab !== TABS.all ? tab.id : undefined;
  },

  decode(strTab) {
    return strTab != null && strTab !== '' ? TABS[strTab] : undefined;
  },
};

export const ChartParam = {
  encode(chart) {
    return chart != null ? chart.id : undefined;
  },

  decode(strChart) {
    return strChart != null && strChart !== '' ? getResourceChartDefinition(strChart) : undefined;
  },
};

const encodeParamsForFilter = (params) => {
  if (params == null) {
    return undefined;
  }
  if (params.length > 0 && params[0].id != null) {
    return params.map((param) => [param.id, param.checked].join('__'));
  }
  if (params.length !== 3) {
    return params;
  }
  return [
    params[0],
    params[1] == null ? null : formatUrlDate(params[1]),
    params[2] == null ? null : formatUrlDate(params[2]),
  ];
};

const decodeParamsForFilter = (paramStrs) => {
  if (paramStrs == null) {
    return undefined;
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

export const FiltersParam = {
  encode({ filterDescriptions, filterParams }) {
    if (filterDescriptions == null || filterDescriptions.length === 0) {
      return undefined;
    }
    const encodedStr = filterDescriptions
      .map((fd) => `${fd.id}~${encodeParamsForFilter(filterParams[fd.id]).join('#')}`)
      .join('$');

    return encodedStr;
  },

  decode(strFilters) {
    if (strFilters == null || strFilters === '') {
      return undefined;
    }
    const filterParams = {};
    const filters = strFilters.split('$');
    filters.forEach((filter) => {
      const [filterId, paramsStr] = filter.split('~');
      const params = decodeParamsForFilter(paramsStr.split('#'));
      filterParams[filterId] = params;
    });
    return filterParams;
  },
};

const HistoryWriter = ({ query, setQuery }) => {
  const dispatch = useDispatch();

  const filterParams = useSelector((state) => state.filterParams);
  const currentTab = useSelector((state) => state.currentTab);
  const filterBarVisible = useSelector((state) => state.filterBarVisible);
  const selectedChart = useSelector((state) => state.selectedChart);
  const filterDescriptions = useSelector(getUserSelectedFilters);

  const [chart_, setChart] = useQueryParam('chart', ChartParam);
  const [bar_, setBar] = useQueryParam('bar', BooleanParam);
  const [tab_, setTab] = useQueryParam('tab', TabParam);
  const [filters_, setFilters] = useQueryParam('filters', FiltersParam);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised) {
      setInitialised(true);
      const { chart, bar, tab, filters } = query;
      if (tab != null) {
        dispatch(setCurrentTab(tab));
      }
      if (chart != null) {
        dispatch(setSelectedChart(chart));
      }
      if (bar != null) {
        dispatch(setFilterBarVisible(bar));
      }
      if (filters != null) {
        dispatch(setFiltersParams(filters));
      }
    }
  }, [query, dispatch, initialised]);

  useEffect(() => {
    setBar(filterBarVisible ? true : undefined);
  }, [setBar, filterBarVisible]);

  useEffect(() => {
    setTab(currentTab);
  }, [setTab, currentTab]);

  useEffect(() => {
    setChart(
      selectedChart !== DEFAULT_CHART && currentTab === TABS.charts ? selectedChart : undefined
    );
  }, [setChart, selectedChart, currentTab]);

  useEffect(() => {
    setFilters({ filterDescriptions, filterParams });
  }, [setFilters, filterDescriptions, filterParams]);

  return null;
};

export default withQueryParams(
  { chart: ChartParam, tab: TabParam, bar: BooleanParam, filters: FiltersParam },
  HistoryWriter
);
