import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button
} from "@mui/material";
import pageRight from "../../../assets/svg/arrow-right-solid.svg";
import pageLeft from "../../../assets/svg/arrow-left-solid.svg";
import plus from "../../../assets/svg/plus-solid.svg";
import { AppointmentTableRow } from "./appointmentTableRow";

import styles from "./appointmentTable.module.css";

function CustomTablePagination(props) {
    const { count, page, rowsPerPage, onPageChange } = props;


    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
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
                disabled={page === 0}
            >
                <img src={pageLeft} alt="previous page" className={`h-100 ${styles["buttonImg"]}`}></img>
            </Button>
            <div className="h-50 mt-3">
                1 of 1
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
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                <img src={pageRight} alt="next page" className={`h-100 ${styles["buttonImg"]}`}></img>
            </Button>
        </div>
    );
}


export function AppointmentTable() {
    const [show, setShow] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [page, setPage] = useState(0);
    const [apps, setApps] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = () => {
        fetch('http://localhost:5000/appointments')
            .then(response => response.json())
            .then(data => setApps(data));
    }

    // const deleteAppointment = (id_appointment) => {
    //     const requestOptions = {
    //         method: 'DELETE',
    //     };

    //     fetch(`http://localhost:5000/appointments/${id_appointment}`, requestOptions).then(() => {
    //         getAppointments();
    //     });
    // }

    return (
        <div>
            <div className="d-flex flex-row-reverse">
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
                        {apps.map((app) => (
                            <AppointmentTableRow app={app} getA={getAppointments}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination />
        </div>
    );
}