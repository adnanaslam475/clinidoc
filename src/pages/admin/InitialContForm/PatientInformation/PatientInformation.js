import React, { useState } from 'react';
import {
    Box, Grid, TextField, InputAdornment, Typography, RadioGroup, Radio,
    MenuItem, Select, InputLabel, IconButton, Accordion, Tabs, AccordionDetails, AccordionSummary,
    makeStyles, FormControl, Button, Tab, Checkbox, TextareaAutosize,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Fade from "react-reveal/Fade";
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import * as inputFields from '../InputFields';
import {
    Search,
    ArrowDropUp,
    Event,
    ArrowDropDown,
} from "@material-ui/icons";

const useStyle = makeStyles(them => ({
    check: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        minHeight: '60px', alignItems: 'center'
    },
    accordion: {
        backgroundColor: "#F2F2F2",
        padding: "10px 0 10px 50px",
    },
    Inlabel: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%',
        margin: '2px 10px 0 0'
    },
    modaltextarea: {
        resize: 'none',
        overflow: 'hidden',
        minHeight: '70px',
        outline: 'none',
        marginRight: '20px',
        borderRadius: '5px',
        borderColor: 'lightgray',
    },
    tab: {
        border: '1px solid lightgray',
    },
    checkbox: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        minHeight: '60px', alignItems: 'center'
    },
    accordionChild: {
        display: "flex",
        alignItems: "center",
        height: '15px'
    },
    radio: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '60px',
    }
}));

const PatientInformation = ({ width, setSelectHandler }) => {
    const classes = useStyle();
    const [expanded, setExpanded] = useState('panel1');
    const [error, setError] = useState(null)
    const [date_of_birth, setDob] = useState(new Date())
    const [inputValues, setInputValues] = useState({
        first_name: '',
        country: '',
        address: '',
        patient_status: '',
        last_name: '',
        city_state: '',
        email: '',
        appoinment_reminder: false,
        gender: '',
        race: '',
        available_providers: '',
        mobile_number: '',
        marital_status: '',
        patient_id: '',
        patient_calender_notes: '',
        miscalleneaous_notes: '',
    })

    const handleChange = e => {
        setInputValues({
            ...inputValues,
            [e.target.id || e.target.name]: e.target.name === 'appoinment_reminder'
                ? e.target.checked : e.target.value,
        })
        setError(null)
    }

    const validator = () => {
        let arr = [];
        let fields = [];
        if (expanded === 'panel1') {
            arr = [...inputFields.PatientInfoCollapse]
        }
        else if (expanded === 'panel2') {
            arr = [...inputFields.MoreInfoCollapse, ...inputFields.txtareas]
        }
        for (let i = 0; i < arr.length; i++) {
            fields.push({ ...arr[i], value: inputValues[arr[i].name] });
            if (arr[i].required) {
                if (!inputValues[arr[i].name]) {
                    console.log(`${arr[i].label} is required`)
                    setError({
                        isError: true,
                        errorLabel: `${arr[i].label} is required`,
                    });
                    return;
                }
            }
        }
        expanded === 'panel1' ? setExpanded('panel2') : setSelectHandler(1);
    }



    return (
        <div style={{ margin: '20px 20px 10px 20px' }}>
            <Accordion expanded={expanded === "panel1"}
                style={{ margin: '0 0 10px 0' }}
                onChange={() => setExpanded('panel1')} >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordion}>
                    <div className={classes.accordionChild} >
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            Patient Information
                        </Typography>
                        {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} sm={6} xs={12} key={idx} >
                            {inputFields.PatientInfoCollapse.map((v, i) => {
                                return (<React.Fragment key={i}>
                                    {v.grid === val && <InputLabel style={{ marginTop: '20px',
                                    textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{v.label}</InputLabel>}
                                    {
                                        v.grid === val && v.type === 'text' && <TextField name={v.name}
                                            id={v.id}
                                            required={v.required}
                                            variant='outlined'
                                            fullWidth
                                            value={inputValues[v.id || v.name]}
                                            margin='normal'
                                            onChange={handleChange}
                                        />
                                    }
                                    {v.grid === val && v.type === 'checkbox' && <FormControl fullWidth
                                        margin='normal'><div className={classes.check}>
                                            <Checkbox color='primary'
                                                name={v.name}
                                                id={v.id}
                                                checked={inputValues.appoinment_reminder}
                                                onChange={handleChange} size='small' />
                                            <Typography>{v.placeholder}</Typography>
                                        </div></FormControl>}
                                    {v.grid === val && v.type === 'date' && (
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                variant='inline'
                                                fullWidth
                                                inputVariant='outlined'
                                                margin="normal"
                                                id={v.id}
                                                format="MM/dd/yyyy"
                                                name={v.name}
                                                value={moment(date_of_birth).format('MM/DD/YYYY')}
                                                onChange={date => setDob(date)}
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
                                    {v.grid === val && v.type === 'btn_text' && <div
                                        style={{ display: 'flex' }}>
                                        <TextField name={v.name} id={v.id}
                                            required={v.required}
                                            style={{
                                                width: '500px',
                                            }}
                                            InputProps={{
                                                style: {
                                                    border: "none",
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px'
                                                },
                                            }}
                                            variant='outlined'
                                            fullWidth
                                            values={inputValues[v.id || v.name]}
                                            margin='normal'
                                            onChange={handleChange}
                                        />
                                        <Button variant='contained' type={v.type}
                                            color='primary'
                                            size='small'
                                            style={{
                                                maxHeight: '56px',
                                                borderTopLeftRadius: '0px',
                                                borderBottomLeftRadius: '0px',
                                                marginTop: '15px'
                                            }}
                                            fullWidth>{v.placeholder}</Button>
                                    </div>}
                                    {v.grid === val && v.type === 'radio' && <FormControl fullWidth
                                        margin='normal'>
                                        <RadioGroup aria-label="gender" name={v.name}
                                            id={v.id}
                                            value={inputValues[v.id || v.name]}
                                            className={classes.radio}
                                            onChange={handleChange}>
                                            {v.radios.map((val, idx) => <div key={idx}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                            >
                                                <Radio value={val} size='small' color='primary' />
                                                <span >{val}</span>
                                            </div>)}
                                        </RadioGroup>
                                    </FormControl>}
                                    {v.grid === val && v.type === 'select' && <FormControl fullWidth margin='normal'>
                                        {/* select id nahi deta */}

                                        <Autocomplete
                                            id={v.id}
                                            fullWidth
                                            options={inputFields.top100Films}
                                            getOptionLabel={(option) => option.time}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    name={v.name}
                                                    id={v.id}
                                                    value={inputValues[v.id || v.name]}
                                                    required={v.required}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </FormControl>}
                                    {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                        style={{ marginTop: '30px' }} fullWidth>
                                        <Button variant='contained' type={v.type}
                                            color='primary'
                                            size='large'
                                            onClick={validator}
                                            style={{ minHeight: '55px' }}
                                            fullWidth>{v.placeholder}</Button>
                                    </FormControl>}
                                </React.Fragment>)
                            }
                            )}
                        </Grid>)}
                        <Fade bottom collapse when={error?.errorLabel}>
                            <Typography style={{ color: 'red', marginRight: '20px' }}>
                                {error?.errorLabel}
                            </Typography>
                        </Fade>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"}
                onChange={() => setExpanded('panel2')}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordion}>
                    <div className={classes.accordionChild} >
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            More Information
                        </Typography>
                        {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} sm={6} xs={12} key={idx} >
                            {inputFields.MoreInfoCollapse.map((v, i) => {
                                return (<React.Fragment key={i}>
                                    {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                    {
                                        v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                            required={v.required}
                                            variant='outlined'
                                            fullWidth
                                            margin='normal'
                                            onChange={handleChange}
                                        />
                                    }
                                    {v.grid === val && v.type === 'checkbox' && <FormControl fullWidth
                                        margin='normal' style={{
                                            paddingTop: '15px',
                                        }}><div className={classes.checkbox}>
                                            <Checkbox color='primary'
                                                name={v.name}
                                                id={v.id}
                                                value={inputValues[v.name || v.id]}
                                                onChange={handleChange} size='small' />
                                            <Typography>{v.placeholder}</Typography>
                                        </div></FormControl>}
                                    {v.grid === val && v.type === 'btn_text' && <div style={{ display: 'flex' }}>
                                        <TextField name={v.name} id={v.id}
                                            required={v.required}
                                            style={{ width: '500px' }}
                                            variant='outlined'
                                            fullWidth
                                            margin='normal'
                                            onChange={handleChange}
                                        />
                                        <Button variant='contained' type={v.type}
                                            color='primary'
                                            size='small'
                                            style={{ maxHeight: '55px', marginTop: '15px' }}
                                            fullWidth>{v.placeholder}</Button>
                                    </div>}
                                    {v.grid === val && v.type === 'radio' && <FormControl fullWidth
                                        margin='normal'>
                                        <RadioGroup aria-label="gender" name={v.name}
                                            id={v.id}
                                            value={inputValues[v.id || v.name]}
                                            className={classes.radio}
                                            onChange={handleChange}>
                                            {v.radios.map((val, idx) => <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Radio value={val} size='small' color='primary' />
                                                <span >{val}</span>
                                            </div>)}
                                        </RadioGroup>
                                    </FormControl>}
                                    {v.grid === val && v.type === 'select' && <FormControl fullWidth margin='normal'>
                                        <Autocomplete
                                            id={v.id}
                                            fullWidth
                                            options={inputFields.top100Films}
                                            getOptionLabel={(option) => option.time}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    name={v.name}
                                                    id={v.id}
                                                    value={inputValues[v.id || v.name]}
                                                    required={v.required}
                                                    onChange={handleChange}
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </FormControl>}
                                </React.Fragment>)
                            }
                            )}
                        </Grid>)}
                        <Grid container spacing={1}>
                            {inputFields.txtareas.map((v, i) => <Grid item md={6} sm={6}
                                xs={12} key={i}>
                                <InputLabel style={{ margin: '0 0 10px 15px' }}>{v.label}</InputLabel>
                                <FormControl fullWidth margin='normal'
                                    style={{ margin: '0 5px 0 15px' }}>
                                    <TextareaAutosize minLength={200}
                                        maxLength={200}
                                        rowsMax={30}
                                        onChange={handleChange}
                                        name={v.name}
                                        className={classes.modaltextarea}
                                        id={v.id}
                                        value={inputValues[v.id || v.name]}
                                        color='white' cols={60} />
                                </FormControl>
                            </Grid>)}
                            <Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                            <FormControl fullWidth margin='normal'
                                style={{
                                    display: 'flex',
                                    alignItems: width === 'sm' ? 'center' : 'flex-end',
                                    paddingRight: '5px'
                                }}>
                                <Button variant='contained'
                                    style={{
                                        maxWidth: '370px',
                                        minHeight: '55px',
                                    }} type='button'
                                    color='primary'
                                    size='large'
                                    onClick={validator}
                                    fullWidth>Continue</Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default PatientInformation;