import React, { useState, useContext, useEffect, useRef } from 'react';
import {
    Modal, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow, TableContainer,
    Button, Grid,
    makeStyles,
    Container, Backdrop, Avatar, Divider, IconButton
} from '@material-ui/core';
import GetData from "../../../Fetch/GetData1";
import MyContext from '../../../helper/themeContext';
import {
    Close,
} from '@material-ui/icons';
import { useParams } from 'react-router-dom'
import PatientDetails from './PatientDetails'
import ReceptionistTable from './ReceptionistTable';
const usestyles = makeStyles(theme => ({
    main: {
        marginTop: '30px',
        marginLeft: '90px',
        marginRight: '35px',
        background: '#FFF',
        padding: '10px 0% 0 10px',
    },
    modal: {
        display: 'flex',
        overflow: 'scroll',
        alignItems: 'center',
    },
    eventCard: {
        borderTop: '5px solid red',
        height: '100%',
        borderRadius: '0px',
        paddingLeft: '10px'
    },
    gridtwo: {
        padding: '20px',
        maxHeight: 'auto',
        marginBottom: '20px'
    },
    img: {
        width: '80px',
        height: '80px',
        marginBottom: '10px',
    },
    table: {
        minWidth: 650,
    },
    paper: {
        // margin: '2% 0 0 0',
        borderRadius: '10px',
        padding: '2% 5% 2% 5%',
        height: '95%',
    }
}))

const columns = [
    { id: 'patient_name', label: 'Receptionist Name', minWidth: 151, align: 'center' },
    { id: 'email', label: 'Contact Type', minWidth: 100, align: 'center' },
    { id: 'docter', label: 'Date & Time', minWidth: 200, align: 'center' },
    { id: 'address', label: 'Follow Up', minWidth: 200, align: 'center' },
    { id: 'patient_appoinment', label: 'Patient Appoinment', minWidth: 200, align: 'center', },
    { id: 'patient_phone', label: 'Phone number', minWidth: 140, align: 'center' },
    { id: 'description', label: 'Description', minWidth: 140, align: 'center' },
];

const PatientHistory = ({ match, width }) => {
    console.log(width)
    const classes = usestyles();
    const param = useParams();
    const context = useContext(MyContext);
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState(null);
    const [patient_details, setPatientDetails] = useState(null)
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [maxRows, setMaxRows] = useState(0);

    const setTable = res => {
        // setTableData(res.data)
        setPatientDetails(res.data.res?.filter((val, i) => val.id == param.id))
    }
    const setReceptionistTable = res => {
        // console.log('recep_table', res.data)
        setTableData(res.data);
        setLoading(false)
    }

    useEffect(() => {
        GetData(
            context.BaseUrl + "/patients",
            200,
            context.state.user.token,
            setTable
        )
        GetData(
            context.BaseUrl + "/receptionists",
            200,
            context.state.user.token,
            setReceptionistTable
        )
    }, [])
    const onShow = () => {
        setShow(true)
    }
    return (
        <div>
            <div className={classes.main}
                style={{ backgroundColor: 'transparent', height: 'auto' }}>
                <Modal className={classes.modal} open={show}
                    onClose={() => setShow(false)}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500, }}>
                    <Container style={{ outline: 'none', width: '60%', }}>
                        <Paper className={classes.paper} style={{
                            paddingBottom: '2px',
                            borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                        }} elevation={1} >
                            <Grid container >
                                <Grid item md={12} xs={12} sm={12}>
                                    <IconButton size='medium' onClick={() => setShow(false)}
                                        style={{ float: 'right', }}>
                                        <Close style={{ color: 'lightgray' }} />
                                    </IconButton>
                                    <Typography variant='h4' >Receptionist Feedback </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Divider orientation='horizontal' style={{ backgroundColor: 'lightgray' }} />
                        <Paper className={classes.paper} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} elevation={1} >
                            <Grid item md={12} xs={12} sm={12}>
                                <Typography paragraph style={{ backgroundColor: '#F8F8F8', padding: '20px' }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    Why do we use it?
                                    It is a long established fact that a reader will be distracted by the readable
                            </Typography>
                            </Grid>
                            <Grid container justify='flex-end' >
                                <Button size='medium' id='Referral_FormPage1_Cancel_Button'
                                    style={{ marginRight: '20px' }}
                                    onClick={() => setShow(false)}
                                >Cancel</Button>
                                <Button size='medium' style={{ height: '100%' }} onClick={() => setShow(false)}
                                    id='Referral_FormPage1_Footer_Button'>OK</Button>
                            </Grid>
                            {/* </Grid> */}
                        </Paper>
                    </Container>
                </Modal>

                <Grid elevation={2}
                    container
                    className={classes.gridtwo}
                    component={Paper}
                    alignItems='center'>
                    <PatientDetails patient_details={patient_details} width={width} />
                </Grid>
                <ReceptionistTable columns={columns}
                    maxRows={maxRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    loading={loading}
                    setLoading={setLoading}
                    setPage={setPage}
                    tableData={tableData}
                    show={onShow} />
            </div>
        </div >
    )
}
export default PatientHistory;
