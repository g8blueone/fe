import { NavBar } from "../../components/layout/navigation/navbar";
import { UpcomingAppointments } from "../../components/layout/upcomingAppointments/upcomingAppointments";
import { UserProfile } from "../../components/layout/userProfile/userProfile";
import styles from "./home.module.css"

export function Home() {
    return (
        <div className="d-flex flex-column">
            <NavBar />
            <div className={`d-flex flex-column p-3 ${styles["wrapper"]}`}>
                <UserProfile />
                <div className={`d-flex flex-column ${styles["upcoming_appointments_box"]} p-4`}>
                    <h1>
                        Upcoming Appointments
                    </h1>
                    <div className={`d-flex flex-wrap flex-row ${styles["upcoming_appointments"]} mb-3 p-2`}>
                        <UpcomingAppointments />
                    </div>
                </div>
            </div>
        </div>
    );
}