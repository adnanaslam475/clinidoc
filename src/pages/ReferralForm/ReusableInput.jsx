import React, { useState } from "react";
import {
    Button,
    Grid,
    FormControl,
    InputAdornment,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    InputLabel
} from "@material-ui/core";
// import { CheckCircle } from "@material-ui/icons";
import EventIcon from "@material-ui/icons/Event";
import { Autocomplete } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import { Fade } from 'react-reveal'

import * as DummyFields from "./DummyFields";

const ReusableInput = ({
    state,
    handleChange,
    classes,
    handleDateChange,
    handlePDOBDateChange,
    handleAutoCompleteChange,
    handleSubmit
}) => {
    // const [evening, setEvening] = useState("");
    return (
        <Grid container spacing={2}>
            {state.ReferralInformationFields
                .map((field, key) => (
                    <React.Fragment key={key}>
                        <Grid item md={6} xs={12} sm={6}>
                            <div className="text-field-wrapper">
                                <InputLabel
                                    style={{
                                        marginBottom: "10px"
                                    }}>
                                    {field.label}{" "} {field.required && <span
                                        style={{
                                            color: "red"
                                        }}>
                                        *
                                    </span>}
                                </InputLabel>
                                {field.type === "select" && (
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            id={field.id}
                                            fullWidth
                                            value={state[field.id]}
                                            options={field.id === "reason_for_referral" ? state.reasons : state.specificReasons}
                                            getOptionLabel={(option) => field.id === "reason_for_referral" ? option.reason : option.name}
                                            onChange={(e, k) => { handleAutoCompleteChange(field.id, k.id) }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    fullWidth variant="outlined" required={field.required} />)} />
                                    </FormControl>
                                )}

                                {field.type === "text" && (
                                    <FormControl fullWidth>
                                        {" "}
                                        <TextField
                                            fullWidth
                                            id={field.id}
                                            type={field.type}
                                            onChange={handleChange}
                                            value={state[field.id]}
                                            required={field.required}
                                            variant="outlined" />
                                    </FormControl>
                                )}
                                {field.type === "date" && (
                                    <FormControl margin="dense" fullWidth>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                variant="inline"
                                                id="date-picker-inline"
                                                fullWidth
                                                inputVariant="outlined"
                                                value={state[field.id]}
                                                required={field.required}
                                                onChange={handlePDOBDateChange}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton>
                                                                <EventIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }} />
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                )}
                                {field.type === "button" && (
                                    <FormControl fullWidth size='medium'>

                                        <div
                                            className="err-height-anim"
                                            style={{
                                                height: state.isError
                                                    ? '20px'
                                                    : '',
                                                marginBottom: state.isError
                                                    ? '60px'
                                                    : ''
                                            }}>
                                            <Fade bottom collapse when={state.isError}>
                                                <div
                                                    className="invalid-feedback"
                                                    style={{}}
                                                    style={{
                                                        display: 'block',
                                                        color: 'red'
                                                    }}>
                                                    {state.errorLabel && <p>*
                                                        <span>{state.errorLabel}</span>
                                                    </p>}
                                                </div>
                                            </Fade>
                                        </div>

                                        <Button
                                            className={classes.contbtn}
                                            size="large"
                                            style={{
                                                margin: state.params === 'Other'
                                                    ? '23px 0 0 0'
                                                    : null
                                            }}
                                            type={field.type}
                                            fullWidth
                                            onClick={() => {
                                                handleSubmit();
                                            }}>
                                            {field.name}
                                        </Button>
                                    </FormControl>
                                )}
                            </div>
                        </Grid>
                        {(key == 4 || key == 6) && field.last && <Grid item md={6}></Grid>}
                    </React.Fragment>
                ))
            }
        </Grid >
    );
};
export default ReusableInput;