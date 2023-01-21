import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import urlString from "../../../url";

import { Select, MenuItem } from "@mui/material";
import { CustomInput } from "../../basic/input/input";
import { CustomButton } from "../../basic/btn/btn";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./appointmentForm.module.css";

const createAppointment = async (
  appointmentPatient,
  location,
  appointmentDoctor,
  appointmentDate,
  appointmentTime,
  appointmentType
) => {
  const APPOINTMENTS_API = `${urlString}appointments/`;
  const dateFormat = "YYYY-MM-DD";
  const status = new Promise((resolve) => {
    axios
      .post(APPOINTMENTS_API, {
        user_type: sessionStorage.getItem("userType"),
        token: sessionStorage.getItem("token"),
        patient_name: "1",
        doctor_name: "Dr. Blue",
        location: location,
        date: moment(appointmentDate).format(dateFormat),
        time: appointmentTime,
        type: appointmentType,
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      })
      .then(() => {
        window.location.href = "/appointments";
      });
  });
  const result = await status;
  return result;
};

export function AppointmentForm() {
  const [isDoctor, setIsDoctor] = useState(
    sessionStorage.getItem("userType") === "patient" ? false : true
  );
  const [appointmentPatient, setAppointmentPatient] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState("08:00");
  const [appointmentType, setAppointmentType] = useState("Gastroenterology");
  const [location, setLocation] = useState("Location");

  const patientNameHandler = (e) => {
    setAppointmentPatient(e.target.value);
  };

  const locationHandler = (e) => {
    setLocation(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await createAppointment(
      appointmentPatient,
      location,
      appointmentDoctor,
      appointmentDate,
      appointmentTime,
      appointmentType
    );
  };

  return (
    <form
      className={`${styles["appointmentWrapper"]} d-flex flex-column justify-content-center`}
      onSubmit={submitHandler}
    >
      <h2 className={`${styles["rubrica2"]}`}>Make an appointment</h2>
      <div className={`d-flex flex-column ${styles["elemsGap"]} mt-5`}>
        {isDoctor && (
          <div className="form-group">
            <label className={`${styles["eticheta"]}`}>Patient Name</label>
            <CustomInput
              type={"text"}
              hint={"Please enter..."}
              onChangeHandler={patientNameHandler}
            />
          </div>
        )}

        <div className="form-group">
          <label className={`${styles["eticheta"]}`}>Location</label>
          <CustomInput
            type={"text"}
            hint={"Please enter..."}
            onChangeHandler={locationHandler}
          />
        </div>

        <div className="d-flex d-row justify-content-between">
          <div className="form-group">
            <label className={`${styles["eticheta"]}`}>Date</label>
            <div className={`${styles["picker"]}`}>
              <DateTimePicker
                dateFormat="yyyy-MM-dd"
                selected={appointmentDate}
                calendarStartDay={1}
                onChange={(date) => {
                  setAppointmentDate(date);
                }}
                minDate={moment().toDate()}
              />
            </div>
          </div>
          <div className="form-group d-flex flex-column">
            <label className={`${styles["eticheta"]}`}>Time</label>
            <Select
              onChange={(event) => {
                setAppointmentTime(event.target.value);
              }}
              label="08:00"
              displayEmpty={true}
              value={appointmentTime}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #dfe3e7",
                display: "block",
                width: "250px",
                height: "auto",
                fontSize: "1rem",
                lineHeight: "1.4",
                color: "#475F7B",
                borderRadius: ".267rem",
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
            </Select>
          </div>
          <div className="form-group d-flex flex-column">
            <label className={`${styles["eticheta"]}`}>Type</label>
            <Select
              onChange={(event) => {
                setAppointmentType(event.target.value);
              }}
              label="Consultations"
              displayEmpty={true}
              value={appointmentType}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #dfe3e7",
                display: "block",
                width: "250px",
                height: "auto",
                fontSize: "1rem",
                lineHeight: "1.4",
                color: "#475F7B",
                borderRadius: ".267rem",
              }}
            >
              <MenuItem value={"Gastroenterology"}>Gastroenterology</MenuItem>
              <MenuItem value={"Orthopedics"}>Orthopedics</MenuItem>
              <MenuItem value={"Neurology"}>Neurology</MenuItem>
              <MenuItem value={"Oncology"}>Oncology</MenuItem>
              <MenuItem value={"Cardiology"}>Cardiology</MenuItem>
              <MenuItem value={"Urology"}>Urology</MenuItem>
              <MenuItem value={"Ophthalmology"}>Ophthalmology</MenuItem>
              <MenuItem value={"Rheumatology"}>Rheumatology</MenuItem>
              <MenuItem value={"Anesthesiology"}>Anesthesiology</MenuItem>
              <MenuItem value={"Endocrinology"}>Endocrinology</MenuItem>
            </Select>
          </div>
        </div>
      </div>

      <div
        className={`${styles["elemsGap"]} d-flex flex-row justify-content-end mt-5`}
      >
        <CustomButton
          title={"Create"}
          styleClass={"buttonPrimary"}
          type="submit"
        />
      </div>
    </form>
  );
}
