import React, { useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    AppBar,
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
import EventIcon from "@material-ui/icons/Event";
import DateFnsUtils from "@date-io/date-fns";
import { Autocomplete } from "@material-ui/lab";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DateTimePicker,
} from "@material-ui/pickers";
import * as inputFields from '../InputFields';
import {
    Search,
    SearchOutlined,
    ArrowDropUp,
    Event,
    ArrowDropDown,
    CheckCircleOutline,
    Close,
} from "@material-ui/icons";
import Fade from "react-reveal/Fade";

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
        minHeight: '70px',
        outline: 'none',
        marginRight: '20px',
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

const OtherContacts = ({ width, setSelectHandler, otherCont_select, setOther_contSelect }) => {
    const classes = useStyle();
    const [error, setError] = useState(null)
    console.log(width)
    const [expanded, setExpanded] = useState('panel1');
    const [familycontactexpanded, setFamilyCont_Expanded] = useState('panel1');
    const [select, setSelect] = useState(0)
    const [inputValues, setInputValues] = useState({
        name: '',
    })

    const handleChange = e => {
        setInputValues({
            ...inputValues,
            [e.target.id || e.target.name]: e.target.value,
        })
    }

    return (
        <div style={{ margin: '20px 20px 10px 20px' }}>
            {otherCont_select === 0 && < div > <Accordion expanded={expanded === "panel1"}
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
                            Medical Contacts
                        </Typography>
                        {expanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3}>
                        {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} sm={6} xs={12} key={idx} >
                            {inputFields.MedicalCOntacts.map((v, i) => {
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
                        <FormControl fullWidth margin='normal'
                            style={{
                                alignItems: width === 'xs' ? 'center' : 'flex-end',
                                display: 'flex',
                            }}>
                            <Button variant='contained' style={{
                                maxWidth: '355px',
                                minHeight: '55px',
                            }} type='button'
                                color='primary'
                                size='large'
                                onClick={() => setExpanded('panel2')}
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
                                Initial Patient Contact
                            </Typography>
                            {expanded === "panel2" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                                {inputFields.InitialPatientCont.map((v, i) => {
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
                                                onClick={() => setExpanded('panel3')}
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
                    onChange={() => setExpanded('panel3')}
                    style={{ margin: '0 0 10px 0' }}
                >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px" }} >
                                How Caller Heard Of Facility
                            </Typography>
                            {expanded === "panel3" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2].map((val, idx) => <Grid item md={6} xs={12} sm={6} key={idx} >
                                {inputFields.CallerHeardOne.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                        {
                                            v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                                required={v.required}
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                value={inputValues[v.id || v.name]}
                                                onChange={handleChange}
                                            />
                                        }
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
                            <Grid container spacing={3} component={Paper}
                                style={{ margin: '0 15px 0 15px' }}>
                                <AppBar position='sticky' elevation={0} style={{
                                    backgroundColor: 'white',
                                }} >
                                    <Tabs
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        value={select}
                                        aria-label="scrollable auto tabs example" >
                                        {['Referring Provider', 'Other Provider'].map((v, i) => <Tab key={i}
                                            onClick={() => setSelect(i)}
                                            label={<div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}>
                                                <div className={classes.Inlabel} style={{
                                                    border: select === i ? 'none' : '1px solid lightgray'
                                                }} >
                                                    {select === i ? <CheckCircleOutline style={{ color: '#396cf0' }}
                                                        fontSize='small' /> : null}</div>{v}</div>}
                                            style={{
                                                border: '1px solid lightgray',
                                                borderRight: 'none',
                                                borderBottom: select === i ? '3px solid #396cf0' :
                                                    '1px solid lightgray'
                                            }} />)}
                                    </Tabs>
                                </AppBar>
                                {[1, 2].map((val, idx) => <Grid item md={6} xs={12} sm={6} key={idx} >
                                    {inputFields.CallerHeardtwo.map((v, i) => {
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
                            </Grid>
                            <FormControl fullWidth margin='normal'
                                style={{
                                    alignItems: width === 'xs' ? 'center' : 'flex-end',
                                    display: 'flex'
                                }}>
                                <Button variant='contained' style={{
                                    maxWidth: '355px',
                                    minHeight: '55px',
                                }} type='button'
                                    color='primary'
                                    size='large'
                                    onClick={() => setExpanded('panel4')}
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
                <Accordion expanded={expanded === "panel4"}
                    onChange={() => setExpanded('panel4')}
                    style={{ margin: '0 0 10px 0' }}
                >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px" }} >
                                Emergency Contact
                            </Typography>
                            {expanded === "panel4" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3].map((val, idx) => <Grid item md={4} xs={12} sm={6} key={idx}
                            >
                                {inputFields.emergency_contact.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                        {
                                            v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                                required={v.required}
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                value={inputValues[v.id || v.name]}
                                                onChange={handleChange}
                                            />
                                        }
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
                                    defaultValue=''
                                    value={inputValues.additional_notes}
                                    color='white' cols={60} />
                            </FormControl>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                                {inputFields.emergency_contact_one.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                        {
                                            v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                                required={v.required}
                                                variant='outlined'
                                                fullWidth
                                                value={inputValues[v.id || v.name]}
                                                margin='normal'
                                                onChange={handleChange}
                                            />
                                        }
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
                                    onClick={() => setOther_contSelect(1)}
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
            {otherCont_select === 1 && <div>
                <Accordion expanded={familycontactexpanded === "panel1"}
                    style={{ margin: '0 0 10px 0' }}
                    onChange={() => setFamilyCont_Expanded('panel1')} >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px", }}>
                                Family Contacts #1
                            </Typography>
                            {familycontactexpanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3].map((val, idx) => <Grid item md={4} xs={12} sm={6} key={idx} >
                                {inputFields.familyContactFirstCollapse.map((v, i) => {
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
                            <FormControl fullWidth margin='normal'
                                style={{ alignItems: width === 'xs' ? 'center' : 'flex-end', display: 'flex', }}>
                                <Button variant='contained' style={{
                                    maxWidth: '355px',
                                    minHeight: '55px',
                                }} type='button'
                                    color='primary'
                                    size='large'
                                    onClick={() => setFamilyCont_Expanded('panel2')}
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
                <Accordion expanded={familycontactexpanded === "panel1"}
                    style={{ margin: '0 0 10px 0' }}
                    onChange={() => setFamilyCont_Expanded('panel2')} >
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
                                Family Contacts #2
                            </Typography>
                            {familycontactexpanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3].map((val, idx) => <Grid item md={4} xs={12} sm={6} key={idx} >
                                {inputFields.familyContactsecondCollapse.map((v, i) => {
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
                                    onClick={() => setOther_contSelect(2)}
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
            {otherCont_select === 2 && <div>
                <Accordion expanded={familycontactexpanded === "panel1"}
                    style={{ margin: '0 0 10px 0' }}
                    onChange={() => setFamilyCont_Expanded('panel1')} >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px", }}>
                                Guardian #1
                            </Typography>
                            {familycontactexpanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12}
                                sm={6} key={idx} >
                                {inputFields.guardianone.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                        {v.grid === val && v.type === 'empty' && <FormControl fullWidth
                                            style={{
                                                height: (i === 8 || i === 15 || i === 22) ? '65px' : '53px',
                                                marginTop: '30px'
                                            }}>
                                        </FormControl>}
                                        {v.grid === val && v.type === 'bold' && <FormControl fullWidth
                                            margin='normal' style={{
                                                height: '70px', fontWeight: 'bold',
                                            }}>
                                            <Typography variant='h5'>{v.placeholder}</Typography> </FormControl>}
                                        {v.grid === val && v.type === 'label' && <FormControl fullWidth
                                            margin='normal' style={{
                                                height: '70px',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                            <Typography variant='h6'>{v.placeholder}</Typography> </FormControl>}
                                        {
                                            v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                                required={v.required}
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                onChange={handleChange}
                                            />
                                        }
                                        {v.grid === val && v.type === 'button' && <FormControl
                                            style={{ marginTop: '15px' }}
                                            fullWidth>
                                            <Button variant={v.placeholder === 'Continue' ?
                                                'contained' : 'outlined'} type={v.type}
                                                color='primary'
                                                size='large'
                                                onClick={() => setFamilyCont_Expanded('panel2')}
                                                style={{ minHeight: '55px' }}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                        {v.grid === val && v.type === 'radio' && <FormControl fullWidth
                                            margin='normal'>
                                            <RadioGroup aria-label="gender" name="type"
                                                className={classes.radios}
                                                onChange={handleChange}>
                                                {v.radios.map((val, idx) => <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }} key={idx}>
                                                    <Radio value={val} size='small' color='primary' />
                                                    <span >{val}</span>
                                                </div>)}
                                            </RadioGroup>
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
                <Accordion expanded={familycontactexpanded === "panel1"}
                    style={{ margin: '0 0 10px 0' }}
                    onChange={() => setFamilyCont_Expanded('panel2')} >
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
                                Guardian #2
                            </Typography>
                            {familycontactexpanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12}
                                sm={6} key={idx} >
                                {inputFields.guardiantwo.map((v, i) => {
                                    return (<React.Fragment key={i}>
                                        {v.grid === val && <InputLabel style={{ marginTop: '20px' }} >{v.label}</InputLabel>}
                                        {v.grid === val && v.type === 'empty' && <FormControl fullWidth
                                            style={{
                                                height: (i === 8 || i === 15 || i === 22) ? '65px' : '53px',
                                                marginTop: '30px'
                                            }}>
                                        </FormControl>}
                                        {v.grid === val && v.type === 'bold' && <FormControl fullWidth
                                            margin='normal' style={{
                                                height: '70px', fontWeight: 'bold',
                                            }}>
                                            <Typography variant='h5'>{v.placeholder}</Typography> </FormControl>}
                                        {v.grid === val && v.type === 'label' && <FormControl fullWidth
                                            margin='normal' style={{
                                                height: '70px',
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>
                                            <Typography variant='h6'>{v.placeholder}</Typography> </FormControl>}
                                        {
                                            v.grid === val && v.type === 'text' && <TextField name={v.name} id={v.id}
                                                required={v.required}
                                                variant='outlined'
                                                fullWidth
                                                margin='normal'
                                                onChange={handleChange}
                                            />
                                        }
                                        {v.grid === val && v.type === 'button' && <FormControl
                                            style={{ marginTop: '15px' }}
                                            fullWidth>
                                            <Button variant={v.placeholder === 'Continue' ?
                                                'contained' : 'outlined'} type={v.type}
                                                color='primary'
                                                size='large'
                                                onClick={() => setFamilyCont_Expanded('panel2')}
                                                style={{ minHeight: '55px' }}
                                                fullWidth>{v.placeholder}</Button>
                                        </FormControl>}
                                        {v.grid === val && v.type === 'radio' && <FormControl fullWidth
                                            margin='normal'>
                                            <RadioGroup aria-label="gender" name="type"
                                                className={classes.radios}
                                                onChange={handleChange}>
                                                {v.radios.map((val, idx) => <div key={idx}
                                                    style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Radio value={val} size='small' color='primary' />
                                                    <span >{val}</span>
                                                </div>)}
                                            </RadioGroup>
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
                <Accordion expanded={familycontactexpanded === "panel1"}
                    style={{ margin: '0 0 10px 0' }}
                    onChange={() => setFamilyCont_Expanded('panel2')} >
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px" }}                            >
                                Responsible Person
                            </Typography>
                            {familycontactexpanded === "panel1" ? <ArrowDropUp /> : <ArrowDropDown />}
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            {[1, 2, 3, 4].map((val, idx) => <Grid item md={3} xs={12} sm={6} key={idx} >
                                {inputFields.responsibleperson.map((v, i) => {
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
                                    onClick={() => setOther_contSelect(3)}
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
            {otherCont_select === 3 && <div>
                <Accordion expanded={true}
                    style={{ margin: '0 0 10px 0' }}>
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.accordion}>
                        <div className={classes.accordionChild}>
                            <Typography variant="h6" style={{ marginRight: "10px", }}>
                                Custom Contact
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3} >
                            {inputFields.customcontact.map((v, i) => {
                                return (<Grid item md={2} xs={12} sm={4} key={i} >
                                    {v.type === 'text' && <TextField name={v.name} id={v.id}
                                        required={v.required}
                                        variant='outlined'
                                        fullWidth
                                        value={inputValues[v.name || v.id]}
                                        placeholder={v.placeholder}
                                        margin='normal'
                                        onChange={handleChange}
                                    />
                                    }
                                    {v.type === 'button' && <FormControl margin='normal'
                                        fullWidth>
                                        <Button variant='contained' type={v.type}
                                            color='primary'
                                            style={{ minHeight: '55px' }}
                                            size='large'
                                            onClick={() => setSelectHandler(4)}
                                            fullWidth>{v.placeholder}</Button>
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
            </div>}
        </div >
    )
}
export default OtherContacts;