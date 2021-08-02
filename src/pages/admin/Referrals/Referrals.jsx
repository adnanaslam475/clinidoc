import React, { Component } from "react";
import {
  Box,
  Grid,
  TextField,
  withStyles,
  Menu,
  Typography,
  MenuItem,
  Select,
  IconButton,
  FormControl,
  Button,
} from "@material-ui/core";
import CustomTable from "./referralTable";
import {
  Search,
  SearchOutlined,
  ArrowDropDown,
  Close,
} from "@material-ui/icons";
import "./referrals.css";

const ReferralsStyles = (theme) => ({
  heading1: {
    fontSize: "24px",
    marginBottom: "5px",
  },
  subHeader: {
    color: "#9C9C9C",
    marginBottom: "5px",
  },
  ballWrapper: {
    display: "inline-block",
    marginLeft: "10px",
    color: "#9C9C9C",
  },
  ball: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    display: "inline-block",
  },
  ballText: {
    verticalAlign: "text-bottom",
  },
});

const options = [
  { id: 1, value: "open" },
  { id: 2, value: "pending" },
  { id: 3, value: "close" },
];

class Referrals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dropOptions: options,
      search_from: null,
      search_data: null,
      show: false,
      currentSearchFrom: null,
      currentSearchData: null,
    };
  }

  handleClose = (e) => {
    this.setState((prev) => ({
      open: !prev.open,
    }));
  };
  searchSubmit = (type) => {
    const { search_data, search_from } = this.state;
    this.setState({
      currentSearchData: type === "clear" ? null : search_data,
      currentSearchFrom: type === "clear" ? null : search_from,
      show: (search_data || search_from) && type === "search" ? true : false,
    });
    if (type === "clear") {
      this.setState({
        search_data: "",
        search_from: null,
      });
    }
  };

  optionsHandler = (options) => {
    this.setState({ dropOptions: options });
  };
  render() {
    const { classes, width } = this.props;
    const { open, dropOptions, search_data, search_from, show } = this.state;
    return (
      <div
        style={{
          background: "#FFFFFF",
          paddingLeft: "92px",
          paddingRight: "20px",
          paddingBottom: "20px",
          height: "calc(100vh - 80px)",
        }}>
        <div className={classes.heading1}>List of Refferals</div>
        <div className={classes.subHeader}>
          <Grid container alignItems="center" justify="space-between">
            <Grid
              item
              md={6}
              xs={10}
              sm={10}
              style={{
                display: "flex",
              }}
            >
              <Grid container justify="center">
                <Grid item md={6} style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    style={{
                      alignSelf: "center",
                      padding: "10px 10px 0 0",
                    }}
                  >
                    {" "}
                    Entries:
                  </Typography>
                  <FormControl variant="outlined" fullWidth size="medium">
                    <TextField
                      placeholder="search records"
                      className="Refferal_List_Search_Field1"
                      value={this.state.search_data}
                      variant="outlined"
                      size="small"
                      margin="normal"
                      InputProps={{
                        style: {
                          border: "none",
                        },
                        startAdornment: (
                          <Search
                            style={{
                              color: "gray",
                              margin: "0px",
                              borderTopRightRadius: "0px !important",
                              borderBottomRightRadius: "0px !important",
                            }}
                            fontSize="default"
                          />
                        ),
                      }}
                      onChange={(e) =>
                        this.setState({ search_data: e.target.value })
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item md={4} style={{}}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    style={{ paddingTop: "16px", minWidth: "140px" }}
                    size="small"
                  >
                    <Select
                      className="Refferal_List_Search_Field2"
                      type="select"
                      defaultValue=""
                      style={{ width: width === "xs" ? "150px" : null }}
                      fullWidth
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      value={this.state.search_from}
                      onClick={this.handleClose}
                      open={open}
                      onChange={(e) =>
                        this.setState({ search_from: e.target.value })
                      }
                    >
                      {dropOptions?.map((v, i) => (
                        <MenuItem value={v.id} key={i}>
                          {v.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={2}
                  style={{
                    display: "flex",
                  }}
                >
                  <FormControl
                    style={{
                      paddingTop: "15px",
                      minWidth: "90px",
                    }}
                  >
                    <Button
                      id="Refferal_List_Search_Button"
                      size="large"
                      onClick={() => {
                        this.searchSubmit("search");
                      }}
                    >
                      Search
                    </Button>
                  </FormControl>
                  <FormControl
                    margin="dense"
                    style={{
                      padding: "10px 0 0 10px",
                    }}
                  >
                    <IconButton
                      style={{
                        marginLeft: "5px",
                        maxHeight: "40px",
                      }}
                      onClick={() => this.searchSubmit("clear")}
                    >
                      <Close fontSize="default" color="primary" />
                    </IconButton>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={5}
              sm={11}
              xs={12}
              style={{
                margintop: "10px",
                paddingLeft: "12px",
                minWidth: width !== "xs" && "400px",
              }}
            >
              <span className={classes.ballWrapper}>
                <span
                  className={classes.ball}
                  style={{ background: "green" }}
                ></span>
                <span className={classes.ballText}> New Refferals</span>
              </span>
              <span className={classes.ballWrapper}>
                <span
                  className={classes.ball}
                  style={{ background: "#F3AA07" }}
                ></span>
                <span className={classes.ballText}> Yesterday Refferals</span>
              </span>
              <span className={classes.ballWrapper}>
                <span
                  className={classes.ball}
                  style={{ background: "blue" }}
                ></span>
                <span className={classes.ballText}> Old Refferals</span>
              </span>
            </Grid>
          </Grid>
        </div>
        <CustomTable
          search_data={this.state.currentSearchData}
          search_from={this.state.currentSearchFrom}
          maxHeight={"calc(100vh - 160px)"}
          options={this.optionsHandler}
        />
      </div>
    );
  }
}
export default withStyles(ReferralsStyles)(Referrals);
