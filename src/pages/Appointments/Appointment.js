import React, { useState, useEffect, useContext } from 'react'
import {
    Button, Card, createMuiTheme, ThemeProvider, makeStyles,
    Grid, MenuItem, Select, Container, Typography
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Calendar from 'react-calendar';
import './Appointment.css'
import GetData from '../../Fetch/GetData1';
import moment from 'moment';
import MyContext from '../../helper/themeContext';
import { Info } from '@material-ui/icons';
import ThankYouModal from './ThankYouModal';
import PostData from '../../Fetch/postData1';
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#396cf0',
            main: '#396cf0',
            dark: '#396cf0',
        }
    },
})

const useStyle = makeStyles(theme => ({
    btn: {
        float: 'right',
        marginRight: '2%',
    },
    msgGrid: {
        backgroundColor: '#F0F4FF', alignItems: 'center',
        display: 'flex',
        padding: '10px',
        color: '#396cf0',
        fontWeight: 'bold',
        border: '2px solid blue'
    },
    slotCircle: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%', marginRight: '10px',
    },

}))

const Appointment = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState(null);
    const [slot, setSlot] = useState('');
    const [click, setClick] = useState(null)
    const [morningSlots, setMorningSlots] = useState([])
    const [msgPosition, setMsgPosition] = useState(null)
    const [eveningSlots, setEveningSlots] = useState([])
    const [value, onChange] = useState(new Date());

    const context = useContext(MyContext);

    const _SetDepartments = (response) => {
        if (response.ResponseCode === "Success") {
            setDepartments(response.data)
        }
    }
    useEffect(() => {
        GetData(context.BaseUrl + '/doctor/departments',
            200, context.state.user.token, _SetDepartments)
    }, [])
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
        console.log('slots==>', res.data)
        res.data.forEach(el => {
            if (parseInt(el.start_time.split(':')[0]) >= 12) {
                evening.push(el)
            } else {
                morning.push(el)
            }
        })
        setMorningSlots(morning);
        setEveningSlots(evening)
    }

    useEffect(() => {
        if (doctorId) {
            GetData(
                context.BaseUrl + `/doctor/schedule?doctor_id=${doctorId}&branch_id=${departmentId}&date=${moment(value[0]).format('yyyy-MM-DD')}`,
                200,
                context.state.user.token,
                setDoctors_Slot
            )
        }
    }, [doctorId, value])

    const onCalendarDateChange = (e, f) => {
        onChange(moment(e).format('yyyy-mm-dd'))
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
        <ThemeProvider theme={theme}>
            <div className="admin-drawer-margin">
                <Container>
                    <ThankYouModal open={open} onClose={() => setOpen(false)} />
                    <Grid container justify="space-around" >
                        <Grid item md={4} spaicing={2} style={{ width: '100%', maxWidth: '350px' }}>
                            <Card raised style={{ maxWidth: '100%', width: '100%' }}>
                                <Calendar className={classes.calender}
                                    onChange={onChange}
                                    value={value}
                                    selectRange={true}
                                />
                            </Card>
                        </Grid>

                        <Grid item md={8} >
                            <Card raised style={{ padding: '20px', marginBottom: '20px', borderRadius: '0px' }}>
                                <div id="Refferal_SideBar_List_Heading" style={{ textAlign: 'left' }}>
                                    Make an Appointment
                            </div>
                                <Select style={{ width: '30%', margin: '0 2% 0 0' }}
                                    variant='outlined' value={departmentId}
                                    defaultValue=''
                                    onChange={e => setDepartmentId(e.target.value)} >
                                    {departments?.map((v, i) => (<MenuItem selected key={i} value={v.id} >{v.name}</MenuItem>))}
                                </Select>
                                {doctors.length > 0 &&
                                    <Select style={{ width: '30%' }} variant='outlined'
                                        onChange={e => setDoctorId(e.target.value)}
                                        defaultValue=''
                                        value={doctorId}>
                                        {doctors?.map((v, i) => (<MenuItem value={v.id} key={i} selected>{v.name}</MenuItem>))}
                                    </Select>
                                }
                            </Card>
                            <Card raised style={{ padding: '20px', borderRadius: '0px' }}>
                                {msgPosition === 0 ? <Grid container justify='space-around'
                                    className={classes.msgGrid}>
                                    <Info style={{ color: '#396cf0', }}
                                        fontSize='large' />
                                    <Typography >This Slot is Booked Are you sure you want to go in waiting List?</Typography>
                                    <Button variant="contained"
                                        id='Patient_Info_Buttons2' onClick={() => { setSlot(click); setMsgPosition(null) }}>Go to Waiting List</Button>
                                </Grid> : null}
                                <h3 style={{ marginLeft: '10px' }}>Morning</h3>
                                <h5 style={{ marginLeft: '10px' }} >9:00 AM to 12:00 PM</h5>
                                {morningSlots && morningSlots.map((v, i) => <span key={i}
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
                                <hr style={{ transform: 'translateX(-20px)', margin: '20px 0px 10px 0', width: 'calc(100% + 40px)' }} />
                                <div style={{ position: 'relative', width: '100%' }}>
                                    {msgPosition === 1 ? <Grid container justify='space-around'
                                        className={classes.msgGrid}>
                                        <Info style={{ color: '#396cf0', }}
                                            fontSize='large' />
                                        <Typography >This Slot is Booked Are you sure you want to go in waiting List?</Typography>
                                        <Button variant="contained" style={{ Width: '300px' }}
                                            id='Patient_Info_Buttons2' onClick={() => {
                                                setSlot(click); setMsgPosition(null)
                                            }}>Go to Waiting List</Button>
                                    </Grid> : null}
                                    <h3 style={{ marginLeft: '10px' }}>Evening</h3>
                                    <h5 style={{ marginLeft: '10px' }} >5:00 PM TO 08:00PM</h5>
                                    {eveningSlots && eveningSlots.map((v, i) => <span key={i} style={{ opacity: v.booked === 1 && 0.5 }}>
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
                                </div>
                            </Card>
                            <Card style={{ width: '100%', height: '60px', position: 'relative', borderRadius: '0px' }}>
                                <Button variant="contained" onClick={handleSubmit}
                                    style={{ position: 'absolute', right: '20px' }}
                                    className={classes.btn} size='small' id='Appointment_Footer_Button' >
                                    Submit
                                </Button>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}

export default Appointment
