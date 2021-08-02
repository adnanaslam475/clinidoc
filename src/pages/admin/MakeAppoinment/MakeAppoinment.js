import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Modal, Typography,
    Button, Grid, createMuiTheme, Radio, withWidth, ListItemIcon,
    IconButton, ListItem, InputAdornment,
    makeStyles, List, FormControlLabel, ThemeProvider, Select,
    MenuItem, TextField,
    // Dialog, DialogTitle, Backdrop, 
    Tooltip, Card,
} from '@material-ui/core';
import {
    MuiPickersUtilsProvider, KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import GetData from "../../../Fetch/GetData1";
import MyContext from '../../../helper/themeContext';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import './MakeAppoinment.css';
import Filter from '../../../assets/filter.png';
// import { filterFields, eventArr } from './Dummydata';
import {
    AddOutlined, Clear
} from '@material-ui/icons';
import moment from 'moment';
import MakeAppoinmentModal from './MakeAppoinmentModal';
import CustomFeedbackDialog from './CustomFeedbackDialog';
import ThankYouModal from './ThankYouModal';

const theme = createMuiTheme({
    overrides: {
        MuiSelect: {
            root: {
                WebkitBoxShadow: "0 0 0 1000px white inset",
            }
        },
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
                },
            }
        }
    },
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
    palette: {
        primary: {
            main: '#396cf0',
        },
        secondary: {
            main: '#396cf0',
        },
        error: {
            light: '#FF0000',
            main: '#FF0000',
            dark: '#FF0000',
        },

    },
})

const usestyles = makeStyles(theme => ({
    main: {
        marginTop: '30px',
        marginLeft: '90px',
        marginRight: '20px',
        background: 'rgb(0,0,0,0)',
        padding: '10px 0% 0 10px',
    },
    eventCard: {
        borderTop: '5px solid red',

        borderRadius: '0px',
        paddingLeft: '10px',
        width: '100%'
    },
    gridtwo: {
        padding: '10px 20px 10px 20px',
    },

    color: {
        backgroundColor: 'black'
    },


}))

const MakeAppoinment = props => {
    const { width } = props;
    const [month, setMonth] = useState('');
    // const [date_from, setStartDate] = useState(new Date());
    // const [date_to, setEndDate] = useState(new Date());
    const [filterValues, setFilterValues] = useState({
        patient_name: '',
        patient_id: '',
        doctor_name: '',
        patient_email: ''
    })
    const [inputValues, setInputValues] = useState({
        patientId: '',
        date: '',
        department: '',
        phone: '',
        email: '',
        urgency_notes: '',
        clinical: '',
        gender: '',
        doctor: '',
        reschedule: '',
        type: '',
        address: '',
        patient_notes: '',
    })


    const [openfilter, setOpenfilter] = useState(false);

    const context = useContext(MyContext)
    const classes = usestyles();
    const calenderref = useRef();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [ThankYoushow, setThankYouShow] = useState(false);
    const [appointments, setAppointments] = useState(null);
    const [patients, setPatients] = useState(null);
    const [clearfilters, setClearFilters] = useState(false);



    const [getAll, setGetAll] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [doctorId, setDoctorId] = useState(null);
    const [doctors, setDoctors] = useState(null);
    const [hideTooltip, sethidetooltip] = useState(false)
    const [departments, setDepartments] = useState(null);
    const [doctor_slots, setdoctor_slots] = useState(null);
    const [slot, setSlot] = useState(null);
    const [select, setSelect] = useState('');
    const [departmentId, setDepartmentId] = useState(null);
    const [clear, setclear] = useState(false);
    const [alldays, setAllDays] = useState(null);
    const [open, setOpen] = useState(false);
    const [feedbackValues, setFeedbackValues] = useState({
        experience: '',
        description: '',
        contactType: 'Call'
    })


    useEffect(() => {
        getAppointments();
        GetData(
            context.BaseUrl + "/doctor/departments",
            200,
            context.state.user.token,
            setDepartmentsData
        );
        GetData(
            context.BaseUrl + "/patients",
            200,
            context.state.user.token,
            setPatientsData
        );
    }, [])
    useEffect(() => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const arrOnmount = moment().format('MMM YYYY');
        const arr = month ? month.split(' ') : arrOnmount.split(' ')
        const index = months.indexOf(arr[0])
        const daysInMonth = moment(
            `${index}-01-${arr[1]}`,
            "MM-DD-YYYY"
        ).daysInMonth();
        let names = [];
        for (let i = 1; i <= daysInMonth; i++) {
            let date = moment(`${index}-${i}-${arr[1]}`, "MM-DD-YYYY");
            names.push({
                show: `${date.format("ddd")}-${date.format("DD")}`,
                value: `${date.format("YYYY-MM-DD")}`
            });
        }
        setAllDays(names);
        getAppointments();
    }, [month, select])

    const setPatientsData = res => {
        // const arr = []
        // res.forEach(el => arr.push({ id: el.patient.id, name: el.patient.patient_name }))
        setPatients(res.data.res)
    }
    useEffect(() => {
        setDoctors([])
        setdoctor_slots([])
        setDoctorId(null)
        if (departmentId) {
            GetData(
                context.BaseUrl + `/doctors?department_id=${departmentId}`,
                200,
                context.state.user.token,
                setDoctorsHandle
            );
        }
    }, [departmentId])


    useEffect(() => {
        setdoctor_slots([])
        if (inputValue && doctorId && departmentId) {
            _getSlots();
        }

    }, [inputValue, doctorId])

    const _getSlots = () => {
        GetData(
            context.BaseUrl + `/doctor/schedule?doctor_id=${doctorId}&branch_id=${departmentId}&date=${inputValue}`,
            200,
            context.state.user.token,
            setDoctors_Slot
        )
    }



    const _setAppointments = res => {
        if (res.data) {
            // setPatientsData(res.data.result)
            let appointments = [];
            res.data.result?.forEach(element => {
                let el = element.patient;

                appointments.push({
                    // display: 'background',
                    // borderColor: 'black',
                    title: el.patient_name,
                    start: new Date(moment(new Date(el.Date)).format('YYYY-MM-DD') + " " + el.end_time).toISOString(),
                    end: new Date(moment(new Date(el.Date)).format('YYYY-MM-DD') + " " + el.start_time).toISOString(),

                    // date: moment(new Date(el.Date)).format('YYYY-MM-DD'),
                    extendedProps: {
                        name: el.patient_name,
                        date: moment(new Date(el.Date)).format('YYYY-MM-DD') + " " + el.end_time + " to " + el.start_time,
                        body: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print',
                        doctor: el.doctor_id,
                        phone: el.phone,
                    }
                })
            });
            setAppointments(appointments)
        }
    };

    const setDepartmentsData = res => {
        setDepartments(res.data)
    }


    const getAppointments = () => {
        GetData(
            context.BaseUrl + `/appointments?start_date=${select}&end_date=${select}&patient_name=${filterValues.patient_name}&doctor_name=${filterValues.doctor_name}`,
            200,
            context.state.user.token,
            _setAppointments
        );
    }

    const clearFilter = () => {
        setInputValues(prevState => ({
            ...prevState,
            patient_name: '',
            doctor_name: '',
            patient_email: '',
            phone_number: '',
        }));
        setInputValue('');
        setDate('');
        setGetAll(true)
        setClearFilters(false)
    }
    const setDoctors_Slot = res => {
        console.log('slots==>', res.data)
        setdoctor_slots(res.data)
    }

    const setDoctorsHandle = res => {
        setDoctors(res.data);
    }

    const inputchange = e => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value })
    }
    const filterhandler = e => {
        setFilterValues({ ...filterValues, [e.target.name]: e.target.value })
    }

    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
    };

    const _setDepartment = (e) => {
        setDepartmentId(e.target.value)
    }
    const _setDoctor = (e) => {
        setDoctorId(e.target.value)
    }

    const feedbackInputHandler = e => {
        setFeedbackValues({
            ...feedbackValues,
            [e.target.name]: e.target.value
        })
    }

    const handleFeedbacksubmit = () => {
        setOpen(false);
        setThankYouShow(true)
    }

    useEffect(() => {
        setDoctorId(null)
        setDoctors(null)
        setDepartmentId(null)
        setDepartments(null)
        setSlot(null)
        setdoctor_slots(null)
        getAppointments();
        setShow(false)
    }, [clear])

    return (
        <ThemeProvider theme={theme}>
            <ThankYouModal ThankYoushow={ThankYoushow}
                onClose={() => setThankYouShow(false)} />
            <CustomFeedbackDialog open={open}
                feedbackValues={feedbackValues}
                handleChange={feedbackInputHandler}
                handleSubmit={handleFeedbacksubmit}
            />
            <MakeAppoinmentModal show={show}
                departments={departments}
                setClear={setclear}
                departmentId={departmentId}
                doctorId={doctorId}
                slot={slot}
                inputchange={inputchange}
                doctor_slots={doctor_slots}
                patients={patients}
                onClose={() => setShow(false)}
                hideTooltip={hideTooltip}
                sethidetooltip={() => sethidetooltip(false)}
                inputValues={inputValues}
                doctors={doctors}
                setSlot={setSlot}
                _setDepartment={_setDepartment}
                _setDoctor={_setDoctor}
                onDateChange={onDateChange}
                date={date}
                inputValue={inputValue}
            />
            <div className={classes.main}
                style={{ backgroundColor: 'transparent' }}>
                <Grid
                    container
                    style={{
                        padding: '10px 0px 10px 0px'
                    }}
                    className={classes.gridtwo}
                    alignItems='center'>
                    <Grid
                        item md={3}
                        style={{ minWidth: width === 'sm' ? '270px' : null }}
                        sm={6} xs={12}>
                        <h1 style={{
                            whiteSpace: width !== 'xs' && 'nowrap',
                        }}>Make An Appoinment</h1>
                    </Grid>
                    <Grid
                        item md={7}
                        sm={1} xs={12}>
                    </Grid>
                    <Grid
                        item md={2}
                        sm={5} xs={12}>
                        <Button style={{
                            float: 'right',
                            minWidth: '150px',
                            whiteSpace: 'nowrap'
                        }}
                            size='medium' onClick={() => {
                                setOpen(true)
                                setShow(true);
                            }}
                            startIcon={<AddOutlined
                            />}
                            variant='contained' color='primary'>
                            New Appoinment</Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    className={classes.gridtwo}
                    style={{
                        backgroundColor: 'white',
                    }}
                    alignItems='center'>
                    <Grid item md={3}
                        sm={6} xs={12}>
                        <Select
                            style={{
                                borderRadius: '50px',
                                height: '40px',
                                width: '170px',
                                maxHeight: '200px'
                            }}
                            value={select}
                            defaultValue=''
                            onChange={e => setSelect(e.target.value)}
                            variant='outlined'>
                            {alldays?.map((v, i) => (<MenuItem key={i} value={v.value} >{v.show}</MenuItem>))}
                        </Select>
                    </Grid>
                    <Grid md={5} container justify={width === 'xs' ? 'flex-start' : 'center'}>
                        <h2  >{month || moment(new Date()).format('MMMM YYYY')}</h2>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}
                        style={{
                            minWidth: '340px',
                            display: 'flex',
                            justifyContent: width === 'xs' ? 'flex-start' : 'flex-end',
                            flexDirection: 'row',
                        }}>
                        <Button variant='outlined' color='primary' style={{
                            marginBottom: '10px', minWidth: '150px'
                        }}
                            onClick={() => setOpenfilter(!openfilter)} >
                            <img src={Filter}
                                style={{ marginRight: '5px' }}
                            />
             Filter</Button>

                    </Grid>
                    {/* filtered fields */}
                    {/* <Fade bottom collapse when={openfilter}>
                        <Grid container justify='center'
                        >
                            <Grid md={10} container spacing={1} >
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            inputVariant='outlined'
                                            margin="normal"
                                            name='date_from'
                                            value={date_from}
                                            onChange={v => setStartDate(v)}
                                            size='small'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            format="yyyy-MM-dd"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton size='small'>
                                                            <EventIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            inputVariant='outlined'
                                            value={date_to}
                                            margin="normal"
                                            onChange={v => setEndDate(v)}
                                            size='small'
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            format="yyyy-MM-dd"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton size='small'>
                                                            <EventIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder='Patient Name'
                                        size='small'
                                        margin='normal'
                                        onChange={filterhandler}
                                        type='text'
                                        name='patient_name'
                                        value={filterValues.patient_name}
                                        required
                                        variant="outlined"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
                                    /></Grid>
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder='Patient Id'
                                        size='small'
                                        margin='normal'
                                        onChange={filterhandler}
                                        name='patient_id'
                                        value={filterValues.patient_id}
                                        type='number'
                                        required
                                        variant="outlined"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
                                    /></Grid>
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder='Doctor Name'
                                        size='small'
                                        value={filterValues.doctor_name}
                                        margin='normal'
                                        onChange={filterhandler}
                                        name='doctor_name'
                                        type='text'
                                        required
                                        variant="outlined"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
                                    /></Grid>
                                <Grid item lg={2} md={2} sm={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        placeholder='Patient Email'
                                        size='small'
                                        name='patient_email'
                                        margin='normal'
                                        type='email'
                                        value={filterValues.patient_email}
                                        onChange={filterhandler}
                                        required
                                        variant="outlined"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid md={2}
                                item >
                                {!clearfilters ? <Button size='medium' variant="contained"
                                    color="primary"
                                    onClick={getAppointments}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        margin: '17px 0 0 10px'
                                    }} >Apply Filters</Button> :
                                    <IconButton style={{
                                        marginLeft: '5px'
                                    }}
                                        onClick={clearFilter}>
                                        <Clear fontSize='default' color='primary' />
                                    </IconButton>}
                            </Grid>
                        </Grid>
                    </Fade> */}
                </Grid>
            </div>

            <div className={classes.main}>
                <Grid container style={{ padding: '20px', background: '#FFF' }}>


                    {/* <Grid item md={1}>
                            <AccessTime style={{  fontSize: '50px',marginLeft: '15%',color: 'lightgray' }} /> */}
                    {/* </Grid> */}
                    <Grid item md={12} sm={12} xs={12} >
                        <FullCalendar
                            events={width !== 'xs' ? appointments : null}
                            ref={calenderref}
                            eventDidMount={() => console.log('evdidomount')}
                            plugins={[dayGridPlugin, timeGridPlugin]}

                            headerToolbar={{
                                left: "",
                                center: 'dayGridMonth,timeGridWeek,timeGridDay',
                                right: "prev,next"
                            }}

                            header={{
                                left: "",
                                center: "dayGridMonth,timeGridWeek,timeGridDay",
                                right: "prev,next",
                            }}

                            slotMinTime={"09:00:00"}
                            slotMaxTime={"12:00:00"}
                            slotDuration={"00:15:00"}
                            slotMinWidth={300}
                            expandRows={true}
                            datesSet={() => {
                                setMonth(calenderref.current?._calendarApi.currentDataManager.data.viewTitle);
                            }}

                            dayHeaderFormat={{
                                weekday: 'short',
                                // day: 'numeric'
                            }}
                            eventContent={info => {
                                return (<Tooltip arrow id='tooltip'
                                    title={<div
                                        style={{ padding: '5px 0 5px 10px' }}
                                    >
                                        <Typography >{info.event.extendedProps.name}</Typography>
                                        <hr />
                                        <Typography>{info.event.extendedProps.date}</Typography>
                                        <hr />
                                        <Typography>{info.event.extendedProps.body}</Typography>
                                        <hr />
                                        <Typography>{info.event.extendedProps.doctor}</Typography>
                                        <hr />
                                        <Typography>{info.event.extendedProps.phone}</Typography>
                                        <hr />
                                    </div>}
                                    placement='right'>
                                    <Card elevation={10} raised={true}
                                        className={classes.eventCard}>
                                        <>
                                            <Typography style={{
                                                fontWeight: 'bold',
                                            }} >{info.event.title}</Typography>
                                            <Typography>{info.event.extendedProps.name}</Typography>
                                            <Typography>{info.event.extendedProps.time}</Typography>
                                        </>
                                        <Typography style={{}}>
                                            {info.event.extendedProps.date}
                                        </Typography>
                                    </Card>
                                </Tooltip>)
                            }}
                            eventTextColor='black'
                        // fixedWeekCount={true}
                        />
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider >
    )
}

export default MakeAppoinment;
