import React from 'react'

import { Typography, Avatar, makeStyles } from '@material-ui/core';
import PersonImg from '../../assets/By-email-initial-contact-form1.png';
import CheckMark from '../../assets/icon-new/checkmark@2x.png';

const Lines = [{ img: CheckMark, text: 'We offer comfortable and convenient 24/7 healthcare' },
{ img: CheckMark, text: 'We save Time - no waiting room ,no travel needed' },
{ img: CheckMark, text: 'We offer a wide variety of doctors to choose from' },
{ img: CheckMark, text: ' CliniDoc is chaeper than your average ER visit. Its even cheaper with our prepaid packages' },
{ img: CheckMark, text: 'CliniDoc comes with consultations, EMR, appointment booking, homecare and prescriptions' }]

const useStyle = makeStyles(theme => ({
    avatar: {
        height: '17px',
        width: '17px',
        margin: '5px 15px 0 5px'
    },
    PersonImg: {
        height: 'auto',
        width: 'auto',
        zIndex: -1,
        position: 'absolute',
        opacity: 0.3,
        maxWidth: '99%',
        maxHeight: '100%',
    },
    linkdiv: {
        alignItems: 'baseline',
        margin: '0 10px 0 20px',
        display: 'flex',
        flexDirection: 'row',
    }
}));

const PatientMedicalPortalSideBar = ({ width }) => {
    const classes = useStyle();
    return (
        <div style={{ overflow: 'hidden', position: 'relative',
        height:'99%',  }}>
            <img src={PersonImg} style={{ display: 'flex', 
            alignSelf: 'center' }}
                className={classes.PersonImg} />
            <div style={{
                marginTop: '70px',
            }}>
                <Typography variant='h3' paragraph
                    style={{
                        margin: '0 0 30px 30px',
                        textAlign: width === 'xs' ? 'center' : null
                    }} > Patient Medical <br /> Portal</Typography>
                {Lines.map((v, i) => (<div
                    key={i} className={classes.linkdiv}>
                    <Avatar src={v.img} className={classes.avatar} />
                    <Typography paragraph > {v.text}</Typography>
                </div>))}
            </div>
        </div>
    )
}

export default PatientMedicalPortalSideBar
