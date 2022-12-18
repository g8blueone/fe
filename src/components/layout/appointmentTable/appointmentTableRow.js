import { TableRow, TableCell, Button } from "@mui/material";
import addPrescription from "../../../assets/svg/medical-prescription.svg"
import edit from "../../../assets/svg/pen-to-square-regular.svg";
import del from "../../../assets/svg/ban-solid.svg";
import styles from "./appointmentTable.module.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AppointmentEditForm } from "../appointmentEditForm/appointmentEditForm";
import { AddPrescriptionForm } from "../addPrescriptionForm/addPrescriptionForm";

const delAppointment = async (appointmentId, getA) => {
    const status = new Promise((resolve) => {
        axios
            .delete(`http://localhost:5000/appointments/${appointmentId}`)
            .catch((error) => {
                console.log(error);
                resolve(false);
            })
            .then(() => {
                getA();
            })
    });
    const result = await status;
    return result;
};

export const AppointmentTableRow = ({ app, getA }) => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const showHandler = () => {
        setShow(true);
    }

    const closeHandler = () => {
        setShow(false);
    }

    const showAddHandler = () => {
        setShowAdd(true);
    }

    const closeAddHandler = () => {
        setShowAdd(false);
    }

    useEffect(() => {
        closeHandler();
        closeAddHandler();
    }, [app]);

    const deleteHandler = async (e) => {
        const response = await delAppointment(app.id_appointment, getA);
    }

    return (
        <TableRow
            key={app.id_appointment}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {app.type}
            </TableCell>
            <TableCell>{app.date}</TableCell>
            <TableCell>{app.time.substring(0, 5)}</TableCell>
            <TableCell>{app.location}</TableCell>
            <TableCell>{app.doctor_name}</TableCell>
            <TableCell>{app.patient_name}</TableCell>
            <TableCell
                sx={{
                    width: "100px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "right"
                }}>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Add prescription
                        </Tooltip>
                    }
                >
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
                        onClick={showAddHandler}
                        data-toggle="modal"
                    >
                        <img src={addPrescription} alt="add prescription" className={`h-100 ${styles["buttonImg"]}`}></img>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Edit
                        </Tooltip>
                    }
                >
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
                        onClick={showHandler}
                        data-toggle="modal"
                    >
                        <img src={edit} alt="edit" className={`h-100 ${styles["buttonImg"]}`}></img>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }
                >
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
                        onClick={deleteHandler}
                    >
                        <img src={del} alt="delete" className={`h-100 ${styles["buttonImg"]}`}></img>
                    </Button>
                </OverlayTrigger>
            </TableCell>
            <Modal
                show={show}
                onHide={closeHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Appointment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AppointmentEditForm appointment={app} getA={getA} />
                </Modal.Body>
            </Modal>
            <Modal
                show={showAdd}
                onHide={closeAddHandler}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Prescription
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPrescriptionForm appointment={app}/>
                </Modal.Body>
            </Modal>
        </TableRow >
    );
}