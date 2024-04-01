import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Calendar from './Calendar';

interface Leave {
    leave_id: number;
    leave_date: string;
    reason: string;
    user_id: number;
    user_role: string;
    status: string;
    course_code: string;
}

interface ShowLeavesProps {
    leaves: Leave[];
}


const ShowLeaves: React.FC<ShowLeavesProps> = ({ leaves }) => {
    //console.log(leaves);
    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Reason</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaves.map((leave) => (
                            <TableRow key={leave.leave_id}>
                                <TableCell>{leave.leave_date}</TableCell>
                                <TableCell>{leave.reason}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Calendar leaves = {leaves} /> */}
        </Paper>
    );
};

export default ShowLeaves;