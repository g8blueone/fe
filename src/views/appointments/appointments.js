import styles from "./appointments.module.css"
import { NavBar } from "../../components/layout/navigation/navbar";
import { createAppointment } from "../../models/appointment";
import { AppointmentTable } from "../../components/layout/appointmentTable/appointmentTable";

export function Appointments() {

    let data = [
        createAppointment(1, "bloodwork", "today", "cluj", "Mr. Clean"),
        createAppointment(2, "brain test", "tomorrow", "papuceni", "Bos Sos"),
    ]

    return (
        <div className={`d-flex flex-column ${styles["full"]}`}>
            <NavBar />
            <div className="d-flex flex-row justify-content-center p-5">
                <AppointmentTable data={data} />
            </div>
        </div>
    );
}