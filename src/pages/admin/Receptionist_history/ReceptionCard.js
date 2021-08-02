import React, { useState } from 'react'
import { Avatar, Typography, Grid, Divider, } from '@material-ui/core';
import { LocationOn, } from '@material-ui/icons';

import DummyImage from '../../../assets/resceptionst-profile-img.png';


const ReceptionCard = ({ v }) => {
    return (
        <Grid >
            <Grid container item>
                <Grid item >
                    <Avatar src={DummyImage} style={{ height: '80px', width: '80px' }} />
                </Grid>
                <Grid style={{ padding: '5px 0 0 20px', }} >
                    <Typography style={{ fontWeight: 'bold' }} variant='h6' >
                        {v?.description}</Typography>
                    <Typography style={{ color: 'gray', }}>{v?.description}</Typography>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', }}><LocationOn
                        fontSize='small' style={{ color: 'gray', }} />
                        <Typography style={{ color: 'gray' }}  >Las Vegas</Typography></div>
                </Grid>
            </Grid>
            <Grid item style={{ marginTop: '60px' }}>
                <Typography variant='h6'  >Details</Typography>
                <Divider orientation='horizontal'
                    style={{ margin: '10px 0 10px 0' }} />
                <Typography>Email:</Typography>
                <Typography style={{ fontWeight: 'bold' }} paragraph >{v?.email}</Typography>
                <Typography >Phone:</Typography>
                <Typography style={{ fontWeight: 'bold', }} paragraph >{v?.phone}</Typography>
                <Typography >Mobile:</Typography>
                <Typography style={{ fontWeight: 'bold', }} paragraph >{v?.mobile}</Typography>
                <Typography style={{ marginTop: '50px' }} variant='h6' >Statistics</Typography>
                <Divider orientation='horizontal' style={{ margin: '10px 0 10px 0' }} />
                <Typography style={{ marginBottom: '2px', }}>Total call:</Typography>
                <Typography style={{ fontWeight: 'bold' }} paragraph>43</Typography>
                <Typography style={{ marginBottom: '2px', }}>Total message:</Typography>
                <Typography style={{ fontWeight: 'bold', }} paragraph >65</Typography>
                <Typography style={{ marginBottom: '2px', }}>Total Email:</Typography>
                <Typography style={{ fontWeight: 'bold', }} paragraph>34</Typography>
                <Typography style={{ marginTop: '50px' }} variant='h6' >Statistics</Typography>
                <Divider orientation='horizontal' style={{ margin: '10px 0 10px 0' }} />
                <Typography style={{ marginBottom: '2px', }}>dolor sit:</Typography>
                <Typography style={{ fontWeight: 'bold' }} paragraph >lorem ipsum dolor</Typography>
                <Typography style={{ marginBottom: '2px', }}>dolor sit:</Typography>
                <Typography style={{ fontWeight: 'bold', }} paragraph >lorem ipsum dolor</Typography>

            </Grid>
        </Grid>
    )
}

export default ReceptionCard;