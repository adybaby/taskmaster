import { fade, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        marginTop: 1
      }
    }
  }
});

const styles = () => ({
  root: {
    display: 'inline'
  },

  // AppBar
  appBar: {
    flexGrow: 1
  },
  searchBox: {
    position: 'relative',
    borderRadius: 'theme.shape.borderRadius',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    flexGrow: 1
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInputRoot: {
    color: 'inherit',
    width: '100%'
  },
  searchTextRoot: {
    padding: theme.spacing(1, 1, 1, 7)
  },

  // Main Tab Bar
  mainTabBar: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e8e8e8'
  },
  tab: {
    minWidth: 78,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    }
  },
  tabIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  },
  filterButton: {
    marginRight: theme.spacing(3)
  },

  // FilterBar
  filterBar: {
    display: 'flex',
    flexDirection: 'row'
  },
  filterControl: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(4),
    minWidth: 150
  },

  // Content Layout - full width
  fullWidthContent: {
    margin: theme.spacing(2)
  },
  taskBody: {
    marginTop: theme.spacing(2)
  },

  // Content Layout - with sidebar
  contentWithSideBar_Container: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    flexDirection: 'row'
  },
  contentWithSideBar_sideBarLeft: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexGrow: '2',
    minWidth: '180px'
  },
  contentWithSideBar_sideBarRight: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    flexGrow: '2',
    minWidth: '180px'
  },
  contentWithSideBar_content: {
    paddingLeft: theme.spacing(2),
    flexGrow: '8'
  },

  // General Padding
  topPadding: {
    paddingTop: theme.spacing(1)
  },
  leftPadding: {
    paddingLeft: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(1)
  }
});

export default styles;
