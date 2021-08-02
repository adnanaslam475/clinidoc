import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Logo from '../assets/logo-light.png'
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';

import { Button, withStyles, fade } from '@material-ui/core';
import CustomDialog from './CustomDialog';

const NavBarStyles = theme => ({
  root: {
    background: 'white',
  },
  grow: {
    flexGrow: 1,
  },

  logo:
  {
    width: '32px',
    marginRight: '10px'
  },

  title: {
    color: 'black',

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#eeeeee', 0.35),
    '&:hover': {
      backgroundColor: fade('#4c4c4c', 0.15),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '1ch',
    '&:focus': {
      width: '10ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '3ch',
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      '&:focus': {
        width: '20ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  buttonRoot: {
    height: '80px',
    fontWeight: 'bold',
    borderRadius: '0px',
    textTransform: 'none',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
    },
    "&:hover":
    {

      borderBottom: '3px solid #008FFF'
    }
  },
  buttonRootB: {
    background: '#008FFF',
    textTransform: 'none',
    marginLeft: '5px',
    color: 'white',
    font: 'Open Sans',
    height: '40px',
    marginTop: '0px',
    whiteSpace: 'nowrap'
  },
  appBarDivider:
  {
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    width: '1px',
    height: '60px',
    background: '#eeeeee'
  }


});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isDialogOpen: false }
  }

  handleOpen = () => {
    this.setState({ isDialogOpen: true })
  }

  handleClose = () => {
    this.setState({ isDialogOpen: false })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>

            <img src={Logo} className={classes.logo} />

            <Typography className={classes.title} variant="h6" noWrap>
              CliniDoc
                    </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon style={{ color: 'grey' }} />
              </div>
              <InputBase

                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            <div className={classes.appBarDivider}>

            </div>

            <div className={classes.sectionDesktop}>
              {[{ name: 'Home', route: '' }, { name: 'About Us', route: '' }, { name: 'Doctors', route: '' }, { name: 'Department', route: '' }, { name: 'Blog', route: '' }, { name: 'Shop', route: '' }, { name: 'Contacts', route: '' }]
                .map((nav, i) =>
                  <Button key={i} className={classes.buttonRoot}>
                    {nav.name}
                  </Button>)
              }
            </div>
            <div className={classes.grow} />

            <div style={{ display: 'flex', alignItems: 'center' }} >
              <Button className={classes.buttonRoot}>
                Doctors Timetable
                        </Button>
              <Button variant="contained" className={classes.buttonRootB}
                onClick={() => this.props.history.push('/login')}>
                Login</Button>

              <Button variant="contained" className={classes.buttonRootB}
                startIcon={<NavigateNextRoundedIcon />}
                onClick={this.handleOpen}
              >
                New Patient

                        </Button>

            </div>

          </Toolbar>
        </AppBar>

        <CustomDialog open={this.state.isDialogOpen} onClose={this.handleClose} />

      </div>
    );
  }
}

export default withStyles(NavBarStyles)(Navbar);