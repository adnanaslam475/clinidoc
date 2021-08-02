import React, { useState, useContext, useEffect, } from 'react';
import {
    Typography, withWidth, Tabs, Tab,
    Button, Grid, createMuiTheme, makeStyles,
    TextareaAutosize, Select,
    MenuItem, TextField, InputLabel, FormControl, InputAdornment,
    Checkbox, AppBar, ThemeProvider,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import {
    CheckCircleOutline
} from '@material-ui/icons';
import Fade from "react-reveal/Fade";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import * as Fields from './dummy';
import PatientMedicalPortalSideBar from './PatientMedicalPortalSideBar';
import MyContext from '../../helper/themeContext';
import GetData from '../../Fetch/GetData1';
import PostData from '../../Fetch/postData1';
import moment from 'moment';

const useStyle = makeStyles(them => ({
    main: {
    },
    tab: {
        border: '1px solid lightgray',
    },
    Inlabel: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%',
        margin: '2px 10px 0 0'
    },
    avatar: {
        width: '15px',
        height: '15px',
        margin: '5px 5px 0 0',
    },
    btngrid: {
        display: 'flex',
        margin: '20px',
        justifyContent: 'flex-end',
    },
    link: {
        cursor: 'pointer',
        color: 'blue'
    },
    PersonImg: {
        height: '93%',
        width: '95%',
        zIndex: -1,
        position: 'absolute',
        opacity: 0.3,
    },
    bluegrid: {
        color: 'white',
        padding: '30px 20px 0 10px',
        backgroundColor: '#396cf0',
        opacity: 0.9,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const theme = createMuiTheme({
    props: {
        MuiInputBase: {
            color: 'primary'
        },
        MuiSelect: {
            MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                },
                getContentAnchorEl: null
            }
        }
    },
})



const PatientMedicalPortal = props => {
    const [select, setSelect] = useState(0);
    const history = useHistory()
    const [enabled, setEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const classes = useStyle();
    const [dob, setDob] = useState(null)
    const [insured_dob, setInsuredDob] = useState(new Date())
    const [referalId, setreferalId] = useState('')
    const context = useContext(MyContext);
    const [error, setError] = useState(null)
    const [inputValues, setInputValues] = useState({
        patient_name: '',
        gender: '',
        legal_guardian: '',
        emergency_contact: '',
        address: '',
        email: '',
        ssn: '',
        phone: '',
        phone_two: '',

        race: '',
        marital_status: '',
        relationship: '',
    })


    useEffect(() => {
        _getRefferalInfo();
    }, []);


    const _getRefferalInfo = () => {

        setLoading(true)
        let fullLength = context.history.location.pathname.length;
        let iniLength = "quick-appointment/".length
        let iniPointer = context.history.location.pathname.search("quick-appointment");
        let Pointer = iniPointer + iniLength;
        let encodedString = context.history.location.pathname.slice(Pointer, fullLength);
        let encodedId = encodedString.split('/')[0]
        let decodedId = atob(encodedId)
        let id = parseInt(decodedId);
        setreferalId(id)
        GetData(context.BaseUrl + `/referral/id?id=${id}`,
            200,
            context.state.user.token,
            _setReferralInfo)
    }

    const _setReferralInfo = (response) => {
        let data = response.data[0]?.referral;
        if (data) {

            let inputValues = {
                patient_name: data.patient_name,
                gender: '',
                legal_guardian: '',
                address: data.patient_address,
                email: data.patient_email,
                ssn: '',
                phone: data.patient_phone,
                emergency_contact: '',
                phone_two: data.phone_of_contact_person,
                race: '',
                dob: data.patient_dob,
                marital_status: '',
                relationship: data.relationship_to_patient,
            }
            setDob(data.patient_dob)
            setInputValues(inputValues);
        }
        setLoading(false);
    }

    const inputchange = (e) => {
        setError(null)
        setInputValues({
            ...inputValues,
            [e.target.id || e.target.name]: e.target.value
        })

    }
    const validNumber = e => {
        ["e", "E", "+", "-"].includes(e.key)
            && e.preventDefault()
    }


    const handleNext = (num) => {
        let fields = [];
        if (num === 1) {
            let allFields = [...Fields.FirstInputFields, ...Fields.SecondInputFields, ...Fields.ThirdInputFields]
            for (let i = 0; i < allFields.length; i++) {
                fields.push({ ...allFields[i], value: inputValues[allFields[i].name] });
                if (allFields[i].required) {
                    if (!inputValues[allFields[i].name]) {
                        setError({
                            isError: true,
                            errorLabel: `${allFields[i].label} is required`,
                        });
                        return;
                    }
                }
            }
            setEnabled(true);
            setSelect(1);
            console.log('break out')
        } else {
            let allFields = [...Fields.FourthInputFields, ...Fields.FifthInputFields, ...Fields.sixInputFields]
            for (let i = 0; i < allFields.length; i++) {
                fields.push({ ...allFields[i], value: inputValues[allFields[i].name] });
                if (allFields[i].required) {
                    if (!inputValues[allFields[i].name]) {
                        setError({
                            isError: true,
                            errorLabel: `${allFields[i].label} is required`,
                        });
                        return;
                    }
                }
            }
            post()
        }
    };

    const post = e => {
        setLoading(true);
        inputValues.dob = moment(dob).format('YYYY-MM-DD');
        inputValues.referral_id = referalId;
        inputValues.insured_dob = moment(dob).format('YYYY-MM-DD');
        PostData(
            context.BaseUrl + "/patient",
            200,
            inputValues,
            context.state.user.token,
            PostSubmit
        );
    }

    const PostSubmit = (response) => {
        history.push("/make-appoinment-last");
        if (response.ResponseCode === "Success") {
            console.log('sucess')
            history.push("/make-appoinment-last");
        }
        else if (response.errors) {
            console.log('err')
            alert(response.errors[0].msg)
            console.log(response.errors[0].msg)
        }
        else {
            setLoading(false);
            alert("Server error");
        }
    };

    return (
        <ThemeProvider theme={theme}  >
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Grid container
                style={{ backgroundColor: 'white', height: '100%' }}>
                <Grid item md={4} xs={12} sm={12}
                    className={classes.bluegrid} >
                    <PatientMedicalPortalSideBar width={props.width} />
                </Grid>
                <Grid item md={8}>
                    <Typography variant='h4'
                        style={{
                            margin: '20px',
                            display: 'block',
                            textAlign: props.width === 'xs' ? 'center' : null
                        }} >Initial Contact Form</Typography>
                    <AppBar position='sticky' elevation={0} style={{
                        backgroundColor: 'white',
                    }} >
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            value={select}
                            aria-label="scrollable auto tabs example" >
                            {Fields.Twotabs.map((v, i) => <Tab key={i}
                                label={<div style={{ display: 'flex' }}>
                                    <div className={classes.Inlabel} style={{
                                        border: select === i ? 'none' : '1px solid lightgray'
                                    }} >{select === i ? <CheckCircleOutline style={{ color: '#396cf0' }}
                                        fontSize='small' /> : null}</div>{v.text}</div>}
                                disabled={i === select && enabled}
                                style={{
                                    border: '1px solid lightgray',
                                    borderRight: 'none',
                                    borderBottom: select === i ? '3px solid #396cf0' :
                                        '1px solid lightgray'
                                }} />)}
                        </Tabs>
                    </AppBar>

                    {select === 0 && (<Grid container >
                        <Grid item md={4} sm={4} xs={12} style={{ padding: '15px', }}>
                            {Fields.FirstInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel  >{v.label}{v.required === true &&
                                        <span style={{ color: 'red' }}>  * </span>}</InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            style={{ margin: '10px 0 15px 0' }}
                                            size='small'
                                            name={v.name}
                                            required={v.required}
                                            value={inputValues[v.id || v.name]}
                                            type={v.type}
                                            onChange={inputchange}
                                            variant="outlined"
                                        />}
                                    {v.type === 'select' && <FormControl fullWidth size='small' >
                                        <Select variant='outlined'
                                            type={v.type}
                                            defaultValue=""
                                            size='small'
                                            id={v.id}
                                            required={v.required}
                                            value={inputValues[v.id || v.name]}

                                            style={{ margin: '10px 0 15px 0' }}
                                            name={v.name}
                                            onChange={inputchange}
                                        >
                                            <MenuItem value='Male' >Male</MenuItem>
                                            <MenuItem value='Female'>Female</MenuItem>
                                        </Select>
                                    </FormControl>}
                                    {v.type === 'date' && <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            id={v.id}
                                            style={{ margin: '10px 0 15px 0' }}
                                            size='small'
                                            value={dob}
                                            required={v.required}
                                            format="MM/dd/yyyy"
                                            onChange={date => setDob(date)}
                                            inputVariant='outlined'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>}
                                    {v.type === 'number' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            onKeyDown={validNumber}
                                            style={{ margin: '10px 0 15px 0' }}
                                            type={v.type}
                                            name={v.name}
                                            value={inputValues[v.id || v.name]}
                                            onChange={inputchange}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                </div>)
                            })}
                        </Grid>
                        <Grid item md={4} sm={4} xs={12} style={{ padding: '15px', }}>
                            {Fields.SecondInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel style={{ marginTop: v.label === 'Phone' ? '80px' : null }} >{v.label}
                                        {v.required === true &&
                                            <span style={{ color: 'red' }}>  * </span>}
                                    </InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            style={{ margin: '10px 0 15px 0' }}
                                            type={v.type}
                                            onChange={inputchange}
                                            value={inputValues[v.id || v.name]}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                    {v.type === 'number' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            style={{ margin: '10px 0 15px 0' }}
                                            type={v.type}
                                            name={v.name}
                                            onChange={inputchange}
                                            value={inputValues[v.id || v.name]}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                    {v.type === 'email' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            style={{ margin: '10px 0 15px 0' }}
                                            type={v.type}
                                            name={v.name}
                                            onChange={inputchange}
                                            value={inputValues[v.id || v.name]}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                </div>)
                            })}
                        </Grid>
                        <Grid item md={4} sm={4} xs={12} style={{ padding: '15px', }}>
                            {Fields.ThirdInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel style={{ marginTop: v.label === 'Relationship' ? '80px' : null }} >{v.label}{v.required === true &&
                                        <span style={{ color: 'red' }}>  * </span>}</InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            name={v.name}
                                            style={{ margin: '10px 0 15px 0' }}
                                            value={inputValues[v.id || v.name]}
                                            type={v.type}
                                            onChange={inputchange}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                    {v.type === 'number' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            value={inputValues[v.id || v.name]}
                                            style={{ margin: '10px 0 15px 0' }}
                                            type={v.type}
                                            name={v.name}

                                            onChange={inputchange}
                                            required={v.required}
                                            variant="outlined"
                                        />}
                                    {v.type === 'select' && <FormControl fullWidth size='small' >
                                        <Select variant='outlined'
                                            type={v.type}
                                            defaultValue=""
                                            style={{ margin: '10px 0 15px 0' }}
                                            size='small'
                                            value={inputValues[v.id || v.name]}
                                            id={v.id}
                                            name={v.name}
                                            required={v.required}
                                            onChange={inputchange} >
                                            <MenuItem value='Single'>Single</MenuItem>
                                            <MenuItem value='Married'>Married</MenuItem>
                                        </Select>
                                    </FormControl>}
                                </div>)
                            })}
                        </Grid>
                        <br />
                        <InputLabel style={{ marginLeft: '10px' }} >Name</InputLabel>
                        <FormControl fullWidth   >
                            <TextareaAutosize
                                rowsMin={4}
                                maxLength={300}
                                style={{ margin: '0 10px 0 10px' }}
                                rowsMax={4}
                                name='name'
                                value={inputValues.name}
                                onChange={inputchange}
                                style={{
                                    resize: 'none',
                                    overflow: 'hidden',
                                    margin: '10px 10px 15px 10px',
                                    outline: 'none',
                                    borderRadius: '5px',
                                    borderColor: 'lightgray',
                                }}
                                aria-label="maximum height"
                            />
                        </FormControl>
                        <Grid item className={classes.btngrid} md={12} sm={12} xs={12}>
                            <Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                            <Button
                                id='Patient_Info_Buttons2'
                                variant="contained"
                                style={{ backgroundColor: 'gray', marginRight: '20px' }} size='large' >Cancel</Button>
                            <Button type='submit' variant="contained"
                                id='Patient_Info_Buttons2'
                                size='large' onClick={() => handleNext(1)} >Next</Button>
                        </Grid>
                    </Grid>)}
                    {select === 1 && (<Grid container >
                        <Grid item md={4} xs={12} sm={4} style={{ padding: '30px' }}>
                            {Fields.FourthInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel  >{v.label}{v.required === true &&
                                        <span style={{ color: 'red' }}>  * </span>}</InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            name={v.name}
                                            style={{ margin: '10px 0 20px 0' }}
                                            type={v.type}
                                            value={inputValues[v.id || v.name]}
                                            onChange={inputchange}
                                            required
                                            variant="outlined"
                                        />}
                                    {v.type === 'number' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            name={v.name}
                                            size='small'
                                            style={{ margin: '10px 0 20px 0' }}
                                            type={v.type}
                                            value={inputValues[v.id || v.name]}
                                            onChange={inputchange}
                                            required
                                            variant="outlined"
                                        />}
                                    {v.type === 'date' && <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            id={v.id}
                                            style={{ margin: '10px 0 15px 0' }}
                                            size='small'
                                            value={insured_dob}
                                            required={v.required}
                                            format="MM/dd/yyyy"
                                            onChange={date => setInsuredDob(date)}
                                            inputVariant='outlined'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>}
                                </div>)
                            })}
                        </Grid>
                        <Grid item md={4} sm={4} xs={12} style={{ padding: '30px' }} xs={12}>
                            {Fields.FifthInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel  >{v.label}{v.required === true &&
                                        <span style={{ color: 'red' }}>  * </span>}</InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            name={v.name}
                                            value={inputValues[v.id || v.name]}
                                            size='small'
                                            style={{ margin: '10px 0 20px 0' }}
                                            type={v.type}
                                            onChange={inputchange}
                                            required
                                            variant="outlined"
                                        />}
                                    {v.type === 'number' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            name={v.name}
                                            size='small'
                                            value={inputValues[v.id || v.name]}
                                            style={{ margin: '10px 0 20px 0' }}
                                            type={v.type}
                                            onChange={inputchange}
                                            required
                                            variant="outlined"
                                        />}
                                </div>)
                            })}
                        </Grid>
                        <Grid item md={4} sm={4} xs={12} style={{ padding: '30px' }} xs={12}>
                            {Fields.sixInputFields.map((v, i) => {
                                return (<div key={i} >
                                    <InputLabel  >{v.label}{v.required === true &&
                                        <span style={{ color: 'red' }}>  * </span>}</InputLabel>
                                    {v.type === 'text' &&
                                        <TextField
                                            fullWidth
                                            id={v.id}
                                            size='small'
                                            name={v.name}
                                            style={{ margin: '10px 0 20px 0' }}
                                            type={v.type}
                                            value={inputValues[v.id || v.name]}

                                            onChange={inputchange}
                                            required
                                            variant="outlined"
                                        />}
                                </div>)
                            })}
                            <Fade bottom collapse when={error?.errorLabel}>
                                <Typography style={{ color: 'red', marginRight: '20px' }}>
                                    {error?.errorLabel}
                                </Typography>
                            </Fade>
                            <Button type='submit' variant="contained"
                                id='Patient_Info_Buttons2'
                                onClick={() => handleNext(2)}
                                style={{ width: '100%', marginTop: '25px' }}
                                size='large'>Submit</Button>
                        </Grid>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox style={{ color: '#396cf0', marginLeft: '10px' }} size='small' />
                            <p style={{ display: 'contents' }}>I agree to the <a className={classes.link} > Terms & conditions</a> and <a className={classes.link}> privacy policy</a></p></div>
                    </Grid>)}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

PatientMedicalPortal.propTypes = {
    width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};
export default withWidth()(PatientMedicalPortal);