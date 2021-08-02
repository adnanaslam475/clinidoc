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
    Close
} from "@material-ui/icons";

const useStyle = makeStyles(them => ({
    accordion: {
        backgroundColor: "#F2F2F2",
        padding: "10px 0 10px 50px",
    },
    accordionChild: {
        display: "flex",
        alignItems: "center",
        height: '15px'
    },
    grayboxes: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        width: '17%',
        padding: '5px',
    },
    assingrid: {
        border: '1px solid lightgray',
        minHeight: '80px', margin: '0 10px 0 10px'
    },
    check: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        minHeight: '50px', alignItems: 'center'
    },
    radio_grp: {
        display: 'flex',
        backgroundColor: '#eeeeee',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: '50px',
        justifyContent: 'space-around',
    },
    modaltextarea: {
        resize: 'none',
        maxWidth: '100%',
        overflow: 'hidden',
        minHeight: '70px',
        outline: 'none',
        borderRadius: '5px',
        borderColor: 'lightgray',
    },
}));


const InsuranceInformation = ({ width, buttonSelect, setButtonSelect, setSelectHandler }) => {
    const classes = useStyle(); 
    const checkboxes = ['Patient Responsible Party',
        'Require Auth # in Notes', 'EPSDT/Family Plan',
        'Self Pay', 'Accounts is in collections'];
    const [assignedProviders, setAssignedProviders] = useState([])
    const [expanded, setExpanded] = useState('panel4');
    const [error, setError] = useState(null)
    const [inputValues, setInputValues] = useState({
        insurance: '',
        additional_notes: '',
        statement_notes: '',
        group: '',
        member_id_policy: '',
        patient_relationship: '',
        start_date: '',
        suspended_date: ''
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
        <div style={{ margin: '20px 20px 10px 40px' }}>
            {buttonSelect === 0 && < div >
                <Accordion expanded={expanded === "panel1"}
                    style={{ marginBottom: '10px' }}
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
                                Coverage Details
                            </Typography>
                            {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, i) => <Grid item md={3} key={i} sm={6} xs={12}>
                                {inputFields.firstCollapse.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '10px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{v.label}</InputLabel>}
                                        {v.grid === val && v.type === 'text' && <FormControl fullWidth margin='normal'> <TextField name={v.name}
                                            value={inputValues[v.name || v.id]}
                                            onChange={handleChange} id={v.id} variant='outlined' />
                                        </FormControl>}
                                        {v.grid === val && v.type === 'select' &&
                                            <FormControl margin='normal' size='medium' fullWidth>
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
                                            </FormControl>
                                        }
                                        {v.grid === val && v.type === 'radio' && <FormControl fullWidth margin='normal' size='small'>
                                            <RadioGroup aria-label="gender" name={v.name}
                                                id={v.id}
                                                className={classes.radio_grp}
                                                onChange={handleChange}>
                                                {v.radios.map((v, idx) => <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Radio value={v} size='small' required color='primary' />
                                                    <span >{v}</span>
                                                </div>)}
                                            </RadioGroup>
                                        </FormControl>}
                                        {v.grid === val && v.type === 'date' && <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                variant='inline'
                                                fullWidth
                                                inputVariant='outlined'
                                                margin="normal"
                                                name={v.name}
                                                id={v.id}
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
                                        }
                                        {v.grid === val && v.type === 'button' && <FormControl margin='normal' fullWidth>
                                            <Button variant='contained' type={v.type}
                                                color='primary'
                                                style={{ minHeight: '55px', marginTop: '12px' }}
                                                size='large'
                                                onClick={() => setExpanded('panel2')}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                    </React.Fragment>)
                                })}
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
                    style={{ marginBottom: '10px' }}
                    onChange={() => setExpanded('panel2')} >
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
                            >Insured Party
                            </Typography>
                            {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, i) => <Grid item md={3} key={i} sm={6} xs={12}>
                                {inputFields.secondCollapse.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '10px' }}>{v.label}</InputLabel>}
                                        {v.grid === val && v.type === 'text' && <FormControl fullWidth margin='normal'> <TextField name={v.name}
                                            value={inputValues[v.name || v.id]}
                                            onChange={handleChange} id={v.id} variant='outlined' />
                                        </FormControl>}
                                        {v.grid === val && v.type === 'select' &&
                                            <FormControl margin='normal' size='medium' fullWidth>
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
                                        {v.grid === val && v.type === 'date' && <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                        }
                                        {v.grid === val && v.type === 'button' && <FormControl margin='normal' fullWidth>
                                            <Button variant='contained' type={v.type}
                                                color='primary'
                                                style={{ minHeight: '55px', marginTop: '12px' }}
                                                size='large'
                                                onClick={() => setExpanded('panel3')}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                    </React.Fragment>)
                                })}
                            </Grid>)}<Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel3"}
                    style={{ marginBottom: '10px' }}
                    onChange={() => setExpanded('panel3')} >
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
                                Insured Provider
                            </Typography>
                            {expanded === "panel3" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, i) => <Grid item md={3} sm={6} xs={12} key={i}>
                                {inputFields.thirdCollapse.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '10px' }}>{v.label}</InputLabel>}
                                        {v.grid === val && v.type === 'text' && <FormControl fullWidth margin='normal'> <TextField name={v.name}
                                            value={inputValues[v.name || v.id]}
                                            onChange={handleChange} id={v.id} variant='outlined' />
                                        </FormControl>}
                                        {v.grid === val && v.type === 'select' &&
                                            <FormControl margin='normal' size='medium' fullWidth>
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
                                        {v.grid === val && v.type === 'date' && <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                        }
                                        {v.grid === val && v.type === 'button' && <FormControl
                                            style={{ margin: '30px 0 0 0' }} fullWidth>
                                            <Button variant='contained' type={v.type}
                                                color='primary'
                                                style={{ minHeight: '55px' }}
                                                size='large'
                                                onClick={() => setExpanded('panel4')}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                    </React.Fragment>)
                                })}
                            </Grid>)}<Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === "panel4"}
                    onChange={() => setExpanded('panel4')} >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild} >
                            <Typography variant="h6" style={{ marginRight: "10px", }}>
                                More Information
                            </Typography>
                            {expanded === "panel4" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{
                            display: 'flex', flexDirection: 'column',
                            width: '100%'
                        }}>
                            <Grid container justify='space-between' style={{ padding: '20px 20px 0 20px' }}>
                                {checkboxes.map((v, i) => <div
                                    key={i}
                                    style={{
                                        display: 'flex',
                                        backgroundColor: '#eeeeee',
                                        alignItems: 'center',
                                        width: width === 'xs' ? '100%' : '17%',
                                        minWidth: width !== 'xs' && '200px',
                                        margin: '5px',
                                        padding: '5px',
                                    }}>
                                    <Checkbox value={v}
                                        name={v} id={v}
                                        onChange={handleChange}
                                        size='small'
                                        color='primary' />
                                    <Typography>{v}</Typography></div>)}
                            </Grid>
                            <Grid container spacing={4} style={{ padding: '20px' }}>
                                {[1, 2, 3, 4].map((val, i) => <Grid item md={3} key={i} sm={6} xs={12}>
                                    {inputFields.fourthCollapse.map((v, i) => {
                                        return (<React.Fragment key={i}>
                                            {v.grid === val && <InputLabel style={{ marginTop: '10px' }}>{v.label}</InputLabel>}
                                            {v.grid === val && v.type === 'text' && <FormControl fullWidth margin='normal'> <TextField name={v.name}
                                                value={inputValues[v.name || v.id]}
                                                onChange={handleChange} id={v.id} variant='outlined' />
                                            </FormControl>}
                                            {v.grid === val && v.type === 'radio' && <FormControl fullWidth margin='normal' size='small'>
                                                <RadioGroup aria-label="gender" name="type"
                                                    className={classes.radio_grp}
                                                    value={inputValues[v.name || v.id]} onChange={handleChange}>
                                                    {v.radios.map((v, idx) => <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Radio value={v} size='small' color='primary' />
                                                        <span >{v}</span>
                                                    </div>)}
                                                </RadioGroup>
                                            </FormControl>}
                                            {v.grid === val && v.type === 'checkbox' && <FormControl fullWidth
                                                style={{ marginTop: '30px' }}
                                                margin='normal'><div className={classes.check}>
                                                    < Checkbox color='primary' />
                                                    <Typography variant='h6'>{v.placeholder}</Typography>
                                                </div></FormControl>}
                                        </React.Fragment>)
                                    })}
                                </Grid>)}
                                <InputLabel style={{ margin: '0 0 10px 15px' }}>Additional Notes</InputLabel>
                                <FormControl fullWidth margin='normal'
                                    style={{ margin: '0 5px 0 15px' }}>
                                    <TextareaAutosize minLength={200}
                                        maxLength={200}
                                        rowsMax={10}
                                        onChange={handleChange}
                                        name='additional_notes'
                                        className={classes.modaltextarea}
                                        id='additional_notes'
                                        value={inputValues.additional_notes}
                                        color='white' cols={60} />
                                </FormControl>
                            </Grid>
                            <Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Divider orientation='horizontal' flexItem />
                <Grid container component={Paper} style={{ padding: '50px 20px 60px 20px' }}>
                    <InputLabel style={{ margin: '0 0 20px 10px' }}>
                        Assigned Providers are allowed to sign notes
                        for this patient</InputLabel>
                    <Grid container className={classes.assingrid}>
                        {assignedProviders.map((v, i) => <div className={classes.assignedproviders}
                            key={i}>{v}<IconButton onClick={() => setAssignedProviders(assignedProviders.filter((val, i) => val !== v))}><Close fontSize='large' /></IconButton></div>)}
                    </Grid>
                    <FormControl fullWidth margin='normal'
                        style={{
                            alignItems: 'flex-end', display: 'flex',
                            paddingRight: '5px'
                        }}>
                        <Button variant='contained' style={{
                            maxWidth: '200px',
                            minHeight: '60px',
                        }} type='button'
                            color='primary'
                            size='large'
                            onClick={() => setButtonSelect(1)}
                            fullWidth>Continue</Button>
                    </FormControl>
                </Grid>
            </div>}
            {buttonSelect == 1 && <div>
                <Grid container spacing={4} style={{
                    padding: '5px',
                }}
                    component={Paper}>
                    {[1, 2].map((val, idx) => <Grid item md={6} sm={6}
                        xs={12} key={idx}>
                        {inputFields.Benefits.map((v, i) => {
                            return (<React.Fragment key={i}>
                                {v.grid === val && <InputLabel style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: 'nowrap',
                                    overflow: "hidden", marginTop: '10px'
                                }}>
                                    {v.label}</InputLabel>}
                                {v.grid === val && v.type === 'text' && <FormControl
                                    margin='normal' fullWidth
                                    style={{
                                        marginTop:
                                            i > 15 && '32px'
                                    }}>
                                    <TextField name={v.name}
                                        value={inputValues[v.name || v.id]}
                                        onChange={handleChange} id={v.id} variant='outlined' />
                                </FormControl>}
                                {
                                    v.grid === val && v.type === 'radio' && <FormControl fullWidth margin='normal'
                                        style={{
                                            marginTop: i > 14 && '33px',
                                        }}
                                        size='small'>
                                        <RadioGroup aria-label="gender" name="type"
                                            className={classes.radio_grp}
                                            value={inputValues[v.name || v.id]} onChange={handleChange}>
                                            {v.radios.map((v, idx) => <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Radio value={v} size='small' color='primary' />
                                                <span >{v}</span>
                                            </div>)}
                                        </RadioGroup>
                                    </FormControl>
                                }
                                {
                                    v.grid === val && v.type === 'select' &&
                                    <FormControl margin='normal'
                                        style={{ marginTop: i > 14 && '10px' }}
                                        size='medium' fullWidth>
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
                                    </FormControl>
                                }
                                {
                                    v.grid === val && v.type === 'date' && <FormControl fullWidth margin='normal'
                                        style={{
                                            marginTop: i > 12 && '30px',
                                        }}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                variant='inline'
                                                fullWidth
                                                inputVariant='outlined'
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
                                    </FormControl>
                                }
                            </React.Fragment>)
                        })}
                    </Grid>)}
                </Grid>
                <Grid container spacing={3} component={Paper}>
                    {[1, 2, 3, 4].map((val, idx) => <Grid item
                        md={(val === 1 || val === 3) ? 4 : 2}
                        sm={6} xs={12} key={idx}>
                        {inputFields.benefitsTwo.map((v, i) => {
                            return (<React.Fragment key={i}>
                                {v.grid === val && <InputLabel style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden', marginTop: '20px'
                                }}>{v.label}</InputLabel>}
                                {v.grid === val && v.type === 'text' && <FormControl fullWidth
                                    style={{
                                        marginTop: i > 2 ? '30px' : '15px',
                                    }}>
                                    <TextField name={v.name}
                                        id={v.name}
                                        value={inputValues[v.name || v.id]}
                                        onChange={handleChange} id={v.id} variant='outlined' />
                                </FormControl>}
                            </React.Fragment>)
                        })}
                    </Grid>)}
                    <InputLabel style={{ margin: '0 0 10px 10px' }}>Additional Notes</InputLabel>
                    <FormControl fullWidth margin='normal'
                        style={{ margin: '0 5px 0 10px' }}>
                        <TextareaAutosize minLength={200}
                            maxLength={200}
                            rowsMax={20}
                            onChange={handleChange}
                            name='additional_notes'
                            className={classes.modaltextarea}
                            id='additional_notes'
                            value={inputValues.additional_notes}
                            color='white' cols={60} />
                    </FormControl>
                    <FormControl fullWidth margin='normal'
                        style={{ alignItems: 'flex-end', display: 'flex', paddingRight: '20px' }}>
                        <Button variant='contained' style={{
                            maxWidth: '300px',
                            minHeight: '60px',
                        }} type='button'
                            color='primary'
                            size='large'
                            onClick={() => setButtonSelect(2)}
                            fullWidth>Continue</Button>
                    </FormControl>
                </Grid>
            </div>}
            {buttonSelect == 2 && <div style={{ margin: '0 10px 0 10px' }}>
                <Grid container spacing={width !== 'xs' && 3}
                >
                    {[1, 2, 3, 4].map((val, idx) => <Grid item

                        md={3} key={idx} sm={6} xs={12}>
                        {inputFields.Payments.map((v, i) => {
                            return (<React.Fragment key={i}>
                                {v.grid === val && <InputLabel style={{
                                    margin: '20px 0 10px 0px'
                                }}>{v.label}</InputLabel>}
                                {v.grid === val && v.type === 'text' && <FormControl fullWidth

                                >
                                    <TextField name={v.name}
                                        id={v.name}
                                        value={inputValues[v.name || v.id]}
                                        onChange={handleChange} id={v.id} variant='outlined' />
                                </FormControl>}
                                {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                    style={{ paddingTop: '5px' }} fullWidth>
                                    <Button variant='contained' type={v.type}
                                        color='primary'
                                        style={{ minHeight: '55px' }}
                                        size='large'
                                        onClick={() => setButtonSelect(3)}
                                        fullWidth>{v.placeholder}</Button>
                                </FormControl>}
                            </React.Fragment>)
                        })}
                    </Grid>)}
                </Grid>
            </div>}
            {buttonSelect == 3 && <div style={{
                margin: '0 10px 0 10px'
            }}>
                <Grid container spacing={width !== 'xs' && 3} style={{ padding: '0 0 0 10px' }}
                >
                    {[1, 2, 3, 4].map((val, idx) => <Grid item
                        md={3} key={idx} sm={6} xs={12} >
                        {inputFields.Eligibility.map((v, i) => {
                            return (<React.Fragment key={i}>
                                {val === 1 && (i > 0 && i < 2) && <h3 style={{ fontWeight: 'bold' }}>In Network</h3>}
                                {val === 1 && (i > 1 && i < 3) && <h3 style={{ fontWeight: 'bold' }}>Out Network</h3>}
                                {v.grid === val && <InputLabel style={{
                                    marginTop: val !== 1 && i % 3 !== 0 ? '38px' : '20px',
                                }}>{v.label}</InputLabel>}
                                {v.grid === val && v.type === 'empty' && <FormControl fullWidth
                                    margin='normal' style={{
                                        height: '70px'
                                    }}></FormControl>}
                                {v.grid === val && v.type === 'text' && <FormControl fullWidth
                                    margin='normal' style={{
                                        marginTop: val !== 1 && i % 3 !== 0 && '17px',
                                    }}>
                                    <TextField name={v.name}
                                        id={v.name}
                                        value={inputValues[v.name || v.id]}
                                        onChange={handleChange} id={v.id}
                                        variant='outlined' />
                                </FormControl>}

                                {v.grid === val && v.type === 'button' && <FormControl margin='normal'
                                    style={{ marginTop: '30px', }} fullWidth>
                                    <Button variant='outlined' type={v.type}
                                        color='primary'
                                        style={{
                                            minHeight: '50px',
                                        }}
                                        size='large'
                                        onClick={() => ''}
                                        fullWidth>{v.placeholder}</Button>
                                </FormControl>}
                            </React.Fragment>)
                        })}
                    </Grid>)}
                    <FormControl fullWidth margin='normal'
                        style={{
                            alignItems: 'flex-end', display: 'flex',
                        }}>
                        <Button variant='contained' style={{
                            maxWidth: '355px',
                            minHeight: '55px',
                        }} type='button'
                            color='primary'
                            size='large'
                            onClick={() => setButtonSelect(4)}
                            fullWidth>Continue</Button>
                    </FormControl>
                </Grid>
            </div>}
            {buttonSelect === 4 && <div>
                <Accordion expanded={true}>
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
                                Statement Setting
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3} style={{
                            padding: '10px'
                        }}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} key={idx}>
                                {[{ placeholder: 'Mark for Priority Statements', grid: 1 },
                                { placeholder: 'Exclude from batch Statements', grid: 2 }].map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <FormControl fullWidth
                                            style={{ marginTop: '30px' }}
                                            margin='normal'><div className={classes.check}>
                                                < Checkbox color='primary' />
                                                <Typography variant='h6'>{v.placeholder}</Typography>
                                            </div></FormControl>}
                                    </React.Fragment>)
                                })}
                            </Grid>)}
                            <div>
                                <InputLabel style={{ margin: '0 0 10px 15px' }}>Additional Notes</InputLabel>
                                <FormControl fullWidth margin='normal'
                                    style={{ margin: '0 5px 0 15px' }}>
                                    <TextareaAutosize minLength={200}
                                        maxLength={200}
                                        rowsMax={10}
                                        onChange={handleChange}
                                        name='statement_notes'
                                        className={classes.modaltextarea}
                                        id='statement_notes'
                                        value={inputValues.statement_notes}
                                        color='white' cols={60} />
                                </FormControl>
                            </div>
                            <FormControl fullWidth margin='normal'
                                style={{
                                    alignItems: 'flex-end', display: 'flex',
                                    marginRight: '5px'
                                }}>
                                <Button variant='contained' style={{
                                    maxWidth: '370px',
                                    minHeight: '60px',
                                }} type='button'
                                    color='primary'
                                    size='large'
                                    onClick={() => setButtonSelect(5)}
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
            </div>}

            {/* banana hai */}
            {buttonSelect === 5 &&
                <Accordion expanded={true}>
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild} >
                            <Typography variant="h6" style={{ marginRight: "10px", }}>
                                Additional Info </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3} style={{
                            padding: '20px 20px 0 10px'
                        }}>
                            {[{ placeholder: 'Mark for Priority Statements' },
                            { placeholder: 'Exclude from batch Statements' }].map((v, i) => {
                                return (<Grid item md={6} sm={12} xs={12} key={i}>
                                    <InputLabel style={{ margin: '10px 0 10px 15px' }}>
                                        {v.placeholder}</InputLabel>
                                    <FormControl fullWidth margin='normal'
                                        style={{ margin: '0 5px 0 15px' }}>
                                        <TextareaAutosize minLength={200}
                                            maxLength={200}
                                            rowsMax={10}
                                            onChange={handleChange}
                                            name='statement_notes'
                                            className={classes.modaltextarea}
                                            id='statement_notes'
                                            value={inputValues.statement_notes}
                                            color='white' cols={60} />
                                    </FormControl>
                                </Grid>)
                            })}
                            <FormControl fullWidth margin='normal'
                                style={{
                                    alignItems: 'flex-end',
                                    display: 'flex', marginRight: '5px'
                                }}>
                                <Button variant='contained' style={{
                                    maxWidth: '370px',
                                    minHeight: '60px',
                                }} type='button'
                                    color='primary'
                                    size='large'
                                    onClick={() => setSelectHandler(3)}
                                    fullWidth>Continue</Button>
                            </FormControl>
                            <Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                        </Grid>
                    </AccordionDetails>
                </Accordion>}
        </div >
    )
}
export default InsuranceInformation;