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
// import Backdrop from "@material-ui/core/Backdrop";
// import CircularProgress from "@material-ui/core/CircularProgress";


// import swal from "@sweetalert/with-react";

import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TableBody,
  TextField,
  withStyles,
} from "@material-ui/core";
import MyContext from "../../../helper/themeContext";

const Fields1 = [
  { label: 'Insurance Name', required: true, id: 'insurance_name', type: 'text', name: 'insurance_name' },
  { label: 'Insurance member ID', required: true, id: 'insurance_mem_id', type: 'text', name: 'insurance_mem_id' },
  { label: 'Insurance group', required: true, id: 'insurance_group_id', type: 'text', name: 'insurance_group_id' },
  { label: 'Insurance phone #', required: false, id: 'insurance_phone', type: 'tel', name: 'insurance_phone' },
  { label: 'Insured Person(if self, then finished)', required: false, id: 'insured_person', type: 'text', name: 'insured_person' },
  { label: 'Relationship to insured', required: false, id: 'relationship_to_insured', type: 'text', name: 'relationship_to_insured' },
  { label: 'Insured to DOB(if not self)', required: false, id: 'insured_dob', type: 'datePicker', name: 'insured_dob' },
  { label: 'Insured SSN', required: false, id: 'insured_ssn', type: 'tel', name: 'insured_ssn' },
]

const Fields2 = [

]

const customInput = (global, field) => {
  return (
    <React.Fragment>
      <Grid item md={field.fullWidth ? 12 : 3}>
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
                value={global.state.PDOB}
                onChange={global.handlePDOBDateChange}
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
    background: "#396CEF",
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

class Form2 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.id || e.target.name]: e.target.value, isError: false, errorLabel: '' })
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date, isError: false, errorLabel: '' })
  }

  handlePDOBDateChange = (date) => {
    this.setState({ PDOB: date, isError: false, errorLabel: '' })
  }

  handleSubmit = () => {
    // alert('here')
    let fields = [];

    for (let i = 0; i < Fields1.length; i++) {
      fields.push({ ...Fields1[i], value: this.state[Fields1[i].name] })

      if (Fields1[i].required) {
        if (!(this.state[Fields1[i].name])) {
          this.setState({ isError: true, errorLabel: `${Fields1[i].label} is required` })
          return;
        }
      }
    }
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.heading1}>
          Initial Contact Form
            </div>
        <div className={classes.content}>
          <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            {Fields1.map((field) => {
              const global = this;
              return customInput(global, field)
            }
            )}
          </Grid>

          {/* <Divider/> */}

          <Grid container spacing={2}>
            {Fields2.map((field) => {
              const global = this;
              return customInput(global, field)
            }
            )}

          </Grid>

          <Grid container justify="flex-end" style={{ marginTop: '20px', marginBottom: '20px' }}>

            <Grid item md={2} >
              <Fade bottom collapse when={this.state.isError}>
                <div className="invalid-feedback" style={{ height: '60px', marginBottom: '0px' }}
                  style={{ display: 'block', color: 'red' }}
                >
                  *{this.state.errorLabel}
                </div>
              </Fade>
            </Grid>
            <Grid item md={3} >
              <Button variant={"contained"} onClick={this.handleSubmit} className={classes.buttonRoot}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>);
  }
}

Form2.contextType = MyContext;
export default withStyles(Form1Styles)(Form2);
