import React, { useContext, useState, useRef } from 'react'
import { Button, makeStyles, Grid, Card, Typography, } from '@material-ui/core';
import {
    CancelRounded
} from '@material-ui/icons';
import SignatureCanvas from 'react-signature-canvas'
import MyContext from '../../helper/themeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            // margin: theme.spacing(1),
        },
    },
    btn: {
        borderRadius: '50px',
        marginRight: '2%'
    },
    purple: {
        backgroundColor: '#93ADEF',
        height: '40px',
        width: '40px',
        marginRight: '0px',
    },
    signbox: {
        border: '1px solid gray',
        borderRadius: '5px',
        marginBottom: '5%',
    },
    footerCont: {
        display: 'flex',
        minHeight: '150px',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0px',
    },
    cancelSign: {
        float: 'right',
        display: 'block'
    },
    hrLine: {
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        width: '55%',
        margin: '0 0 5px 0'
    }
}));

const First = ({ title, id }) => {
    const classes = useStyles();
    const signone = useRef()
    const signTwo = useRef()
    const context = useContext(MyContext);

    const handleSubmit = () => {
        context.history.push('./referrals')
    }

    const handleCancel = () => {
        context.history.push('./referrals')
    }

    return (
        <div id={id}
            style={{
                maxWidth: "100%",
                margin: "0px auto",
                padding: "40px"
            }} >
            <div style={{
                textAlign: 'left',
                display: 'flex'
            }}>
                <Typography style={{ fontWeight: 'bold' }}>
                    CONSENT FOR RELEASE OF INFORMATION - BILLING</Typography>
                <span className={classes.hrLine}></span>

            </div><br />
            <Grid container>
                <Grid md={12} item style={{ display: 'flex' }}>
                    <div style={{ marginRight: '10px' }}>
                        <p >Patient Id</p>
                        <p >Patient name:</p>
                        <p >Birth Date</p>
                    </div>
                    <div>
                        <p>#22210</p>
                        <p>Mildred wison</p>
                        <p>24/06/1993</p>
                    </div>
                </Grid>
                <h1>{title}</h1>
                <p style={{ lineHeight: '30px' }}>
                    Contrary to popular belief, Lorem Ipsum is not simply random text.
                    It has roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old. Richard McClintock, a Latin professor
                    at Hampden-Sydney College in Virginia, looked up one of the more
                    obscure Latin words, consectetur, from a Lorem Ipsum passage, and
                    going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32.
            </p>

                <Grid container style={{
                    padding: '20px ',
                }} >
                    <Grid item md={3} sm={5} xs={5} style={{
                        marginRight: '30px',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-around'
                    }} >
                        <div >
                            <p >Date: 26/02/2021</p>
                            <p >Patient signature:</p>
                        </div>
                        <div  > <p >Date: 26/02/2021</p>
                            <p  >Parent / Guradian signature:</p>
                        </div>
                    </Grid>
                    <Grid md={2} sm={4} xs={6}
                        style={{
                            maxWidth: '200px'
                        }}
                        item>
                        <div onClick={() => signone.current.clear()} className={classes.cancelSign} >
                            <CancelRounded fontSize='default' />
                        </div>
                        <div className={classes.signbox} >
                            <SignatureCanvas penColor='black'
                                ref={signone}
                                canvasProps={{
                                    height: 90,
                                    width: 200,
                                    className: 'sigCanvas'
                                }} />
                        </div>
                        <Button id="Referral_FormPage1_Submit_Button"
                            variant="contained"> Add signature </Button>
                        <div   >
                            <div onClick={() => signTwo.current.clear()} >
                                <CancelRounded fontSize='default' className={classes.cancelSign} />
                            </div>
                            <div className={classes.signbox} style={{ marginTop: '20px', border: '' }} >
                                <SignatureCanvas penColor='black' ref={signTwo}
                                    canvasProps={{ width: 200, height: 90, className: 'sigCanvas' }} />
                            </div>
                            <Button id="Referral_FormPage1_Submit_Button"
                                variant="contained"> Add signature </Button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Card raised className={classes.footerCont}>
                <Button size='large' style={{
                    marginRight: '2%',
                    background: 'gray'
                }}
                    variant="contained" id='Referral_FormPage1_Footer_Button' onClick={handleCancel}>cancel</Button>
                <Button size='large' variant="contained"
                    id='Referral_FormPage1_Footer_Button' onClick={handleSubmit}>Submit</Button>
            </Card>
        </div >
    )
}

export default First;