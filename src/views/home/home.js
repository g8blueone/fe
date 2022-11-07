import { NavBar } from "../../components/layout/navigation/navbar";
import { UpcomingAppointments } from "../../components/layout/upcomingAppointments/upcomingAppointments";
import { UserProfile } from "../../components/layout/userProfile/userProfile";
import styles from "./home.module.css"

export function Home() {
    return (
        <div className="d-flex flex-column">
            <NavBar/>
            <div className={`d-flex flex-column p-3 ${styles["wrapper"]}`}>
                <UserProfile/>
                <UpcomingAppointments/>
            </div>
        </div>
    );
}