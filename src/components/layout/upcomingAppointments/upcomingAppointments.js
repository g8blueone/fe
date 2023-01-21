import { useState, useEffect } from "react";
import { AppointmentCard } from "./appointmentCard";
import styles from "./upcomingAppointments.module.css";

export const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = () => {
    fetch(
      `http://localhost:5000/appointments/?sortMode=ASC&sortField=dateField&id=${sessionStorage.getItem(
        "token"
      )}&user_type=${sessionStorage.getItem("userType")}`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const upcomingApps = response.data.filter(function (app) {
          let currentDate = new Date().toJSON().slice(0, 10);
          return app.date >= currentDate;
        });
        setAppointments(upcomingApps.slice(0, 6));
      });
  };

  return (
    <>
      {appointments?.map((appointment) => (
        <div key={appointment.id_appointment} className={styles.card}>
          <AppointmentCard appointment={appointment} />
        </div>
      ))}
    </>
  );
};
