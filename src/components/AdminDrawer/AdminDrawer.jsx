import React, { Component } from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core";

import clsx from "clsx";
import MenuIcon from "../../assets/hamburger.png";
import ReferralsIcon from "../../assets/add-friend.png";
import ApointmentsIcon from "../../assets/appointment-icon.png";
import DashboardIcon from "../../assets/dashboard.png";
import LogsIcon from "../../assets/gear.png";
import HistoryIcon from "../../assets/statistics.png";
import MyContext from "../../helper/themeContext";

const itemList = [
  { label: 'Dashboard', route: 'dashboard', icon: DashboardIcon, enable: true },
  { label: 'Referrals', route: 'referrals', icon: ReferralsIcon, enable: true },
  { label: 'Make an Apointment', route: 'new-appointments', icon: ApointmentsIcon, enable: true },
  { label: 'Appointments Waiting List', route: 'waiting-list-of-appoinments', icon: ApointmentsIcon, enable: true },
  { label: 'Patient Logs', route: '', icon: LogsIcon, enable: false },
  { label: 'Patient List', route: 'patients-list', icon: LogsIcon, enable: true },
  { label: 'Receptionist History', route: 'receptionist-history', icon: HistoryIcon, enable: true },
  { label: 'Make an Apointment', route: 'make-an-appoinment', icon: ApointmentsIcon, enable: true },
]
const drawerWidth = 240;

const AdminDrawerStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    height: "calc(100vh - 30px)",
    top: "0px",
    position: "absolute",
  },
  drawerOpen: {
    width: drawerWidth,
    paddingTop: "30px",
    borderTopRightRadius: "40px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    paddingTop: "30px",
    borderTopRightRadius: "40px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },

  drawerPaper: {
    background: "#008FFF",
  },

  menuButton: {
    width: "40px",
    cursor: "pointer",
    textAlign: "center",
    marginLeft: "5px",
    marginBottom: "10px",
    transition: "all 0.3s ease",
    padding: "10px",
    "&:hover": {
      background: "rgb(0,0,0,0.2)",
    },
  },
});

class AdminDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { isDrawerOpen: false, currentRoute: '', currCompList: [] };
  }

  

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
    this.context.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  };

  render() {
    const { classes } = this.props;
    const { currentRoute,isDrawerOpen } = this.state
    console.log(isDrawerOpen)
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: this.state.isDrawerOpen,
          [classes.drawerClose]: !this.state.isDrawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: this.state.isDrawerOpen,
            [classes.drawerClose]: !this.state.isDrawerOpen,
            [classes.drawerPaper]: true,
          }),
        }}
      >

        <img
          aria-label="open drawer"
          onClick={this.toggleDrawer}
          src={MenuIcon}
          alt="Menu"
          className={clsx(classes.menuButton)}
        />

        <Divider />
        <List>
          {itemList.map((nav, index) => (
            <ListItem
              style={{
                marginTop: "20px",
                backgroundColor: currentRoute == nav.route ? '#007EE0' : null
              }}
              button
              key={nav.label}
              disabled={!nav.enable}
              onClick={() => {
                this.context.history.push(`/admin/${nav.route}`);
                this.setState({ currentRoute: nav.route })
                // this.toggleDrawer()
              }}
            >
              <ListItemIcon>
                {" "}
                <img src={nav.icon} alt="icon" />
              </ListItemIcon>
              <ListItemText style={{ color: "white" }}
                onClick={() => this.toggleDrawer()}
                primary={nav.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

AdminDrawer.contextType = MyContext;
export default withStyles(AdminDrawerStyles)(AdminDrawer);
