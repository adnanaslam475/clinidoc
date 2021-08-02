import React, { Component } from "react";
import {
  Typography,
  withWidth,
  Button,
  Grid,
  createMuiTheme,
  MuiThemeProvider,
  FormControl,
  withStyles,
  Input,
  FormLabel,
  FormControlLabel,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { Fade } from "react-reveal";

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from "moment";
import PostData from "../../Fetch/postData1";
import GetData from "../../Fetch/GetData1";

import swal from "@sweetalert/with-react";
import { Autocomplete } from "@material-ui/lab";
import PropTypes from "prop-types";
import EventIcon from "@material-ui/icons/Event";
import {
  ExpandMore,
  ArrowDropDown,
  ArrowDropUp,
  CodeSharp,
} from "@material-ui/icons";
import * as DummyFields from "./DummyFields";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ReusableInput from "./ReusableInput";
import MyContext from "../../helper/themeContext";


//Icons
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';


import './NewForm.css';

function getReferralTypeIdByName(ele) {
  switch (ele) {
    case "Provider":
      return 1;
      break;
    case "Self":
      return 2;
      break;
    case "Other":
      return 3;
      break;
  }
}

const styles = (theme) => ({
  contbtn: {
    textTransform: "none",
    background: "#396cf0",
    color: "#FFFFFF",
    minWidth: "250px",
    height: "55px",
  },
  radioButton: {
    color: "#008FFF !important",
    "&:.Mui-checked": {
      color: "#008FFF",
    },
  },
  accordion: {
    backgroundColor: "#F2F2F2",
    padding: "10px 0 10px 50px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
});
const theme = createMuiTheme({
  props: {
    MuiSelect: {
      MenuProps: {
        anchorOrigin: {
          vertical: "bottom",
        },
        getContentAnchorEl: null,
      },
    },
  },
});

class NewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel2",
      selectedDate: new Date(),
      referral_code: '',
      reffCodeActive: false,
      errorLabel: "",
      params: "",
      other: "",
      loading: "",
      backdrop: false,
      isError: false,
      RPerson: "Other",
      fieldList: [],
      reasons: [],
      specificReasons: [],
      ProviderInformationFields: [],
      PatientInformationFields: [],
      ReferralInformationFields: [],

      referral_person: "Primary Care Provider",
      // reason_for_referral:1,
    };
  }

  componentWillMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let formType = urlParams.get("formType");
    this.setState({ params: formType });
    if (!formType) {
      // this.context.history.push("/");
      this.setState({
        ProviderInformationFields: DummyFields.ProviderInformationFields,
        PatientInformationFields: DummyFields.PatientInformationFields,
        ReferralInformationFields: DummyFields.ReferralInformationFields,
      });
    } else {
      if (formType === "Provider") {
        this.setState({
          ProviderInformationFields: DummyFields.ProviderInformationFields,
          PatientInformationFields: DummyFields.PatientInformationFields,
          ReferralInformationFields: DummyFields.ReferralInformationFields,
        });
      } else if (formType === "Self") {
        this.setState({
          expanded: "panel2",
          PatientInformationFields: DummyFields.PatientInformationTwoField,
          ReferralInformationFields: DummyFields.referralInformationTwoField,
        });
      } else if (formType === "Other") {
        this.setState({
          ProviderInformationFields: DummyFields.ProvInformationFields,
          PatientInformationFields: DummyFields.OtherInfoSecondFields,
          ReferralInformationFields: DummyFields.ReferralInfoThreeFields,
        });
      }

      this._getReasonForReferral();
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.reason_for_referral) {
      if (!oldState.reason_for_referral) {
        this._getSpecificReason();
      } else if (
        this.state.reason_for_referral.toString() !==
        oldState.reason_for_referral.toString()
      ) {
        this._getSpecificReason();
      }
    }
  }

  _getReasonForReferral = () => {
    GetData(
      this.context.BaseUrl + "/reasons",
      200,
      this.context.state.user.token,
      this._setReasonForReferral
    );
  };

  _setReasonForReferral = (response) => {
    console.log(response);
    if (response.data) {
      this.setState({ reasons: response.data });
    }
  };

  _getSpecificReason = () => {
    console.log(this.state.reason_for_referral);
    GetData(
      this.context.BaseUrl +
      `/specificReasons?id=${this.state.reason_for_referral}`,
      200,
      "",
      this._setSpecificReason
    );
  };
  _setSpecificReason = (response) => {
    console.log(response);
    if (response.data) {
      this.setState({ specificReasons: response.data });
    }
  };

  onDateChange = (date, value) => {
    this.setState({ date: date });
    this.setState({ inputValue: value });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id || e.target.name]: e.target.value,
      isError: false,
      errorLabel: "",
    });
  };

  ReviewUp = (id) => {
    if (this.state.expanded === "panel1") {
      return false;    //will not open down tabs without continue...
    }

    if (this.state.expanded === "panel2") {
      if (id == 1) {
        this.setState({ expanded: "panel1" })
        return true;
      }
      else return false;    //will not open down tabs (panel3) without continue...
    }

    if (this.state.expanded === "panel3") {
      if (id == 1) {
        this.setState({ expanded: "panel1" })
        return true;
      }

      else if (id == 2) {
        this.setState({ expanded: "panel2" })
        return true;
      }
      else return false;    //will not open down tabs (panel3) without continue...
    }
  }

  handlePDOBDateChange = (date) => {
    this.setState({ patient_dob: date, isError: false, errorLabel: "" });
  };
  handleDateChange = (date) => {
    this.setState({ selectedDate: date, isError: false, errorLabel: "" });
  };
  checkError = (panel, expand) => {
    let fieldList = [];
    if (panel === "panel1") {
      fieldList = this.state.ProviderInformationFields;
    } else if (panel === "panel2") {
      fieldList = this.state.PatientInformationFields;
    } else if (panel === "panel3") {
      fieldList = this.state.ReferralInformationFields;
    }

    let err = false;

    let obj = {
      isError: err,
      errorLabel: "",
    };

    console.log(fieldList);
    for (let i = 0; i < fieldList.length; i++) {
      if (fieldList[i].required === true) {
        console.log("fieldList", fieldList[i].id);
        if (!this.state[fieldList[i].id]) {
          err = true;
          this.setState({
            isError: true,
            errorLabel: `Please enter ${fieldList[i].label.toLowerCase()}`,
          });
          break;
        }
      }
    }

    if (err == false) {
      this.setState({ expanded: expand });
    }
    return obj;
  };

  handleSubmit = () => {
    let { isError, errorLabel } = this.checkError("panel3", "panel3");

    if (isError) {
      alert("error occred");
      return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let formType = urlParams.get("formType");

    let req = {};
    let fieldList = [
      ...this.state.ProviderInformationFields,
      ...this.state.PatientInformationFields,
      ...this.state.ReferralInformationFields,
    ];
    for (let i = 0; i < fieldList.length; i++) {
      if (fieldList[i].type === "button") {
      } else {
        let value = "";

        if (fieldList[i].type === "date") {
          value = moment(new Date(this.state.selectedDate)).format(
            "YYYY-MM-DD"
          );
        } else {
          value = this.state[fieldList[i].id] || "";
        }

        if (value && value.length > 0) {
          req[fieldList[i].name] = value;
        }
      }
    }

    req.referral_type_id = getReferralTypeIdByName(formType);
    req.reason_for_referral_id = 2;
    req.cheif_complain = "Complain";
    req["created_by"] = "1";

    this.setState({ loading: true });
    PostData(
      this.context.BaseUrl + "/referral",
      200,
      req,
      "",
      this.postSubmit
    );
  };

  postSubmit = (response) => {
    let global = this;
    if (response.ResponseCode === "Success") {
      this.setState({ loading: false });
      swal({
        title: "Thankyou!",
        text: "Thankyou for submitting, We will contact you soon.",
        icon: "success",
        dangerMode: false,
      }).then(() => {
        global.context.history.replace("/");
      });
    } else
      this.setState({
        loading: false,
        isError: true,
        errorLabel: "Error Submitting Form, Please try again.",
      });
  };

  _setReffCode = () => {
    if (this.state.reffCodeActive) {
      this.setState({
        reffCodeActive: false, referral_code: '',
        referral_person_disable: false,
        referral_person_name_disable: false,
        name_of_practice_disable: false,
        phone_no_practice_disable: false,
        address_of_practice_disable: false,
        referral_person_disable: false,
      })
    }

    else {
      this.setState({ backdrop: true })
      GetData(
        this.context.BaseUrl + `/referralprovider?referral_code=${this.state.referral_code}`,
        200,
        '',
        this._setProviderFields
      );
    }

  }

  _setProviderFields = (response) => {
    if (response.ResponseCode === "Success") {
      if (response.data) {
        let stateEx = {}
        stateEx['reffCodeActive'] = true
        if (response.data.referring_person) {
          stateEx["referral_person"] = response.data.referring_person
          stateEx["referral_person_disable"] = true;
        }
        if (response.data.referring_person_name) {
          stateEx["referral_person_name"] = response.data.referring_person_name
          stateEx["referral_person_name_disable"] = true;
        }
        if (response.data.name_of_practice) {
          stateEx["name_of_practice"] = response.data.name_of_practice
          stateEx["name_of_practice_disable"] = true;
        }
        if (response.data.phone_no_practice) {
          stateEx["phone_no_practice"] = response.data.phone_no_practice
          stateEx["phone_no_practice_disable"] = true;
        }
        // if(response.data.primary)
        // {

        // }
        if (response.data.address_of_practice) {
          stateEx["address_of_practice"] = response.data.address_of_practice
          stateEx["address_of_practice_disable"] = true;
        }

        stateEx["backdrop"] = false;
        this.setState(stateEx);
        return;

      }

    }

    this.setState({ backdrop: false })

  }

  handleAutoCompleteChange = (id, value) => {

    console.log('id', id)
    console.log('value', value)

    this.setState({ [id]: value });
  };

  render() {
    const {
      expanded,
      fieldList,
      params,
      isError,
      referral_source,
      errorLabel,
    } = this.state;
    const { classes, } = this.props;
    return (
      <MuiThemeProvider theme={theme}>

        <Backdrop className={classes.backdrop} open={this.state.backdrop} >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div
          style={{
            padding: "40px",
          }}
        >
          <Grid container>
            <div
              style={{
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" paragraph>
                Welcome to Practice Name
              </Typography>
              <Typography paragraph>
                Consult with a reliable doctor over live video, 24/7, anywhere
                in the world securely and privately.
              </Typography>
              <Typography variant="h5" paragraph>
                Please fill out Referral information
              </Typography>
            </div>
          </Grid>

          {params !== "Self" && (
            <Accordion expanded={expanded === "panel1"} onChange={() => this.ReviewUp(1)}>
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                className={classes.accordion}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Provider Information
                  </Typography>
                  {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {params === "Provider" ?
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <div className="text-field-wrapper">
                        <InputLabel
                          style={{
                            marginBottom: "10px",
                          }}
                        >Referral Code</InputLabel>
                        <FormControl fullWidth className="form-width-less-80px" >
                          <TextField
                            className="referral-code-text-field"
                            id={'referral_code'}
                            type={"number"}
                            disabled={this.state.reffCodeActive}
                            value={this.state.referral_code}
                            onChange={this.handleChange}
                            variant="outlined"
                          />
                        </FormControl>
                        <Button variant="contained" className="referral-code-confirm-button" disabled={this.state.referral_code.length < 4} onClick={this._setReffCode}>
                          {
                            this.state.reffCodeActive ? <CloseIcon /> :

                              this.state.referral_code.length < 4 ? <ContactSupportIcon className="referral-code-icon" /> : <CheckIcon className="referral-code-icon" />}
                        </Button>
                      </div>
                    </Grid> : null}
                  {this.state.ProviderInformationFields.map((field, key) => (
                    <React.Fragment>
                      <Grid
                        item
                        key={key}
                        xs={12}
                        sm={6}
                        md={field.type === ("radio" || "button") ? 12 : 6}
                      >
                        <div className="text-field-wrapper">
                          <InputLabel
                            style={{
                              marginBottom: "10px",
                            }}
                          >
                            {field.label}{" "}
                            {field.required && (
                              <span
                                style={{
                                  color: "red",
                                }}
                              >
                                *
                              </span>
                            )}
                          </InputLabel>
                          {console.log(field
                          )}

                          {field.type === "radio" && (
                            <>
                              {console.log(this.state[field.id])}
                              {" "}
                              <RadioGroup
                                aria-label="Referral Person"
                                name="type"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                                onChange={(e) =>
                                  this.setState({
                                    [field.id]: e.target.value,
                                  })
                                }
                                value={this.state[field.id]}
                              >
                                {field.options.map((v, i) => (
                                  <Grid
                                    item
                                    key={i}
                                    style={{
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <Radio
                                      value={v}
                                      style={{
                                        color: "#008FFF",
                                      }}
                                      disabled={this.state[field.id + "_disable"]}

                                    />
                                    <span>{v}</span>
                                  </Grid>
                                ))}
                              </RadioGroup>
                              {referral_source === "Other" ? (
                                <FormControl
                                  style={{ margin: "15px 0 0 0" }}
                                  fullWidth
                                >
                                  {" "}
                                  <TextField
                                    placeholder="other"
                                    name="referral_source"
                                    id="referral_source"
                                    variant="outlined"
                                    fullWidth
                                  />{" "}
                                </FormControl>
                              ) : null}
                            </>
                          )}

                          {field.type === "select" && (
                            <FormControl fullWidth>
                              <Autocomplete
                                id={field.id}
                                fullWidth
                                options={DummyFields.top100Films}
                                getOptionLabel={(option) => option.time}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    id={field.id}
                                    value={this.state[field.id]}
                                    required={field.required}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                  />
                                )}
                              />
                            </FormControl>
                          )}

                          {field.type === "text" && (
                            <FormControl fullWidth>
                              <TextField
                                fullWidth
                                id={field.id}
                                type={field.type}
                                disabled={this.state[field.id + "_disable"]}
                                value={this.state[field.id]}
                                onChange={this.handleChange}
                                required={field.required}
                                variant="outlined"
                              />
                            </FormControl>
                          )}

                          {field.type === "tel" && (
                            <FormControl fullWidth>
                              <TextField
                                fullWidth
                                id={field.id}
                                type={field.type}
                                value={this.state[field.id]}
                                disabled={this.state[field.id + "_disable"]}
                                onChange={this.handleChange}
                                required={field.required}
                                variant="outlined"
                              />
                            </FormControl>
                          )}
                          {field.type === "date" && (
                            <FormControl fullWidth>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  variant="inline"
                                  id={field.id}
                                  required={field.required}
                                  fullWidth
                                  inputVariant="outlined"
                                  value={this.state[field.id]}
                                  onChange={this.handlePDOBDateChange}
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
                            </FormControl>
                          )}
                          {field.type === "button" && (
                            <FormControl fullWidth size="medium">
                              <div
                                className="err-height-anim"
                                style={{
                                  height: this.state.isError ? "20px" : "",
                                  marginBottom: this.state.isError
                                    ? "60px"
                                    : "",
                                }}
                              >
                                <Fade bottom collapse when={this.state.isError}>
                                  <div
                                    className="invalid-feedback"
                                    style={{}}
                                    style={{
                                      display: "block",
                                      color: "red",
                                    }}
                                  >
                                    {errorLabel && (
                                      <p>
                                        *<span>{errorLabel}</span>
                                      </p>
                                    )}
                                  </div>
                                </Fade>
                              </div>

                              <Button
                                className={classes.contbtn}
                                size="large"
                                style={{
                                  margin:
                                    params === "Other" ? "23px 0 0 0" : null,
                                }}
                                type={field.type}
                                fullWidth
                                onClick={() => {
                                  this.checkError("panel1", "panel2");
                                }}
                              >
                                {field.name}
                              </Button>
                            </FormControl>
                          )}
                        </div>
                      </Grid>

                      {(key == 4 || key == 6) && field.last && (
                        <Grid item md={6}></Grid>
                      )}
                    </React.Fragment>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion expanded={expanded === "panel2"} onChange={() => this.ReviewUp(2)}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.accordion}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Patient Information
                </Typography>
                {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {this.state.PatientInformationFields.map((field, key) => (
                  <React.Fragment>
                    <Grid item md={6} sm={6} xs={12}>
                      <div className="text-field-wrapper">
                        <InputLabel
                          style={{
                            marginBottom: "10px",
                          }}
                        >
                          {field.label}{" "}
                          {field.required && (
                            <span
                              style={{
                                color: "red",
                              }}
                            >
                              *
                            </span>
                          )}
                        </InputLabel>
                        {field.type === "select" && (
                          <FormControl fullWidth>
                            <Autocomplete
                              id={field.id}
                              options={DummyFields.top100Films}
                              getOptionLabel={(option) => option.time}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  value={this.state[field.id]}
                                  margin="normal"
                                  variant="outlined"
                                  required={field.required}
                                />
                              )}
                            />
                          </FormControl>
                        )}

                        {field.type === "text" && (
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              id={field.id}
                              type={field.type}
                              value={this.state[field.id]}
                              onChange={this.handleChange}
                              required={field.required}
                              variant="outlined"
                            />
                          </FormControl>
                        )}

                        {field.type === "tel" && (
                          <FormControl fullWidth>
                            <TextField
                              fullWidth
                              id={field.id}
                              type={field.type}
                              value={this.state[field.id]}
                              onChange={this.handleChange}
                              required={field.required}
                              variant="outlined"
                            />
                          </FormControl>
                        )}

                        {field.type === "date" && (
                          <FormControl fullWidth>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                variant="inline"
                                id={field.id}
                                name={field.name}
                                fullWidth
                                inputVariant="outlined"
                                value={this.state[field.id]}
                                required={field.required}
                                onChange={this.handlePDOBDateChange}
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
                          </FormControl>
                        )}
                        {field.type === "button" && (
                          <FormControl fullWidth size="medium">
                            <div
                              className="err-height-anim"
                              style={{
                                height: this.state.isError ? "20px" : "",
                                marginBottom: this.state.isError ? "60px" : "",
                              }}
                            >
                              <Fade bottom collapse when={this.state.isError}>
                                <div
                                  className="invalid-feedback"
                                  style={{}}
                                  style={{
                                    display: "block",
                                    color: "red",
                                  }}
                                >
                                  {errorLabel && (
                                    <p>
                                      *<span>{errorLabel}</span>
                                    </p>
                                  )}
                                </div>
                              </Fade>
                            </div>

                            <Button
                              className={classes.contbtn}
                              size="large"
                              style={{
                                margin:
                                  params === "Other" ? "23px 0 0 0" : null,
                              }}
                              type={field.type}
                              fullWidth
                              onClick={() => {
                                this.checkError("panel2", "panel3");
                              }}
                            >
                              {field.name}
                            </Button>
                          </FormControl>
                        )}
                      </div>
                    </Grid>
                    {(key == 3 || key == 5) && field.last && (
                      <Grid item md={6}></Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel3"}>
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.accordion}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  Referral Information
                </Typography>
                {expanded === "panel3" ? <ArrowDropUp /> : <ArrowDropDown />}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ReusableInput
                handleAutoCompleteChange={this.handleAutoCompleteChange}
                handleChange={this.handleChange}
                state={this.state}
                handleSubmit={this.handleSubmit}
                onDateChange={this.onDateChange}
                classes={classes}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </MuiThemeProvider>
    );
  }
}

NewForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
NewForm.contextType = MyContext;
export default withStyles(styles)(NewForm);
