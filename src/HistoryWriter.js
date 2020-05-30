/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, withQueryParams, BooleanParam } from 'use-query-params';
import { TABS, DEFAULT_CHART, getResourceChartDefinition } from './constants/Constants';
import { getUserSelectedFilters } from './state/selectors/FilterSelector';
import { formatUrlDate } from './util/Dates';
import { setFiltersParams } from './state/actions/FilterParamActions';
import { setSelectedChart } from './state/actions/SelectedChartActions';
import { setCurrentTab } from './state/actions/CurrentTabActions';
import { setFilterBarVisible } from './state/actions/FilterBarVisibleActions';

export const TabParam = {
  encode(tab) {
    return typeof tab !== 'undefined' && tab !== TABS.all ? tab.id : undefined;
  },

  decode(strTab) {
    return typeof strTab !== 'undefined' && strTab !== '' ? TABS[strTab] : undefined;
  },
};

export const ChartParam = {
  encode(chart) {
    return typeof chart !== 'undefined' ? chart.id : undefined;
  },

  decode(strChart) {
    return typeof strChart !== 'undefined' && strChart !== ''
      ? getResourceChartDefinition(strChart)
      : undefined;
  },
};

const checkForDates = (params) => {
  if (params.length !== 3) {
    return params;
  }
  return [params[0], formatUrlDate(params[1]), formatUrlDate(params[2])];
};

export const FiltersParam = {
  encode({ filterDescriptions, filterParams }) {
    if (typeof filterDescriptions === 'undefined' || filterDescriptions.length === 0) {
      return undefined;
    }
    const encodedStr = filterDescriptions
      .map((fd) => `${fd.id}~${checkForDates(filterParams[fd.id]).join('#')}`)
      .join('$');

    return encodedStr;
  },

  decode(strFilters) {
    if (typeof strFilters === 'undefined' || strFilters === '') {
      return undefined;
    }
    const filterParams = {};
    const filters = strFilters.split('$');
    filters.forEach((filter) => {
      const [filterId, paramsStr] = filter.split('~');
      let params = paramsStr.split('#');
      if (params.length === 3) {
        params = [
          params[0],
          new Date(params[1].split('_').join('/')),
          new Date(params[2].split('_').join('/')),
        ];
      }
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
      if (typeof tab !== 'undefined') {
        dispatch(setCurrentTab(tab));
      }
      if (typeof chart !== 'undefined') {
        dispatch(setSelectedChart(chart));
      }
      if (typeof bar !== 'undefined') {
        dispatch(setFilterBarVisible(bar));
      }
      if (typeof filters !== 'undefined') {
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
  { chart: ChartParam, bar: BooleanParam, tab: TabParam, filters: FiltersParam },
  HistoryWriter
);
