import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Grid } from "@material-ui/core";
import { ClubService } from "../service/ClubService";
import { MemberService } from "../service/MemberService";

const useStyles = makeStyles((theme) => ({
    table: {
        minHeight: "75vh",
        maxHeight: "75vh",
    },
    tableRow: {},
    tableBody: {},
}));


export default function AllClubs({callbackOnClubClick}) {
    const classes = useStyles();
    const [clubs, setClubs] = React.useState([]);
    const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [selectedRow, setSelected] = React.useState("");
	const [enrolledClubs, setEnrolleds] = React.useState([]);
	
	const cols = ["Members", "Sub-clubs", "Posts"];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
		setSelected("");
    };

	// get enrolled clubs
    useEffect(() => {
		console.log("qqqqqqqqqqqqqqqqq");
        MemberService.getEnrolledClubs().then((response) => {
			setEnrolleds(response.data);
			console.log(response.data);
        });
    }, []);


    // get all clubs
    useEffect(() => {
		console.log("asdasdsdadas");
        ClubService.getClubs().then((response) => {
			let clubs_temp = []
			for (let i = 0; i < response.data.length; i++) {
				response.data[i].members = 0;
				response.data[i].subclubs = 0;
				response.data[i].posts = 0;
				
				
			}

            setClubs(response.data);
        });
    }, [enrolledClubs]);

	const handleClick = (event, club) => {
		setSelected(club.name)
		callbackOnClubClick(club)
	};

    return (
        <Grid>
            <TableContainer className={classes.table} component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell>Club Name</TableCell>
                            {cols.map((col) => (
                                <TableCell align="right">{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? clubs.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                            : clubs
                        ).map((row) => (
                            <TableRow
                                key={row.name}
								hover
								selected={row.name==selectedRow}
								onClick={(event) => handleClick(event, row)}
                                className={classes.tableRow}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.members}</TableCell>
                                <TableCell align="right">{row.subclubs}</TableCell>
                                <TableCell align="right">{row.posts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                className={classes.tablePagination}
                count={100}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Grid>
    );
}
