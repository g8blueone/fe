import { useState, useEffect } from "react";
import { AppointmentCard } from "./appointmentCard";
import styles from './upcomingAppointments.module.css';

export const UpcomingAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = () => {
        fetch(`http://localhost:5000/appointments/?sortMode=DESC&sortField=dateField`)
            .then(response => response.json())
            .then(response => {
                const upcomingApps = response.data.filter(function (app) {
                    let currentDate = new Date().toJSON().slice(0, 10);
                    return app.date >= currentDate;
                  });
                setAppointments(upcomingApps);
            });
    }

    return (
        <>
            {appointments?.map((appointment) => (
                <div key={appointment.id_appointment} className={styles.card}>
                    <AppointmentCard
                        appointment={appointment}
                    />
                </div>
            ))}
        </>
    );
}