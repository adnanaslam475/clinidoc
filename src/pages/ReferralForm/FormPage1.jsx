import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    //   KeyboardTimePicker,
    KeyboardDatePicker,
    DateTimePicker,
} from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Fade from 'react-reveal/Fade';

import swal from '@sweetalert/with-react';
import moment from 'moment';


import { Button, Grid, IconButton, InputAdornment, InputLabel, TextField, withStyles } from '@material-ui/core';
import MyContext from '../../helper/themeContext';
import PostData from '../../Fetch/postData1';

const ProviderFields = [
    { name: '', label: 'Name of practice', required: true, id: 'NOP', type: 'text', name: 'name_of_practice' },
    { name: '', label: 'Patient Name', required: true, id: 'PName', type: 'text', name: 'patient_name' },
    { name: '', label: 'Phone Number of practice', required: true, id: 'PNOP', type: 'tel', name: 'phone_no_practice' },
    { name: '', label: 'Email of contact person', required: false, id: 'EOCP', type: 'text', name: 'email_of_contact_person' },
    { name: '', label: 'Reason for Referral', required: false, id: 'RForR', type: 'text', name: 'reason_for_referral' },
    { name: '', label: 'Patient Phone #', required: true, id: 'PPhone', type: 'tel', name: 'patient_phone' },
    { name: '', label: 'Patient DOB', required: true, id: 'PDOB', type: 'datePicker', name: 'patient_dob' },
    { name: '', label: 'Email', required: false, id: 'PEmail', type: 'text', name: 'patient_email',last:true },
]

const SelfFields = [
    { name: '', label: 'Email', required: false, id: 'PEmail', type: 'text', name: 'patient_email' },
    { name: '', label: 'Patient Name', required: true, id: 'PName', type: 'text', name: 'patient_name' },
    { name: '', label: 'Reason for Referral', required: false, id: 'RforR', type: 'text', name: 'reason_for_referral' },
    { name: '', label: 'Patient DOB', required: true, id: 'PDOB', type: 'datePicker', name: 'patient_dob' },
    { name: '', label: 'Best time to contact', required: false, id: 'BTTC', type: 'dateTimePicker', name: 'best_time_for_contact' },
    { name: '', label: 'Patient Phone #', required: true, id: 'PPhone', type: 'tel', name: 'patient_phone', last: true }]

const OtherFields = [
    { name: '', label: 'Relationship to patient', required: false, id: 'RtP', type: 'text', name: 'relationship_to_patient' },
    { name: '', label: 'Patient Name', required: true, id: 'PName', type: 'text', name: 'patient_name' },
    { name: '', label: 'Phone #', required: true, id: 'PPhone', type: 'tel', name: 'patient_phone' },
    { name: '', label: 'Patient DOB', required: true, id: 'PDOB', type: 'datePicker', name: 'patient_dob' },
    { name: '', label: 'Reason for Referral', required: false, id: 'RforR', type: 'text', name: 'reason_for_referral' },
    { name: '', label: 'Email', required: false, id: 'PEmail', type: 'text', name: 'patient_email' },
    { name: '', label: 'Best time to contact', required: false, id: 'BTTC', name: 'best_time_for_contact', type: 'dateTimePicker', last: true },
]

const FormStyle = (theme) => ({
    inputRoot: {
        height: "80px",
    },
    radioButton: {
        color: '#008FFF !important',
        '&:.Mui-checked':
        {
            color: '#008FFF',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#008FFF',
    },
})

function getReferralType_id(type) {
    switch (type.toString()) {
        case "Provider": return 1
        case "Self": return 2
        case "Other": return 3
    }
}



class FormPage1 extends Component {
    constructor(props) {
        super(props);
        this.state = { RPerson: "Other", selectedDate: new Date(), isError: false, errorLabel: '', fieldList: [] }
    }

    componentWillMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let formType = urlParams.get('formType')
        if (!formType) {
            this.context.history.push('/')
        }

        else {
            if (formType === "Provider") {
                this.setState({ fieldList: ProviderFields })
            }
            else if (formType === "Self") {
                this.setState({ fieldList: SelfFields })
            }
            else if (formType === "Other") {
                this.setState({ fieldList: OtherFields })
            }
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.id || e.target.name]: e.target.value, isError: false, errorLabel: '' })
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date, isError: false, errorLabel: '' })
    }

    handlePDOBDateChange = (date) => {
        this.setState({ PDOB: date, isError: false, errorLabel: '' })
    }

    checkError = () => {
        let obj = { isError: false, errorLabel: '' }

        for (let i = 0; i < this.state.fieldList.length; i++) {
            if (this.state.fieldList[i].required === true) {
                if (!this.state[this.state.fieldList[i].id]) {
                    obj = { isError: true, errorLabel: `Please enter ${this.state.fieldList[i].label.toLowerCase()}` }
                    break;
                }
            }

        }
        return obj
    }

    handleSubmit = () => {
        let { isError, errorLabel } = this.checkError()
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let formType = urlParams.get('formType')


        console.log('errorlabel =>', errorLabel, this)

        if (isError) {
            this.setState({ errorLabel, isError })
        }
        else {

            let req = {}

            // if (formType === "Provider") {
            //     req['best_time_for_contact'] = ""
            // }

            for (let i = 0; i < this.state.fieldList.length; i++) {
                let value = ""
                if (this.state.fieldList[i].type === "dateTimePicker") {
                    value = moment(new Date(this.state.selectedDate)).format('YYYY-MM-DD HH:mm:ss');
                    // let dateTime = this.state.selectedDate.toISOString().split('T')[0];
                    // value = dateTime + " " + this.state.selectedDate.getHours() + ":" + this.state.selectedDate.getMinutes() + ":" + this.state.selectedDate.getSeconds()
                }
                else if (this.state.fieldList[i].type === "datePicker") {
                    value = moment(new Date(this.state.selectedDate)).format('YYYY-MM-DD');
                    // let dateTime = this.state.selectedDate.toISOString().split('T')[0];
                    // value = dateTime + " " + this.state.selectedDate.getHours() + ":" + this.state.selectedDate.getMinutes() + ":" + this.state.selectedDate.getSeconds()
                }

                else value = this.state[this.state.fieldList[i].id] || "";
                req[this.state.fieldList[i].name] = value
            }


            req['referral_source_type'] = "user-web"
            req['referral_type_id'] = getReferralType_id(formType)

            // req['assign_by'] = "Receptionist"
            req['created_by'] = 5 //"user-web"

            this.setState({ loading: true })
            PostData('https://clinidocapp.herokuapp.com/referral', 200, req,'', this.postSubmit)
        }
    }

    postSubmit = (response) => {
        let global = this;
        console.log('object=-=>', global)
        if (response.ResponseCode === "Success") {
            this.setState({ loading: false })
            swal(
                {
                    title: "Thankyou!",
                    text: "Thankyou for submitting, We will contact you soon.",
                    icon: "success",
                    dangerMode: false,
                }
            ).then(() => {
                global.context.history.replace('/');
            })
        }
        else this.setState({ loading:false,isError: true, errorLabel: 'Error Submitting Form, Please try again.' })
        //this.context.history.push({'./'})
    }

    render() {
        const { classes } = this.props;
        console.log(this.context.state)
        return (
            <div id="Referral_FormPage1_Container">
                <Backdrop className={classes.backdrop} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div id="Referral_FormPage1_Heading">
                    Welcome to Refferal Form
            </div>
                <div id="Referral_FormPage1_SubHeading">
                    Consult with a reliable doctor over live video, 24/7,
                    from anywhere in the world securely and privately.
            </div>

                <div id="Referral_FormPage1_Form">

                    <FormControl component="fieldset" style={{ marginTop: '40px' }}>
                        <FormLabel component="legend">Referring Person</FormLabel>
                        <RadioGroup onChange={this.handleChange} row aria-label="position" name="RPerson" value={this.state.RPerson}>
                            <FormControlLabel value="PCP" control={<Radio className={classes.radioButton} />} label="Primary Care Provider" />
                            <FormControlLabel value="Therapist" control={<Radio className={classes.radioButton} />} label="Therapist" />
                            <FormControlLabel value="MS" control={<Radio className={classes.radioButton} />} label="Medical Specialist" />
                            <FormControlLabel value="Counselor" control={<Radio className={classes.radioButton} />} label="Counselor" />
                            <FormControlLabel value="SW" control={<Radio className={classes.radioButton} />} label="Social Worker" />
                            <FormControlLabel value="CM" control={<Radio className={classes.radioButton} />} label="Case Manager" />
                            <FormControlLabel value="Other" control={<Radio className={classes.radioButton} />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <Grid container>
                        {
                            this.state.RPerson === "Other" &&
                            <Grid item md={10}>
                                <div className="text-field-wrapper">
                                    <TextField placeholder="Type the other"
                                        inputProps={{ classes: { input: classes.inputRoot } }} variant="outlined" fullWidth />
                                </div>
                            </Grid>
                        }
                        <Grid container spacing={3}>
                            {
                                this.state.fieldList.map((field, key) =>
                                    <React.Fragment>
                                        <Grid item md={6}>
                                            <div className="text-field-wrapper">
                                                <InputLabel style={{ marginBottom: '10px' }} htmlFor={field.id}>
                                                    {field.label} {field.required && <span style={{ color: 'red' }}>  * </span>}
                                                </InputLabel>
                                                {
                                                    field.type === "tel" &&
                                                    <TextField
                                                        fullWidth
                                                        id={field.id}
                                                        type={field.type}
                                                        onChange={this.handleChange}
                                                        required={field.required}
                                                        variant="outlined"
                                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                                        inputProps={{ pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}' }}
                                                    />
                                                }
                                                {
                                                    field.type === "text" &&
                                                    <TextField
                                                        fullWidth
                                                        id={field.id}
                                                        type={field.type}
                                                        onChange={this.handleChange}
                                                        required={field.required}
                                                        variant="outlined"
                                                    />
                                                }
                                                {field.type === "dateTimePicker" &&
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DateTimePicker
                                                            variant="inline"
                                                            margin="normal"
                                                            id="date-picker-inline"
                                                            value={this.state.selectedDate}
                                                            onChange={this.handleDateChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
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

                                                {field.type === "datePicker" &&
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            variant="inline"
                                                            id="date-picker-inline"
                                                            margin="normal"

                                                            value={this.state.PDOB}
                                                            onChange={this.handlePDOBDateChange}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
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

                                            </div>
                                        </Grid>
                                        {( (key == 4 || key == 6) && field.last) &&
                                            <Grid item md={6}>

                                            </Grid>
                                        }
                                    </React.Fragment>
                                )
                            }

                            <Grid md={6} style={{ paddingTop:'30px',textAlign:'center' }}>
                                <Fade bottom collapse when={this.state.isError}>
                                    <div className="invalid-feedback" style={{ height: '60px', marginBottom: '0px' }}
                                        style={{ display: 'block', color: 'red' }}
                                    >
                                        *{this.state.errorLabel}
                                    </div>
                                </Fade>
                            </Grid>
                            <Grid item md={5}>
                                <Button id="Referral_FormPage1_Submit_Button" onClick={this.handleSubmit}
                                 variant="contained"> Submit </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>);
    }
}

FormPage1.contextType = MyContext;
export default withStyles(FormStyle)(FormPage1);