import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


export function AppointmentTable() {
    const [inputValue, setInputValue] = useState('')
    const [timer, setTimer] = useState(null)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(3);
    const [apps, setApps] = useState([]);


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
                    <TableHead>
                        <TableRow
                            sx={{
                                '& .MuiTableCell-root': {
                                    color: 'white',
                                    backgroundColor: '#2785FF'
                                }
                            }}>
                            <TableCell>Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell
                                sx={{
                                    width: "100px",
                                }}>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apps?.map((app) => (
                            <AppointmentTableRow key={app.id_appointment} app={app} getA={getAppointments}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination page={page} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
    );
}