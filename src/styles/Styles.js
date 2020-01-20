import { fade } from '@material-ui/core/styles';

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  search: {
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
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  link: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7)
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
    marginRight: theme.spacing(4),
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(4)
  },
  tabIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1)
  }
});

export default styles;
