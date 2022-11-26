import React, { useState } from "react";
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
    const [appointmentPrescrption, setAppointmentPrescrption] = useState("");

    const appointmentPrescrptionHandler = (e) => {
        setAppointmentPrescrption(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(appointmentPrescrption);
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
                        placeholder="Please enter..."
                        onChangeHandler={appointmentPrescrptionHandler}
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