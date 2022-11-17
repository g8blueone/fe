import { NavBar } from "../../components/layout/navigation/navbar";
import { AppointmentForm } from "../../components/layout/appointmentForm/appointmentForm";

import styles from "./createAppointment.module.css";

export function CreateAppointment() {
    return (
        <div className={`d-flex flex-column ${styles["sefulMic"]}`}>
            <NavBar/>
            <div className={`d-flex flex-column align-self-center p-5`}>
                <AppointmentForm />
            </div>
        </div>
    );
}