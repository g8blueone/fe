import styles from "./appointmentTable.module.css"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, IconButton, TableFooter, TablePagination, Button } from "@mui/material";
import pageRight from "../../../assets/svg/arrow-right-solid.svg"
import pageLeft from "../../../assets/svg/arrow-left-solid.svg"
import edit from "../../../assets/svg/pen-to-square-regular.svg"
import del from "../../../assets/svg/ban-solid.svg"
import plus from "../../../assets/svg/plus-solid.svg"

import { useState } from "react";

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


export function AppointmentTable({data}) {
    const [page, setPage] = useState(0);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

    return (
        <div>
            <div className="d-flex flex-row-reverse">
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
                    // onClick={hello}
                >
                    <img src={plus} alt="add" className={`h-100 ${styles["buttonImg"]}`}></img>
                </Button>
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
                            <TableCell>Time</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Doctor</TableCell>
                            <TableCell
                            sx={{
                                width: "100px",
                            }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                                key={row.type}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{row.doctor}</TableCell>
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
                                    // onClick={hello}
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