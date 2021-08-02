import React, { useContext, useEffect, useState } from "react";
import "./CustomEmailDialog.css";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { Divider, Grid, TablePagination, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "react-loader-spinner";

import GetData from "../../../Fetch/GetData1";
import MyContext from "../../../helper/themeContext";

const useStyles = makeStyles({
  DialogRoot: {
    padding: "15px",
    backgroundColor: "#d3d3d3",
    width: "80vw",
  },
  table: {
    minHeight: "60vh",
  },
  InnerDiv: {
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "30px",
  },
  FlexRow: {
    display: "flex",
    flexWrap: "wrap",
  },
  InfoDiv: {
    padding: "10px 0px",
    marginRight: "15px",
    borderBottom: "1px solid #d3d3d3",
  },
});

const DividerCustom = () => {
  return (
    <Divider
      flexItem
      style={{
        margin: "30px 0 30px 0",
        border: "1px solid lightgray",
      }}
      orientation="horizontal"
    />
  );
};
export default function CustomReferralInfoDialog(props) {
  const classes = useStyles();

  const [callLogs, setCallLogs] = useState([]);
  const [tableData, setTableData] = useState(null);
  const context = useContext(MyContext);
  const { activeRow, onClose, open } = props;
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [maxRows, setMaxRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const {
    id,
    name_of_practice,
    phone_no_practice,
    email_of_contact_person,
    patient_name,
    created_at,
    patient_phone,
    patient_email,
    referral_type_id,
    referralType,
    patient_dob,
    reason_for_referral,
    assign_by,
    referralCount,
  } = activeRow.referral || {};

  useEffect(() => {
    if (open === true) _GetCallLogs();
  }, [open]);

  const _GetCallLogs = () => {
    GetData(
      context.BaseUrl +
        `/referral/calllogs?id=1&page_num=${page}&item_per_page=${rowsPerPage}`,
      200,
      context.state.user.token,
      _SetCallLogs
    );
  };

  const _SetCallLogs = (response) => {
    console.log("response", response);
    if (response.data) {
      setMaxRows(response.data.count);
      setCallLogs(response.data.res);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open === true) _GetCallLogs();
  }, [page]);

  const handleClose = () => {
    onClose();
  };

  const forDisplay = [
    {
      label: "Name of Practice",
      value: name_of_practice,
    },
    {
      label: "Phone number pf Practice",
      value: phone_no_practice,
    },
    {
      label: "Email of Contact Person",
      value: email_of_contact_person,
    },
    {
      label: "Patient Name",
      value: patient_name,
    },
    {
      label: "Date & Time",
      value: new Date().toString(),
    },
    {
      label: "Patient phone",
      value: patient_phone,
    },
    {
      label: "Email",
      value: patient_email,
    },
    {
      label: "Referral",
      value: referral_type_id,
    },
    {
      label: "Referral Type",
      value: referralType,
    },
    {
      label: "Patient DOB",
      value: patient_dob,
    },
    {
      label: "Reason for Referral",
      value: reason_for_referral,
    },
    {
      label: "Assigned By",
      value: assign_by,
    },
    {
      label: "Referral Count",
      value: referralCount,
    },
  ];

  const firstRow = [
    "Receptionist Name",
    "Status",
    "Duration",
    "Call Date & Time",
    "Notes",
  ];

  console.log("callogs-->", callLogs);
  return (
    <Dialog
      maxWidth={false}
      autoScrollBodyContent={false}
      onClose={handleClose}
      aria-labelledby="referral-dialog-title"
      open={open}
    >
      <div className={classes.DialogRoot}>
        <div className={classes.InnerDiv}>
          <Grid container>
            <Grid item md={6}>
              <Typography variant="h4" paragraph>
                Referral Information
              </Typography>
              <Grid container justify="space-between">
                <Grid style={{ padding: "0 10px 0 10px" }} item md={4}>
                  <Typography>Name of Practice</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Patient Name</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Email</Typography>
                  <Typography paragraph variant="h6">
                    smayric@gmailc.om
                  </Typography>
                  <DividerCustom />
                  <Typography>Patient DOB</Typography>
                  <Typography paragraph variant="h6">
                    32-45-22
                  </Typography>
                  <DividerCustom />
                </Grid>
                <Grid style={{ padding: "0 10px 0 10px" }} item md={4}>
                  <Typography>Phone number of Practice</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Date & Time</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Referral</Typography>
                  <Typography paragraph variant="h6">
                    smayric@gmailc.om
                  </Typography>
                  <DividerCustom />
                  <Typography>Reason for Referral</Typography>
                  <Typography paragraph variant="h6">
                    32-45-22
                  </Typography>
                  <DividerCustom />
                </Grid>
                <Grid style={{ padding: "0 10px 0 10px" }} item md={4}>
                  <Typography>Email Of Contact Person</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Patient Phone#</Typography>
                  <Typography paragraph variant="h6">
                    Lorem Ipsum
                  </Typography>
                  <DividerCustom />
                  <Typography>Referral</Typography>
                  <Typography paragraph variant="h6">
                    smayric@gmailc.om
                  </Typography>
                  <DividerCustom />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={6} style={{ paddingLeft: "20px" }}>
              <h1>Call History</h1>
              <TableContainer
                component={Paper}
                style={{
                  border: "1px solid #d3d3d3",
                  position: "relative",
                  minHeight: "60vh",
                }}
              >
                <Table stickyHeader aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {firstRow.map((row, i) => {
                        return <TableCell align='left' key={i}>{row}</TableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  {loading ? (
                    <div className="loading">
                      <Loader
                        type="Bars"
                        color="#396CF0"
                        height={50}
                        width={50}
                      />
                    </div>
                  ) : (
                    <TableBody
                      style={{ border: "1px solid", minHeight: "90vh" }}
                    >
                      {callLogs?.map((row, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell component="th" scope="row">
                              {row.receptionist_name}
                            </TableCell>

                            <TableCell>
                              {/* {context.getReferalTypeLabel(
                                parseInt(row.call_status)
                              )} */}
                              {row.call_status_id}
                            </TableCell>
                            <TableCell>{row.duration_in_sec}</TableCell>
                            <TableCell>
                              {new Date(row.call_date_and_time).toString()}
                            </TableCell>
                            <TableCell>{row.notes.toString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                style={{
                  right: 0,
                  float: "right",
                  bottom: 0,
                }}
                rowsPerPageOptions={[]}
                backIconButtonProps={{ disabled: page < 2 }}
                nextIconButtonProps={{
                  disabled:
                    (page - 1) * rowsPerPage + tableData?.length >= maxRows,
                }}
                labelDisplayedRows={() =>
                  maxRows &&
                  `${
                    (page - 1) * rowsPerPage + callLogs.length > maxRows
                      ? maxRows
                      : (page - 1) * rowsPerPage + callLogs.length
                  } of ${maxRows}`
                }
                page={page}
                onChangePage={(e, newp) => {
                  setPage(newp);
                  setLoading(true);
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Dialog>
  );
}
