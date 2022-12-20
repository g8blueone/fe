import { useState, useEffect } from "react";
import moment from "moment";

import styles from './appointmentCard.module.css';

export const AppointmentCard = ({ appointment }) => {
    const [period, setPeriod] = useState("");
    const [periodText, setPeriodText] = useState("");

    useEffect(() => {
        if (appointment && appointment.date) {
            // isoweek - week starting on monday ending on sunday
            let currentDate = new Date().toJSON().slice(0, 10);
            const startOfWeek = moment().startOf('isoweek').toDate().toJSON().slice(0, 10);
            const endOfWeek = moment().endOf('isoweek').toDate().toJSON().slice(0, 10);
            const currentMonth = parseInt(currentDate.slice(5, 7));
            const month = parseInt(appointment.date.slice(5, 7));
            if (appointment.date >= startOfWeek && appointment?.date <= endOfWeek) {
                setPeriod("this_week_month");
                setPeriodText("this week");
            }
            else if (month === currentMonth) {
                setPeriod("this_week_month");
                setPeriodText("this month");
            }
            else if (month === (currentMonth % 12 + 1)) {
                setPeriod("next_month");
                setPeriodText("next month");
            }
            else {
                setPeriod("more");
                setPeriodText("mai asteapta");
            }
        }
    }, []);

    return (
        <>
            <div className={`${styles["upper_container"]} ${styles[period]} d-flex flex-column justify-content-center align-items-center`}>
                <p className={styles.when}>
                    {periodText}
                </p>
            </div>

            <div className={`${styles["lower_container"]} d-flex flex-column`}>
                <p className="d-flex flex-column align-items-center">
                    <strong>
                        {appointment.type}
                    </strong>
                </p>

                <label className={styles.appointment_label}>
                    Place
                </label>
                <p className={styles.appointment_text}>
                    {appointment.location}
                </p>

                <div className={`d-flex flex-row justify-content-sm-between`}>
                    <div>
                        <label className={styles.appointment_label}>
                            Date
                        </label>
                        <p className={styles.appointment_text}>
                            {appointment.date}
                        </p>
                    </div>
                    <div>
                        <label className={styles.appointment_label}>
                            Time
                        </label>
                        <p className={styles.appointment_text}>
                            {appointment.time.substring(0, 5)}
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}