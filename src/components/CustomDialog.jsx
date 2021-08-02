import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import MyContext from '../helper/themeContext';

const useStyles = makeStyles({
    DialogRoot: {
        width: '300px', padding: '20px', paddingTop: '20px', boxSizing: 'unset'
    },
    FormControl: {
        paddingLeft: '30px'
    },
    FormControlLabel: {
        border: '1px solid #008FFF',
        width: '250px',
        padding: '5px 10px',
        marginBottom: '10px',
        borderRadius: '10px'
    },
    buttonRoot:
    {
        background: '#008FFF',
        marginLeft: '20px',
        width: 'calc(100% - 30px)',
        textTransform: 'none',
        color: 'white'
    }
});

const options = [{ label: 'Provider Referral', value: 'Provider' }, { label: 'Self Referral', value: 'Self' }, { label: 'Other', value: 'Other' },]

export default function CustomDialog(props) {

    const context = useContext(MyContext)
    const [referralType, setReferralType] = React.useState('Provider');

    const classes = useStyles();
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event) => {
        setReferralType(event.target.value);
    };

    const handleSubmit = () => {
        if (referralType === "Provider") {
            context.history.push('./referral/form?formType=Provider')
        }

        else if (referralType === "Self") {
            context.history.push('./referral/form?formType=Self')
        }

        else if (referralType === "Other") {
            context.history.push('./referral/form?formType=Other')
        }

    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="referral-dialog-title" open={open}>
            <div className={classes.DialogRoot}>
                <DialogTitle id="referral-dialog-title">Who They Are</DialogTitle>
                <FormControl component="fieldset" className={classes.FormControl}>
                    <RadioGroup aria-label={`who-they-are`} name={`referralType`} value={referralType} onChange={handleChange}>
                        {options.map((option, i) => (
                            <FormControlLabel key={i}
                                className={classes.FormControlLabel} value={option.value} control={<Radio style={{ color: '#008FFF' }} />} label={option.label} />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Button onClick={handleSubmit} className={classes.buttonRoot} variant="contained">
                    Submit
        </Button>
            </div>
        </Dialog>
    );
}