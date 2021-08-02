import React from 'react'
import {
    Dialog, DialogActions, DialogTitle, Grid, createMuiTheme,
    TextField, Button, Select, MenuItem, Typography, makeStyles, ThemeProvider,
    FormControl, RadioGroup, Input, InputLabel, Radio, FormControlLabel, TextareaAutosize, Paper,
} from '@material-ui/core';

import Smile from '../../../assets/smile.png';
import CloseEye from '../../..//assets/emoticon-square-face-with-closed-eyes-and-mouth-of-straight-lines.png';
import Sadface from '../../../assets/sad-face-in-rounded-square.png';

const useStyles = makeStyles({
    DialogTitle: {
        color: "white",
        background: "#396CF0",
        padding: '35px'
    },

    txtAreacontainer: {
        backgroundColor: '#F2F2F2',
        padding: "30px",
        // marginLeft:'-100vw',
    },
    modaltextarea: {
        resize: 'none',
        border: 'none',
        backgroundColor: '#F2F2F2',
        outline: 'none',
    },
    RadioControlLabel: {
        borderRadius: "10px",
        display: "inline-block",
        margin: '10px 40px 5px 0'
    },
    buttonRoot: {
        background: "#396CF0",
        width: "93%",
        margin: '20px',
        textTransform: "none",
        color: "white",
    },
});


const theme = createMuiTheme({})


const options = [{ label: "Call" },
{ label: "Email" }, { label: "Text" },];
const CustomFeedbackDialog = ({ open, onClose, handleSubmit,
    feedbackValues, handleChange }) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Dialog
                onClose={onClose}
                PaperProps={{
                    style: {
                        overflowY: 'clip',
                    }
                }}
                aria-labelledby="feedback-dialog-title"
                open={open}>
                <div >
                    <DialogTitle className={classes.DialogTitle} id="referral-dialog-title">
                        <Typography paragraph variant='h5'>Send Your Feedback!</Typography>
                        <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                         Lorem Ipsum has been the industry's standard</Typography>
                    </DialogTitle>
                    <Grid style={{
                        justifyContent: "center",
                    }}>
                        <div style={{ padding: '20px 30px 0 30px' }}>
                            <Typography >How was your experience?</Typography><br />
                            <FormControl fullWidth variant='outlined' >
                                <Select
                                    name='experience'
                                    margin='dense'
                                    value={feedbackValues.experience}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                        },
                                        getContentAnchorEl: null
                                    }}
                                    id='experience'
                                    onChange={handleChange}
                                    defaultValue=''
                                >
                                    <MenuItem value='good' >good</MenuItem>
                                    <MenuItem value='bad'>bad</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{
                                display: 'flex',
                                margin: '20px 0 20px 0'
                            }} >
                                <img src={Smile} style={{ marginRight: '20px' }} />
                                <img src={Sadface} style={{ marginRight: '20px' }} />
                                <img src={CloseEye} />
                            </div>
                        </div>
                        <Grid className={classes.txtAreacontainer}>
                            <TextareaAutosize
                                rowsMin={4}
                                cols={60}
                                id="description"
                                placeholder='Describe your experience here...'
                                name='description'
                                value={feedbackValues.description}
                                onChange={handleChange}
                                itemType='textarea'
                                
                                rowsMax={5}
                                className={classes.modaltextarea}
                                aria-label="maximum height"
                            />
                        </Grid>
                    </Grid>
                    <div style={{
                        padding: '0 30px 0 30px',
                        fontWeight: "600"
                    }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                style={{
                                    flexDirection: "row",
                                }}
                                aria-label='contactType'
                                name='contactType'
                                id='contactType'

                                value={feedbackValues.contactType}
                                onChange={handleChange}
                            >
                                {options.map((option, i) => (
                                    <FormControlLabel
                                        key={i}
                                        className={classes.RadioControlLabel}
                                        value={option.label}
                                        control={<Radio style={{
                                            color: "#008FFF",

                                        }} />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Button
                        size='large'
                        onClick={handleSubmit}
                        className={classes.buttonRoot}
                        variant="contained"
                    >
                        Submit
            </Button>
                </div>
            </Dialog >
        </ThemeProvider >
    )
}

export default CustomFeedbackDialog
