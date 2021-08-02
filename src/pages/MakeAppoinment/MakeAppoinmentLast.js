import React, { useCallback, useState, useContext, useEffect, useRef } from 'react';
import {
    Modal, Typography, withWidth, Button, Grid, createMuiTheme, makeStyles, Select,
    MenuItem, FormControl,
    Card, Divider, ThemeProvider, IconButton, Tooltip
} from '@material-ui/core';
import Loader from "react-loader-spinner";
import './MakeAppoinmentLast.css';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import PostData from '../../Fetch/postData1';
import moment from 'moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardArrowDown, NavigateNext,
    NavigateBefore, ArrowLeft, ArrowRight, Info
} from '@material-ui/icons';
import MyContext from '../../helper/themeContext';
import Slider from "react-slick";
import GetData from '../../Fetch/GetData1';
import PatientMedicalPortalSideBar from './PatientMedicalPortalSideBar';
import ThankYouModal from './ThankYouModal';

const useStyle = makeStyles(MuiThemeProvider => ({
    avatar: {
        width: '15px',
        height: '15px',
        margin: '5px 5px 0 0',
    },
    bluegrid: {
        color: 'white',
        padding: '30px 20px 0 20px',
        backgroundColor: '#396cf0',
        opacity: 0.9,
        position: 'relative',
    },
    slotCircle: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%', marginRight: '10px',
    },
    card: {
        margin: '2%',
        padding: '2%',
        borderRadius: '0px'
    },
    msgGrid: {
        backgroundColor: '#F0F4FF', alignItems: 'center',
        display: 'flex',
        padding: '10px',
        color: '#396cf0',
        fontWeight: 'bold',
        border: '2px solid blue'
    },
    renderdays: {
        color: 'white',
        cursor: 'pointer',
        maxWidth: '60px',
        borderRadius: '10px',
        padding: '10px 0 10px 0',
        textAlign: 'center'
    },
    submit: {
        bottom: 0,
        right: 0,
        position: 'absolute'
    }
}));

const theme = createMuiTheme({
    MuiTooltip: {
        tooltip: {
            backgroundColor: '#EFEFEF',
            color: 'black',
            border: '0px',
        },
        arrow: {
            color: 'white',
            "&::before": {
                backgroundColor: "#EFEFEF",
                border: "1px solid #EFEFEF"
            }
        }
    },
    props: {
        MuiInputBase: {
            color: 'primary'
        },
        MuiIconButton: {
            disableRipple: true,
            disableTouchRipple: true,
            focusRipple: false,
            disableFocusRipple: true,
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
    palette: {
        primary: {
            light: '#396cf0',
            main: '#396cf0',
            dark: '#396cf0',
        },
        secondary: {
            main: '#FFFFFF'
        },
        success: {
            main: '#808080'
        }
    },
})

const NextPrevBtn = ({ click, next, prev }) => {
    return (<IconButton onClick={click}> {next ? <NavigateNext style={{
        color: 'lightgray', fontSize: 50, position: 'absolute', zIndex: 5
    }} /> : <NavigateBefore style={{
        marginRight: '20px',
        color: 'lightgray', fontSize: 50, position: 'absolute'
    }} />}</IconButton>)
}
const MakeAppoinmentLast = props => {
    const classes = useStyle();
    const sliderRef = useRef();
    const [slot, setSlot] = useState('');
    const [click, setClick] = useState(null)
    const context = useContext(MyContext);
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDate, setDate] = useState(moment());
    const [inputValue, setInputValue] = useState(moment().format('yyyy-MM-DD'));
    const [dateSelect, setDateSelect] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [loading, setLoading] = useState(false)
    const [renderDays, setRenderDays] = useState([])
    const [doctors, setDoctors] = useState([]);
    const [msgPosition, setMsgPosition] = useState(null)
    const [open, setOpen] = useState(false)
    const [morningSlots, setMorningSlots] = useState([])
    const [eveningSlots, setEveningSlots] = useState([])

    const _SetDepartments = (response) => {
        if (response.ResponseCode === "Success") {
            setDepartments(response.data)
        }
    }

    const _SetDoctors = (response) => {
        if (response.ResponseCode === "Success") {
            setDoctors(response.data)
        }
    }


    useEffect(() => {
        if (departmentId) {
            GetData(context.BaseUrl + `/doctors?department_id=${departmentId}`,
                200,
                context.state.user.token,
                _SetDoctors)
        }
    }, [departmentId])

    const setDoctors_Slot = res => {
        const morning = []
        const evening = []
        res.data.forEach(el => {
            if (parseInt(el.start_time.split(':')[0]) >= 12) {
                evening.push(el)
            } else {
                morning.push(el)
            }
        })
        setMorningSlots(morning);
        setEveningSlots(evening);
        setLoading(false)
    }
    useEffect(() => {
        if (doctorId) {
            GetData(
                context.BaseUrl + `/doctor/schedule?doctor_id=${doctorId}&branch_id=${departmentId}&date=${inputValue}`,
                200,
                context.state.user.token,
                setDoctors_Slot
            )
        }
    }, [doctorId, inputValue])

    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
    };


    useEffect(() => {
        inputValue && sliderRef.current.slickNext()
    }, [inputValue])
    const nextPrevDays = (name, load) => {
        let days = [];
        const date = moment(inputValue).format('DD-MM-YYYY');
        for (let i = 1; i <= 9; i++) {
            if (name === 'next') {
                days.push(moment(new Date().getDate(), 'DD-MM-YYYY').add(i, 'days').format('ddd, DD'))
            }
            else {
                days.push(moment().subtract(date, 'DD-MM-YYYY').format('ddd, DD'));
            }
        }
        setRenderDays(days);
    }


    const PostSubmit = res => {
        console.log('post res==>', res)
        if (res.ResponseCode === "Success") {
            setOpen(true)
        }
        else alert('Something gone wrong!')
    }


    const handleSubmit = e => {
        e.preventDefault();
        console.log('submit', slot)
        PostData(
            context.BaseUrl + '/appointment',
            200,
            {
                // patient_id: inputValues.patientId,
                // administrator_id: 2,
                // appointment_type_id: 1,
                // schedule_id: slot,
                // event_notes: inputValues.urgency_notes,
                // patient_notes: inputValues.patient_notes,
                // type: inputValues.type,
            },
            context.state.user.token,
            PostSubmit
        )
    }
    useEffect(() => {
        nextPrevDays('next', 'onLoad');
        GetData(context.BaseUrl + '/doctor/departments',
            200, context.state.user.token, _SetDepartments)
    }, [])



    const settings = {
        infinite: renderDays.length > 7,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8,
        nextArrow: <div >
            <NextPrevBtn click={() => nextPrevDays('next')}
                next={true} /></div>,
        prevArrow: <div >
            <NextPrevBtn click={() => nextPrevDays('prev')}
                prev={true} /></div>
    };

    const slothandler = (book, id, position) => {
        if (book === 1) {
            setClick(id)
            setMsgPosition(position);

        } else {
            setMsgPosition(null);
            setSlot(id)
        }
    }


    return (
        <ThemeProvider theme={theme} >
            <ThankYouModal open={open} onClose={() => setOpen(false)} />
            <Grid style={{ height: window.screen.height }} container>
                <Grid item md={4} xs={12} sm={12} className={classes.bluegrid} >
                    <PatientMedicalPortalSideBar width={props.width} />
                </Grid>
                <Grid item md={8} sm={12} xs={12}
                    style={{ backgroundColor: 'lightgray' }}
                    elevation={2}>
                    <Card raised className={classes.card} >
                        <Typography variant='h4'
                            style={{
                                margin: '20px',
                                display: 'block',
                                textAlign: props.width === 'xs' ? 'center' : null
                            }} >Make An Appoinment</Typography>
                        <Grid container >
                            <Grid item md={4} sm={4} xs={12} style={{ padding: '0 30px 0 30px' }} >
                                <FormControl fullWidth size='small' >
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            id="date-picker-inline"
                                            margin="normal"
                                            size='small'
                                            defaultValue='2021-04-20'
                                            value={inputValue}
                                            inputValue={inputValue}
                                            format="yyyy-MM-dd"
                                            onChange={onDateChange}
                                            inputVariant='outlined'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            error={null}
                                            keyboardIcon={<KeyboardArrowDown />}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormControl>
                            </Grid>
                            <Grid md={4} item sm={4} style={{ padding: '10px' }} xs={12}>
                                <FormControl fullWidth size='small' >
                                    <Select variant='outlined'
                                        type='select' defaultValue=""
                                        name='department'
                                        value={departmentId}
                                        onChange={e => setDepartmentId(e.target.value)} >
                                        {departments.map((v, i) => <MenuItem value={v.id} key={i} >{v.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid md={4} item sm={4} xs={12} style={{ padding: '10px' }} >
                                <FormControl fullWidth size='small' >
                                    <Select variant='outlined'
                                        type='select'
                                        defaultValue=""
                                        value={doctorId}
                                        onChange={e => { setDoctorId(e.target.value); setLoading(true) }} >
                                        {doctors.map((v, i) => <MenuItem value={v.id} key={i} >{v.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container
                            justify='center'>
                            <Slider
                                {...settings}
                                style={{ width: '90%', }}
                                ref={sliderRef}
                                arrows
                                draggable >
                                {renderDays.map((v, i) => {
                                    const index = v.indexOf(',')
                                    return (<div >
                                        <Card style={{
                                            backgroundColor: v === dateSelect ? '#396cf0' : 'lightgray',
                                        }} className={classes.renderdays} onClick={() => setDateSelect(v)} >
                                            {v.slice(0, index)}<br />{v.slice(index + 1)}
                                        </Card></div>)
                                })}
                            </Slider>
                        </Grid>
                        <br />
                        <Grid item md={12} style={{ minHeight: '200px', paddingTop: '10px' }}>
                            {msgPosition === 0 ? <Grid container justify='space-around'
                                className={classes.msgGrid}>
                                <Info style={{ color: '#396cf0', }}
                                    fontSize='large' />
                                <Typography >This Slot is Booked Are you sure you want to go in waiting List?</Typography>
                                <Button variant="contained" style={{ Width: '300px' }}
                                    id='Patient_Info_Buttons2' onClick={() => {
                                        setSlot(click); setMsgPosition(null)
                                    }}>Go to Waiting List</Button>
                            </Grid> : null}
                            <Typography style={{ marginLeft: '10px' }} variant='h6' >Morning</Typography>
                            <Typography style={{ marginLeft: '10px' }} paragraph >9:00 AM to 12:00 PM</Typography>
                            {loading ? <Loader type='Bars'
                                style={{ display: 'flex', alignSelf: 'center' }} color="#396CF0" height={50} width={50} /> :
                                morningSlots.map((v, i) => <span key={i}
                                    style={{ opacity: v.booked === 1 && 0.5 }}><Button
                                        color={slot === v.id ? 'primary' : 'white'}
                                        style={{ marginTop: '15px', marginLeft: '10px', width: "125px" }}
                                        variant={slot === v.id ? 'contained' : 'outlined'}
                                        onClick={() => slothandler(v.booked, v.id, 0)}
                                    >
                                        <div style={{
                                            border: slot === v.id ? null : '1px solid lightgray'
                                        }} className={classes.slotCircle} >{slot === v.id ? <CheckCircleIcon style={{
                                            height: '20px', width: '20px'
                                        }}
                                            fontSize='small' /> : null}</div>{v.start_time} {' '}{v.format}
                                    </Button>
                                </span>)}
                        </Grid>
                        <Divider orientation='horizontal' style={{ marginTop: '20px' }} />
                        <Grid item md={12} style={{
                            position: 'relative',
                            paddingTop: '10px', minHeight: '200px'
                        }}>
                            {msgPosition === 1 ? <Grid container justify='space-around'
                                className={classes.msgGrid}>
                                <Info style={{ color: '#396cf0', }}
                                    fontSize='large' />
                                <Typography >This Slot is Booked Are you sure you want to go in waiting List?</Typography>
                                <Button variant="contained" style={{ Width: '300px' }}
                                    id='Patient_Info_Buttons2' onClick={() => ''}>Go to Waiting List</Button>
                            </Grid> : null}
                            <Typography style={{ marginLeft: '10px' }} variant='h6' >Evening</Typography>
                            <Typography style={{ marginLeft: '10px' }} paragraph >5:00 PM to 8:00 PM</Typography>
                            {
                                loading ? <Loader type='Bars'
                                    style={{ display: 'flex', alignSelf: 'center' }} color="#396CF0" height={50} width={50} /> :
                                    eveningSlots.map((v, i) => <span key={i}
                                        style={{ opacity: v.booked === 1 && 0.5 }}>
                                        <Button color={slot === v.id ? 'primary' : 'white'}
                                            style={{
                                                marginTop: '15px', marginLeft: '10px',
                                                width: "125px"
                                            }}
                                            variant={slot === v.id ? 'contained' : 'outlined'}
                                            onClick={() => slothandler(v.booked, v.id, 1)}
                                        ><div style={{
                                            border: slot === v.id ? null : '1px solid lightgray'
                                        }} className={classes.slotCircle} >{slot === v.id ? <CheckCircleIcon style={{
                                            height: '20px', width: '20px',
                                            margin: '0'
                                        }}
                                            fontSize='small' /> : null}</div>{v.time} {' '}{v.format}</Button>
                                    </span>)}
                            <Button type='submit' className={classes.submit} variant="contained"
                                id='Patient_Info_Buttons2'
                                onClick={handleSubmit}

                                size='large'>Submit</Button>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}

export default MakeAppoinmentLast;
