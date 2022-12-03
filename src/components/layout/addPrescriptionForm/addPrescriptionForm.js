import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { CustomInput } from "../../basic/input/input";
import { CustomButton } from "../../basic/btn/btn";

import styles from './addPrescriptionForm.module.css';

const addPrescription = async (appointmentId, prescription) => {
    const status = new Promise((resolve) => {
        axios
            .put(`http://localhost:5000/appointments/${appointmentId}`, {
                prescription: prescription,
            })
            .catch((error) => {
                console.log(error);
                resolve(false);
            })
            .then(() => {
                console.log(prescription);
            })
    });
    const result = await status;
    return result;
};


export const AddPrescriptionForm = ({ appointment }) => {
    //const { prescription } = appointment.prescription;
    const [appointmentPrescription, setAppointmentPrescription] = useState("");

    const appointmentPrescriptionHandler = (e) => {
        setAppointmentPrescription(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(appointmentPrescription);
    }

    return (
        <form
            className={'d-flex flex-column justify-content-center'}
            onSubmit={submitHandler}
        >
            <div className={`d-flex flex-column ${styles["elemsGap"]} mt-5`}>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Prescription
                    </label>
                    <CustomInput
                        type={"text"}
                        hint="Please enter..."
                        onChangeHandler={appointmentPrescriptionHandler}
                    />
                </div>
            </div>

            <div className={'d-flex flex-row justify-content-end mt-5'}>
                <CustomButton
                    title={"Add"}
                    styleClass={"buttonPrimary"}
                    type="submit"
                />
            </div>
        </form >
    )
}