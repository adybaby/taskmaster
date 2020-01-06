import { fade } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: 'theme.shape.borderRadius',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%'
    }
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
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7)
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  tab: {
    minWidth: 78,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1
    }
  },
  secondaryBar: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #e8e8e8'
  },
  filterBar: {
    display: 'flex',
    flexDirection: 'row'
  },
  filterButton: {
    marginRight: theme.spacing(3)
  },
  formControl: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    margin: theme.spacing(4),
    minWidth: 100
  },
  selectEmpty: {
    marginTop: theme.spacing(4)
  }
});

export default styles;
