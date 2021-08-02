import React from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TableHead,
  TextField,
  Grid,
} from "@material-ui/core";
// import Fade from "react-reveal/Fade";
import DateFnsUtils from "@date-io/date-fns";
import EventIcon from "@material-ui/icons/Event";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Close } from "@material-ui/icons";

const FilteredInputs = ({
  date,
  width,
  inputValue,
  onDateChange,
  inputValues,
  handleChange,
  filterSubmit,
  clearFilter,
}) => {
  return (
    <Grid md={12} container spacing={2} justify="space-between">
      <Grid item md={2} sm={4} xs={12}>
        <TextField
          variant="outlined"
          name="patient_name"
          type="text"
          fullWidth
          size="small"
          onChange={handleChange}
          value={inputValues.patient_name}
          placeholder="Patient Name"
        />
      </Grid>

      <Grid item md={2} sm={4} xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            id=""
            name=""
            format="yyyy-MM-dd"
            size="small"
            fullWidth
            inputVariant="outlined"
            value={date}
            inputValue={inputValue}
            onChange={onDateChange}
            invalidDateMessage=""
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
      </Grid>
      <Grid item md={2} sm={4} xs={12}>
        <TextField
          variant="outlined"
          size="small"
          onChange={handleChange}
          name="doctor_name"
          type="text"
          fullWidth
          value={inputValues.doctor_name}
          placeholder="Docter Name"
        />
      </Grid>
      <Grid item md={2} sm={4} xs={12}>
        <TextField
          name="phone_number"
          size="small"
          onChange={handleChange}
          type="text"
          value={inputValues.phone_number}
          fullWidth
          variant="outlined"
          placeholder="Phone number"
        />
      </Grid>
      <Grid item md={2} sm={4} xs={12}>
        <TextField
          name="patient_email"
          onChange={handleChange}
          type="email"
          fullWidth
          size="small"
          style={{ marginBottom: "10px" }}
          value={inputValues.patient_email}
          variant="outlined"
          placeholder="Patient Email"
        />
      </Grid>
      <Grid item md={2} xs={12} style={{ display: "flex" }} sm={4}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={filterSubmit}
          style={{
            whiteSpace: "nowrap",
            maxHeight: "40px",
            minWidth: "120px",
          }}
        >
          {"Apply Filters"}
        </Button>
        <IconButton
          style={{
            marginLeft: "5px",
            maxHeight: "40px",
          }}
          onClick={clearFilter}
        >
          <Close fontSize="default" color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FilteredInputs;
