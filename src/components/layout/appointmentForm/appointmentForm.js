import React, { useState } from "react";
import DateTimePicker from "react-datepicker";
import moment from "moment";
import { Select, MenuItem } from "@mui/material";

import { CustomInput } from "../../basic/input/input";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointmentForm.module.css";
import { CustomButton } from "../../basic/btn/btn";


export function AppointmentForm() {
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    //const [appointmentType, setAppointmentType] = useState("");
    const dateFormat = "YYYY/MM/DD";

    return (
        <form className={`${styles["appointmentWrapper"]} d-flex flex-column justify-content-center p-5`}>
            <h2 className={`${styles["rubrica2"]}`}>
                Make an appointment
            </h2>
            <div className={`d-flex flex-column mt-5`}>
                <div class="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Patient CNP
                    </label>
                    <CustomInput
                        type={"text"}
                        hint={"1234567890123"}
                    />
                </div>
                <div class="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Appointment Date
                    </label>
                    <div className={`${styles["picker"]}`}>
                        <DateTimePicker
                            dateFormat="yyyy/MM/dd"
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
                <div class="form-group d-flex flex-column">
                    <label className={`${styles["eticheta"]}`}>
                        Appointment Time
                    </label>
                    <Select
                        label="08:00"
                        displayEmpty
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
                        <MenuItem value={10}>08:00</MenuItem>
                        <MenuItem value={20}>09:00</MenuItem>
                        <MenuItem value={30}>10:00</MenuItem>
                        <MenuItem value={40}>11:00</MenuItem>
                        <MenuItem value={50}>12:00</MenuItem>
                        <MenuItem value={60}>13:00</MenuItem>
                    </Select>
                </div>
                <div class="form-group">
                    <label className={`${styles["eticheta"]}`}>
                        Appointment Type
                    </label>
                    <CustomInput
                        type={"text"}
                        hint={"1234567890123"}
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
                />
            </div>
        </form >
    );
} 
