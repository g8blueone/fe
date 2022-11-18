import styles from "./appointmentTable.module.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, IconButton, TableFooter, TablePagination, Button } from "@mui/material";
import pageRight from "../../../assets/svg/arrow-right-solid.svg"
import pageLeft from "../../../assets/svg/arrow-left-solid.svg"
import edit from "../../../assets/svg/pen-to-square-regular.svg"
import del from "../../../assets/svg/ban-solid.svg"
import plus from "../../../assets/svg/plus-solid.svg"

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

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

    const deleteAppointment = (id_appointment) => {
        const requestOptions = {
            method: 'DELETE',
        };

        fetch(`http://localhost:5000/appointments/${id_appointment}`, requestOptions).then( () => {
            getAppointments();
        });
    }

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
                            }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apps.map((app) => (
                            <TableRow
                                key={app.id_appointment}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {app.type}
                                </TableCell>
                                <TableCell>{app.date}</TableCell>
                                <TableCell>{app.time.substring(0,5)}</TableCell>
                                <TableCell>{app.doctor_name}</TableCell>
                                <TableCell>{app.patient_name}</TableCell>
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
                                    onClick={() => deleteAppointment(app.id_appointment)}
                                >
                                    <img src={del} alt="delete" className={`h-100 ${styles["buttonImg"]}`}></img>
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CustomTablePagination/>
        </div>
    );
}