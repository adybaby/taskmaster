import { fade, createMuiTheme } from '@material-ui/core/styles';

// viewport scaling
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

const datePickerBgColor = '#f2f2f2';
const tabHighlightColor = '#40a9ff';

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
        backgroundColor: datePickerBgColor,
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: datePickerBgColor,
      },
    },
  },
});

export const styles = () => ({
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
    color: theme.palette.common.white,
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
      color: tabHighlightColor,
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
  filterDrawerBody: { padding: theme.spacing(1) },
  filterBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
  },
  filterControl: {
    textTransform: 'none',
    color: 'dimGray',
    paddingRight: theme.spacing(3),
  },
  selectButton: {
    textTransform: 'none',
    color: 'dimGray',
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
  chartDrawer: {
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
    [mediumOrLargeVp]: { paddingLeft: theme.spacing(1) },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
  inspectorHeading: {
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  inspectorBody: { paddingLeft: theme.spacing(1), paddingTop: theme.spacing(1) },
  chartMenu: {
    paddingLeft: theme.spacing(1),
  },
  resourceMarkBlock: { paddingTop: theme.spacing(1) },
  resourceMarkSection: { padding: theme.spacing(1) },

  // Task List
  taskResult: {
    paddingBottom: theme.spacing(2),
  },

  // datepicker
  datePickerInput: {
    '&$datePickerInputFocussed': {
      backgroundColor: datePickerBgColor,
    },
  },
  datePickerInputFocussed: {},
  datePickerField: {
    [smallVp]: {
      display: 'none',
    },
  },
  datesDialogBody: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  datesDialogInputBg: { display: 'flex', backgroundColor: datePickerBgColor },
  datesDialogJoiner: { padding: theme.spacing(1) },
  datesDialogInputsWrapper: { flexGrow: 1 },
  datesDialogErrorMsg: { paddingTop: theme.spacing(2), color: 'red' },

  // label dissappears when small
  hidingLabel: {
    marginLeft: theme.spacing(1),
    [smallVp]: {
      display: 'none',
    },
  },

  // bottom controls of drawers in small display
  drawerControls: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
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
