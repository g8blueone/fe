import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import { useState } from "react";
import styles from "./appointmentTable.module.css";

export default function TableHeader(propsSorting) {
  const [isDoctor, setIsDoctor] = useState(
    sessionStorage.getItem("userType") === "patient" ? false : true
  );
  const { valueToOrderBy, orderDirection, handleRequestSort } = propsSorting;

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow
        sx={{
          "& .MuiTableCell-root": {
            color: "white",
            backgroundColor: "#2785FF",
          },
        }}
      >
        <TableCell key="type">
          <TableSortLabel
            active={valueToOrderBy === "type"}
            direction={valueToOrderBy === "type" ? orderDirection : "asc"}
            onClick={createSortHandler("type")}
          >
            Type
          </TableSortLabel>
        </TableCell>

        <TableCell key="date">
          <TableSortLabel
            active={valueToOrderBy === "date"}
            direction={valueToOrderBy === "date" ? orderDirection : "asc"}
            onClick={createSortHandler("date")}
          >
            Date
          </TableSortLabel>
        </TableCell>

        <TableCell key="time">
          <TableSortLabel
            active={valueToOrderBy === "time"}
            direction={valueToOrderBy === "time" ? orderDirection : "asc"}
            onClick={createSortHandler("time")}
          >
            Time
          </TableSortLabel>
        </TableCell>

        <TableCell key="location">
          <TableSortLabel
            active={valueToOrderBy === "location"}
            direction={valueToOrderBy === "location" ? orderDirection : "asc"}
            onClick={createSortHandler("location")}
          >
            Location
          </TableSortLabel>
        </TableCell>
        {!isDoctor && (
          <TableCell key="doctor">
            <TableSortLabel
              active={valueToOrderBy === "doctor"}
              direction={valueToOrderBy === "doctor" ? orderDirection : "asc"}
              onClick={createSortHandler("doctor")}
            >
              Doctor
            </TableSortLabel>
          </TableCell>
        )}

        {isDoctor && (
          <TableCell key="patient">
            <TableSortLabel
              active={valueToOrderBy === "patient"}
              direction={valueToOrderBy === "patient" ? orderDirection : "asc"}
              onClick={createSortHandler("patient")}
            >
              Patient
            </TableSortLabel>
          </TableCell>
        )}

        <TableCell
          sx={{
            width: "100px",
          }}
        ></TableCell>
      </TableRow>
    </TableHead>
  );
}
