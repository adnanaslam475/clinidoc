import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import moment from 'moment';

import {
  Button,
  Grid,
  Select,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,

  DateTimePicker,
} from "@material-ui/pickers";
import MyContext from "../../../helper/themeContext";
import TimeIcon from '../../../assets/calendar(1).png'
import Preview1Image from "../../../assets/call-screen-avater.png";
import Preview2Image from "../../../assets/call-screen-avater2.png";

import CallIcon from "../../../assets/call-to-ref.png";
import PostData from "../../../Fetch/postData1";

const useStyles = makeStyles({

  DialogTitle: {
    color: "white",
    background: "#396CF0",
  },
  headIcon: {
    marginRight: "10px",
    width: "36px",
    verticalAlign: "bottom",
  },
  DurationBox: {

  },
  PreviewBox: {
    width: "calc(100% - 4px)",
    paddingTop: "40px",
    paddingBottom: "40px",
    textAlign: "center",
    border: "2px solid #E1E4E8",
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  FormControl: {
    paddingLeft: "30px",
  },
  FormRootCustom: {
    width: "500px",
    flexDirection: "row",
    display: "block",
    marginTop: "10px",
    marginBottom: "10px",
  },

  buttonRoot: {
    background: "#008FFF",
    width: "calc(100px)",
    position: "relative",
    right: "10px",
    float: "right",
    marginBottom: "20px",
    textTransform: "none",
    color: "white",
  },
  AdditionalFieldWrapper: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  txt: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    // border: '1px solid',
    marginTop: '30px',
    fontWeight: "600"
  },
  NotesField: {
    display: "block",
    marginTop: "10px",
    marginBottom: "20px",
    width: "100%",

    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
});

const options = [
  { label: "Connected", value: "Connected" },
  { label: "Not Connected", value: "NotConnected" },
  { label: "Callback Later", value: "CallbackLater" },
  { label: "Wrong Number", value: "WrongNumber" },
];

export default function CustomDialogTwo(props) {
  const context = useContext(MyContext);
  const [callStatus, setCallStatus] = React.useState("Connected");
  const [loading, setLoading] = React.useState(false);

  const [notes, setNotes] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [callbackDT, setcallbackDT] = React.useState("");
  const [callbackSelect, setcallbackSelect] = useState('')
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const getCallStatusId = (typeName) => {
    switch (typeName) {
      case "Connected":
        return 1;
      case "NotConnected":
        return 2;
      case "CallbackLater":
        return 3;
      case "WrongNumber":
        return 4;
    }
  };

  const handleDTChange = (date) => {
    setcallbackDT(date);
  };

  const handleChange = (event) => {
    setCallStatus(event.target.value);
  };

  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async () => {
    await postCallLog();
    onClose();
  };

  const postCallLog = () => {
    setLoading(true);
    let body = {
      referral_id: props.activeRow.referral.id,
      call_status_id: getCallStatusId(callStatus),
      logtype: 2,
      duration_in_sec: duration,
      notes: notes,
    };

    // if(getCallStatusId(callStatus)!=1 && getCallStatusId(callStatus)!=4)
    // {
    //     body['call_date_and_time'] = callbackDT
    // }

    body["call_date_and_time"] = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    body["duration_in_sec"] = "0";

    PostData(
      "https://clinidocapp.herokuapp.com/callLog",
      200,
      body,
      context.state.user.token,
      confirmPostCallLog
    );
  };

  const confirmPostCallLog = (response) => {
    console.log(response);
    setLoading(false);
  };

  console.log('CustomDialogTwo', props.width)
  return (
    <Dialog
      onClose={handleClose}
      maxWidth='lg'
      aria-labelledby="referral-dialog-title"
      open={open}
    >
      <div style={{ width: '100%', }} >
        <DialogTitle className={classes.DialogTitle} id="referral-dialog-title">
          <img src={CallIcon} className={classes.headIcon} /> CliniDoc Call
        </DialogTitle>
        <div>
          <Grid style={{ padding: "25px", paddingBottom: "10px" }}>
            <Grid container style={{ justifyContent: "center" }}>
              <Grid item sm={6}
                style={{ padding: "5px 2px", width: "inherit" }}
              >
                <div className={classes.PreviewBox}>
                  <img src={Preview1Image}
                    style={{ maxWidth: "150px", width: "50%" }}
                  />
                </div>
              </Grid>
              <Grid item sm={6}
                style={{ padding: "5px 2px", width: "inherit" }}
              >
                <div className={classes.PreviewBox}>
                  <img src={Preview2Image}
                    style={{ maxWidth: "150px", width: "50%" }}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ padding: "10px", fontWeight: "600" }}>
              <div style={{ padding: "10px 0px" }}>Call Status</div>
              <FormControl component="fieldset">
                <RadioGroup
                  style={{ flexDirection: "row" }}
                  aria-label={`call status`}
                  name={`callStatus`}
                  value={callStatus}
                  onChange={handleChange}
                >
                  {options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      className={classes.FormControlLabel}
                      value={option.value}
                      control={<Radio style={{ color: "#008FFF" }} />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            {callStatus === 'Connected' && <div className={classes.AdditionalFieldWrapper}>
              <div style={{ fontWeight: "600" }}>Duration</div>
              <TextField
                variant="outlined"
                className={classes.NotesField}
                value={duration}
                type='number'
                onChange={e => setDuration(e.target.value)}
                id="duration"
                placeholder='duration'
              />
            </div>}
            <div className={classes.AdditionalFieldWrapper}>
              <div style={{ fontWeight: "600" }}>Add Notes</div>
              <TextField
                variant="outlined"
                className={classes.NotesField}
                value={notes}
                onChange={handleChangeNotes}
                id="notes"
              />
            </div>
          </Grid>
          {callStatus != "Connected" && callStatus != "WrongNumber" && (
            <Grid container
              style={{
                marginBottom: "10px",
                backgroundColor: "#F2F2F2",
                minHeight: "120px",
                padding: '20px',
                paddingLeft: props.width === 'xs' ? '30px' : '20px'
              }}>
              <Grid item md={3} className={classes.txt}>
                Request Callback
                </Grid>
              <Grid item md={9} sm={12} xs={11} style={{
                display: 'flex',
                marginTop: '10px',
                flexDirection: props.width === 'xs' ? 'column' : 'row'
              }}>
                <div style={{ width: props.width === 'xs' ? "100%" : '50%' }}>
                  <InputLabel >Best Time to contact</InputLabel>
                  <FormControl fullWidth>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        variant="inline"
                        inputVariant='outlined'
                        margin="normal"
                        id="date-picker-inline"
                        value={callbackDT}
                        onChange={handleDTChange}
                        invalidDateMessage=""
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <img src={TimeIcon} />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </FormControl></div>
                <div style={{ width: props.width === 'xs' ? "100%" : '50%' }}>
                  <InputLabel style={{
                    margin: '0 0 16px 8px',
                    whiteSpace: 'nowrap'
                  }}>
                    Choose a convenient Time</InputLabel>
                  <FormControl size='medium' style={{ marginLeft: props.width !== 'xs' && '10px' }}
                    variant='outlined' fullWidth>
                    <Select
                      value={callbackSelect}
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
                      onChange={e => setcallbackSelect(e.target.value)}
                    >
                      <MenuItem value='one'>one</MenuItem>
                      <MenuItem value='two'>two</MenuItem>
                    </Select>
                  </FormControl></div>
              </Grid>
            </Grid>
          )}
          <Button
            onClick={handleSubmit}
            className={classes.buttonRoot}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
