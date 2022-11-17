import styles from "./appointments.module.css"
import { NavBar } from "../../components/layout/navigation/navbar";
import { createAppointment } from "../../models/appointment";
import { AppointmentTable } from "../../components/layout/appointmentTable/appointmentTable";

export function Appointments() {

    return (
        <div className={`d-flex flex-column ${styles["full"]}`}>
            <NavBar />
            <div className="d-flex flex-row justify-content-center p-5">
                <AppointmentTable/>
            </div>
        </div>
    );
}