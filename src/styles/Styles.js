import React from 'react';
import {
  fade,
  createMuiTheme,
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { create } from 'jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import preset from 'jss-preset-default';

const jss = create();
jss.setup(preset());

// colours
const mainColor = '#4989b6';
const initBgColor = '#edf3f8';
const initDialogColor = '#b6d0e2';
const initTextColor = '#24445b';
const initErrPageBgColor = '#f6eeee';
const initErrBgColor = '#532d2d';
const initErrTextColor = '#f6eeee';
const linkHoverColor = '#66bfed';
const errorColor = 'red';
const highlightColor = '#6e9fc4';
const aagBgColor = '#f2faff';
const hintTitleBgColor = '#a6c4d9';
const hintBgColor = '#f2faff';
const interestVacancyInfoBgColor = '#f2faff';
const inspectorDaySummaryBgColor = '#b6d0e2';
const datePickerBgColor = '#f2f2f2';
const strongButtonTextColor = '#696969';
const strongBorderColor = '#a9a9a9';
const vacancyHeaderColor = '#b6d0e2';
const interestDialogColor = '#b6d0e2';
const vacancyOpenColor = 'green';
const vacancyClosedColor = '#a6a6a6';
const vacancySignUpColor = mainColor;
const vacancyTitleColor = '#f2f2f2';
const idPanelColour = '#f2f2f2';
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
  hint: { title: 'body1', subTitle: 'body1', body: 'body2', help: 'caption' },
  task: { heading: 'h5', body: 'body1' },
  taskList: { tasksCount: 'subtitle1' },
  filters: { filterButton: 'caption' },
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
    info: 'caption',
  },
  inspector: {
    title: 'caption',
    heading: 'caption',
    body: 'caption',
    note: 'caption',
    date: 'caption',
  },
  datesDialog: { error: 'body1' },
  user: {
    name: 'h5',
    heading: 'h5',
    body: 'body1',
  },
  error: { title: 'h6', details: 'caption' },
};

// viewport scaling
const maxSmall = 715;
const maxMedium = 1200;

const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: maxSmall,
      md: maxMedium,
    },
  },
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
  palette: {
    primary: {
      main: mainColor,
    },
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

const smallVp = theme.breakpoints.down('xs');
const mediumVp = theme.breakpoints.only('sm');
const mediumOrLargeVp = theme.breakpoints.up('sm');
const largeVp = theme.breakpoints.up('lg');

const scaledWidth = {
  [largeVp]: { minWidth: 200 },
  [mediumVp]: { minWidth: 90 },
  [smallVp]: { minWidth: 0 },
};

export const useStyles = () =>
  makeStyles({
    // startup
    initialisingBg: {
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: initBgColor,
    },
    initErrBg: {
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: initErrPageBgColor,
    },
    initialisingPageContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      minWidth: '100vw',
    },
    initiatilising: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: initDialogColor,
      color: initTextColor,
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0px 3px 10px ${theme.palette.divider}`,
      padding: theme.spacing(3),
    },
    initiatilisingError: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: initErrBgColor,
      color: initErrTextColor,
      borderRadius: theme.shape.borderRadius,
      boxShadow: `0px 3px 10px ${theme.palette.divider}`,
      padding: theme.spacing(3),
    },
    initialisingIcon: {
      padding: theme.spacing(2),
    },

    // Common

    filledButton: {
      flexGrow: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 5,
      paddingRight: 5,
      marginLeft: theme.spacing(1),
      margin: 1,
      alignSelf: 'center',
      justifySelf: 'end',

      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover,&.Mui-selected&:hover': {
        backgroundColor: vacancySignUpColor,
      },
    },
    primaryButton: {
      color: theme.palette.primary.main,
      paddingLeft: theme.spacing(2),
      fontWeight: 'bold',
    },
    primaryButtonDense: {
      minHeight: 0,
      minwidth: 0,
      padding: 0,
      color: theme.palette.primary.main,
    },

    dropDownLayout: {
      display: 'flex',
      [smallVp]: {
        flexDirection: 'column',
      },
      [mediumOrLargeVp]: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      },
    },
    dropDownLayoutTwoLines: {
      display: 'flex',
      flexDirection: 'column',
    },
    dropDownTitle: {
      [smallVp]: {
        marginTop: theme.spacing(2),
      },
    },
    dropDownControl: {
      minWidth: 150,
      marginTop: 10,
      borderRadius: 4,
      fontSize: 16,
      position: 'relative',
      border: '1px solid #ced4da',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    dropDownSelect: { minHeight: '30px' },

    generalMessage: { paddingLeft: theme.spacing(2) },
    generalError: {
      display: 'flex',
      width: '75%',
      flexDirection: 'column',
      margin: `20px 0 0 20px`,
      color: errorColor,
    },
    generalErrorTitle: {
      borderBottom: '1px solid red',
      marginBottom: theme.spacing(2),
    },

    idPanel: {
      background: idPanelColour,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      '&[data-more-padding="true"]': {
        paddingLeft: theme.spacing(3),
      },
      paddingRight: theme.spacing(2),
    },

    readEditTabBar: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
      paddingLeft: theme.spacing(2),
      zIndex: 1,
    },

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
      borderRadius: theme.shape.borderRadius,
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
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
    },
    tab: {
      ...scaledWidth,
      '&:hover': {
        color: highlightColor,
        opacity: 1,
      },
    },
    tabLabel: {
      display: 'flex',
      alignItems: 'center',
    },
    appBarButton: {
      minWidth: '0px',
    },
    filterBarButton: {
      ...scaledWidth,
      [smallVp]: {
        display: 'none',
      },
      '&&': {
        borderStyle: 'none',
        color: strongButtonTextColor,
      },
      '&:hover,&.Mui-selected&:hover': {
        color: highlightColor,
      },
      '&.Mui-selected': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      },
    },
    filterDrawerButton: {
      ...scaledWidth,
      [mediumOrLargeVp]: { display: 'none' },
      minWidth: '0px',
      '&&': {
        borderStyle: 'none',
        color: strongButtonTextColor,
      },
      '&:hover,&.Mui-selected&:hover': {
        color: highlightColor,
      },
    },

    // FilterBar
    filterBarContainer: {
      [smallVp]: {
        display: 'none',
      },
    },
    filterBar: {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing(1),
    },
    selectButton: {
      [smallVp]: { width: '100%' },
      textTransform: 'none',
      justifyContent: 'left',
      paddingLeft: theme.spacing(1),
      '&[data-filter-on="false"]': {
        fontWeight: 'regular',
        color: strongButtonTextColor,
      },
      '&[data-filter-on="true"]': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      },
    },
    filterSummary: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'noWrap',
      alignItems: 'center',
    },
    filterSummaryTypography: {
      '&[data-filter-on="false"]': {
        fontWeight: 'regular',
        color: strongButtonTextColor,
      },
      '&[data-filter-on="true"]': {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
      },
    },
    checkGroupControlButton: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    checkGroupMaxSelectedWarning: {
      backgroundColor: '#800000',
      color: 'white',
    },
    filterBarHint: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
    },

    // Task List
    taskListContainer: {
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      flex: '100%',
    },
    taskBody: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
    taskListEntry: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    taskResult: {
      display: 'flex',
      flexDirection: 'column',
    },
    resultDescription: { paddingTop: '4px', paddingBottom: '4px' },
    resultFooter: { display: 'flex', flexDirection: 'column' },
    taskListHint: { marginBottom: theme.spacing(2) },

    // Tasks
    taskHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `2px solid ${strongBorderColor}`,
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    taskInfoButton: {
      minWidth: 0,
      color: 'darkGrey',
      '&[data-selected="true"]': {
        color: theme.palette.primary.main,
      },
    },
    taskContent: { padding: theme.spacing(3) },
    taskSectionHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing(1),
    },
    taskSectionBody: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2) },
    editTaskFooter: {
      bottom: '0',
      transform: 'translateY(100%)',
      transition: 'transform .35s ease',
      minHeight: '0',
      display: 'flex',
      [smallVp]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      [mediumOrLargeVp]: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },

      boxShadow: `0px -2px 4px darkGrey`,
      color: 'white',
      padding: 10,
      paddingLeft: 20,
      width: '100%',
      position: 'fixed',
      background: '#4989b6',

      '&.open': {
        transform: 'translateY(0%)',
      },
    },
    taskEditedMessageDiv: { [mediumOrLargeVp]: { flexGrow: 2, alignItems: 'center' } },
    taskEditedMessage: { [smallVp]: { paddingLeft: 8, paddingBottom: 6, paddingTop: 6 } },

    // Tasks: Vacancy boxes
    vacancySection: {
      display: 'flex',
      [smallVp]: { width: '100%', flexWrap: 'noWrap', flexDirection: 'column' },
      [mediumOrLargeVp]: { flexWrap: 'wrap', flexDirection: 'row' },
    },
    vacancyContainer: {
      marginRight: theme.spacing(2),
      [mediumOrLargeVp]: { minWidth: '460px' },
      [smallVp]: { minWidth: '260px' },
      marginBottom: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    vacancyBody: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'noWrap',
      padding: theme.spacing(1),
    },
    vacancyHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
      backgroundColor: vacancyHeaderColor,
    },
    vacancyStatus: {
      backgroundColor: 'white',
      '&[data-open="true"]': {
        color: vacancyOpenColor,
      },
      '&[data-open="false"]': {
        color: vacancyClosedColor,
      },
      color: theme.palette.common.white,
      paddingTop: '2px',
      paddingBottom: '2px',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      textTransform: 'uppercase',
    },
    vacancyFieldsTable: {
      width: '100%',
      display: 'grid',
      [mediumOrLargeVp]: { gridTemplateColumns: '25% 75%' },
      [smallVp]: { gridTemplateColumns: '30% 70%' },
    },
    vacancyFieldTitle: {
      fontWeight: 'bold',
      flexBasis: '45%',
      paddingRight: theme.spacing(4),
      flexGrow: 1,
    },
    vacancyFieldValue: {
      flexGrow: 1,
    },
    vacancyPeriod: {
      display: 'flex',
      [mediumOrLargeVp]: {
        flexWrap: 'noWrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'center',
      },
      [smallVp]: { flexWrap: 'wrap', flexDirection: 'col' },
      '&:hover': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: vacancySignUpColor,
        color: 'white',
      },
    },
    vacancyValueInner: { paddingLeft: 4 },
    periodDate: {
      flexWrap: 'wrap',
      flexDirection: 'col',
      paddingLeft: 4,
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      '&:hover': {
        backgroundColor: 'white',
        color: theme.palette.text.primary,
      },
    },

    // AddEditVacancy Dialog
    editVacancyHeader: {
      zIndex: 1000,
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      backgroundColor: interestDialogColor,
    },
    editVacancyContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    editVacancyPaper: {
      [smallVp]: {
        maxWidth: '100%',
        width: '100%',
        margin: 0,
      },
    },
    editVacancyBody: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    editVacancyTitle: {
      background: vacancyTitleColor,
    },
    vacancyComments: {
      width: '100%',
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    // interest section
    interestDialogContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    interestDialogPaper: {
      [smallVp]: {
        maxWidth: '100%',
        width: '100%',
        margin: 0,
      },
    },
    interestDialogHeader: {
      padding: theme.spacing(2),
      backgroundColor: interestDialogColor,
    },
    interestVacancyHeader: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    interestVacancyInfoContainer: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: interestVacancyInfoBgColor,
    },
    interestVacancyInfoTable: {
      display: 'grid',
      gridTemplateColumns: '30% 70%',
      padding: theme.spacing(2),
    },
    interestControlsContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    interestSignUpOptionRadio: {},
    interestNestedRadioGroup: { paddingLeft: theme.spacing(3), paddingBottom: theme.spacing(2) },
    interestComments: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    interestButton: {
      [mediumOrLargeVp]: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
      },
      [smallVp]: { width: '100%', justifyContent: 'left' },
    },
    interestButtons: {
      display: 'flex',
      [mediumOrLargeVp]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      [smallVp]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
        flexWrap: 'wrap',
        flexDirection: 'col',
      },
    },
    alreadyRespondedNote: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      background: interestDialogColor,
    },

    // VacancyInterests
    vacancyInterestsHeader: {
      marginLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    vacancyInterestContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderTop: `1px solid ${theme.palette.divider}`,
    },

    // InterestsInfo
    interestInfoTitle: { paddingBottom: theme.spacing(1) },
    interestInfoContainer: { padding: theme.spacing(2) },

    // Map
    mapContent: { display: 'flex', padding: theme.spacing(2), flexDirection: 'column' },
    mapDriverTitle: {
      paddingBottom: theme.spacing(1),
      borderBottom: `1px solid ${strongBorderColor}`,
      marginBottom: theme.spacing(2),
    },
    mapHint: { marginBottom: theme.spacing(2) },

    // At a glance
    aagPanel: {
      border: `1px solid ${theme.palette.divider}`,
      [smallVp]: {
        backgroundColor: aagBgColor,
        padding: theme.spacing(1),
        minWidth: '270px',
        transition: 'max-height .25s ease-in-out',
      },
      [mediumOrLargeVp]: {
        '&[data-edit="false"]': {
          float: 'right',
          width: '440px',
          marginLeft: theme.spacing(5),
          marginTop: theme.spacing(2),
          boxShadow: `0px 3px 10px ${theme.palette.divider}`,
        },
      },
      marginBottom: theme.spacing(2),
      '&[data-edit="true"]': { width: '100%', backgroundColor: aagBgColor },
    },
    aagTable: {
      display: 'grid',
      gridTemplateColumns: '35% 65%',
      padding: theme.spacing(1),
    },
    aagHeader: {
      '&[data-edit="true"]': { display: 'none' },
      [smallVp]: { display: 'none' },
      fontWeight: 'bold',
      gridColumn: '1 / span 2',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      fontStyle: 'italic',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    aagTitle: {
      '&[data-edit="true"]': { color: 'grey' },
      '&[data-edit="false"]': { fontWeight: 'bold' },
      paddingBottom: theme.spacing(1),
      gridColumn: 1,
      [mediumOrLargeVp]: { paddingLeft: theme.spacing(2) },
    },
    aagValue: {
      gridColumn: 2,
      paddingBottom: theme.spacing(1),
    },
    aagList: {
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
    },

    // Hints
    hintPanel: {
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: hintBgColor,
    },
    hintTitle: {
      fontWeight: 'bold',
      backgroundColor: hintTitleBgColor,
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    hintSubTitle: {
      fontWeight: 'bold',
    },
    hintBlock: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    hintImage: {
      maxWidth: '98%',
      maxHeight: 120,
      justifySelf: 'center',
      border: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(1),
    },

    // Charts
    chartsLayoutContainer: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    },
    chartMenuSideBar: {
      [smallVp]: {
        display: 'none',
      },
      borderRight: `1px solid ${theme.palette.divider}`,
      width: '180px',
      flexGrow: 0,
    },
    inspectorSideBar: {
      [smallVp]: {
        display: 'none',
      },
      borderLeft: `1px solid ${theme.palette.divider}`,
      width: '180px',
      flexGrow: 0,
    },
    chartLayoutBody: { flexGrow: 1 },
    chartHeadingContainer: {
      paddingTop: 4,
      paddingLeft: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    chartHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    chartSelectButton: {
      [mediumOrLargeVp]: {
        display: 'none',
      },
      minWidth: 0,
      paddingLeft: 0,
    },
    chartHeadingLabel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    chartDownloadButton: {
      minwidth: 0,
      marginLeft: 'auto',
      color: theme.palette.primary.main,
    },
    chartMenuBody: {
      paddingTop: 0,
    },
    chartMenu: {
      paddingLeft: theme.spacing(1),
    },
    chartMenuFolder: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    chartListItem: {
      paddingLeft: theme.spacing(1),
    },
    chartInfo: {},
    continuousChartLegend: { padding: theme.spacing(3) },
    discreteChartLegend: {
      padding: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
    },
    chartHint: { marginTop: theme.spacing(1), marginBottom: theme.spacing(2) },
    // inspector
    inspectorToolTip: {
      zIndex: 99999,
      position: 'fixed',
    },
    inspectorHeading: {
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    inspectorSectionHeading: {
      paddingBottom: '3px',
    },
    inspectorDaySummary: {
      backgroundColor: inspectorDaySummaryBgColor,
    },
    inspectorLayoutContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    inspectorBody: { paddingLeft: theme.spacing(1), paddingTop: theme.spacing(0) },
    inspectorLine: {
      paddingBottom: 6,
    },
    inspectorInteriorSection: { padding: theme.spacing(1) },

    // user profile
    userHeading: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'centre',
      justifyContent: 'space-between',
      borderBottom: `2px solid ${strongBorderColor}`,
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    userContent: { padding: theme.spacing(3) },
    userSectionHeading: { paddingBottom: theme.spacing(1) },
    userSectionBody: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2) },
    signedUpLink: { paddingBottom: theme.spacing(1) },

    // User actions
    userActionsPanel: {
      paddingLeft: theme.spacing(2),
    },
    userActionButton: { color: theme.palette.primary.main, fontWeight: 'bold' },

    // Contributions
    contributionList: { paddingLeft: theme.spacing(3), paddingBottom: theme.spacing(2) },
    contributeLink: { paddingBottom: '6px' },

    // drawer
    drawerBody: {
      minWidth: '180px',
    },
    drawerControls: {
      minWidth: '180px',
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    closeDrawerButton: {
      width: '100%',
      justifyContent: 'left',
      paddingLeft: theme.spacing(2),
    },

    // date dialog and picker
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
    datesDialogInputsWrapper: { flexGrow: 1 },
    dateDialogFieldWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      '&[data-target="true"]': { backgroundColor: datePickerBgColor },
    },
    dateDialogPickerWrapper: {
      [smallVp]: { display: 'none' },
      marginTop: theme.spacing(1),
      backgroundColor: datePickerBgColor,
    },
    errorMsg: { paddingTop: theme.spacing(2), color: errorColor },
    datePickerDayWrapper: {
      '&[data-highlight="false"]': {
        background: datePickerBgColor,
      },
      '&[data-highlight="true"]': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: '50%',
      },
    },
    datePickerDay: {
      width: 36,
      height: 36,
      fontSize: theme.typography.caption.fontSize,
      margin: '0 2px',
    },

    // label dissappears when small
    hidingLabel: {
      marginLeft: theme.spacing(1),
      [smallVp]: {
        display: 'none',
      },
    },

    // links
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
      '&:focus,&:visited, &:link, &:active': {
        textDecoration: 'none',
      },
      '&:hover': {
        textDecoration: 'none',
        color: linkHoverColor,
      },
    },
  });

export const StyledApp = ({ children }) => (
  <StylesProvider jss={jss}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </StylesProvider>
);
