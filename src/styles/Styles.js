import { fade, createMuiTheme } from '@material-ui/core/styles';

// viewport scaling
const maxMedium = 900;
const maxSmall = 715;
const smallVp = `@media only screen and (min-width: 0px) and (max-width: ${maxSmall}px)`;
const mediumVp = `@media only screen and (min-width: ${maxSmall}px) and (max-width: ${maxMedium}px)`;
const mediumOrLargeVp = `@media only screen and (min-width: ${maxSmall + 1}px)`;
const largeVp = `@media only screen and (min-width: ${maxMedium + 1}px)`;
const shrinkButton = {
  [largeVp]: { minWidth: 120 },
  [mediumVp]: { minWidth: 80 },
  [smallVp]: { minWidth: 0 },
};

// colours
const aagBgColor = '#f2faff';
const datePickerBgColor = '#f2f2f2';
const tabHighlightColor = '#40a9ff';
export const CHART_COLORS = { MIN: 'lightGrey', MAX: '#33ACFF', HIGHLIGHTED: '#FFA500' };
export const KELLY = [
  '#F2F3F4',
  '#222222',
  '#F3C300',
  '#875692',
  '#F38400',
  '#A1CAF1',
  '#BE0032',
  '#C2B280',
  '#848482',
  '#008856',
  '#E68FAC',
  '#0067A5',
  '#F99379',
  '#604E97',
  '#F6A600',
  '#B3446C',
  '#DCD300',
  '#882D17',
  '#8DB600',
  '#654522',
  '#E25822',
  '#2B3D26',
];

// typography variants
export const typographyVariant = {
  aag: { title: 'body2', value: 'body2', note: 'caption' },
  task: { heading: 'h5', body: 'body1' },
  taskList: { tasksCount: 'subtitle1' },
  taskResult: {
    editingSummary: 'caption',
    durationSummary: 'caption',
    resultDescription: 'body1',
    title: 'h5',
    vacancyLinks: 'caption',
    tagsLinks: 'caption',
  },
  chart: {
    title: 'body1',
    body: 'body2',
  },
  inspector: {
    title: 'subtitle1',
    heading: 'body2',
    body: 'body2',
    note: 'caption',
    date: 'subtitle2',
  },
  datesDialog: { error: 'body1' },
  user: {
    name: 'h5',
    heading: 'h5',
    body: 'body1',
  },
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
  appTitle: {
    textDecoration: 'none',
    color: 'inherit',
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
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
  tabLabel: {
    display: 'flex',
    alignItems: 'center',
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
  selectButton: {
    textTransform: 'none',
    color: 'dimGray',
    paddingRight: theme.spacing(3),
  },

  // tasks
  taskHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `2px solid darkGrey`,
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  taskInfoButton: {
    paddingRight: theme.spacing(2),
    width: 0,
    color: 'dimGrey',
    '&&': {
      borderStyle: 'none',
    },
    '&:hover,&.Mui-selected&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },
  taskContent: { padding: theme.spacing(3) },
  taskSectionHeading: { paddingBottom: theme.spacing(1) },
  taskSectionBody: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2) },

  // Map
  mapContent: { display: 'flex', padding: theme.spacing(2), flexDirection: 'column' },
  mapDriverTitle: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid darkGrey`,
    marginBottom: theme.spacing(2),
  },

  // Contributions
  contributionList: { paddingLeft: theme.spacing(3), paddingBottom: theme.spacing(2) },
  contributeLink: { paddingBottom: '6px' },

  // Task List
  taskListEntry: { display: 'flex', flexDirection: 'column', paddingBottom: theme.spacing(3) },
  taskResult: {
    display: 'flex',
    flexDirection: 'column',
  },
  resultDescription: { paddingTop: '4px', paddingBottom: '4px' },
  resultFooter: { display: 'flex', flexDirection: 'column' },

  // At a glance
  aagTable: {
    [smallVp]: {
      backgroundColor: aagBgColor,
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(2),
      minWidth: '270px',
      transition: 'max-height .25s ease-in-out',
    },
    display: 'flex',
    flexDirection: 'column',
    [mediumOrLargeVp]: {
      float: 'right',
      width: '420px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(5),
      boxShadow: '0px 3px 10px lightGrey',
    },
  },
  aagBody: {
    [mediumOrLargeVp]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
  },
  aagHeader: {
    [smallVp]: { display: 'none' },
    [mediumOrLargeVp]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontStyle: 'italic',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
  aagRow: { display: 'flex', flexDirection: 'row', paddingBottom: theme.spacing(1) },
  aagTitle: {
    fontWeight: 'bold',
    flexBasis: '45%',
    paddingRight: theme.spacing(4),
    flexGrow: 1,
  },
  aagValue: { flexBasis: '65%', flexGrow: 9 },

  // user profile
  userHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'centre',
    justifyContent: 'space-between',
    borderBottom: `2px solid darkGrey`,
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  userContent: { padding: theme.spacing(3) },
  userSectionHeading: { paddingBottom: theme.spacing(1) },
  userSectionBody: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2) },
  signedUpLink: { paddingBottom: theme.spacing(1) },

  // Content Layout - full width
  fullWidthContent: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    flex: '100%',
  },
  taskBody: {
    marginTop: theme.spacing(2),
    width: '100%',
  },

  // Charts
  chartsLayoutContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  chartMenuSideBar: {
    [smallVp]: {
      display: 'none',
    },
    borderRight: `1px solid ${theme.palette.divider}`,
    maxWidth: '180px',
    flexGrow: '1',
  },
  inspectorSideBar: {
    [smallVp]: {
      display: 'none',
    },
    borderLeft: `1px solid ${theme.palette.divider}`,
    maxWidth: '180px',
    flexGrow: '1',
  },
  chartLayoutBody: {
    flexGrow: '1',
  },
  chartDrawer: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
  },
  chartDrawerBody: { padding: theme.spacing(2) },
  chartSelectButton: {
    [mediumOrLargeVp]: {
      display: 'none',
    },
    minWidth: 0,
  },
  chartHeader: {
    paddingLeft: theme.spacing(2),
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
  inspectorToolTip: {
    zIndex: 99999,
    position: 'absolute',
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
  resourceMarkBlock: { display: 'flex', flexDirection: 'column', paddingTop: theme.spacing(1) },
  resourceMarkSection: { padding: theme.spacing(1) },

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
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
});
