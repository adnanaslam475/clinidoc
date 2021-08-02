import React, { Component } from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  //   KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import EventIcon from "@material-ui/icons/Event";
import Fade from "react-reveal/Fade";

import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  withStyles,
} from "@material-ui/core";
import MyContext from "../../../helper/themeContext";

const Fields1 = [
  { label: 'Patient Name', required: true, id: 'patient_name', type: 'text', name: 'patient_name' },
  { label: 'Address', required: true, id: 'address', type: 'text', name: 'address' },
  { label: 'Phone', required: true, id: 'phone', type: 'tel', name: 'phone' },
  { label: 'Gender', required: false, id: 'gender', type: 'text', name: 'gender' },
  { label: 'Date of Birth', required: true, id: 'dob', type: 'datePicker', name: 'dob' },
  { label: 'Email', required: false, id: 'email', type: 'text', name: 'email' },
  { label: 'Race', required: false, id: 'race', type: 'text', name: 'race' },
  { label: 'SSN', required: true, id: 'ssn', type: 'tel', name: 'ssn' },
  { label: 'Legal Guardian (Age < 18 years)', required: false, id: 'legal_gardian', type: 'text', name: 'legal_gardian' },
  { label: 'Martial Status', required: false, id: 'marital_status', type: 'text', name: 'marital_status' },
]

const Fields2 = [
  { label: 'Name (Emergency Contact)', required: false, id: 'name_of_practice', type: 'text', name: 'name_of_practice' },
  { label: 'Phone', required: false, id: 'phone_no_practice', type: 'tel', name: 'phone_no_practice' },
  { label: 'Relationship', required: false, id: 'relationship', type: 'text', name: 'relationship' },
  { label: 'Chief Complaint / Reason for Contact', required: true, id: 'reason', type: 'text', name: 'reason', fullWidth: true },

]

const customInput = (global, field, key) => {
  // console.log("thiss==>", global.state, field);
  return (
    <React.Fragment>
      <Grid item md={field.fullWidth ? 12 : 3} key={key}>
        <div className="text-field-wrapper">
          <InputLabel style={{ marginBottom: "10px" }} htmlFor={field.id}>
            {field.label}{" "}
            {field.required && <span style={{ color: "red" }}> * </span>}
          </InputLabel>
          {field.type === "tel" && (
            <TextField
              fullWidth
              id={field.id}
              type={field.type}
              onChange={global.handleChange}
              value={global.state[field.id]}
              required={field.required}
              variant="outlined"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
            />
          )}
          {field.type === "text" && (
            <TextField
              fullWidth
              id={field.id}
              type={field.type}
              onChange={global.handleChange}
              value={global.state[field.id]}
              required={field.required}
              variant="outlined"
            />
          )}
          {field.type === "dateTimePicker" && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                margin="normal"
                id="date-picker-inline"
                value={global.state.selectedDate}
                onChange={global.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <EventIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          )}

          {field.type === "datePicker" && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                id="date-picker-inline"
                margin="normal"
                value={global.state.dob}
                onChange={global.handlePDOBDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          )}
        </div>
      </Grid>
    </React.Fragment>
  );
};

const Form1Styles = (theme) => ({
  root: {
    background: "#FFFFFF",
    paddingLeft: "92px",
    paddingRight: "20px",
    minHeight: "calc(100vh - 80px)",
  },
  heading1: {
    paddingTop: "10px",
    fontWeight: "bold",
    fontSize: "24px",
  },
  buttonRoot: {
    width: "calc(100% - 10px)",
    marginLeft: "10px",
    textTransform: "none",
    background: "#696A6E",
    color: "white",
  },
  buttonRootB: {
    width: "calc(100% - 10px)",
    marginLeft: "10px",
    textTransform: "none",
    background: "#396CEF",
    color: "white",
  },
});

class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this._setReferralFields();
  };

  _setReferralFields = () => {
    let currRef = this.context.state.currRef;
    console.log('currRef', currRef)
    this.setState({
      patient_name: currRef?.patient_name,
      phone: currRef?.patient_phone,
      dob: currRef?.patient_dob,
      email: currRef?.patient_email,
      patient_name: currRef?.patient_name,
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id || e.target.name]: e.target.value,
      isError: false,
      errorLabel: "",
    });
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date, isError: false, errorLabel: "" });
  };

  handlePDOBDateChange = (date) => {
    this.setState({ PDOB: date, isError: false, errorLabel: "" });
  };

  handleNext = () => {
    let fields = [];

    for (let i = 0; i < Fields1.length; i++) {
      fields.push({ ...Fields1[i], value: this.state[Fields1[i].name] });
      console.log('handlenext', fields)
      if (Fields1[i].required) {
        if (!this.state[Fields1[i].name]) {
          this.setState({
            isError: true,
            errorLabel: `${Fields1[i].label} is required`,
          });
          return;
        }
      }
    }

    for (let i = 0; i < Fields2.length; i++) {
      fields.push({ ...Fields2[i], value: this.state[Fields2[i].name] });

      if (Fields2[i].required) {
        if (!this.state[Fields2[i].name]) {
          this.setState({
            isError: true,
            errorLabel: `${Fields2[i].label} is required`,
          });
          return;
        }
      }
    }

    this.props.handleNextClick(fields);
  };

  handleCancel = () => {
    this.context.history.push("/admin/referrals");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.heading1}>Initial Contact Form</div>
        <div className={classes.content}>
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            {Fields1.map((field, key) => {
              const global = this;
              // console.log('global--=-->', global)
              return customInput(global, field, key);
            })}
          </Grid>

          <Divider />

          <Grid container spacing={2}>
            {Fields2.map((field, i) => {
              const global = this;
              return customInput(global, field);
            })}
          </Grid>
        </div>

        <Grid
          container
          justify="flex-end"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Grid item md={2}>
            <Fade bottom collapse when={this.state.isError}>
              <div
                className="invalid-feedback"
                style={{ height: "60px", marginBottom: "0px" }}
                style={{ display: "block", color: "red" }}
              >
                *{this.state.errorLabel}
              </div>
            </Fade>
          </Grid>

          <Grid item md={2}>
            <Button
              variant={"contained"}
              onClick={this.handleCancel}
              className={classes.buttonRoot}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button
              variant={"contained"}
              onClick={this.handleNext}
              className={classes.buttonRootB}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Form1.contextType = MyContext;
export default withStyles(Form1Styles)(Form1);
