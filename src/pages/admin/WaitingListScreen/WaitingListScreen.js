import React, { useEffect, useState, useContext } from 'react'
import './WaitingListScreen.css';
import {
    Button, TableCell, TableContainer, TableRow, Paper, Table, TableBody,
    TableHead, makeStyles, TablePagination
} from '@material-ui/core';
import { Fade } from 'react-reveal'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { ArrowDropDown, } from '@material-ui/icons';
import moment from 'moment';
import Filter from '../../../assets/filter.png';
import TableCustomDropDown2 from './TableCustomDropDown2';
import MyContext from '../../../helper/themeContext';
import GetData from "../../../Fetch/GetData1";
import FilteredInputs from './FilteredInputs';
import Loader from "react-loader-spinner";

const columns = [
    { id: 'patient_name', label: 'Patient Name', minWidth: 151, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center' },
    { id: 'docter', label: 'Doctor Name', minWidth: 200, align: 'center' },
    { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
    {
        id: 'patient_appoinment', label: 'Patient Appoinment', minWidth: 150, align: 'center',
        // format: (value) => getFormattedDate(value)
    },
    { id: 'patient_phone', label: 'Phone number', minWidth: 140, align: 'center' },
    { id: 'patient_status', label: 'Appointment Time', minWidth: 140, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
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
        padding: '0px 20px 0 20px',
        minHeight: 'calc(100vh - 130px)',
        maxHeight: "calc(100vh - 130px)",
    },
    heading1: {
        fontSize: '24px',
        marginBottom: '5px'
    },
    subHeader: {
        color: '#9C9C9C',
        paddingRight: '2%',
    },
})

const Waitinglistscreen = ({ width }) => {
    const classes = usestyles();
    const [opendropdown, setOpendropdown] = useState(false);
    const [openfilter, setOpenfilter] = useState(false);
    const [getAll, setGetAll] = useState(false);
    const context = useContext(MyContext);
    const [tableRows, setTableRows] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [date, setDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [maxRows, setMaxRows] = useState(0);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [click, setclick] = useState(false)
    const [msg, setMsg] = useState('')
    const [inputValues, setInputValues] = useState({
        patient_name: '',
        doctor_name: '',
        patient_email: '',
        phone_number: '',
    })

    var setTableData = res => {
        if (res.data) {
            setMaxRows(res.data ? res.data.count : 0)
            res.data.res && setTableRows(res.data.res)
            setLoading(false)
            res.data.res.length === 0 && setMsg('No record found');
            setGetAll(false);
        }
    }

    useEffect(() => {
        if (click === false || page > 1) {
            GetData(
                context.BaseUrl + `/appointments/waiting?page_num=${page}&num_per_page=${rowsPerPage}`,
                200,
                context.state.user.token,
                setTableData
            )
        }
    }, [page]);

    const filterSubmit = () => {
        if (Object.values(inputValues).some(el => el !== '') || getAll) {
            setLoading(true)
            setPage(1)
            GetData(
                context.BaseUrl + `/appointments/waiting?start_date=${inputValue}&phone=${inputValues
                    .phone_number}&doctor_name=${inputValues.doctor_name}&patient_name=${inputValues
                        .patient_name}&patient_email=${inputValues
                            .patient_email}&page_num=1&num_per_page=${rowsPerPage}`,
                200,
                context.state.user.token,
                setTableData
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

    return (
        <div style={{
            height: width === 'xs' ? 'calc(100vh - 85px) !important' :
                "calc(100vh - 90px) !important",
        }} className={classes.main}>
            <h1 variant='h4' style={{
                paddingTop: '10px',
                marginBottom: '10px',
            }}>
                Patients Waiting List of Appointments</h1>
            <Button variant='outlined' color='primary' style={{
                float: 'right',
                marginRight: width === 'sm' ? '15px' : '' ||
                    width === 'xs' ? '10px' : '',
                marginBottom: '5px'
            }}
                onClick={() => setOpenfilter(!openfilter)} >
                <img src={Filter}
                    style={{ marginRight: '5px' }}
                />
             Filter</Button>
            <div className={classes.subHeader}
                style={{
                    marginBottom: openfilter ? '10px' : null,
                    marginTop: '50px',
                }}>
                <Fade bottom collapse when={openfilter}  >
                    <FilteredInputs inputValues={inputValues}
                        handleChange={handleChange}
                        width={width}
                        date={date}
                        clearFilter={clearFilter}
                        onDateChange={onDateChange}
                        inputValue={inputValue}
                        filterSubmit={filterSubmit} />
                </Fade >
            </div>
            <TableContainer
                style={{
                    maxHeight: openfilter ? 'calc(100vh - 363px)' : 'calc(100vh - 295px)',
                    minHeight: openfilter ? 'calc(100vh - 358px)' : 'calc(100vh - 285px)',
                }}
                component={Paper}
            >
                <Table stickyHeader aria-label="referrals table">
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
                    {loading ? (
                        <div
                            className='loading' >
                            <Loader type='Bars' color="#396CF0" height={50} width={50} />
                        </div>
                    ) : (
                        <TableBody>
                            {tableRows?.map((row, i) => (
                                <TableRow style={{ border: '10px solid black' }} key={i}>
                                    <TableCell component="th" align="center" scope="row">
                                        {row.patient_name}
                                    </TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{moment(row.Date).format('MM-DD-YYYY')}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.start_time}</TableCell>
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

                backIconButtonProps={{ disabled: page < 2 }}
                nextIconButtonProps={{ disabled: ((page - 1) * rowsPerPage) + tableRows.length >= maxRows }}
                rowsPerPageOptions={[]} //for remove 'rows per page'
                page={page}
                labelDisplayedRows={() =>
                    maxRows && `${(((page - 1) * rowsPerPage) + tableRows.length) > maxRows ?
                        maxRows : (((page - 1) * rowsPerPage) + tableRows.length)} of ${maxRows}`
                }
                onChangePage={(e, newp) => {
                    setPage(newp);
                    setLoading(true);
                }}
            />
        </div >
    )
}
export default Waitinglistscreen;