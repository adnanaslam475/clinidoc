import React, { useState, useEffect, useContext } from 'react'
import './Receptionist_history.css'
import {
    Modal, Avatar, withWidth, Typography, TableCell, TableContainer, TableRow, Paper, Table, TableBody,
    TableHead, createMuiTheme, Grid, makeStyles, TablePagination, ThemeProvider
} from '@material-ui/core';
import ReceptionCard from './ReceptionCard';
import moment from 'moment';
import { rows, columns, dummy_data } from './dummy_data';
import MyContext from '../../../helper/themeContext';
import Loader from "react-loader-spinner";

import GetData from '../../../Fetch/GetData1';




const usestyles = makeStyles(theme => ({
    main: {
        margin: '30px 20px 2% 90px',
        background: '#FFF',
        padding: '10px 1.5% 10px 1%',
    },
    container: {
        maxHeight: 'calc(100vh - 150px)',
    },
    heading1: {
        fontSize: '24px',
        marginBottom: '5px'
    },
    subHeader: {
        color: '#9C9C9C',
        marginBottom: '5px',
        paddingRight: '30px',
    },
    paper: {
        padding: theme.spacing(3),
        paddingLeft: '15px',
        paddingBottom: '25px',
        borderBottom: '1px solid lightgray',
        borderRadius: '0px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    line: { borderBottom: '1px solid lightgray' },
    modaloutline: {
        borderRadius: '10px',
        padding: '20px 20px 20px 20px',
        backgroundColor: '#efeded',
        width: '80%',
        outline: 'none',
    },
    table: {
        minHeight: '300px',
        maxHeight: '600px',
        border: '1px solid lightgray'
    }
}))


const theme = createMuiTheme({
    overrides: {

    },
})
const Receptionist_history = ({ width }) => {
    const context = useContext(MyContext)
    const classes = usestyles();
    const [select, setSelect] = useState(0);
    const [show, setShow] = useState(false);
    const [patientDetails, setPatientDetails] = useState(null);
    const [receptionistDetails, setReceptionistDetails] = useState(null)
    const [receptionistData, setReceptionistData] = useState(null);
    const [callLogsData, setCallLogsData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [logsLoading, setLogsLoading] = useState(true)

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [maxRows, setMaxRows] = useState(0);

    useEffect(() => {
        GetData(
            context.BaseUrl + '/adminUsers',
            200,
            context.state.user.token,
            recepData
        );
    }, [])


    const setReceptionist = res => {
        console.log('setTableData', res.data.receptionist[0])
        // setReceptionistDetails(res.data.receptionist[0])
    }

    const callLogsHandler = res => {
        console.log('callLogsHandler==>', res.data)
        setMaxRows(res.data?.length === 0 ? 0 : res.data.count)
        setCallLogsData(res.data.res);
        setLogsLoading(false)
    }

    const post = id => {
        //call logs get 
        GetData(
            context.BaseUrl + `/referral/calllogs?id=${id}&page_num=${page}&item_per_page=${rowsPerPage}`,
            200,
            context.state.user.token,
            callLogsHandler
        );
        // GetData(
        //     context.BaseUrl + `/receptionistDetails?id=${id}`,
        //     200,
        //     // { receptionistId: id },
        //     context.state.user.token,
        //     setReceptionist
        // )
    }
    const recepData = res => {
        console.log('res yera==>', res.data)
        setReceptionistData(res.data);
        setReceptionistDetails(res.data[0])
        post(res.data[0].id)
        setLoading(false)
    }



    return (
        <ThemeProvider theme={theme}>
            <Modal className={classes.modal} open={show}
                onClose={() => setShow(false)}
                closeAfterTransition
                BackdropProps={{
                    timeout: 500,
                }} >
                <div className={classes.modaloutline}>
                    <Paper style={{
                        borderRadius: '10px',
                        height: '97%',
                        padding: '20px 20px 0px 20px',
                    }}
                        elevation={1} >
                        <Typography variant='h5' style={{ paddingLeft: '20px' }}>Contact information</Typography>
                        <Grid container >
                            {/* dirst */}
                            <Grid item sm={6} md={3} lg={3} xs={12}
                                style={{
                                    padding: '20px 20px 0px 20px',
                                }}>
                                <Typography >Name of Receptionist</Typography>
                                <Typography variant='h6' paragraph >dddddddd</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div>
                                <Typography > Patient name</Typography>
                                <Typography variant='h6' paragraph >dedede</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }}>
                                </div>
                                <Typography >Email</Typography>
                                <Typography variant='h6' paragraph >u@rdc.scece</Typography>
                                <div className={classes.line} ></div>
                            </Grid>

                            {/* second */}
                            <Grid md={3} xs={12} sm={6} lg={3} style={{
                                padding: '20px 20px 0px 20px',
                            }} item  >
                                <Typography >Phone number of Receptionist</Typography>
                                <Typography variant='h6' paragraph >patientDetails?.phone</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div>

                                <Typography > Date & Time</Typography>
                                <Typography variant='h6' paragraph  >
                                    {moment(patientDetails?.dob).format('MM-DD-YYYY')}</Typography>
                                < div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div><Typography >Duration</Typography>
                                <Typography paragraph variant='h6'  >
                                    {moment().format('MM-DD-YYYY')}</Typography >
                                <div className={classes.line} ></div>
                            </Grid>

                            {/* third */}
                            <Grid sm={6} md={3} xs={12} lg={3} item style={{
                                padding: '20px 20px 0px 20px',
                            }} >
                                <Typography >Email of contact person</Typography>
                                <Typography variant='h6' paragraph  >Julia horward</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div>

                                <Typography > Patient Phone</Typography>
                                <Typography variant='h6' paragraph  >Julia lorem</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div><Typography  >Patient Status</Typography>
                                <Typography variant='h6' paragraph  >Active</Typography>
                                <div className={classes.line} ></div>
                            </Grid>

                            {/* fourth */}
                            <Grid item md={3} sm={6} xs={12} lg={3} style={{
                                padding: '20px 20px 0px 20px',
                            }}>
                                <Typography  >Contact Type</Typography>
                                <Typography variant='h6' paragraph >Julia horward</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div>

                                <Typography  > Assigned by</Typography>
                                <Typography variant='h6' paragraph  >Julia lorem</Typography>
                                <div style={{
                                    borderBottom: '1px solid lightgray',
                                    marginBottom: '25%'
                                }} >
                                </div><Typography  >Appoinment</Typography>
                                <Typography variant='h6' paragraph >
                                    {moment(patientDetails?.created_at).format('MM-DD-YYYY')}</Typography>
                                <div className={classes.line} ></div>
                            </Grid>
                        </Grid>
                        <Grid container style={{
                            paddingTop: '40px', padding: '20px'
                        }}>
                            <Typography paragraph >Feedback</Typography>
                            <Typography paragraph>Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                           </Typography>
                            <div style={{
                                borderBottom: '1px solid lightgray',
                                width: '100%'
                            }} >
                            </div>
                        </Grid>
                    </Paper>
                </div>
            </Modal>
            <div className={classes.main}>
                <Typography variant='h4' paragraph style={{
                    display: 'inline-block',
                    margin: '10px 0 10px 15px',
                    fontSize: '1.7em'

                }}> Receptionist history</Typography>
                <Grid container spacing={2}>
                    <Grid style={{
                        padding: '10px 10px 10px 20px',
                    }} item xl={4} md={3} sm={6} xs={12} >
                        {receptionistData?.map((v, i) => {
                            return (<Paper key={i}
                                onClick={() => {
                                    setSelect(i)
                                    setReceptionistDetails(v);
                                    post(v.id);
                                    setLoading(true)
                                }} elevation={0}
                                className={classes.paper}>
                                <Grid style={{
                                    cursor: 'pointer',
                                    backgroundColor: select === i ? '#f5f5f5' : 'white',
                                    borderRadius: '5px'
                                }} container spacing={3}>
                                    <Grid item >
                                        <Avatar src={v.img} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography style={{ fontWeight: 'bold' }} >
                                            {v.description}</Typography>
                                        <Typography>{v.description}</Typography>
                                    </Grid>
                                    <Grid item  >
                                        <Typography style={{ fontWeight: 'bold', color: '#396cf0' }} >{moment(v.created_at).format('DD')}</Typography>
                                        <Typography>{moment(v.created_at).format('ddd')}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>)
                        })}
                    </Grid>

                    <Grid item style={{
                        padding: '30px',
                        marginTop: '10px',
                        borderLeft: width !== 'xs' && '1px solid lightgray',
                        // borderRight: width === 'md' && '1px solid lightgray' ||
                        //     width === 'lg' && '1px solid lightgray'
                    }} md={3} sm={6} xs={12}  >
                        <ReceptionCard v={receptionistDetails} />
                    </Grid>
                    {/* tables start */}
                    <Grid item md={6} sm={12} xs={12} >
                        <TableContainer className={classes.table}  >
                            <Table stickyHeader aria-label="referrals table" style={{
                                overflowY: 'auto', maxHeight: '600px',
                                position: 'relative'
                            }} >
                                <TableHead >
                                    <TableRow>
                                        {columns.map((column, key) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ fontWeight: '640', minWidth: column.minWidth, position: 'relative' }}
                                            >
                                                {column.label}
                                                {key != columns.length - 1 &&
                                                    <div style={{
                                                        position: 'absolute', right: '0px',
                                                        top: '10px', display: 'inline-block', width: '2px', height: '40px',
                                                        background: '#EBECEE'
                                                    }}>
                                                    </div>}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                {logsLoading ? (
                                    <div className='loading' >
                                        <Loader type='Bars' color="#396CF0" height={50} width={50} />
                                    </div>
                                ) : (
                                    <TableBody >
                                        {callLogsData?.map((v, i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center"
                                                    component="th" scope="row">
                                                    {v.patient_name}
                                                </TableCell>
                                                <TableCell align="center">{moment(v.call_date_and_time).format('MM-DD-YYYY hh:mm A')}</TableCell>
                                                <TableCell align="center">{v.duration_in_sec} seconds</TableCell>
                                                <TableCell align="center">{v.logtype}</TableCell>
                                                <TableCell align="center"><Typography onClick={() => { setPatientDetails(v); setShow(true) }}
                                                    style={{ color: 'blue', cursor: 'pointer' }} >Details</Typography></TableCell>
                                            </TableRow>)
                                        )}
                                    </TableBody>)}
                            </Table>

                        </TableContainer>

                        <TablePagination
                            component="div"
                            style={{
                                right: 0, float: 'right',
                                bottom: 0
                            }}
                            rowsPerPageOptions={[]}
                            backIconButtonProps={{ disabled: page < 2 }}
                            nextIconButtonProps={{ disabled: ((page - 1) * rowsPerPage) + callLogsData?.length >= maxRows }}
                            labelDisplayedRows={() =>
                                maxRows && `${(((page - 1) * rowsPerPage) + callLogsData?.length) > maxRows ?
                                    maxRows : (((page - 1) * rowsPerPage) + callLogsData?.length)} of ${maxRows}`
                            }
                            page={page}
                            onChangePage={(e, newp) => { setPage(newp); setLoading(true) }}
                        />
                    </Grid>
                </Grid>
            </div >
        </ThemeProvider >
    )
}
export default Receptionist_history;
