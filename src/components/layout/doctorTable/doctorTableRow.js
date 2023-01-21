import { TableRow, TableCell, Button } from "@mui/material";
import select from "../../../assets/svg/select-svgrepo-com.svg";
import styles from "./doctorTable.module.css";

import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

const selectDoctor = async (doctorId, getA) => {
  const status = new Promise((resolve) => {
    axios
      .select(`http://localhost:5000/doctors/${doctorId}`)
      .catch((error) => {
        console.log(error);
        resolve(false);
      })
      .then(() => {
        getA();
      });
  });
  const result = await status;
  return result;
};

export const DoctorTableRow = ({ app, getA }) => {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const showHandler = () => {
    setShow(true);
  };

  const closeHandler = () => {
    setShow(false);
  };

  const showAddHandler = () => {
    setShowAdd(true);
  };

  const closeAddHandler = () => {
    setShowAdd(false);
  };

  useEffect(() => {
    closeHandler();
    closeAddHandler();
  }, [app]);

  const selectHandler = async (e) => {
    const response = await selectDoctor(app.id_doctor, getA);
  };

  return (
    <TableRow
      key={app.id_doctor}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {app.first_name} {app.last_name}
      </TableCell>
      <TableCell>{app.specialization}</TableCell>
      <TableCell>{app.hospital}</TableCell>
      <TableCell>{app.position}</TableCell>
      {/* <TableCell
                sx={{
                    width: "100px",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "right"
                }}>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Select
                        </Tooltip>
                    }
                >
                    <Button
                        className={`${styles["rowBtn"]}`}
                        sx={{
                            backgroundColor: '#2785FF',
                            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                            width: '30px',
                            minWidth: '30px',
                            height: '30px',
                            minHeight: '30px'
                        }}
                        onClick={selectHandler}
                    >
                        <img src={select} alt="select" className={`h-100 ${styles["buttonImg"]}`}></img>
                    </Button>
                </OverlayTrigger>

            </TableCell> */}
    </TableRow>
  );
};
