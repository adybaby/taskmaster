import { fade, createMuiTheme } from '@material-ui/core/styles';

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

  // AppBar
  appBar: {
    flexGrow: 1,
  },
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
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e8e8e8',
    paddingLeft: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  tab: {
    minWidth: 78,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
  },
  tabIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  filterButton: {
    marginRight: theme.spacing(3),
    '&&': {
      borderStyle: 'none',
      color: 'dimGray',
    },
    '&:hover,&.Mui-selected&:hover': {
      color: theme.palette.info.light,
      backgroundColor: 'transparent',
    },
    '&.Mui-selected': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },

  // FilterBar
  filterBar: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing(2),
    paddingBottoms: theme.spacing(1),
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
  },
  taskBody: {
    marginTop: theme.spacing(2),
  },

  // Content Layout - with sidebar
  contentWithSideBar_Container: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  contentWithSideBar_sideBarLeft: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexGrow: '2',
    minWidth: '180px',
  },
  contentWithSideBar_sideBarRight: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    flexGrow: '2',
    minWidth: '180px',
  },
  contentWithSideBar_content: {
    paddingLeft: theme.spacing(2),
    width: '100%',
    flexGrow: '8',
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
