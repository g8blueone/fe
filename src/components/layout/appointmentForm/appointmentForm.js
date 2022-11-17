import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datepicker";
import moment from "moment";
import { Select, MenuItem } from "@mui/material";

import { CustomInput } from "../../basic/input/input";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointmentForm.module.css";
import { CustomButton } from "../../basic/btn/btn";
import { Navigate, Router } from "react-router-dom";


export function AppointmentForm() {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentType, setAppointmentType] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("8:00");
    const [appointmentPatient, setAppointmentPatient] = useState("");
    const [appointmentLocation, setAppointmentLocation] = useState("");
    const dateFormat = "YYYY-MM-DD";


    useEffect(() => {
        addAppointment();
    })

    const addAppointment = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({patient_name: "Sef",
             doctor_name: "Sef 2",
              time: "08:00",
                date:"2022-05-12",
                type: "Bloodwork" })
        };

        fetch('http://localhost:5000/appointment', requestOptions)
            return <Navigate to="/appointments"/>
    }


    return (
        <form className={`${styles["appointmentWrapper"]} d-flex flex-column justify-content-center`}>
            <h2 className={`${styles["rubrica2"]}`}>
                Make an appointment
            </h2>
            <div className={`d-flex flex-column mt-5`}>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Patient CNP
                    </label>
                    <CustomInput
                        type={"text"}
                        hint={"Please enter..."}
                    />
                </div>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Location
                    </label>
                    <CustomInput
                        type={"text"}
                        hint={"Please enter..."}
                    />
                </div>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Date
                    </label>
                    <div className={`${styles["picker"]}`}>
                        <DateTimePicker
                            dateFormat="yyyy-MM-dd"
                            selected={appointmentDate}
                            onChange={
                                (date) => {
                                    setAppointmentDate(date);
                                    console.log(moment(date).format(dateFormat));
                                }
                            }
                            minDate={moment().toDate()}
                        />
                    </div>
                </div>
                <div className="form-group d-flex flex-column">
                    <label className={`${styles["eticheta"]}`}>
                        Time
                    </label>
                    <Select
                        onChange={(event) => {setAppointmentTime(event.target.value)}}
                        label="08:00"
                        displayEmpty={true}
                        value={appointmentTime}
                        sx={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #dfe3e7',
                            display: 'block',
                            width: '250px',
                            height: 'auto',
                            fontSize: '1rem',
                            lineHeight: '1.4',
                            color: '#475F7B',
                            borderRadius: '.267rem',
                        }}
                    >
                        <MenuItem value={"8:00"}>08:00</MenuItem>
                        <MenuItem value={"9:00"}>09:00</MenuItem>
                        <MenuItem value={"10:00"}>10:00</MenuItem>
                        <MenuItem value={"11:00"}>11:00</MenuItem>
                        <MenuItem value={"12:00"}>12:00</MenuItem>
                        <MenuItem value={"13:00"}>13:00</MenuItem>
                        <MenuItem value={"14:00"}>14:00</MenuItem>
                        <MenuItem value={"15:00"}>15:00</MenuItem>
                    </Select>
                </div>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Type
                    </label>
                    <CustomInput
                        type={"text"}
                        hint={"Please enter..."}
                    />
                </div>
            </div>

            <div className="d-flex flex-row justify-content-end mt-5">
                <CustomButton
                    title={"Cancel"}
                    type={"buttonSecondary"}
                />
                <CustomButton
                    title={"Create"}
                    type={"buttonPrimary"}
                    handler={addAppointment}
                />
            </div>
        </form >
    );
} 
