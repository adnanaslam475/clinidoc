import React, { Component, PureComponent } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import VisibilityIcon from "@material-ui/icons/Visibility";
import { Button, TablePagination } from "@material-ui/core";
import { ArrowDropDown } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import ArrowButton from "../../../assets/arrow.png";

import "./customDropDown.css";
import TableCustomDropDown from "./TableCustomDropDown";
import GetData from "../../../Fetch/GetData1";
import TableCustomDropDown2 from "./TableCustomDropDown2";
import CustomDialogThree from "./CustomReferralInfoDialog";
import MyContext from "../../../helper/themeContext";

function getReferralType(type_id) {
  switch (parseInt(type_id)) {
    case 1:
      return "Provider";
    case 2:
      return "Self";
    case 3:
      return "Other";
  }
}

function getFormattedDate(value) {
  const date = new Date(value);
  let hours = date.getHours();
  if (hours.toString().length < 2) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes.toString().length < 2) {
    minutes = "0" + minutes;
  }
  let formattedDate = date?.toISOString().split("T")[0];
  formattedDate = formattedDate + " " + hours + ":" + minutes;

  return formattedDate;
}

const options = [
  { id: 1, value: "open" },
  { id: 2, value: "pending" },
  { id: 3, value: "close" },
];

const columns = [
  {
    id: "patient_name",
    label: "Patient Name",
    minWidth: 151,
    align: "center",
  },
  {
    id: "name_of_practice",
    label: "Name Of Practice",
    minWidth: 151,
    align: "center",
  },
  {
    id: "phone_no_practice",
    label: "Phone number of Practice",
    minWidth: 210,
    align: "center",
  },
  {
    id: "email_of_contact_person",
    label: "Email of contact Person",
    minWidth: 200,
    align: "center",
  },
  {
    id: "reason_for_referral",
    label: "Reason for Referral",
    minWidth: 170,
    align: "center",
  },
  {
    id: "best_time_for_contact",
    label: "Date & Time",
    minWidth: 150,
    align: "center",
    format: (value) => getFormattedDate(value),
  },
  {
    id: "patient_phone",
    label: "Patient Phone #",
    minWidth: 140,
    align: "center",
  },
  {
    id: "assign_by",
    label: "Assigned By",
    minWidth: 120,
    align: "center",
  },
  {
    id: "patient_email",
    label: "Email",
    minWidth: 120,
    align: "center",
  },
  {
    id: "referral_type_id",
    label: "Referral",
    minWidth: 120,
    align: "center",
    format: (value) => getReferralType(value),
  },
  {
    id: "details",
    label: "Referral Information",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "action",
    minWidth: 100,
    align: "center",
  },
];

const ReferralTableStyles = (theme) => ({
  container: {
    maxHeight: "calc(100vh - 240px)",
    minHeight: "calc(100vh - 240px)",
    borderRadius: 0,
  },
  table: {
    minWidth: 750,
    borderRadius: 0,
  },
  tableHead: {
    background: "#F4F5F7",
  },
  ball: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    display: "inline-block",
    verticalAlign: "baseline",
    marginRight: "5px",
  },

  textRow: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "middle",
  },
  loading: {
    width: "90%",
    height: '50%',
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  tableRow1: {
    display: "inline-block",
    width: "74px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    verticalAlign: "middle",
  },
});

class CustomTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      rows: [],
      anchorEl1: null,
      activeRow: {},
      isDialogOpen: false,
      page: 1,
      options: options,
      rowsPerPage: 6,
      loading: true,
      maxRows: 0,
      msg: "",
    };
  }

  componentDidMount() {
    this._getTableData();
  }

  componentDidUpdate(oldProps, oldState) {
    let change = false;
    if (!oldProps.search_data) {
      if (this.props.search_data) change = true;
    }
    else if (this.props.search_data !== oldProps.search_data) {
      change = true;
    }
    if (!oldProps.search_from) {
      if (this.props.search_from) change = true;
    }
    if (oldState.page !== this.state.page) {
      change = true;
    }
    if ((this.props.search_data || this.props.search_from) && this.state.page > 1) {
      this.setState({ page: 1 })
      change = true;
    }
    else if (this.props.search_from !== oldProps.search_from) {
      change = true;
    }
    if (change) {
      this.setState({ loading: true });
      this._getTableData();
    }
  }

  _getTableData = () => {
    const { rowsPerPage, page } = this.state;
    let url = `/referral?page_num=${page}&num_per_page=${rowsPerPage}`;
    if (this.props.search_from) {
      url = url + `&search_from=${this.props.search_from}`;
    }
    if (this.props.search_data) {
      url = url + `&search_data=${this.props.search_data}`;
    }
    GetData(
      this.context.BaseUrl + url,
      200,
      this.context.state.user.token,
      this.setTableData
    );
    this.props.options(this.state.options);
  };

  setTableData = (response) => {
    console.log(response.data.result)
    if (response && response.data) {
      if (response.data.length === 0) {
        this.setState({ msg: "No records Found" });
      }
      this.setState({
        rows: response.data.result,
        maxRows: response.data ? response.data.count : 0,
      });
      this.setState({ msg: null, loading: false });
    } else {
      this.setState({ msg: "network Error", loading: false });
    }
  };

  getReferralInfo = () => {
    GetData(
      "https://clinidocapp.herokuapp.com/referral/log",
      200,
      "",
      this.postReferralData
    );
  };

  setReferralData = (response) => {
    if (response && response.referral_id) {
      this.setState({ rows: response.data });
    }
  };

  handleOpenDetailBox = (e, row) => {
    e.stopPropagation();
    this.setState({ isDialogOpen: true, activeRow: row });
  };

  handleCloseDetailBox = () => {
    this.setState({ isDialogOpen: false, activeRow: {} });
  };

  handleClick = (event, row) => {
    event.stopPropagation();
    if (this.state.anchorEl) {
      this.state.anchorEl.classList.remove("arrowButtonActive");
      this.setState({ anchorEl: null, activeRow: {} });
    } else {
      event.currentTarget.classList.add("arrowButtonActive");
      this.setState({ anchorEl: event.currentTarget, activeRow: row });
    }
  };

  handleClose = () => {
    this.state.anchorEl.classList.remove("arrowButtonActive");
    this.setState({ anchorEl: null, activeRow: {} });
  };

  handleOpenAnchorEl1 = (event, row) => {
    event.stopPropagation();
    this.setState({ anchorEl1: event.currentTarget, activeRow: row });
  };

  handleCloseAnchorEl1 = () => {
    this.setState({ anchorEl1: null, activeRow: {} });
  };

  handleRoute = (row) => {
    if (row.referal_status) {
      let status = row.referal_status;
      let open = status.find((el, id) => el.value === "open").active;
      let pending = status.find((el, id) => el.value === "pending").active;
      if (open || pending) {
        this.context.setState({ currRef: row.referral });
        this.context.history.push("./forms/initial-contact-form");
      }
    }
  };

  render() {
    const { page, rowsPerPage, rows, loading, msg } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <TableContainer className={classes.container} component={Paper}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="referrals table"
          >
            <TableHead className={classes.tableHead}>
              <TableRow>
                {columns.map((column, key) => (
                  <TableCell
                    key={key}
                    align={column.align}
                    style={{
                      fontWeight: "640",
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                    {key != columns.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          right: "0px",
                          top: "10px",
                          display: "inline-block",
                          width: "2px",
                          height: "40px",
                          background: "#EBECEE",
                        }}
                      ></div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading ? (
              <div
                className={classes.loading}
              >
                <Loader type='Bars' color="#396CF0" height={50} width={50} />
              </div>
            ) : (
              <TableBody>
                {msg && (
                  <h3
                    style={{
                      margin: "20%",
                      whiteSpace: "nowrap",
                      border: "1px solid",
                    }}
                  >
                    {msg}
                  </h3>
                )}
                {this.state.rows.map((row, i) => {
                  const referral = row.referral;
                  return (
                    <TableRow
                      hover
                      style={{
                        cursor: "pointer",
                      }}
                      key={i}
                      onClick={() => this.handleRoute(row)}
                    >
                      {columns.map((column, key) => {
                        if (column.id === "details") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={(e) =>
                                  this.handleOpenDetailBox(e, row)
                                }
                              >
                                Details
                              </Button>
                            </TableCell>
                          );
                        } else if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) =>
                                  this.handleOpenAnchorEl1(e, row)
                                }
                                startIcon={<VisibilityIcon />}
                                endIcon={<ArrowDropDown />}
                              ></Button>
                            </TableCell>
                          );
                        } else if (column.id === "activeColor") {
                        } else {
                          const value = referral[column.id];
                          let activeColor = "blue";
                          const date = new Date(referral.created_at);
                          const currentDate = new Date();
                          const date1 = date.getDate();
                          const date2 = currentDate.getDate();
                          if (
                            date.toDateString() === currentDate.toDateString()
                          ) {
                            activeColor = "green";
                          } else if (date1 === date2 - 1) {
                            activeColor = "#F3AA07";
                          }

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {key === 0 && (
                                <span
                                  className={classes.ball}
                                  style={{
                                    background: activeColor,
                                  }}
                                ></span>
                              )}
                              <span
                                className={
                                  key == 0
                                    ? classes.tableRow1
                                    : classes.tableRow
                                }
                              >
                                {" "}
                                {column.format
                                  ? column.format(value)
                                  : value}{" "}
                              </span>
                              {key === 0 && (
                                <span
                                  className="arrowButtonWrapper"
                                  onClick={(e) => this.handleClick(e, row)}
                                >
                                  <span
                                    id="arrowButtonId"
                                    className={`arrowButton`}
                                  >
                                    <img src={ArrowButton} />
                                  </span>
                                </span>
                              )}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>

          <CustomDialogThree
            activeRow={this.state.activeRow}
            open={this.state.isDialogOpen}
            onClose={this.handleCloseDetailBox}
          />
          <TableCustomDropDown
            activeRow={this.state.activeRow}
            handleClose={this.handleClose}
            anchorEl={this.state.anchorEl}
          />
          <TableCustomDropDown2
            activeRow={this.state.activeRow}
            handleClose={this.handleCloseAnchorEl1}
            anchorEl={this.state.anchorEl1}
          />
        </TableContainer>

        <TablePagination
          component="div"
          style={{
            right: 0,
            float: "right",
            bottom: 0,
          }}
          page={page}
          onChangePage={(e, newp) => {
            this.setState({ page: newp, loading: true });
          }}
          rowsPerPageOptions={[]}
          backIconButtonProps={{ disabled: page < 2 || rows?.length === 0 }}
          nextIconButtonProps={{
            disabled:
              (page - 1) * rowsPerPage + this.state.rows?.length >=
              this.state.maxRows,
          }}
          labelDisplayedRows={() =>
            this.state.maxRows &&
            `Showing ${(page - 1) * rowsPerPage + this.state.rows.length >
              this.state.maxRows
              ? this.state.maxRows
              : (page - 1) * rowsPerPage + this.state.rows.length
            } Referrals of ${this.state.maxRows}`
          }
          page={page}
        />
      </React.Fragment>
    );
  }
}

CustomTable.contextType = MyContext;
export default withStyles(ReferralTableStyles)(CustomTable);
