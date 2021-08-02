import { Popover, withStyles } from "@material-ui/core";
import React, { Component } from "react";

import EmailIcon from "../../../assets/messages-silhouette.png";
import MessageIcon from "../../../assets/speech.png";
import CallIcon from "../../../assets/phone-call.png";

import ArrowButton from "../../../assets/UpArrowButton.png";
import CustomCallDialog from "./CustomCallDialog";
import CustomEmailDialog from "./CustomEmailDialog";

const CustomDropDownStyles = (theme) => ({
  PopOverRoot: {
    "& .MuiPaper-root": {
      // background:'rgb(0,0,0,0.1)',
      width: "34px",
      transform: "translateY(-37px) !important",
      borderTopLeftRadius: "15px",
      borderTopRightRadius: "15px",

      borderBottomLeftRadius: "15px",
      borderBottomRightRadius: "15px",
      paddingTop: "10px",
      paddingBottom: "20px",

      textAlign: "center",
    },
  },

  listWrapper: {
    // paddingTop:'20px',
    cursor: "pointer",
  },

  buttonWrapper: {
    paddingTop: "10px",
  },
});
class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = { isCallDialogOpen: false, isEmailDialogOpen: false };
  }

  handleCallOpen = () => {
    this.setState({ isCallDialogOpen: true });
  };

  onCallClose = () => {
    this.setState({ isCallDialogOpen: false });
    this.props.handleClose();
  };

  handleEmailOpen = () => {
    this.setState({ isEmailDialogOpen: true });
  };

  onEmailClose = () => {
    this.setState({ isEmailDialogOpen: false });
    this.props.handleClose();
  };

  render() {
    const { classes, width } = this.props;
    const open = Boolean(this.props.anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <Popover
        id={id}
        open={open}
        anchorEl={this.props.anchorEl}
        onClose={this.props.handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.PopOverRoot}
      >
        <div className={classes.listWrapper}>
          <div
            className={"arrowButtonActiveDropDownWrapper"}
            onClick={this.props.handleClose}
          >
            <div className={"arrowButtonActiveDropDown"}>
              <img src={ArrowButton} />
            </div>
          </div>
          <div
            className={classes.buttonWrapper}
            onClick={this.handleCallOpen}
            style={{ paddingTop: "20px" }}
          >
            <img src={CallIcon} />
          </div>
          <div className={classes.buttonWrapper} onClick={this.handleEmailOpen}>
            <img src={EmailIcon} />
          </div>
          <div className={classes.buttonWrapper}>
            <img src={MessageIcon} />
          </div>
        </div>
        <CustomCallDialog
          activeRow={this.props.activeRow}
          open={this.state.isCallDialogOpen}
          onClose={this.onCallClose}
        />
        <CustomEmailDialog
          activeRow={this.props.activeRow}
          open={this.state.isEmailDialogOpen}
          onClose={this.onEmailClose}
        />
      </Popover>
    );
  }
}

export default withStyles(CustomDropDownStyles)(DropDown);
