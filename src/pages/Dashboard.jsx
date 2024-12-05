import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    // Fetch the agreements from the mock API
    axios.get('http://localhost:5000/agreements')
      .then(response => setAgreements(response.data))
      .catch(error => console.error("Error fetching agreements:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Agreement Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agreements.map((agreement) => (
            <TableRow key={agreement.id}>
              <TableCell>{agreement.name}</TableCell>
              <TableCell>{agreement.department}</TableCell>
              <TableCell>{agreement.position}</TableCell>
              <TableCell>{agreement.agreementDate}</TableCell>
              <TableCell>
                <Link to={`/view/${agreement.id}`}>View</Link> | 
                <Link to={`/update/${agreement.id}`}> Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;