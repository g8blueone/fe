import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DateTimePicker from "react-datepicker";
import { CustomButton } from "../../basic/btn/btn";

import styles from './addPrescriptionForm.module.css';

export const AddPrescriptionForm = ({ appointment }) => {
    //const { prescription } = appointment.prescription;
    const [appointmentPrescription, setAppointmentPrescription] = useState("");
    const [issueDate, setIssueDate] = useState(new Date());
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [compensated, setCompensated] = useState(1);
    const [appId, setAppId] = useState("");
    const [diagId, setDiagId] = useState("");
    const [patientCnp, setPatientCnp] = useState("");

    
    const appointmentPrescriptionHandler = (e) => {
        setAppointmentPrescription(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await addPrescription()
    }

    useEffect(() => {
        getPrescriptionData();
    }, []);

    const getPrescriptionData = () => {
        fetch(`http://localhost:5000/diagnostics/?id=${1}`)
            .then(response => response.json())
            .then(response => {
                let diag = response.data[0]
                setAppointmentPrescription(diag.prescription)
                setIssueDate(new Date(diag.issue_date));
                setExpirationDate(new Date(diag.expiration_date));
                setCompensated(diag.compensated);
                setAppId(diag.id_appointment);
                setDiagId(diag.id_diagnostic);
                setPatientCnp(diag.patient_cnp);
            });
    }

    const addPrescription = async (appId, diagId, prescription, compensated, expirationDate, issueDate, patientCnp) => {
        const status = new Promise((resolve) => {
            axios
                .put(`http://localhost:5000/appointments/${appId}`, {
                    compensated: compensated,
                    id_diagnostic: diagId,
                    expiration_date: expirationDate,
                    patient_cnp: patientCnp,
                    prescription: prescription,
                })
                .catch((error) => {
                    console.log(error);
                    resolve(false);
                })
                .then(() => {
                    getPrescriptionData();
                })
        });
        const result = await status;
        return result;
    };

    return (
        <form
            className={'d-flex flex-column justify-content-center'}
            onSubmit={submitHandler}
        >
            <div className={`d-flex flex-column ${styles["elemsGap"]} mt-5`}>
                <div className="form-group d-flex flex-column g-2 ms-3 me-3">
                    <label className={`${styles["eticheta"]}`}>
                        Prescription
                    </label>
                    <textarea
                        placeholder="Please enter..."
                        value={appointmentPrescription}
                        onChange={appointmentPrescriptionHandler}
                    />
                </div>
                <div className={`form-group d-flex flex-column g-2 ms-3 me-3 ${styles["picker"]}`}>
                        <label className={`${styles["eticheta"]}`}>Issue Date</label>
                        <DateTimePicker
                            dateFormat="yyyy-MM-dd"
                            selected={issueDate}
                            onChange={
                                (date) => {
                                    setIssueDate(date);
                                }
                            }
                            maxDate={moment().toDate()}
                        />
                </div>
                <div className={`form-group d-flex flex-column g-2 ms-3 me-3 ${styles["picker"]}`}>
                        <label className={`${styles["eticheta"]}`}>Expiration Date</label>
                        <DateTimePicker
                            dateFormat="yyyy-MM-dd"
                            selected={expirationDate}
                            onChange={
                                (date) => {
                                    setExpirationDate(date);
                                }
                            }
                            min={moment().toDate()}
                        />
                </div>
            </div>

            <div className={'d-flex flex-row justify-content-end mt-5'}>
                <CustomButton
                    title={"Save"}
                    styleClass={"buttonPrimary"}
                    type="submit"
                />
            </div>
        </form >
    )
}