import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";

import { Select, MenuItem } from "@mui/material";
import { CustomInput } from "../../basic/input/input";
import { CustomButton } from "../../basic/btn/btn";

import "react-datepicker/dist/react-datepicker.css";
import styles from './appointmentEditForm.module.css';

const updateAppointment = async (appointmentId, appointmentPatient, appointmentDate, appointmentTime, appointmentType, location, getA) => {
    const dateFormat = "YYYY-MM-DD";
    const status = new Promise((resolve) => {
        axios
            .put(`http://localhost:5000/appointments/${appointmentId}`, {
                patient_name: appointmentPatient,
                date: moment(appointmentDate).format(dateFormat),
                doctor_name: "Vasile",
                time: appointmentTime,
                type: appointmentType,
                location: location,
            })
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


export const AppointmentEditForm = ({ appointment, getA }) => {
    const { id_appointment, patient_name, date, time, type, location } = appointment;
    const [appointmentPatient, setAppointmentPatient] = useState(patient_name);
    const [appointmentDate, setAppointmentDate] = useState(new Date(date));
    const [appointmentTime, setAppointmentTime] = useState(time.slice(0, 5));
    const [appointmentType, setAppointmentType] = useState(type);
    const [appointmentLocation, setAppointmentLocation] = useState(location);

    const patientNameHandler = (e) => {
        setAppointmentPatient(e.target.value);
    }

    const locationHandler = (e) => {
        setAppointmentLocation(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await updateAppointment(id_appointment, appointmentPatient, appointmentDate, appointmentTime, appointmentType, appointmentLocation, getA);
    }

    return (
        <form
            className={'d-flex flex-column justify-content-center'}
            onSubmit={submitHandler}
        >
            <div className={`d-flex flex-column ${styles["elemsGap"]} mt-5`}>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Patient Name
                    </label>
                    <CustomInput
                        type={"text"}
                        value={appointmentPatient}
                        onChangeHandler={patientNameHandler}
                    />
                </div>
                <div className="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Location
                    </label>
                    <CustomInput
                        type={"text"}
                        value={appointmentLocation}
                        onChangeHandler={locationHandler}
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
                                (newDate) => {
                                    setAppointmentDate(newDate);
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
                        onChange={
                            (event) => {
                                setAppointmentTime(event.target.value)
                            }
                        }
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
                        <MenuItem value={"08:00"}>08:00</MenuItem>
                        <MenuItem value={"09:00"}>09:00</MenuItem>
                        <MenuItem value={"10:00"}>10:00</MenuItem>
                        <MenuItem value={"11:00"}>11:00</MenuItem>
                        <MenuItem value={"12:00"}>12:00</MenuItem>
                        <MenuItem value={"13:00"}>13:00</MenuItem>
                        <MenuItem value={"14:00"}>14:00</MenuItem>
                        <MenuItem value={"15:00"}>15:00</MenuItem>
                        <MenuItem value={"16:00"}>16:00</MenuItem>
                        <MenuItem value={"17:00"}>17:00</MenuItem>
                        <MenuItem value={"18:00"}>18:00</MenuItem>
                        <MenuItem value={"19:00"}>19:00</MenuItem>
                        <MenuItem value={"20:00"}>20:00</MenuItem>
                        <MenuItem value={"21:00"}>21:00</MenuItem>
                        <MenuItem value={"22:00"}>22:00</MenuItem>

                    </Select>
                </div>
                <div className="form-group d-flex flex-column">
                    <label className={`${styles["eticheta"]}`}>
                        Type
                    </label>
                    <Select
                        onChange={
                            (event) => {
                                setAppointmentType(event.target.value)
                            }
                        }
                        displayEmpty={true}
                        value={appointmentType}
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
                        <MenuItem value={"Consultation"}>Consultation</MenuItem>
                        <MenuItem value={"Regular Control"}>Regular Control</MenuItem>
                        <MenuItem value={"Surgery"}>Surgery</MenuItem>
                        <MenuItem value={"Test"}>Test</MenuItem>
                        <MenuItem value={"Cardio"}>Cardio</MenuItem>
                    </Select>
                </div>
            </div>

            <div className={'d-flex flex-row justify-content-end mt-5'}>
                <CustomButton
                    title={"Edit"}
                    styleClass={"buttonPrimary"}
                    type="submit"
                />
            </div>
        </form >
    )
}