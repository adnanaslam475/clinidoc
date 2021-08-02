import React, { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    withStyles,
    Menu,
    Collapse, AppBar,
    Typography,
    RadioGroup,
    Radio,

    MenuItem,
    Select,
    InputLabel, FormLabel,
    IconButton,
    Accordion,
    Tabs,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
    FormControl,
    Button,
    Tab,
    Checkbox,
    TextareaAutosize,
    Paper
} from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { Autocomplete } from "@material-ui/lab";

import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DateTimePicker,
} from "@material-ui/pickers";
import * as inputFields from '../InputFields';
import {
    ArrowDropUp,
    Event,
    ArrowDropDown,
} from "@material-ui/icons";

const useStyle = makeStyles(them => ({
    main: {
    },
    accordion: {
        backgroundColor: "#F2F2F2",
        padding: "10px 0 10px 50px",
    },
    accordionChild: {
        display: "flex",
        alignItems: "center",
        height: '15px'
    },
    Inlabel: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%',
        margin: '2px 10px 0 0'
    },
    modaltextarea: {
        resize: 'none',
        overflow: 'hidden',
        minHeight: '80px',
        outline: 'none',
        borderRadius: '5px',
        borderColor: 'lightgray',
    },
    tab: {
        border: '1px solid lightgray',
    },
    radios: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '60px',
    },
    checkbox: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        minHeight: '60px', alignItems: 'center'
    }
}));

const TelephoneIntake = ({ width, setSelectHandler }) => {
    const classes = useStyle();
    console.log(width);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState('panel1');
    const [inputValues, setInputValues] = useState({
        name: '',
    })

    const handleChange = e => {
        setInputValues({
            ...inputValues,
            [e.target.id || e.target.name]: e.target.value,
        })
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
                    <div className={classes.accordionChild}>
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            Telephone Intake
                        </Typography>
                        {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {inputFields.TelephoneIntake.map((v, i) => {
                            return (<Grid md={3} item key={i} xs={12} sm={6} >
                                <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>
                                {
                                    v.type === 'text' && <TextField name={v.name} id={v.id}
                                        required={v.required}
                                        variant='outlined'
                                        fullWidth
                                        value={inputValues[v.id || v.name]}
                                        margin='normal'
                                        onChange={handleChange}
                                    />
                                }
                                {v.type === 'date' && (
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            variant='inline'
                                            fullWidth
                                            inputVariant='outlined'
                                            margin="normal"
                                            id="date-picker-inline"
                                            name={v.name}
                                            id={v.id}
                                            value={inputValues[v.name || v.id]}
                                            defaultValue=''
                                            aria-valuemin='date-picker'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            onChange={handleChange}
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
                                {v.type === 'button' && <FormControl margin='normal'
                                    style={{ marginTop: '30px' }} fullWidth>
                                    <Button variant='contained' type={v.type}
                                        color='primary'
                                        style={{ minHeight: '55px' }}
                                        size='large'
                                        onClick={() => setExpanded('panel2')}
                                        fullWidth>{v.placeholder}</Button>
                                </FormControl>}
                                {v.type === 'select' && <FormControl fullWidth margin='normal'>
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
                            </Grid>)
                        }
                        )}
                        <Fade bottom collapse when={error?.errorLabel}>
                            <Typography style={{ color: 'red', marginRight: '20px' }}>
                                {error?.errorLabel}
                            </Typography>
                        </Fade>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"}
                style={{ margin: '0 0 10px 0' }}
                onChange={() => setExpanded('panel2')}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordion}>
                    <div className={classes.accordionChild}>
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            About Prospective Patient
                        </Typography>
                        {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                            {inputFields.about_prospective.map((v, i) => {
                                return (<React.Fragment key={i}>
                                    {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                    {
                                        v.grid === val && v.type === 'text' && <TextField name={v.name}
                                            id={v.id}
                                            required={v.required}
                                            variant='outlined'
                                            fullWidth
                                            margin='normal'
                                            value={inputValues[v.id || v.name]}
                                            onChange={handleChange}
                                        />
                                    }

                                    {v.grid === val && v.type === 'date' && (
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                variant='inline'
                                                required={v.required}
                                                fullWidth
                                                inputVariant='outlined'
                                                margin="normal"
                                                id="date-picker-inline"
                                                name={v.name}
                                                id={v.id}
                                                value={inputValues[v.name || v.id]}
                                                defaultValue=''
                                                aria-valuemin='date-picker'
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date",
                                                }}
                                                onChange={handleChange}
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
                                    {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                        style={{ marginTop: '30px' }} fullWidth>
                                        <Button variant={i === 5 ? 'outlined' : 'contained'} type={v.type}
                                            color='primary'
                                            style={{ minHeight: '55px' }}
                                            size='large'
                                            onClick={() => v.name === 'Continue' && setExpanded('panel3')}
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
            <Accordion expanded={expanded === "panel3"}
                style={{ margin: '0 0 10px 0' }}
                onChange={() => setExpanded('panel3')}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordion}>
                    <div className={classes.accordionChild}>
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            About Caller
                        </Typography>
                        {expanded === "panel3" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                            {inputFields.aboutcaller.map((v, i) => {
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
                                    {v.grid === val && v.type === 'date' && (
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                variant='inline'
                                                fullWidth
                                                inputVariant='outlined'
                                                margin="normal"
                                                id="date-picker-inline"
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
                                </React.Fragment>)
                            })}
                        </Grid>)}
                        <Typography variant='h5' style={{ marginLeft: '10px' }}>Family Contacts</Typography>
                        <Grid container spacing={3} style={{ margin: '0 0 0 5px' }}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                                {inputFields.aboutcallertwo.map((v, i) => {
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
                                        {v.grid === val && v.type === 'empty' && <FormControl fullWidth
                                            style={{
                                                height: '65px',
                                                marginTop: '30px'
                                            }}>
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
                                        {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                            style={{ marginTop: '30px' }} fullWidth>
                                            <Button variant='contained' type={v.type}
                                                color='primary'
                                                style={{ minHeight: '55px' }}
                                                size='large'
                                                onClick={() => setExpanded('panel4')}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                    </React.Fragment>)
                                })}
                            </Grid>)}
                        </Grid>
                        <Fade bottom collapse when={error?.errorLabel}>
                            <Typography style={{ color: 'red', marginRight: '20px' }}>
                                {error?.errorLabel}
                            </Typography>
                        </Fade>
                    </Grid>
                </AccordionDetails>
            </Accordion><Accordion expanded={expanded === "panel4"}
                style={{ margin: '0 0 10px 0' }}
                onChange={() => setExpanded('panel4')}
            >
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.accordion}>
                    <div className={classes.accordionChild}>
                        <Typography
                            variant="h6"
                            style={{
                                marginRight: "10px",
                            }}
                        >
                            Notes
                        </Typography>
                        {expanded === "panel4" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2].map((val, idx) => <Grid item md={6} xs={12} sm={6} key={idx} >
                            {inputFields.notes.map((v, i) => {
                                return (<React.Fragment key={i}>
                                    {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                    {v.grid === val && v.type === 'textarea' && <FormControl fullWidth margin='normal'
                                    >
                                        <TextareaAutosize minLength={200}
                                            maxLength={200}
                                            rowsMax={10}
                                            onChange={handleChange}
                                            name={v.name}
                                            className={classes.modaltextarea}
                                            id={v.id}
                                            defaultValue=''
                                            value={inputValues[v.name || v.id]}
                                            color='white' cols={60} />
                                    </FormControl>}
                                </React.Fragment>)
                            }
                            )}
                        </Grid>)}
                        <FormControl fullWidth margin='normal'
                            style={{ alignItems: width === 'xs' ? 'center' : 'flex-end', display: 'flex' }}>
                            <Button variant='contained' style={{
                                maxWidth: '355px',
                                minHeight: '55px',
                            }} type='button'
                                color='primary'
                                size='large'
                                onClick={() => ''}
                                fullWidth>Continue</Button>
                        </FormControl>
                        <Fade bottom collapse when={error?.errorLabel}>
                            <Typography style={{ color: 'red', marginRight: '20px' }}>
                                {error?.errorLabel}
                            </Typography>
                        </Fade>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div >
    )
}

export default TelephoneIntake;