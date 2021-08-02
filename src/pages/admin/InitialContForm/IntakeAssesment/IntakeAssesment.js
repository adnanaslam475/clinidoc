import React, { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
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
    createMuiTheme,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow

} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Fade from "react-reveal/Fade";

import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckIcon from '@material-ui/icons/Check';
// import ArrowButton from "../../../assets/arrow.png";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DateTimePicker,
} from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';

import * as inputFields from '../InputFields';
import {
    ArrowDropUp,
    ArrowDropDown,
    Close,
} from "@material-ui/icons";

const useStyle = makeStyles(them => ({
    btnForm: {
        paddingRight: '10px',
        maxWidth: '370px',
        minWidth: '370px',
        display: 'flex',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'
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
    assignedproviders: {
        height: '30px',
        backgroundColor: 'lightgray',
        borderRadius: '5px',
        display: 'flex',
        paddingLeft: '5px',
        marginRight: '5px',
        alignItems: 'center'
    },
    Inlabel: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%',
        margin: '2px 10px 0 0'
    },
    tab: {
        border: '1px solid lightgray',
    },
    table: {
        display: "flex",
        border: "2px solid red",
        flexDirection: "column",
        alignSelf: "center"
    },
    assignprov_box: {
        border: '1px solid lightgray',
        minHeight: '80px',
        padding: '5px',
        borderRadius: '5px',
        margin: '0 10px 0 20px'
    },
    columns: {
        position: "absolute",
        right: "0px",
        top: "10px",
        display: "inline-block",
        width: "2px",
        height: "40px",
        background: "#EBECEE",
    }
}));

const columns = [
    {
        id: "department_name",
        label: "Department Name",
        minWidth: 151,
        align: "center",
    },
    {
        id: "providers_programs",
        label: "Providers/Programs",
        minWidth: 151,
        align: "center",
    },
    {
        id: "macting_criteria",
        label: "Matching Criteria",
        minWidth: 151,
        align: "center",
    },
];


const GreenCheckbox = withStyles({
    root: {
        color: "white",
        '&$checked': {
            color: "white",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const IntakeAssesment = ({ width, setSelectHandler }) => {
    const [selectedkey, setKey] = useState("");
    const classes = useStyle();
    const [error, setError] = useState(null)
    const [assignedProviders, setAssignedProviders] = useState([])
    const [expanded, setExpanded] = useState('panel2')
    const [rows, setRows] = useState([
        {
            id: 0,
            department_name: "ICU",
            providers_programs: "Dr",
            macting_criteria: "no"
        },
        {
            id: 1,
            department_name: "ICU",
            providers_programs: "Dr",
            macting_criteria: "no"
        },
        {
            id: 2,
            department_name: "ICU",
            providers_programs: "Dr",
            macting_criteria: "no"
        },
    ]);


    const [inputValues, setInputValues] = useState({
        first_name: '',
        country: '',
        address: '',
        patient_status: '',
        last_name: '',
        city_state: '',
        email: '',
        appoinment_reminder: '',
        date_of_birth: '',
        gender: '',
        department: '',
        race: '',
        available_providers: '',
        mobile_number: '',
        marital_status: '',
        patient_id: '',
        single_clinician: '',
        multiple_clinician: ''
    })
    const departmentsarr = [{
        departments: 'a',
        clinician: ['c1', 'c2',],
    },
    {
        departments: 'b',
        clinician: ['c3', 'c4'],
    }, {
        departments: 'c',
        clinician: ['c5', 'c6',],
    }]

    const provider_arr = [{ clinician: 'c1', providers: ['p1', 'p2'] },
    { clinician: 'c2', providers: ['p3', 'p4'] },
    { clinician: 'c3', providers: ['p5', 'p6'] },
    { clinician: 'c4', providers: ['p7', 'p8'] },
    { clinician: 'c5', providers: ['p9', 'p10'] },
    { clinician: 'c6', providers: ['p11', 'p12'] }]


    const handleChange = e => {
        setInputValues({
            ...inputValues,
            [e.target.id || e.target.name]: e.target.value,
        })
    }
    const assignedProvidersHandler = () => {
        if (inputValues.singleclinician && inputValues.multipleClinician) {
            setAssignedProviders([...assignedProviders,
            inputValues.singleclinician + inputValues.multipleClinician])
        }
    }

    const validator = () => {
        let arr = [];
        let fields = [];
        if (expanded === 'panel1') {
            arr = [...inputFields.IntakeAssesmentFirstCollapse]
        }
        else if (expanded === 'panel2') {
            arr = [...inputFields.arr]
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
                            }}>
                            Intake  Assesment Questions
                        </Typography>
                        {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} sm={6} xs={12} key={idx} >
                            {inputFields.IntakeAssesmentFirstCollapse.map((v, i) => {
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
                                        margin='normal'><div style={{
                                            display: 'flex',
                                            backgroundColor: '#eeeeee',
                                            minHeight: '60px', alignItems: 'center'
                                        }}>
                                            <Checkbox color='primary' />
                                            <Typography>{v.placeholder}</Typography>
                                        </div></FormControl>}
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
                                        <RadioGroup aria-label="gender" name="type"
                                            style={{
                                                display: 'flex',
                                                backgroundColor: '#eeeeee',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                minHeight: '60px',
                                            }}
                                            onChange={handleChange}>
                                            {v.radios.map((val, idx) => <div key={idx}
                                                style={{ display: 'flex', alignItems: 'center' }}>
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
                                    {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                        style={{ marginTop: '35px' }} fullWidth>
                                        <Button variant='contained' type={v.type}
                                            color='primary'
                                            size='large'
                                            onClick={() => setExpanded('panel2')}
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
                onChange={() => setExpanded('panel2')} >
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
                            Suggested Providers/ Programs
                        </Typography>
                        {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails >
                    <Grid container style={{ padding: '0 5px 20px 5px', }} spacing={3}>
                        <Grid item md={12} xs={12}>
                            <TableContainer className={classes.container} component={Paper}>
                                <Table
                                    stickyHeader
                                    aria-label="referrals table"
                                >
                                    <TableHead  >
                                        <TableRow>
                                            {columns.map((column, key) => (
                                                <TableCell
                                                    key={key}
                                                    align={column.align}
                                                    style={{
                                                        fontWeight: "440",
                                                        minWidth: "5000",
                                                        position: "relative",
                                                    }}
                                                >
                                                    {column.label}
                                                    {key != columns.length - 1 && (
                                                        <div
                                                            className={classes.columns}
                                                        ></div>
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {rows.map((row, i) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    key={i}
                                                    style={i == selectedkey ? {
                                                        background: "#396CF0",
                                                        cursor: "pointer",
                                                        border: "2px solid black",
                                                    } :
                                                        {
                                                            color: "black",
                                                            cursor: "pointer",
                                                            border: "2px solid black",
                                                        }}
                                                    onClick={() => setKey(i)}>
                                                    {columns.map((column, key) => {
                                                        const value = row[column.id];
                                                        if (column.id == "department_name") {
                                                            return (
                                                                <TableCell key={column.id} align="left" >
                                                                    <Grid md={7} style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: "space-around"
                                                                    }} item>
                                                                        <FormControlLabel
                                                                            control={<GreenCheckbox checkedIcon={<CheckIcon />} checked={i == selectedkey} />}
                                                                        />
                                                                        <span
                                                                            style={i == selectedkey ?
                                                                                { color: "white" } :
                                                                                { color: "black" }}
                                                                        >
                                                                            {" "}
                                                                            {column.format
                                                                                ? column.format(value)
                                                                                : value}{" "}
                                                                        </span>
                                                                    </Grid>
                                                                </TableCell>
                                                            );
                                                        } else {
                                                            return (
                                                                <TableCell key={column.id} align={column.align} >
                                                                    <span
                                                                        style={i == selectedkey ?
                                                                            { color: "white" } :
                                                                            { color: "black" }}
                                                                    >
                                                                        {" "}
                                                                        {column.format
                                                                            ? column.format(value)
                                                                            : value}{" "}
                                                                    </span>

                                                                </TableCell>
                                                            );
                                                        }
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>

                                </Table>

                            </TableContainer>
                        </Grid>
                        <Divider orientation='horizontal' color='black' flexItem />
                        <Grid container spacing={3}>
                            <Grid container spacing={3} style={{ padding: '0 10px 0 20px' }}>
                                {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                                    {inputFields.arr.map((v, i) => {
                                        return (<React.Fragment key={i}>
                                            {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                            {v.grid === val && v.type === 'select' && <FormControl fullWidth margin='normal'>
                                                <Select name={v.name} id={v.id}
                                                    required={v.required}
                                                    variant='outlined'
                                                    fullWidth
                                                    defaultValue=''
                                                    value={inputValues[v.id || v.name]}
                                                    onChange={handleChange}>
                                                    {v.name === 'department' && departmentsarr.map((val, i) => <MenuItem
                                                        value={val.departments}
                                                        key={i}>{val.departments}</MenuItem>)}
                                                    {v.name === 'single_clinician' && inputValues.department &&
                                                        departmentsarr.filter((v, i) => v.departments === inputValues.department)
                                                        [0].clinician.map((val, i) => <MenuItem value={val}
                                                            key={i}>{val}</MenuItem>)
                                                    }
                                                    {v.name === 'multiple_clinician' && inputValues.single_clinician
                                                        && provider_arr.filter((v, i) => v.clinician === inputValues.single_clinician)
                                                        [0].providers.map((val, i) => <MenuItem value={val}
                                                            key={i}>{val}</MenuItem>)}
                                                </Select>
                                            </FormControl>}
                                            {v.grid === val && v.type === 'empty' &&
                                                width !== 'xs' && width !== 'sm' && <FormControl fullWidth
                                                    margin='normal' style={{
                                                        height: '70px',
                                                    }}>
                                                </FormControl>}
                                            {v.grid === val && v.type === 'button' && <FormControl
                                                style={{
                                                    paddingTop: (width !== 'sm' || width !== 'xs') ? '30px' : '0px'
                                                }}
                                                fullWidth>
                                                <Button variant='contained' type={v.type}
                                                    color='primary'
                                                    size='large'
                                                    onClick={assignedProvidersHandler}
                                                    style={{ minHeight: '55px' }}
                                                    fullWidth>{v.placeholder}</Button>
                                            </FormControl>}
                                        </React.Fragment>)
                                    }
                                    )}
                                </Grid>)}
                            </Grid>
                            <InputLabel style={{ margin: '10px 0px 20px 20px' }}>Assigned Providers are allowed to sign notes
                                for this patient</InputLabel>
                            <Grid container className={classes.assignprov_box}>
                                {assignedProviders.map((v, i) => <div className={classes.assignedproviders} key={i}>{v}<IconButton
                                    onClick={() => setAssignedProviders(assignedProviders.filter((val, i) => val !== v))}>
                                    <Close fontSize='small' />
                                </IconButton></div>)}
                            </Grid>
                            <Grid container justify='flex-end'>
                                <FormControl fullWidth
                                    margin='normal'
                                    style={{
                                        maxWidth: width === 'xs' ? '93%' : '370px',
                                        minWidth: width === 'xs' ? '93%' : '370px',
                                    }}
                                    className={classes.btnForm}>
                                    <Button variant='contained' type='button'
                                        color='primary'
                                        style={{ minHeight: '55px' }}
                                        size='large'
                                        onClick={() => setSelectHandler(2)}
                                        fullWidth>Continue</Button>
                                </FormControl>
                            </Grid>
                        </Grid><Fade bottom collapse when={error?.errorLabel}>
                            <Typography style={{ color: 'red', marginRight: '20px' }}>
                                {error?.errorLabel}
                            </Typography>
                        </Fade>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
export default IntakeAssesment;