import styles from "./doctors.module.css"
import { NavBar } from "../../components/layout/navigation/navbar";
import { DoctorTable } from "../../components/layout/doctorTable/doctorTable";

export function Doctors() {

    return (
        <div className={`d-flex flex-column ${styles["full"]}`}>
            <NavBar />
            <div className="d-flex flex-row justify-content-center p-5">
                <DoctorTable/>
            </div>
        </div>
    );
}
