import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  nav: {
      opacity: 1,
      color: 'white',
      background: '#00b4ff'
    },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

const Navbar = ({onSearch}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.nav}  position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">Weather App</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="City,Country"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={onSearch}
            />
          </div>
          <Link className={classes.link} to="/login"><Button color="inherit">Login</Button></Link>
          <Link  className={classes.link} to="/register"><Button color="inherit">Register</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;