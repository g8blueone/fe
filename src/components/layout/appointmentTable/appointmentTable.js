import styles from "./appointmentTable.module.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, IconButton, TableFooter, TablePagination, TableSortLabel, Button } from "@mui/material";
import pageRight from "../../../assets/svg/arrow-right-solid.svg"
import pageLeft from "../../../assets/svg/arrow-left-solid.svg"
import edit from "../../../assets/svg/pen-to-square-regular.svg"
import del from "../../../assets/svg/ban-solid.svg"
import plus from "../../../assets/svg/plus-solid.svg"
import TableHeader from "./appointmentTableHeader.js"

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import search from "../../../assets/svg/magnifying-glass-solid.svg"

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
} from "@mui/material";
import pageRight from "../../../assets/svg/arrow-right-solid.svg";
import pageLeft from "../../../assets/svg/arrow-left-solid.svg";
import plus from "../../../assets/svg/plus-solid.svg";
import { AppointmentTableRow } from "./appointmentTableRow";

import styles from "./appointmentTable.module.css";

function CustomTablePagination({page, totalPages, onPageChange}) {


    const handleBackButtonClick = (event) => {
        console.log(event)
        onPageChange(page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(page + 1);
    };


    return (
        <div className={` ${styles["paginationBtnGroup"]} 
        d-flex flex-row align-content-center justify-content-end w-100`}>
            <Button
                className="mt-3"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    width: '30px',
                    minWidth: '30px',
                    height: '30px',
                    minHeight: '30px'
                }}
                onClick={handleBackButtonClick}
                disabled={page === 1}
                classes={{ disabled: styles.disabledPagination }}
            >
                <img src={pageLeft} alt="previous page" className={`h-100 ${styles["buttonImg"]}`}></img>
            </Button>
            <div className={`${styles['pageNumberText']}`}>
                {page} of {totalPages}
            </div>
            <Button
                className="mt-3"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                    width: '30px',
                    minWidth: '30px',
                    height: '30px',
                    minHeight: '30px'
                }}
                onClick={handleNextButtonClick}
                disabled={page === totalPages}
                classes={{ disabled: styles.disabledPagination }}
            >
                <img src={pageRight} alt="next page" className={`h-100 ${styles["buttonImg"]}`}></img>
            </Button>
        </div>
    );
}

function descendingComparator(a, b, orderBy) {
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a,b) => descendingComparator(a, b, orderBy)
        : (a,b) => -descendingComparator(a, b, orderBy)
}

const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a,b) => {
        const order = comparator(a[0], b[0])
        if(order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedRowArray.map((el) => el[0])
}

export function AppointmentTable() {
    const [inputValue, setInputValue] = useState('')
    const [timer, setTimer] = useState(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc');
    };

    // const createSortHandler = (property) => (event) => {
    //     handleRequestSort(event, property)
    // }

    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('type');


    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = () => {
        fetch('http://localhost:5000/appointments')
            .then(response => response.json())
            .then(data => setApps(data));
    }

    const inputChanged = e => {
        setInputValue(e.target.value)

        clearTimeout(timer)

        const newTimer = setTimeout(() => {
        console.log(inputValue)
        }, 500)

        setTimer(newTimer)
    }

    const onPageChange = (newPage) => {
        console.log(newPage)
        setPage(newPage)
        //setPage(newPage);
    };


    return (
        <div>
            <div className="d-flex">
                <div className="d-flex col-6">
                    <div className={`${styles['search-box']} align-self-end`}>
                        <input className={`${styles['search-text']}`} value={inputValue} type="text" onChange={inputChanged} placeholder="Search..."/>
                        <img src={search} alt="search" className={`h-100 ${styles["buttonImg"]}`}></img>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse justify-content-between col-6">
                    <Link to="/appointments/create">
                        <Button
                            className={`${styles["rowBtn"]} mb-2`}
                            sx={{
                                backgroundColor: '#2785FF',
                                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                                width: '50px',
                                minWidth: '30px',
                                height: '30px',
                                minHeight: '30px'
                            }}
                        >
                            <img src={plus} alt="add" className={`h-100 ${styles["buttonImg"]}`}></img>
                        </Button>
                    </Link>
                </div>
            </div>
            
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                    <TableHeader
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handleRequestSort={handleRequestSort}
                        />
                        {/*<TableCell*/}
                        {/*    sx={{*/}
                        {/*        width: "100px",*/}
                        {/*    }}></TableCell>*/}
                        {
                            sortedRowInformation(rowInformation, getComparator(orderDirection, valueToOrderBy))
                                .map((appointment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {appointment.type}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.date}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.time}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.location}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.doctor}
                                        </TableCell>
                                        <TableCell>
                                            {appointment.patient}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                width: "100px",
                                                display: "flex",
                                                gap: "10px",
                                                justifyContent: "right"
                                            }}>
                                            <Button
                                                className={`${styles["rowBtn"]}`}
                                                sx={{
                                                    backgroundColor: '#2785FF',
                                                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    minHeight: '30px'
                                                }}
                                                // onClick={hello}
                                            >
                                                <img src={edit} alt="edit" className={`h-100 ${styles["buttonImg"]}`}></img>
                                            </Button>
                                            <Button
                                                className={`${styles["rowBtn"]}`}
                                                sx={{
                                                    backgroundColor: '#2785FF',
                                                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                                                    width: '30px',
                                                    minWidth: '30px',
                                                    height: '30px',
                                                    minHeight: '30px'
                                                }}
                                                onClick={() => deleteAppointment(appointment.id_appointment)}
                                            >
                                                <img src={del} alt="delete" className={`h-100 ${styles["buttonImg"]}`}></img>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    <TableBody>
                        {apps.map((app) => (
                            <TableRow
                                key={app.type}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {app.type}
                                </TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>{app.time.substring(0,5)}</TableCell>
                                <TableCell>{app.location}</TableCell>
                                <TableCell>{app.doctor_name}</TableCell>
                                <TableCell>{app.patient_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination page={page} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
    );
}