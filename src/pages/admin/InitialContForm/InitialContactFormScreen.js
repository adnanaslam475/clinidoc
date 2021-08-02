import React, { useState } from 'react';
import {
    Grid,
    AppBar,
    Tabs,
    createMuiTheme,
    makeStyles,
    Button,
    Tab,
    ThemeProvider,
} from "@material-ui/core";
import * as inputFields from './InputFields';
import {
    CheckCircleOutline,
    Close,
} from "@material-ui/icons";
import PatientInformation from './PatientInformation/PatientInformation';
import IntakeAssesment from './IntakeAssesment/IntakeAssesment';
import InsuranceInformation from './InsuranceInformation/InsuranceInformation';
import OtherContacts from './OtherContacts/OtherContacts';
import TelephoneIntake from './TelephoneIntake/TelephoneIntake';

const useStyle = makeStyles(them => ({
    main: {
        marginTop: '50px',
        background: 'white',
        marginLeft: '70px'
    },
    Inlabel: {
        height: '15px', width: '15px', alignItems: 'center',
        borderRadius: '100%',
        margin: '2px 10px 0 0'
    },
    tab: {
        border: '1px solid lightgray',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#396CF0',
        },
    },
    props: {
        MuiSelect: {
            MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                },
                getContentAnchorEl: null,
            },
        },
    },
});


const InitialContactFormScreen = ({ width }) => {
    const [select, setSelect] = useState(0);
    const classes = useStyle();
    const [buttonSelect, setButtonSelect] = useState(0)
    const [otherCont_select, setOther_contSelect] = useState(0)

    const setSelectHandler = i => {
        setSelect(i)
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.main}>
                <AppBar position='static' elevation={1} style={{
                    backgroundColor: 'white',
                }} >
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        value={select}
                        aria-label="scrollable auto tabs example" >
                        {inputFields.Tabs.map((v, i) => <Tab key={i}
                            onClick={() => setSelect(i)}
                            label={<div style={{
                                display: 'flex',
                                alignItems: 'center',

                            }}>
                                <div className={classes.Inlabel} style={{
                                    border: select === i ? 'none' : '1px solid lightgray'
                                }} >
                                    {select === i ? <CheckCircleOutline style={{
                                        color: '#396cf0',
                                    }}
                                        fontSize='small' /> : null}</div>{v.text}</div>}
                            style={{
                                border: '1px solid lightgray',
                                borderRight: 'none',
                                borderBottom: select === i ? '3px solid #396cf0' :
                                    '1px solid lightgray'
                            }} />)}
                    </Tabs>
                </AppBar>
                {select === 2 && <Grid container style={{ padding: '10px 0 0 20px' }}>
                    <Grid md={12} xs={12} item>
                        {['Coverage Details', 'Benefits', 'Payments', 'Eligibility',
                            'Statement Setting', 'Additional Info'].map((v, i) => <Button key={i}
                                variant='contained'
                                onClick={() => setButtonSelect(i)}
                                style={{
                                    color: buttonSelect === i ? 'white' : 'blue',
                                    margin: '10px',
                                    backgroundColor: buttonSelect === i ? '#396CF0' : '#EDEDED'
                                }}
                                type='button' >{v}</Button>)}
                    </Grid>
                </Grid>}
                {select === 3 && <Grid container style={{ padding: '10px 0 0 20px' }}>
                    <Grid md={12} xs={12} item>
                        {['Medical Contacts', 'Family Contacts', 'Responsible/ Guarantor Info', 'Custom Contact'].map((v, i) => <Button key={i}
                            variant='contained'
                            onClick={() => setOther_contSelect(i)}
                            style={{
                                color: otherCont_select === i ? 'white' : 'blue',
                                margin: '10px',
                                backgroundColor: otherCont_select === i ? '#396CF0' : '#EDEDED'
                            }}
                            type='button' >{v}</Button>)}
                    </Grid>
                </Grid>}

                {select === 0 && <PatientInformation width={width}
                    setSelectHandler={setSelectHandler} />}
                {select === 1 && <IntakeAssesment width={width} setSelectHandler={setSelectHandler} />}
                {select === 2 && <InsuranceInformation width={width} setSelectHandler={setSelectHandler}
                    setButtonSelect={setButtonSelect} buttonSelect={buttonSelect} />}
                {select === 3 && <OtherContacts width={width} setSelectHandler={setSelectHandler}
                    setOther_contSelect={setOther_contSelect} otherCont_select={otherCont_select}
                />}
                {select === 4 && <TelephoneIntake width={width} setSelectHandler={setSelectHandler} />}
            </div >
        </ThemeProvider >
    )
}
export default InitialContactFormScreen;