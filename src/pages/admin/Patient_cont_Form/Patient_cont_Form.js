import React from 'react'
import {
    Modal, Avatar, TextField, Grid, Select, MenuItem,
    makeStyles, FormControlLabel
} from '@material-ui/core';


const usestyles = makeStyles(theme => ({
    main: {
        marginTop: '30px',
        marginLeft: '90px',
        marginRight: '3%',
        background: '#FFF',
        padding: '10px 20px 0 20px',
        height: 'calc(100vh - 100px)',
    },
    container: {
        maxHeight: 'calc(100vh - 150px)',
    },
    heading1: {
        fontSize: '24px',
        marginBottom: '5px'
    },
}))

const Patient_cont_Form = () => {
    const classes = usestyles();
    const rowOne = [
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
        { name: 'address', label: 'Address', placeholder: 'enter address...' },
        { name: 'Phone', label: 'Phone', placeholder: 'enter phone no...' },
        { name: 'gender', label: 'Gender', placeholder: 'enter patient name...', genders: ['male', 'female'] },
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
    ]
    const rowTwo = [
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
        { name: 'address', label: 'Address', placeholder: 'enter address...' },
        { name: 'Phone', label: 'Phone', placeholder: 'enter phone no...' },
        { name: 'gender', label: 'Gender', placeholder: 'enter patient name...', genders: ['male', 'female'] },
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
    ]
    const rowThree = [
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
        { name: 'address', label: 'Address', placeholder: 'enter address...' },
        { name: 'Phone', label: 'Phone', placeholder: 'enter phone no...' },
        { name: 'gender', label: 'Gender', placeholder: 'enter patient name...', genders: ['male', 'female'] },
        { name: 'patient_name', label: 'Patient Name', placeholder: 'enter patient name...' },
    ]
    const handleChange = () => { }
    return (
        <div className={classes.main}>
            Patient Contact Form
            <Grid container
                justify="space-between">
                <Grid md={12} container spacing={2} >
                    {rowOne.map((v, i) => {
                        return (<Grid md={2}>
                            {v.hasOwnProperty('genders') ? <Select name='patientId'
                                type='number'
                                style={{
                                    height: '40px', width: '98%',
                                    background: 'white',
                                    backgroundColor: 'white',
                                    // backgroundRepeat: 'no-repeat'
                                }}
                                onChange={handleChange}
                                variant='outlined' placeholder='Patient Id' >
                                {v.genders.map((v, i) => <MenuItem key={i} value={v} >{v}</MenuItem>)}
                            </Select> :
                                <>
                                    <TextField
                                        name={v.name}
                                        type={v.type}
                                        size='small'
                                        onChange={handleChange}
                                        variant='outlined' placeholder='Patient Id' /></>

                            }</Grid>
                        )
                    })}
                    {/* <Grid item md={2}>
                        <TextField variant='outlined'
                            name='name'
                            type='text'
                            size='small'
                            onChange={handleChange}
                            // value={inputValues.name}
                            placeholder='Patient Name' />
                    </Grid>
                    <Grid item md={2}>
                        <TextField name='patientId'
                            type='number'
                            size='small'
                            // value={inputValues.patientId}
                            onChange={handleChange}
                            variant='outlined' placeholder='Patient Id' />
                    </Grid>
                    <Grid item md={2}>
                        <TextField name='date' type='text' size='small'
                            // value={inputValues.date} 
                            onChange={handleChange}
                            variant='outlined' placeholder='Appoinment date' />
                    </Grid>
                    <Grid item md={2}>
                        <TextField variant='outlined' size='small' onChange={handleChange} name='doctorname' type='text'
                            // value={inputValues.doctorname}
                            placeholder='Docter Name' />
                    </Grid>
                    <Grid item md={2}>
                        <TextField name='phone' size='small'
                            onChange={handleChange} type='number'
                            //  value={inputValues.phone}
                            variant='outlined' placeholder='Phone number' />
                    </Grid>
                    <Grid item md={2}>
                        <TextField
                            name='email' onChange={handleChange}
                            type='text'
                            size='small'
                            // value={inputValues.email}
                            variant='outlined' placeholder='Patient Email' />
                    </Grid> */}
                </Grid>

            </Grid>
        </div >
    )
}
export default Patient_cont_Form;