import { fade, createMuiTheme } from '@material-ui/core/styles';

const maxMedium = 900;
const maxSmall = 715;

const smallVp = `@media only screen and (min-width: 0px) and (max-width: ${maxSmall - 1}px)`;
const mediumVp = `@media only screen and (min-width: ${maxSmall}px) and (max-width: ${
  maxMedium - 1
}px)`;
const mediumOrLargeVp = `@media only screen and (min-width: ${maxSmall + 1}px)`;
const largeVp = `@media only screen and (min-width: ${maxMedium + 1}px)`;

const shrinkButton = {
  [largeVp]: { minWidth: 120 },
  [mediumVp]: { minWidth: 80 },
  [smallVp]: { minWidth: 0 },
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: { backgroundColor: 'white', height: '100%' },
        html: { backgroundColor: 'white', height: '100%' },
        '#app,#root,#app>div': { height: '100%' },
      },
    },
    MuiDivider: {
      root: {
        marginTop: 1,
      },
    },
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        backgroundColor: '#f2f2f2',
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: '#f2f2f2',
      },
    },
  },
});

export const styles = () => ({
  root: {
    display: 'inline',
  },

  // grouping to keep controls at top
  headerControls: { position: 'sticky', left: 0, top: 0, width: '100%' },

  // AppBar
  appBar: {
    position: 'sticky',
    left: 0,
    top: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    alignItems: 'center',
    flexWrap: 'nowrap',
    boxShadow: '0px 3px 10px grey',
    color: 'white',
    zIndex: 10,
  },

  // search box
  searchBox: {
    position: 'relative',
    borderRadius: 'theme.shape.borderRadius',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    flexGrow: 1,
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchTextRoot: {
    padding: theme.spacing(1, 1, 1, 7),
  },

  // Main Tab Bar
  mainTabBar: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e8e8e8',
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    zIndex: 1,
  },
  tab: {
    ...shrinkButton,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
  },
  tabIcon: {
    verticalAlign: 'middle',
  },
  filterButton: {
    ...shrinkButton,
    '&&': {
      borderStyle: 'none',
      color: 'dimGray',
    },
    '&:hover,&.Mui-selected&:hover': {
      color: theme.palette.info.light,
    },
    '&.Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    },
  },
  appBarButton: {
    minWidth: '0px',
  },

  // FilterBar
  filterBarContainer: {
    [smallVp]: {
      display: 'none',
    },
  },
  filterDrawerContainer: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
  },
  drawerControls: {
    borderTop: '1px solid #e8e8e8',
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    borderBottom: '1px solid #e8e8e8',
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.spacing(1),
  },
  filterControl: {
    textTransform: 'none',
    color: 'DimGray',
    paddingRight: theme.spacing(3),
  },
  selectButton: {
    textTransform: 'none',
    color: 'DimGray',
    paddingRight: theme.spacing(3),
  },

  // Content Layout - full width
  fullWidthContent: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    width: '100%',
  },
  taskBody: {
    marginTop: theme.spacing(2),
    width: '100%',
  },

  // Charts
  contentWithSideBar_Container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  contentWithSideBar_sideBarLeft: {
    [smallVp]: {
      display: 'none',
    },
    borderRight: `1px solid ${theme.palette.divider}`,
    maxWidth: '180px',
    flexGrow: '1',
  },
  contentWithSideBar_sideBarRight: {
    [smallVp]: {
      display: 'none',
    },
    borderLeft: `1px solid ${theme.palette.divider}`,
    maxWidth: '180px',
    flexGrow: '1',
  },
  contentWithSideBar_content: {
    flexGrow: '1',
  },
  chartInspectorDrawer: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
  },
  chartSelectDrawer: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
  },
  chartSelectButton: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
  },
  chartHeader: {
    [mediumOrLargeVp]: { paddingLeft: theme.spacing(2) },
    display: 'flex',
    flexDirection: 'row',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  continuousChartLegend: { padding: theme.spacing(3) },
  discreteChartLegend: {
    padding: theme.spacing(3),
    display: 'flex',
    flexWrap: 'wrap',
  },
  chartHint: {
    [smallVp]: {
      display: 'none',
    },
  },

  // Task List
  taskResult: {
    paddingBottom: theme.spacing(2),
  },

  // datepicker
  datePickerInput: {
    '&$datePickerInputFocussed': {
      backgroundColor: '#f2f2f2',
    },
  },
  datePickerInputFocussed: {},

  // General
  topPadding: {
    paddingTop: theme.spacing(1),
  },
  leftPadding: {
    paddingLeft: theme.spacing(1),
  },
  padding: {
    padding: theme.spacing(1),
  },
  hidingLabel: {
    marginLeft: theme.spacing(1),
    [smallVp]: {
      display: 'none',
    },
  },

  // links
  title: {
    textDecoration: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
});
