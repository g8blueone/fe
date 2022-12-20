import { TableHead, TableRow, TableCell, TableSortLabel } from "@mui/material";
import styles from "./doctorTable.module.css"

export default function TableHeader(propsSorting) {
    const { valueToOrderBy, orderDirection, handleRequestSort } = propsSorting;

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow
                sx={{
                '& .MuiTableCell-root': {
                    color: 'white',
                    backgroundColor: '#2785FF'
                }
                }}>
                <TableCell key="name">
                    <TableSortLabel
                        active={valueToOrderBy === "name"}
                        direction={valueToOrderBy === "name" ? orderDirection : 'asc'}
                        onClick={createSortHandler("name")}
                    >
                        Name
                    </TableSortLabel>
                </TableCell>

                <TableCell key="specialization">
                    <TableSortLabel
                        active={valueToOrderBy === "specialization"}
                        direction={valueToOrderBy === "specialization" ? orderDirection : 'asc'}
                        onClick={createSortHandler("specialization")}
                    >
                        Specialization
                    </TableSortLabel>
                </TableCell>

                <TableCell key="hospital">
                    <TableSortLabel
                        active={valueToOrderBy === "hospital"}
                        direction={valueToOrderBy === "hospital" ? orderDirection : 'asc'}
                        onClick={createSortHandler("hospital")}
                    >
                        Hospital
                    </TableSortLabel>
                </TableCell>

                <TableCell key="position">
                    <TableSortLabel
                        active={valueToOrderBy === "position"}
                        direction={valueToOrderBy === "position" ? orderDirection : 'asc'}
                        onClick={createSortHandler("position")}
                    >
                        Position
                    </TableSortLabel>
                </TableCell>

                <TableCell
                sx={{
                    width: "100px"
                }}>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}