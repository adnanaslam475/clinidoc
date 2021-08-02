import React, { Component } from "react";
import "./AdminNavbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "../assets/logo-light.png";
import MessageIcon from "../assets/speech.png";
import NotificationIcon from "../assets/notification.png";
import AvatarIcon from "../assets/profile-img.png";
import {
  Button,
  withStyles,
  fade,
  MenuItem,
  Menu,
  IconButton,
} from "@material-ui/core";
import MyContext from "../helper/themeContext";

const NavBarStyles = (theme) => ({
  root: {
    background: "white",
    paddingLeft: "60px",
  },
  grow: {
    flexGrow: 1,
  },

  logo: {
    width: "32px",
    marginRight: "10px",
  },

  title: {
    color: "black",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#eeeeee", 0.35),
    "&:hover": {
      backgroundColor: fade("#4c4c4c", 0.15),
    },
    // marginRight: theme.spacing(2),
    marginLeft: "2ch",
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "6ch",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  buttonRoot: {
    height: "80px",
    fontWeight: "bold",
    borderRadius: "0px",
    textTransform: "none",
    "&:hover": {
      borderBottom: "3px solid #008FFF",
    },
  },
  buttonRootB: {
    background: "#008FFF",
    textTransform: "none",
    marginLeft: "5px",
    color: "white",
    font: "Open Sans",
    height: "40px",
    marginTop: "10px",
    borderRadius: "80px",
  },
  appBarDivider: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    width: "1px",
    height: "60px",
    background: "#eeeeee",
  },
  customIconButton: {
    width: "50px",
    borderRadius: "50%",
    height: "50px",
    cursor: "pointer",
    padding: "8px",
    "&:hover": {
      background: "rgb(0,0,0,0.1)",
    },
  },
});
const notification = [
  {
    text: "Jonh Nasir is new Referrla which are come from Treatment solution",
    time: "10 mints ago",
  },
  {
    text: "Jonh Nasir is new Referrla which are come from Treatment solution",
    time: "10 mints ago",
  },
  {
    text: "Jonh Nasir is new Referrla which are come from Treatment solution",
    time: "10 mints ago",
  },
  {
    text: "Jonh Nasir is new Referrla which are come from Treatment solution",
    time: "10 mints ago",
  },
  {
    text: "Jonh Nasir is new Referrla which are come from Treatment solution",
    time: "10 mints ago",
  },
];

class AdminNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      notifyAnchorel: null,
      showbox: false,
      backColor: false,
    };
  }

  handleClick = (event, el) => {
    if (el === "notify") {
      this.setState({ notifyAnchorel: event.currentTarget });
    } else {
      this.setState({ anchorEl: event.currentTarget });
    }
  };

  handleClose = (type) => {
    if (type === "notify") {
      this.setState({ notifyAnchorel: null });
    } else {
      this.setState({ anchorEl: null });
    }
  };

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
                <SearchIcon style={{ color: "grey" }} />
              </div>
              <InputBase
                placeholder=""
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            <div className={classes.sectionDesktop}>
              <div className={classes.appBarDivider}></div>
              {[
                { name: "Lorem Ipsum", route: "" },
                { name: "Lorem Ipsum", route: "" },
                { name: "Lorem Ipsum", route: "" },
              ].map((nav, i) => (
                <Button key={i} className={classes.buttonRoot}>
                  {nav.name}
                </Button>
              ))}
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {[
                { label: "message", route: "", icon: MessageIcon },
                { label: "notification", route: "", icon: NotificationIcon },
              ].map((nav, i) => (
                <div key={i}>
                  <IconButton
                    key={i}
                    onClick={(e) => {
                      this.handleClick(e, "notify");
                      i === 1 && this.setState({ showbox: true });
                    }}
                    style={{ height: "44px", marginTop: "10px" }}
                  >
                    <img src={nav.icon} alt="Icon" width="22px" />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.notifyAnchorel}
                    keepMounted
                    variant="menu"
                    marginThreshold={30}
                    PaperProps={{
                      style: {
                        borderRadius: "10px",
                        textAlign: "center",
                        width: "270px",
                        border: "1px solid lightgray",
                        boxShadow: "none",
                        overflow:'hidden'
                      },
                    }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{ horizontal: "center" }}
                    open={Boolean(this.state.notifyAnchorel)}
                    onClose={() => this.handleClose("notify")}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "5px 0 0 20px",
                        alignItems: "baseline",
                      }}
                    >
                      <Typography variant="h6">Notifications</Typography>
                      <span className="new">4 New</span>
                    </div>
                    {notification.map((v, i) => (
                      <div
                        key={i}
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: "10px 20px 10px 20px",
                          backgroundColor: i === 4 ? "white" : "#EBF0FE",
                          borderBottom: "2px solid lightgray",
                          marginBottom:
                            i === notification.length - 1 ? "5px" : "0px",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <img
                            src={AvatarIcon}
                            width="34px"
                            style={{ transform: "translateX(-10px)" }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              margin: "0 0 0 5px",
                            }}
                          >
                            <Typography>{v.text}</Typography>
                            <Typography
                              style={{ fontSize: "12px", color: "gray" }}
                            >
                              {v.time}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                    <a
                      href="#"
                      style={{
                        color: "blue",
                      }}
                    >
                      View all
                    </a>
                  </Menu>
                </div>
              ))}
              <Button
                variant="contained"
                className={classes.buttonRootB}
                startIcon={
                  <img
                    src={AvatarIcon}
                    width="34px"
                    style={{ transform: "translateX(-10px)" }}
                  />
                }
                style={{
                  backgroundColor: this.state.anchorEl ? "#D5D5D5" : null,
                }}
                onClick={(e) => this.handleClick(e, "logout")}
              >
                {this.context.state.user
                  ? this.context.state.user.username
                  : ""}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                variant="menu"
                PaperProps={{
                  style: {
                    borderRadius: "30px",
                    textAlign: "center",
                  },
                }}
                getContentAnchorEl={null}
                style={{
                  borderRadius: "",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                MenuListProps={{
                  disabledItemsFocusable: true,
                }}
                transformOrigin={{ horizontal: "center" }}
                open={Boolean(this.state.anchorEl)}
                onClose={() => this.handleClose("logout")}
              >
                <MenuItem
                  style={{
                    minWidth: "140px",
                    textAlign: "center",
                    borderRadius: "40px",
                    height: "30px",
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                  }}
                  onClick={this.context.logOut}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AdminNavbar.contextType = MyContext;
export default withStyles(NavBarStyles)(AdminNavbar);
