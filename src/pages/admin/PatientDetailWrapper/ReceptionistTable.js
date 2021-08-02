import React, { useState, useContext, useEffect, useRef } from 'react';
import './PatientList.css'
import {
    Modal, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow, TableContainer,
    Button, Grid, TablePagination,
    makeStyles,
} from '@material-ui/core';
import Loader from "react-loader-spinner";

import moment from 'moment'
import {
    Edit,
} from '@material-ui/icons';
const usestyles = makeStyles(theme => ({
    container: {
        maxHeight: "calc(100vh - 295px)",
        minHeight: "calc(100vh - 450px)",
        borderRadius: 0,
    },
    table: {
        minWidth: 650,
        position: 'relative'
    },
    paper: {
        // margin: '2% 0 0 0',
        borderRadius: '10px',
        padding: '2% 5% 2% 5%',
        height: '95%',
    }
}))

const ReceptionistTable = ({ columns, setLoading, loading, tableData, show, page, rowsPerPage, maxRows, setPage }) => {
    const classes = usestyles();
    return (
        <div>
            <TableContainer
                className={classes.container}
                component={Paper}>

                <Table stickyHeader className={classes.table} aria-label="referrals table">
                    <TableHead className={classes.tableHead}>
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
                        <div className='loadingreceptable' >
                            <Loader type='Bars' color="#396CF0" height={50} width={50} />
                        </div>
                    ) : (
                        <TableBody>
                            {tableData?.map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.ContactType}</TableCell>
                                    <TableCell align="center">{moment(row.created_at).format('MM-DD-YYYY hh:mm A')}</TableCell>
                                    <TableCell align="center">{moment().format('MM-DD-YYYY')}</TableCell>
                                    <TableCell align="center">{moment().format('MM-DD-YYYY hh:mm A')}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align='center'>
                                        <Button style={{ backgroundColor: '#d3d3d3' }}
                                            onClick={show}
                                            color="primary" title='FeedBacks'
                                            endIcon={<Edit />} >feedback
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
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
                nextIconButtonProps={{ disabled: ((page - 1) * rowsPerPage) + tableData?.length >= maxRows }}
                labelDisplayedRows={() =>
                    maxRows && `${((page - 1) * rowsPerPage) + tableData?.length} of ${maxRows}`
                }
                page={page}
                onChangePage={(e, newp) => {
                    setPage(newp);
                    setLoading(true)
                }}
            />
        </div>
    )
}

export default ReceptionistTable