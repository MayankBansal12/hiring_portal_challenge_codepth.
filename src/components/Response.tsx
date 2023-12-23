import React, { useEffect, useState } from 'react'
import { useFirebase } from "../context/Firebase.jsx";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Response = ({ docId }) => {
    const [responses, setResponses] = useState([]);
    const firebase = useFirebase();

    const fetchResponses = async () => {
        let temp = [];
        const querySnapshot = await firebase.viewResponse(docId);
        querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id })
        });
        setResponses(temp);
    }

    useEffect(() => {
        fetchResponses();
    }, [])

    return (
        <>
            {responses && responses.length > 0 ? <div>
                <TableContainer component={Paper} className="w-full">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone No</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Resume Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responses.map((row, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.desc}</TableCell>
                                    <TableCell align="center">{row.resume}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> : <>No Responses yet!</>}
        </>
    )
}

export default Response
