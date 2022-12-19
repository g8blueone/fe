import styles from "./doctors.module.css"
import { NavBar } from "../../components/layout/navigation/navbar";
import { DoctorTable } from "../../components/layout/doctorTable/doctorTable";

export function Doctors() {

    return (
        <div className={`d-flex flex-column ${styles["full"]}`}>
            <NavBar />
            <div className="d-flex flex-row justify-content-center p-5">
                <DoctorTable/>
            </div>
        </div>
    );
}


// import { NavBar } from "../../components/layout/navigation/navbar";
// import {
//     makeStyles,
//     Table,
//     TableBody,
//     TableCell,
//     tableCellClasses,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
// } from "@mui/material";
// import { styled } from '@mui/material/styles';
//
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: '#2785FF',
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));
//
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));
//
// function createDoctor(name, specialization, hospital, location) {
//     return { name, specialization, hospital, location };
// }
//
// // add doctors here
// const doctors = [
//     createDoctor('Mihai Popescu', 'Ophthalmology', 'Regina Maria', 'Cluj Napoca'),
//     createDoctor('Daniela Ionescu', 'Dermatology',  'Regina Maria', 'Brasov'),
//     createDoctor('Maria Lucaci', 'Allergy and Immunology',  'Regina Maria', 'Bucuresti'),
//     createDoctor('Flavia Ghita', 'Ophthalmology', 'Regina Maria', 'Cluj Napoca'),
//     createDoctor('Vlad Balan', 'Dermatology',  'Regina Maria', 'Brasov'),
//     createDoctor('Daria Dumitru', 'Allergy and Immunology',  'Regina Maria', 'Bucuresti'),
//     createDoctor('Andrei Petcu', 'Neurology', 'Regina Maria', 'Sibiu'),
// ];
//
// export function Doctors() {
//     return (
//         <div className="doctors">
//             <div className="d-flex flex-column">
//                 <NavBar/>
//                 <div className="d-flex flex-row">
//                     <TableContainer component={Paper}>
//                         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//                             <TableHead>
//                                 <TableRow>
//                                     <StyledTableCell>Name</StyledTableCell>
//                                     <StyledTableCell align="right">Specialization</StyledTableCell>
//                                     <StyledTableCell align="right">Hospital</StyledTableCell>
//                                     <StyledTableCell align="right">Location</StyledTableCell>
//                                     <StyledTableCell align="right"></StyledTableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {doctors.map((row) => (
//                                     <StyledTableRow key={row.name}>
//                                         <StyledTableCell component="th" scope="row">
//                                             {row.name}
//                                         </StyledTableCell>
//                                         <StyledTableCell align="right">{row.specialization}</StyledTableCell>
//                                         <StyledTableCell align="right">{row.hospital}</StyledTableCell>
//                                         <StyledTableCell align="right">{row.location}</StyledTableCell>
//                                         <TableCell align="right">
//                                             {
//                                                 <button type="submit">Select</button>
//                                             }
//                                         </TableCell>
//                                     </StyledTableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }