import React, { useEffect, useState, useContext } from 'react'
import {
    Button, TableCell, TableContainer, TableRow, Paper, Table, TableBody,
    TableHead, IconButton, Grid, makeStyles, TablePagination
} from '@material-ui/core';
import './NewAppoinment.css';
import { Fade } from 'react-reveal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ArrowDropDown, Close } from '@material-ui/icons';
import Filter from '../../../assets/filter.png';
import TableCustomDropDown2 from './TableCustomDropDown2';
import moment from 'moment';
import Loader from "react-loader-spinner";

import GetData from '../../../Fetch/GetData1';
import MyContext from '../../../helper/themeContext';
import FilteredInputs from './Filter';


const columns = [
    { id: 'patient_name', label: 'Patient Name', minWidth: 151, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center' },
    { id: 'doctor', label: 'Doctor', minWidth: 200, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
    { id: 'patient_appoinment', label: 'Patient Appoinment', minWidth: 150, align: 'center', },
    { id: 'patient_phone', label: 'Phone number', minWidth: 140, align: 'center' },
    { id: 'action', label: 'action', minWidth: 100, align: 'center' },
];


const usestyles = makeStyles({
    main: {
        margin: '30px 20px 0 90px',
        background: '#fff',
        padding: '5px 20px 0px 20px',
        minHeight: 'calc(100vh - 130px)',
        maxHeight: 'calc(100vh - 130px)',
        height: 'calc(100vh - 130px)',
        position: 'relative'
    },
    table: {
        zIndex: 2,
        height: '100%'
    },
    container: {
        zIndex: 2,
    },
    heading1: {
        fontSize: '24px',
        marginBottom: '5px'
    },
    subHeader: {
        color: '#9C9C9C',
        marginBottom: '10px',
        marginTop: '10px',
        paddingRight: '30px',
    },
})

const actions = [
    { label: 'Approved', route: './forms/initial-contact-form', isDisabled: false },
    { label: 'Declined', route: '/', isDisabled: false },
    { label: 'Pending', route: '/', isDisabled: false },
]

const NewAppoinment = ({ width }) => {
    const classes = usestyles();
    const context = useContext(MyContext);
    const [date, setDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('')
    const [opendropdown, setOpendropdown] = useState(false);
    const [openfilter, setOpenfilter] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [maxRows, setMaxRows] = useState(0);
    const [getAll, setGetAll] = useState(false)
    const [click, setclick] = useState(false)
    const [inputValues, setInputValues] = useState({
        patient_name: '',
        doctor_name: '',
        patient_email: '',
        phone_number: '',
    })
    const [msg, setMsg] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = ({ target: { name, value } }) => {
        setInputValues({
            ...inputValues,
            [name]: value
        })
    }

    const setTable = res => {
        const newarr = [];
        setLoading(false)
        if (res.data) {
            res.data.result.forEach(el => newarr.push(el.patient))
            setTableData(newarr)
            setMaxRows(res.data.count)
        }
        newarr.length === 0 && setMsg('No record found')
        setGetAll(false)
    }



    useEffect(() => {
        if (click === false || page > 1) {
            GetData(
                context.BaseUrl + `/appointments?page_num=${page}&num_per_page=${rowsPerPage}`,
                200,
                context.state.user.token,
                setTable
            );
        }
    }, [page])

    const filterSubmit = () => {
        if (Object.values(inputValues).some(el => el !== '') || getAll) {
            setLoading(true)
            setPage(1)
            console.log('filtersubmit')
            GetData(
                context.BaseUrl + `/appointments?page_num=1&num_per_page=${rowsPerPage}&patient_name=${inputValues.patient_name}&patient_email=${inputValues.patient_email}&phone_number=${inputValues.phone_number}&appointment_date=${inputValue}&doctor_name=${inputValues.doctor_name}`,
                200,
                context.state.user.token,
                setTable
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


    useEffect(() => {
        if (getAll) {
            filterSubmit();
        }
    }, [getAll])
    const onDateChange = (date, value) => {
        setDate(date);
        setInputValue(value);
    };


    return (
        <div className={classes.main}>
            <h1 style={{ marginBottom: '0px' }}>New Appointments</h1>
            <Button variant='outlined' color='primary' style={{
                float: 'right',
                marginBottom: '5px',
                zIndex: 2
            }}
                onClick={() => {
                    setOpenfilter(!openfilter);
                }} >
                <img src={Filter}
                    style={{ marginRight: '5px' }}
                />
             Filter</Button>
            <div style={{ marginBottom: openfilter ? '10px' : '' }}
                className={classes.subHeader}>
                <Fade bottom collapse when={openfilter}>
                    <FilteredInputs inputValues={inputValues}
                        handleChange={handleChange}
                        date={date}
                        clearFilter={clearFilter}
                        onDateChange={onDateChange}
                        inputValue={inputValue}
                        filterSubmit={filterSubmit} />
                </Fade >
            </div>

            <TableContainer className={classes.container}
                style={{
                    maxHeight: openfilter ? 'calc(100vh - 363px)' : 'calc(100vh - 295px)',
                    minHeight: openfilter ? 'calc(100vh - 358px)' : 'calc(100vh - 255px)',
                }}
                component={Paper}
            >
                <Table stickyHeader className={classes.table} aria-label="referrals table">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {columns.map((column, key) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ fontWeight: '640', minWidth: column.minWidth }}
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
                        <div
                            className='loading'
                        >
                            <Loader type='Bars' color="#396CF0" height={50} width={50} />
                        </div>
                    ) : (
                        <TableBody>
                            {tableData.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell align="center">
                                        {row.patient_name}
                                    </TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.docter}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{moment(row.created_at).format('MM-DD-YYYY')} {row.start_time}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align='center'>
                                        <Button variant="contained" color="primary"
                                            onClick={e => { setOpendropdown(true); setAnchorEl(e.currentTarget) }}
                                            startIcon={<VisibilityIcon />}
                                            endIcon={<ArrowDropDown />} >
                                        </Button>
                                    </TableCell>
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
                    maxRows && `${(((page - 1) * rowsPerPage) + tableData.length) > maxRows ?
                        maxRows : (((page - 1) * rowsPerPage) + tableData.length)} of ${maxRows}`
                }
                page={page}
                onChangePage={(e, newp) => { setPage(newp); setLoading(true) }}

            />
        </div >
    )
}
export default NewAppoinment;