import React, { useEffect, useState, useContext } from 'react';
import './PatientList.css'
import {
    Button, TableCell, TableContainer, TableRow, Paper, Table, TableBody,
    TableHead, TextField, Grid, Icon, makeStyles, Container, Typography, TablePagination
} from '@material-ui/core';
import { Fade } from 'react-reveal'
import Loader from "react-loader-spinner";

import PatientListFilter from './PatientListFilter';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Filter from '../../../assets/filter.png';
import TableCustomDropDown2 from './PatientListDropDown';
import MyContext from '../../../helper/themeContext';
import GetData from "../../../Fetch/GetData1";

const columns = [
    { id: 'patient_name', label: 'Patient Name', minWidth: 151, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center' },
    { id: 'docter', label: 'Date of Birth', minWidth: 200, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
    { id: 'patient_appoinment', label: 'Patient Appoinment', minWidth: 150, align: 'center', },
    { id: 'patient_phone', label: 'Phone number', minWidth: 140, align: 'center' },
    { id: 'marital_status', label: 'Marital Status', minWidth: 140, align: 'center' },
];
const actions = [
    { label: 'Approved', route: './forms/initial-contact-form', isDisabled: false },
    { label: 'Declined', route: '/', isDisabled: false },
    { label: 'Pending', route: '/', isDisabled: false },
]

const usestyles = makeStyles({
    main: {
        margin: '30px 20px 0 90px',
        background: '#FFF',
        padding: '5px 20px 0 20px',
        minHeight: 'calc(100vh - 120px)',
    },
    heading1: {
        fontSize: '24px',
        marginBottom: '5px'
    },
    subHeader: {
        color: '#9C9C9C',
        marginBottom: '5px',
        height: 'auto',
        // border:'1px solid'
    },
})

function PatientsList({ width, ...props }) {
    const classes = usestyles();
    const [openfilter, setOpenfilter] = useState(false);
    const context = useContext(MyContext);
    const history = useHistory();
    const [tableData, setTableData] = useState(null);
    const [date, setDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [getAll, setGetAll] = useState(false);
    const [click, setclick] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [maxRows, setMaxRows] = useState(0);

    const [inputValues, setInputValues] = useState({
        patient_name: '',
        doctor_name: '',
        patient_email: '',
        phone_number: '',
        patient_id: '',
        appointment_date: '',
    })
    const [msg, setMsg] = useState('')


    var _tableData = res => {
        if (res.data.res) {
            setMaxRows(res.data.count)
            setTableData(res.data.res);
        }
        setLoading(false);
        res.data.res?.length === 0 && setMsg('No record found')
        setGetAll(false)
    }

    useEffect(() => {
        if (click === false || page > 1) {
            GetData(
                context.BaseUrl + `/patients?page_num=${page}&num_per_page=${rowsPerPage}`,
                200,
                context.state.user.token,
                _tableData
            )
        }
    }, [page]);

    useEffect(() => {
        if (getAll) {
            filterSubmit();
        }
    }, [getAll])


    const handleChange = ({ target: { name, value } }) => {
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }
    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
    };

    const filterSubmit = () => {
        if (Object.values(inputValues).some(el => el !== '') || getAll) {
            setLoading(true)
            setPage(1)
            console.log('filtersubmit', inputValues)
            GetData(
                context.BaseUrl + `/patients?page_num=1&items_per_page=${rowsPerPage}&patient_name=${inputValues
                    .patient_name}&patient_email=${inputValues.patient_email}&phone_number=${inputValues.phone_number}&appointment_date=${inputValue}&doctor_name=${inputValues.doctor_name}`,
                200,
                context.state.user.token,
                _tableData
            )
            setclick(true)
        }
    }


    const clearFilter = () => {
        setInputValues(prevState => ({
            ...prevState,
            patient_name: '',
            doctor_name: '',
            patient_email: '',
            phone_number: '',
        }));
        setInputValue('');
        setDate('');
        setPage(1);
        click === true && setGetAll(true);
    }


    return (
        <div className={classes.main}>
            <h1 variant='h4' style={{ margin: '15px 0 0 0' }}>
                Patients List</h1>
            <Button variant='outlined' color='primary' style={{
                float: 'right',
                marginBottom: '10px'
            }}
                onClick={() => setOpenfilter(!openfilter)} >
                <img src={Filter}
                    style={{ marginRight: '5px' }}
                />
             Filter</Button>
            <div className={classes.subHeader}>
                <div style={{ marginTop: '50px', }}>
                    <Fade bottom collapse when={openfilter} >
                        <PatientListFilter inputValues={inputValues}
                            handleChange={handleChange}
                            date={date}
                            clearFilter={clearFilter}
                            onDateChange={onDateChange}
                            inputValue={inputValue}
                            filterSubmit={filterSubmit} />
                    </Fade>
                </div>
            </div>
            <TableContainer
                component={Paper}
                style={{
                    maxHeight: openfilter ? 'calc(100vh - 363px)' : 'calc(100vh - 295px)',
                    minHeight: openfilter ? 'calc(100vh - 363px)' : 'calc(100vh - 295px)',
                }}
            >
                <Table stickyHeader className={classes.table} aria-label="referrals table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {columns.map((column, key) => (
                                <TableCell
                                    key={key}
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
                    {loading ? (
                        <div className='loading'>
                            <Loader type='Bars' color="#396CF0" height={50} width={50} />
                        </div>
                    ) : (
                        <TableBody>
                            {tableData?.map((row, i) => (
                                <TableRow key={i} style={{ cursor: 'pointer' }}
                                    onClick={() => history.push('/admin/patient-history/' + row.id)} >
                                    <TableCell component="th" align="center" scope="row">
                                        {row.patient_name}
                                    </TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{moment(row.dob).format('MM-DD-YYYY hh:mm A')}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{moment(row.Date).format('MM-DD-YYYY hh:mm A')}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.marital_status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>)}
                </Table>
                <TableCustomDropDown2 newAppoinmentActions={actions}
                    handleClose={() => setAnchorEl(null)} anchorEl={anchorEl} />
            </TableContainer>
            <TablePagination
                component="div"
                style={{
                    right: 0, float: 'right',
                    bottom: 0
                }}
                rowsPerPageOptions={[]}
                backIconButtonProps={{ disabled: page < 2 }}
                nextIconButtonProps={{ disabled: ((page - 1) * rowsPerPage) + tableData?.length >= maxRows }}
                labelDisplayedRows={() =>
                    maxRows && `${(((page - 1) * rowsPerPage) + tableData?.length) > maxRows ?
                        maxRows : (((page - 1) * rowsPerPage) + tableData?.length)} of ${maxRows}`
                }
                page={page}
                onChangePage={(e, newp) => { setPage(newp); setLoading(true) }}
            />
        </div >
    )
}
export default PatientsList;