import React, { useState, useContext } from 'react'
import {
    Modal, Typography, Paper,
    Button, Grid, createMuiTheme, Radio,
    IconButton, makeStyles, InputAdornment, TextareaAutosize, Select,
    MenuItem, TextField, InputLabel, FormControl, RadioGroup,
    Container, Backdrop, Tooltip, Card, ThemeProvider,
} from '@material-ui/core';
import PostData from '../../../Fetch/postData1';
import MyContext from '../../../helper/themeContext';
import EventIcon from "@material-ui/icons/Event";
import { Info, EventNote } from '@material-ui/icons';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from 'moment';

const usestyles = makeStyles(theme => ({
    gridtwo: {
        padding: '10px 20px 10px 20px',
    },
    modaltextarea: {
        resize: 'none',
        overflow: 'hidden',
        width: '99%',
        outline: 'none',
        borderRadius: '5px',
        borderColor: 'lightgray',
    },
    modal: {
        overflow: 'scroll',
        display: 'right',
        alignItems: 'center',
    },
    color: {
        backgroundColor: 'black'
    },
}))

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

const MakeAppoinmentModal = ({
    show, onClose, departments, inputValues, inputValue,
    departmentId, date, slot, patients, setSlot, onDateChange,
    doctors, _setDepartment, _setDoctor,
    setClear,
    doctorId, doctor_slots, inputchange
}) => {
    const classes = usestyles();
    const context = useContext(MyContext);

    const PostSubmit = res => {
        console.log('post res==>', res)
        if (res.ResponseCode === "Success") {
            setClear(true)
        }
        else alert('Something gone wrong!')
    }

    const handleSubmit = e => {
        e.preventDefault();
        // console.log('slt inmodal', inputValues.patientId, slot,
        //     inputValues.urgency_notes, inputValues.patient_notes,inputValues.type)
        PostData(
            context.BaseUrl + '/appointment',
            200,
            {
                patient_id: inputValues.patientId,
                administrator_id: 2,
                appointment_type_id: 1,
                schedule_id: slot,
                event_notes: inputValues.urgency_notes,
                patient_notes: inputValues.patient_notes,
                type: inputValues.type,
            },
            context.state.user.token,
            PostSubmit
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Modal className={classes.modal} open={show}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, }}>
                <Container style={{
                    outline: 'none', width: '60%',
                }}>
                    <Paper style={{
                        margin: '2% 0 5% 0',
                        borderRadius: '10px',
                        padding: '2% 5% 2% 5%',
                        height: '95%',
                    }} elevation={1}>
                        <Typography variant='h4' paragraph >New Appoinment</Typography>
                        <form  >
                            <Grid container justify='space-between' spacing={2} >
                                <Grid item md={6}
                                    sm={12} xs={12}>
                                    <InputLabel tsyle={{}}>Select Patient
                                </InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <Select
                                            variant='outlined'
                                            type='select'
                                            size='small'

                                            name='patientId'
                                            value={inputValues.patientId}
                                            onChange={inputchange}
                                            defaultValue=''>
                                            {patients && patients?.map((v, i) => {
                                                return (<MenuItem key={i}
                                                    value={v.id}>{v.patient_name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Date</InputLabel>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            variant='inline'
                                            id="date-picker-inline"
                                            margin="normal"
                                            size='small'
                                            value={date}
                                            format="yyyy-MM-dd"
                                            onChange={onDateChange}
                                            inputVariant='outlined'
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
                                    <InputLabel style={{ marginTop: '5px' }}>Departments</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <Select variant='outlined'
                                            type='select'
                                            size='small'
                                            onChange={_setDepartment}
                                            defaultValue=''>
                                            {departments?.map((v, i) => <MenuItem key={i}
                                                value={v.id} >{v.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Doctor slots Available</InputLabel>
                                    <FormControl
                                        margin='normal'
                                        fullWidth size='small' >
                                        <Select variant='outlined'
                                            type='select'
                                            defaultValue=""
                                            size='small'
                                            value={slot}
                                            style={{
                                                height: '40px',
                                            }}
                                            onChange={e => setSlot(e.target.value)}
                                        >
                                            {doctor_slots?.map((val, i) => {
                                                return (
                                                    <MenuItem key={i}
                                                        style={{ opacity: val.booked === 1 ? 0.5 : 1, }}
                                                        value={val.id} >
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            overflow: 'hidden',
                                                        }} >
                                                            <EventNote style={{
                                                                margin: '0px 10px 0 0',
                                                            }} />
                                                            {moment(val.from_date).format('ddd, MMM D')}{' '}
                                                            {val.start_time} -
                                                        {' '} {val.end_time}
                                                            {
                                                                val.booked === 1 ? <Tooltip arrow
                                                                    title={<div >This slot is booked Are you sure<br />
                                                     you want to go in waiting list?</div>}
                                                                    placement="top-end">
                                                                    <div style={{
                                                                        marginLeft: '10px',
                                                                        borderBottom: 'none',
                                                                        paddingTop: '2px',
                                                                    }}>
                                                                        <Info color='error'
                                                                            fontSize='small' />
                                                                    </div>
                                                                </Tooltip> : null
                                                            }</div>
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Phone</InputLabel>
                                    <TextField
                                        fullWidth
                                        id='phone'
                                        size='small'
                                        margin='normal'
                                        type='number'
                                        name='phone'
                                        value={inputValues.phone}
                                        onChange={inputchange}
                                        required
                                        variant="outlined"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                        inputProps={{ pattern: "[0-9]{3}-[0-9]{2}-[0-9]{3}" }}
                                    />
                                    <InputLabel style={{ marginTop: '5px' }}>Email</InputLabel>
                                    <TextField
                                        fullWidth
                                        id='email'
                                        size='small'
                                        margin='normal'
                                        type='email'
                                        required
                                        name='email'
                                        value={inputValues.email}
                                        onChange={inputchange}
                                        variant="outlined"
                                    />
                                    <InputLabel style={{ marginTop: '5px' }}>Urgency Notes</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <TextareaAutosize
                                            rowsMin={4}
                                            maxLength={100}
                                            cols={32}
                                            id="urgency_notes"
                                            name='urgency_notes'
                                            value={inputValues.urgency_notes}
                                            onChange={inputchange}
                                            className={classes.modaltextarea}
                                            aria-label="maximum height"
                                        />
                                    </FormControl>
                                </Grid>
                                {/* second column in modal */}
                                <Grid item md={6} sm={12}
                                    xs={12}>
                                    <InputLabel >Clinica</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <Select variant='outlined'
                                            type='select'
                                            size='small'
                                            onChange={_setDepartment}
                                            defaultValue=''>
                                            {departments?.map((v, i) => <MenuItem key={i}
                                                value={v.id} >{v.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Gender</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <Select variant='outlined'
                                            type='select'
                                            size='small'
                                            name='gender'
                                            value={inputValues.gender}
                                            onChange={inputchange}
                                            defaultValue=''
                                        >
                                            <MenuItem value='male'  > Male</MenuItem>
                                            <MenuItem value='female'  > Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Doctor</InputLabel>
                                    <FormControl margin='normal'
                                        disabled={!departmentId}
                                        fullWidth size='small' >
                                        <Select variant='outlined'
                                            type='select'
                                            size='small'
                                            value={doctorId}
                                            onChange={_setDoctor}
                                            defaultValue=''>
                                            {doctors?.map((v, i) => <MenuItem value={v.id} key={i} >
                                                {v.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }}>Reschedule</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <TextField
                                            fullWidth
                                            id='reschedule'
                                            size='small'
                                            name='reschedule'
                                            value={inputValues.reschedule}
                                            onChange={inputchange}
                                            type='text'
                                            required={true}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }} >Type   </InputLabel>
                                    <FormControl fullWidth size='small' >
                                        <RadioGroup aria-label="gender" name="type"
                                            style={{
                                                display: 'flex',
                                                backgroundColor: '#eeeeee',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                maxHeight: '40px',
                                                margin: '13px 0 12px 0'
                                            }}
                                            value={inputValues.type} onChange={inputchange}>
                                            <Radio value='Initial' /><span >Initial   </span>
                                            <Radio value='Follow up' style={{ marginLeft: '40px' }} /><span>Follow up
                             </span>
                                        </RadioGroup>
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }} >Address</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <TextField
                                            fullWidth
                                            id='address'
                                            size='small'
                                            name='address'
                                            value={inputValues.address}
                                            onChange={inputchange}
                                            type='text'
                                            required={true}
                                            variant="outlined"
                                        />
                                    </FormControl>
                                    <InputLabel style={{ marginTop: '5px' }} >Patient Notes</InputLabel>
                                    <FormControl margin='normal' fullWidth size='small' >
                                        <TextareaAutosize
                                            rowsMin={4}
                                            maxLength={100}
                                            cols={32}
                                            name='patient_notes'
                                            value={inputValues.patient_notes}
                                            onChange={inputchange}

                                            className={classes.modaltextarea}
                                            aria-label="maximum height"
                                            rowsMax={4}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item
                                style={{
                                    justifyContent: 'flex-end'
                                }} container >
                                <Button id='Referral_FormPage1_Cancel_Button' onClick={onClose}
                                    variant="contained" style={{ marginRight: '20px' }} size='large' >Cancel</Button>
                                <Button type='button' onClick={handleSubmit} variant="contained"
                                    id='Referral_FormPage1_Footer_Button' size='large' >Save</Button>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </Modal>
        </ThemeProvider >
    )
}

export default MakeAppoinmentModal;