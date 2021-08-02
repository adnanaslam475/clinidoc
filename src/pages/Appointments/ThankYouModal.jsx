import React from 'react'
import { Modal, Card, Backdrop, Typography, makeStyles } from '@material-ui/core';
import ThankYou from '../../assets/thankyou-img.png';



const useStyle = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: '30px 60px 30px 60px',
        borderRadius: '10px',
        outline: 'none',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));
const ThankYouModal = ({ ThankYoushow, open, onClose, referral }) => {
    const classes = useStyle()
    return (
        <Modal className={classes.modal} open={ThankYoushow || open}
            onClose={onClose}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 300, }}>
            <Card className={classes.card}>
                <img src={ThankYou} style={{
                    width: '120px', height: '120px',
                    marginBottom: '2%'
                }} />
                <Typography variant='h4'  >Thank You</Typography>
                <Typography > {referral ? 'Thank you for you referral, we will be contacting you soon to complete the referral process' :
                    'Thank you for submitting we will contact you soon'}</Typography>

            </Card>
        </Modal>
    )
}
export default ThankYouModal;
